import { ReportPaymentsWsModule } from 'src/report-payments-ws/report-payments-ws.module';
import { Module } from '@nestjs/common';
import { PaymentsModule } from './payments/payments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from './stripe/stripe.module';
import { CasesModule } from './cases/cases.module';
import { PicturesModule } from './pictures/pictures.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    PaymentsModule,
    ConfigModule.forRoot(),
    StripeModule.forRoot(
      process.env.STRIPE_KEY,
      {
        apiVersion: '2023-10-16'
      }
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    StripeModule,
    CasesModule,
    ReportPaymentsWsModule,
    PicturesModule,
    ContactModule
  ],
})
export class AppModule { }
