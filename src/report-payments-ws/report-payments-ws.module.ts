import { Module } from '@nestjs/common';
import { ReportPaymentsWsService } from './report-payments-ws.service';
import { ReportPaymentsWsGateway } from './report-payments-ws.gateway';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [PaymentsModule],
  providers: [ReportPaymentsWsGateway, ReportPaymentsWsService],
  exports: [ReportPaymentsWsModule,ReportPaymentsWsService],
})
export class ReportPaymentsWsModule { }
