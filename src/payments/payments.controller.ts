import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  // @Post()
  // create(/* @Body() createPaymentDto: CreatePaymentDto */) {
  //   return this.paymentsService.create(/* createPaymentDto */);
  // }

  // @Get()
  // findAll() {
  //   return this.paymentsService.findAll();
  // }


  @Get('record_payment/:checkout_session_id')
  @Redirect('https://www.juntosporlosdemas.org/campanias/')
  findOne(
    @Param('checkout_session_id') id_checkout: string,
    @Query('id') productId: string,
    @Query('campaniaKey') campaniaKey: string,
  ) {
    
    this.paymentsService.createPaymentRecord(id_checkout, productId, campaniaKey)
    return ({ url: `https://www.juntosporlosdemas.org/campanias/${campaniaKey}`, statusCode: 302 })
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentsService.update(+id, updatePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.paymentsService.remove(+id);
  // }
}
