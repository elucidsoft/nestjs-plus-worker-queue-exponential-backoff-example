import { AmqpConnection, Nack } from '@nestjs-plus/rabbitmq';
export declare class RetryQueue {
    private readonly connection;
    private readonly logger;
    constructor(connection: AmqpConnection);
    pubSubHandler5000(msg: {}, raw: any): Promise<Nack>;
    pubSubHandler10000(msg: {}, raw: any): Promise<Nack>;
}
