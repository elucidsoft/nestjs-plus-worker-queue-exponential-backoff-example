import { Module } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ClientsModule } from '@nestjs/microservices';
import { MATH_SERVICE } from './math.constants';

@Module({
  imports: [],
  controllers: [],
})
export class MathModule { }