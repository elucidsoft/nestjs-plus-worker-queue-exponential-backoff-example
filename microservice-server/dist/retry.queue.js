"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rabbitmq_1 = require("@nestjs-plus/rabbitmq");
const common_2 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
let RetryQueue = class RetryQueue {
    constructor(connection) {
        this.connection = connection;
        this.logger = new common_1.Logger(app_controller_1.AppController.name);
    }
    async pubSubHandler5000(msg, raw) {
        console.log('5');
        return new rabbitmq_1.Nack(false);
    }
    async pubSubHandler10000(msg, raw) {
        console.log('10');
        return new rabbitmq_1.Nack(false);
    }
};
__decorate([
    rabbitmq_1.RabbitRPC({
        exchange: 'retry_exchange',
        routingKey: 'retry_queue.5000',
        queue: 'retry_queue.5000',
        queueOptions: {
            deadLetterExchange: 'main_exchange',
            deadLetterRoutingKey: 'rpc_route',
            messageTtl: 5000,
            expires: 10000,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RetryQueue.prototype, "pubSubHandler5000", null);
__decorate([
    rabbitmq_1.RabbitRPC({
        exchange: 'retry_exchange',
        routingKey: 'retry_queue.10000',
        queue: 'retry_queue.10000',
        queueOptions: {
            deadLetterExchange: 'main_exchange',
            deadLetterRoutingKey: 'rpc_route',
            messageTtl: 10000,
            expires: 20000,
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RetryQueue.prototype, "pubSubHandler10000", null);
RetryQueue = __decorate([
    common_2.Injectable(),
    __param(0, common_1.Inject(rabbitmq_1.AmqpConnection)),
    __metadata("design:paramtypes", [rabbitmq_1.AmqpConnection])
], RetryQueue);
exports.RetryQueue = RetryQueue;
//# sourceMappingURL=retry.queue.js.map