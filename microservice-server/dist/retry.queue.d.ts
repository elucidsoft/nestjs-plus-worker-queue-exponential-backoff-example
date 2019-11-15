import { AmqpConnection } from '../../nestjs-plus/packages/rabbitmq';
export declare class RetryQueue {
    private readonly connection;
    private readonly logger;
    constructor(connection: AmqpConnection);
    pubSubHandler5000(msg: {}, raw: any): Promise<{}>;
}
