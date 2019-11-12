import { Inject, Logger } from '@nestjs/common';
import {
  AmqpConnection,
  RabbitRPC,
  MessageHandlerErrorStrategy,
  RabbitMQConfig,
  MessageHandlerErrorBehavior,
} from '../../nestjs-plus/packages/rabbitmq';
import { Injectable } from '@nestjs/common';
import { AppController } from './app.controller';

import * as amqplib from 'amqplib';
import { ConsumeMessage } from 'amqplib';

class ExponentialHandleErrorStrategy implements MessageHandlerErrorStrategy {
  constructor(public errorBehavior?: MessageHandlerErrorBehavior) {}

  handleError(channel: amqplib.Channel, msg: ConsumeMessage, config) {
    console.log(msg);

    const headers = msg.properties.headers;
    const deathHeader = headers['x-death'] || [];
    const deadHeaders = deathHeader.pop() || {};
    const retryCount = headers['x-retry-count'] || 0;
    const expiration = parseInt(deadHeaders['original-expiration'], 2) || 1000;
    console.log(`${JSON.stringify(headers)} :${retryCount}: ${expiration}`);

    channel.ack(msg);

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
          channel.bindQueue(name, 'retry_exchange', name);
          channel.publish('retry_exchange', name, msg.content, {
            headers: {
              'x-retry-count': retryCount + 1,
            },
          });
         });
    }
  }
}

// tslint:disable-next-line: max-classes-per-file
@Injectable()
export class RetryQueue {
  private readonly logger = new Logger(AppController.name);

  constructor(
    @Inject(AmqpConnection) private readonly connection: AmqpConnection,
  ) {}

  @RabbitRPC({
    exchange: 'main_exchange',
    routingKey: 'main_queue',
    queue: 'main_queue',
    handleError: new ExponentialHandleErrorStrategy(),
  })
  public async pubSubHandler5000(msg: {}, raw) {
    console.log('5');
  }
}
