import {
  RabbitRPC,
  MessageHandlerErrorStrategy,
  MessageHandlerErrorBehavior,
} from '../../nestjs-plus/packages/rabbitmq';

import { Injectable } from '@nestjs/common';


import * as util from 'util';

const sleep = util.promisify(setTimeout);

class ExponentialHandleErrorStrategy implements MessageHandlerErrorStrategy {
  constructor(public errorBehavior?: MessageHandlerErrorBehavior) {}

  handleError(
    channel,
    msg,
    config,
  ) {
    const headers = msg.properties.headers;
    const deathHeader = headers['x-death'] || [];
    const deadHeaders = deathHeader.pop() || {};
    const retryCount = headers['x-retry-count'] || 0;
    const expiration = parseInt(deadHeaders['original-expiration'], 2) || 1000;
    const correlationId = msg.properties.correlationId;

    console.log(`${JSON.stringify(headers)} :${retryCount}: ${expiration}`);

    //channel.ack(msg);

    if (retryCount <= 4) {
      const newExpiration = expiration * 1.5;
      const retryExp = Math.pow(retryCount + 1, 2);
      const name = `retry_queue.${retryExp}`;

      const exchange = channel.assertExchange('retry_exchange', 'topic');
      const queue = channel
        .assertQueue(name, {
          deadLetterExchange: 'main_exchange',
          deadLetterRoutingKey: 'main_queue',
          messageTtl: retryExp * 10000,
          //expires: retryExp * 1000 * 2,
        })
        .then(value => {
          channel.bindQueue(name, 'retry_exchange', name).then(value => {
            channel.publish('retry_exchange', name, msg.content, {
              replyTo: 'amq.rabbitmq.reply-to',
              correlationId,
              headers: {
                'x-retry-count': retryCount + 1,
              },
            });
          });
        });
    }
  }
}

@Injectable()
export class MessagingService {
  @RabbitRPC({
    exchange: 'main_exchange',
    routingKey: 'main_queue',
    queue: 'main_queue',
    handleError: new ExponentialHandleErrorStrategy(),
  })
  public async pubSubHandler(msg: {}, raw) {
    console.log(raw);
    console.log(raw.properties.headers['x-death']);
    console.log(`Received message: ${JSON.stringify(msg)}`);

    const time = (Math.floor(Math.random() * 60) + 1) * 1000;
    console.log(time);
    return time;
    //throw new Error('fail');
  }
}



// tslint:disable-next-line: max-classes-per-file
