import { AmqpConnection } from '../../nestjs-plus/packages/rabbitmq';
export declare class AppController {
    private readonly connection;
    constructor(connection: AmqpConnection);
    test(): Promise<string>;
}
