import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { RabbitMQModule } from '../../nestjs-plus/packages/rabbitmq';
import { RetryQueue } from './retry.queue';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'main_exchange',
          type: 'topic',
          options: {},
        },
        {
          name: 'retry_exchange',
          type: 'topic',
          options: {},
        },
      ],
      uri: 'amqp://localhost:5672',
    }),
    AppModule,
  ],
  controllers: [AppController],
  providers: [RetryQueue],
})
export class AppModule {}
