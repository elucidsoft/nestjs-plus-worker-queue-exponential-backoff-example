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
Object.defineProperty(exports, "__esModule", { value: true });
const rabbitmq_1 = require("@nestjs-plus/rabbitmq");
const common_1 = require("@nestjs/common");
let RetryService = class RetryService {
    async pubSubHandler(msg) {
        console.log(`Received message: ${JSON.stringify(msg)}`);
        return '42';
    }
};
__decorate([
    rabbitmq_1.RabbitRPC({
        exchange: 'retry_exchange',
        routingKey: 'rpc_route',
        queue: 'retry_queue',
        queueOptions: {},
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RetryService.prototype, "pubSubHandler", null);
RetryService = __decorate([
    common_1.Injectable()
], RetryService);
exports.RetryService = RetryService;
//# sourceMappingURL=retry.service.js.map