import { Controller, Get, Inject } from '@nestjs/common';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';

@Controller()
export class AppController {
  constructor(
    @Inject(AmqpConnection) private readonly connection: AmqpConnection,
  ) {}

  @Get()
  async test(): Promise<string> {
    // try {
    return await this.connection.request(
      {
        exchange: 'main_exchange',
        routingKey: 'rpc_route',
        payload: 'Test 123',
        timeout: 30000,
      },
      {
        headers: {
          'x-retry-count': 2,
        },
      },
    );
    // } catch {
    //   try {
    //     return await this.connection.request({
    //       exchange: 'retry_exchange',
    //       routingKey: 'retry_queue.5000',
    //       payload: 'Test 123 Retry 5',
    //       timeout: 30000,
    //     });
    //   } catch {
    //     return await this.connection.request({
    //       exchange: 'retry_exchange',
    //       routingKey: 'retry_queue.10000',
    //       payload: 'Test 123 Retry 10',
    //       timeout: 30000,
    //     });
    //   }
    //}
  }
}
