"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const rabbitmq_1 = require("../../nestjs-plus/packages/rabbitmq");
const retry_queue_1 = require("./retry.queue");
let AppModule = AppModule_1 = class AppModule {
};
AppModule = AppModule_1 = __decorate([
    common_1.Module({
        imports: [
            rabbitmq_1.RabbitMQModule.forRoot({
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
            AppModule_1,
        ],
        controllers: [app_controller_1.AppController],
        providers: [retry_queue_1.RetryQueue],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map