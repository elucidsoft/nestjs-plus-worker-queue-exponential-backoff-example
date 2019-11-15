import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import {
  RabbitMQModule,
  MessageHandlerErrorBehavior,
} from '../../nestjs-plus/packages/rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'main_exchange',
          type: 'topic',

          options: {},
        },
      ],

      uri: 'amqp://localhost:5672',
    }),
    AppModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
