import { Module, forwardRef } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './entities/case.entity';
import { PaymentsModule } from 'src/payments/payments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Case
    ]),
    forwardRef(() => PaymentsModule)
  ],
  controllers: [CasesController],
  providers: [CasesService],
  exports: [
    TypeOrmModule,
    CasesService,
  ]
})
export class CasesModule { }
