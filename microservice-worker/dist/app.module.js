"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const math_module_1 = require("./math/math.module");
const rabbitmq_1 = require("@nestjs-plus/rabbitmq");
const message_service_1 = require("./message.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            rabbitmq_1.RabbitMQModule.forRoot({
                exchanges: [
                    {
                        name: 'main_exchange',
                        type: 'topic',
                    },
                ],
                uri: 'amqp://localhost:5672',
            }),
            math_module_1.MathModule,
        ],
        providers: [message_service_1.MessagingService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map