import { Module } from '@nestjs/common';
import { MathModule } from './math/math.module';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { MessagingService } from './message.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'main_exchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
    }),
    MathModule,
  ],
  providers: [MessagingService],
})
export class AppModule {}
