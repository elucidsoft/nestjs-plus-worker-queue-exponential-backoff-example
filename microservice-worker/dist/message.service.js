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
const rabbitmq_1 = require("../../nestjs-plus/packages/rabbitmq");
const common_1 = require("@nestjs/common");
const util = require("util");
const sleep = util.promisify(setTimeout);
class ExponentialHandleErrorStrategy {
    constructor(errorBehavior) {
        this.errorBehavior = errorBehavior;
    }
    handleError(channel, msg, config) {
        const headers = msg.properties.headers;
        const deathHeader = headers['x-death'] || [];
        const deadHeaders = deathHeader.pop() || {};
        const retryCount = headers['x-retry-count'] || 0;
        const expiration = parseInt(deadHeaders['original-expiration'], 2) || 1000;
        const correlationId = msg.properties.correlationId;
        console.log(`${JSON.stringify(headers)} :${retryCount}: ${expiration}`);
        if (retryCount <= 4) {
            const newExpiration = expiration * 1.5;
            const retryExp = Math.pow(retryCount + 1, 2);
            const name = `retry_queue.${retryExp}`;
            const exchange = channel.assertExchange('retry_exchange', 'topic');
            const queue = channel
                .assertQueue(name, {
                deadLetterExchange: 'main_exchange',
                deadLetterRoutingKey: 'main_queue',
                messageTtl: retryExp * 10000,
            })
                .then(value => {
                channel.bindQueue(name, 'retry_exchange', name).then(value => {
                    channel.publish('retry_exchange', name, msg.content, {
                        replyTo: 'amq.rabbitmq.reply-to',
                        correlationId,
                        headers: {
                            'x-retry-count': retryCount + 1,
                        },
                    });
                });
            });
        }
    }
}
let MessagingService = class MessagingService {
    async pubSubHandler(msg, raw) {
        console.log(raw);
        console.log(raw.properties.headers['x-death']);
        console.log(`Received message: ${JSON.stringify(msg)}`);
        const time = (Math.floor(Math.random() * 60) + 1) * 1000;
        console.log(time);
        return time;
    }
};
__decorate([
    rabbitmq_1.RabbitRPC({
        exchange: 'main_exchange',
        routingKey: 'main_queue',
        queue: 'main_queue',
        handleError: new ExponentialHandleErrorStrategy(),
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MessagingService.prototype, "pubSubHandler", null);
MessagingService = __decorate([
    common_1.Injectable()
], MessagingService);
exports.MessagingService = MessagingService;
//# sourceMappingURL=message.service.js.map