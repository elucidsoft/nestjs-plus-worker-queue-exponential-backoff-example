import { Module } from '@nestjs/common';
import { RabbitMQModule } from '../../nestjs-plus/packages/rabbitmq';
import { MessagingService } from './message.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      prefetchCount: 1,
      exchanges: [
        {
          name: 'main_exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
    }),
    AppModule,
  ],
  providers: [MessagingService],
})
export class AppModule {}
