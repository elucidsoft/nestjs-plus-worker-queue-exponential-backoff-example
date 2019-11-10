import { Nack } from '@nestjs-plus/rabbitmq';
export declare class MessagingService {
    pubSubHandler(msg: {}, raw: any): Promise<Nack>;
}
