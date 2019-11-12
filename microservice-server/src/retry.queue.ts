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

class ExponentialHandleErrorStrategy implements MessageHandlerErrorStrategy {
  constructor(public errorBehavior?: MessageHandlerErrorBehavior) {}

  handleError(channel, msg, config) {
    console.log(msg);
   
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
    routingKey: 'rpc_route',
    queue: 'main_queue',
    handleError: new ExponentialHandleErrorStrategy(),
  })
  public async pubSubHandler5000(msg: {}, raw) {
    console.log('5');
  }
}
