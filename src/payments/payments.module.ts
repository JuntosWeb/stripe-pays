import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { CasesModule } from 'src/cases/cases.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment
    ]),
    CasesModule
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [
    TypeOrmModule,
    PaymentsService
  ]
})
export class PaymentsModule { }
