import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PaymentServiceFactory } from '@/modules/payment/payment.service.factory';
import { EPaymentType } from './modules/payment/enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  const stripeService = PaymentServiceFactory.create('vendorA', EPaymentType.STRIPE);
  console.log('stripeServiceCredential =', stripeService.credential);
  const payaService = PaymentServiceFactory.create('vendorA', EPaymentType.PAYA);
  console.log('payaServiceCredential =', payaService.credential);
}

bootstrap();
