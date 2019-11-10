import { RabbitSubscribe, Nack, RabbitRPC } from '@nestjs-plus/rabbitmq';
import { Injectable } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class MessagingService {
  @RabbitRPC({
    exchange: 'main_exchange',
    routingKey: 'rpc_route',
    queue: 'main_queue',
    queueOptions: {
      deadLetterExchange: 'retry_exchange',
    },
  })
  public async pubSubHandler(msg: {},raw) {
    console.log(raw);
    console.log(raw.properties.headers['x-death']);
    console.log(`Received message: ${JSON.stringify(msg)}`);
    
    return new Nack(false);
  }
}
