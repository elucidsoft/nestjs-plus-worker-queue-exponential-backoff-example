import { Controller, Get, Inject } from '@nestjs/common';
import * as amqplib from 'amqplib';
import { AmqpConnection } from '../../nestjs-plus/packages/rabbitmq';

@Controller()
export class AppController {
  constructor(
    @Inject(AmqpConnection) private readonly connection: AmqpConnection,
  ) {}

  @Get()
  async test(): Promise<string> {
    // (this.connection.channel.assertQueue()

    // //try {
    return await this.connection.request({
      exchange: 'main_exchange',
      routingKey: 'main_queue',
      payload: 'Test 123',
      timeout: 10000,
    });
    // const t = await this.connection.createRpc(async (msg: string, rawMessage:any) => {
    //   return msg;
    // }, { exchange: '', routingKey: '', queue: '' });
  }
}
