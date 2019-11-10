import { Inject, Logger } from '@nestjs/common';
import {
  AmqpConnection,
  RabbitRPC,
  MessageHandlerOptions,
  Nack,
} from '@nestjs-plus/rabbitmq';
import { Injectable } from '@nestjs/common';
import { AppController } from './app.controller';

@Injectable()
export class RetryQueue {
  private readonly logger = new Logger(AppController.name);

  constructor(
    @Inject(AmqpConnection) private readonly connection: AmqpConnection,
  ) {}

  @RabbitRPC({
    exchange: 'retry_exchange',
    routingKey: 'retry_queue.5000',
    queue: 'retry_queue.5000',
    queueOptions: {
      deadLetterExchange: 'main_exchange',
      deadLetterRoutingKey: 'rpc_route',
      messageTtl: 5000,
      expires: 10000,
    },
  })
  public async pubSubHandler5000(msg: {}, raw) {
    console.log('5');
    return new Nack(false);
  }

  @RabbitRPC({
    exchange: 'retry_exchange',
    routingKey: 'retry_queue.10000',
    queue: 'retry_queue.10000',
    queueOptions: {
      deadLetterExchange: 'main_exchange',
      deadLetterRoutingKey: 'rpc_route',
      messageTtl: 10000,
      expires: 20000,
    },
  })
  public async pubSubHandler10000(msg: {}, raw) {
    console.log('10');

    return new Nack(false);
  }
}
