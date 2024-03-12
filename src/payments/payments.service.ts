import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STRIPE_CLIENT } from './../stripe/constants';
import { CreatePaymentDto } from './dto/create-payment.dto';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(STRIPE_CLIENT)
    private stripe: Stripe,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) { }
  async create(createPaymentDto: CreatePaymentDto) {

    const apiHost = process.env.API_HOST ?? 'http://localhost:3000'
    /* CREATE PRODUCT */
    const product = await this.stripe.products.create({
      name: `Dona por ${createPaymentDto.name}`,
      description: createPaymentDto.descripcion,
      // images:
    });

    /* CREATE PRICE */
    const price = await this.stripe.prices.create({
      currency: 'mxn',
      custom_unit_amount: { enabled: true },
      tax_behavior: 'inclusive',
      product: product.id,

    });
    console.log(`URL REDIRECT-> `, `${apiHost}/payments/record_payment/{CHECKOUT_SESSION_ID}?id=${product.id}&campaniaKey=${createPaymentDto.campaniaKey}`)

    /* CREATE PAYMENT LINK */
    const paymentLink = await this.stripe.paymentLinks.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        }
      ],
      metadata: {
        orden: `dona_por_${createPaymentDto.name}`
      },
      billing_address_collection: 'required',
      submit_type: 'donate',
      automatic_tax: { enabled: false },
      phone_number_collection: { enabled: false },
      tax_id_collection: { enabled: false },
      after_completion: {
        type: 'redirect', redirect: {
          // url: `http://localhost:3030/payments/record_payment/{CHECKOUT_SESSION_ID}?id=${product.id}&nombre=${createPaymentDto.name}`
          url: `${apiHost}/payments/record_payment/{CHECKOUT_SESSION_ID}?id=${product.id}&campaniaKey=${createPaymentDto.campaniaKey}`

        }
      },
      custom_fields: [
        {
          key: 'necesitas_recibo_deducible_de_impuestos',
          type: 'dropdown',
          dropdown: {
            options: [
              { label: "Si", value: 'si' },
              { label: "No", value: 'no' },
            ]
          },
          label: {
            type: 'custom',
            custom: 'Necesitas recibo deducible de impuestos?',
          },
          optional: true
        },
        /* RFC */
        {
          key: 'rfc',
          type: 'text',
          text: {
            minimum_length: 13
          },
          label: {
            type: 'custom',
            custom: 'RFC',
          },
          optional: true
        },

        /* Regimen fiscal */
        {
          key: 'regimen_fiscal',
          type: 'dropdown',
          label: {
            type: 'custom',
            custom: 'Régimen fiscal',
          },
          dropdown: {
            options: [
              { value: '601', label: '601	General de Ley Personas Morales' },
              { value: '603', label: '603	Personas Morales con Fines no Lucrativos' },
              { value: '605', label: '605	Sueldos y Salarios e Ingresos Asimilados a Salarios' },
              { value: '606', label: '606	Arrendamiento' },
              { value: '607', label: '607	Régimen de Enajenación o Adquisición de Bienes' },
              { value: '608', label: '608	Demás ingresos' },
              { value: '610', label: '610	Residentes en el Extranjero sin Establecimiento Permanente en México' },
              { value: '611', label: '611	Ingresos por Dividendos (socios y accionistas' },
              { value: '612', label: '612	Personas Físicas con Actividades Empresariales y Profesionales' },
              { value: '614', label: '614	Ingresos por intereses' },
              { value: '615', label: '615	Régimen de los ingresos por obtención de premios' },
              { value: '616', label: '616	Sin obligaciones fiscales' },
              { value: '620', label: '620	Sociedades Cooperativas de Producción que optan por diferir sus ingresos' },
              { value: '621', label: '621	Incorporación Fiscal' },
              { value: '622', label: '622	Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras' },
              { value: '623', label: '623	Opcional para Grupos de Sociedades' },
              { value: '624', label: '624	Coordinados' },
              { value: '625', label: '625	Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas' },
              { value: '626', label: '626	Régimen Simplificado de Confianz' },
            ]
          },
          optional: true
        },
      ]
    });
    return {
      product,
      price,
      paymentLink,
    };
  }

  findAll() {
    return this.stripe.paymentIntents.list({
      limit: 10
    })
  }

  async createPaymentRecord(checkout_session_id: string, productId: string, campaniaKey: string) {
    const paymentIntent = await this.stripe.checkout.sessions.retrieve(checkout_session_id);
    const {
      amount_total,
      payment_intent,
      payment_link,
      payment_status,
    } = paymentIntent;
    console.log(paymentIntent);

    /* find case ID using name */
    const pago = this.paymentRepository.create({
      caso_id: campaniaKey,
      monto: amount_total / 100,
      stripe_payment_intent: payment_intent.toString(),
      stripe_payment_link: payment_link.toString(),
      stripe_payment_status: payment_status,
      stripe_product_id: productId
    });

    await this.paymentRepository.save(pago);
    return pago;
  }

  // update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //   return `This action updates a #${id} payment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} payment`;
  // }
}
