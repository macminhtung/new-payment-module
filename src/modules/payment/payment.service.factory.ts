import { EPaymentType } from '@/modules/payment/enums';
import { PaymentConfigsType } from '@/modules/payment/interfaces';
import { StripeService } from '@/modules/payment/stripe/stripe.service';
import { PayaService } from '@/modules/payment/paya/paya.service';

// Should be load in DB based on vendorId and paymentType
const initCredentials: { [T in EPaymentType]: PaymentConfigsType<T> } = {
  [EPaymentType.STRIPE]: { apiKey: 'apiKey' },
  [EPaymentType.PAYA]: {
    userId: 'userId',
    userApiKey: 'userApiKey',
    developerId: 'developerId',
    locationId: 'locationId',
    baseUrl: 'baseUrl',
  },
};

export class PaymentServiceFactory {
  constructor(vendorId: string, paymentType: EPaymentType) {
    this.vendorId = vendorId;
    this.paymentType = paymentType;
  }

  private vendorId: string;
  private paymentType: EPaymentType;

  private getPaymentService() {
    switch (this.paymentType) {
      case EPaymentType.STRIPE: {
        return new StripeService(initCredentials[this.paymentType]);
      }

      case EPaymentType.PAYA: {
        return new PayaService(initCredentials[this.paymentType]);
      }
    }
  }

  static create(vendorId: string, paymentType: EPaymentType.STRIPE): StripeService;
  static create(vendorId: string, paymentType: EPaymentType.PAYA): PayaService;
  static create(vendorId: string, paymentType: EPaymentType) {
    return new PaymentServiceFactory(vendorId, paymentType).getPaymentService();
  }
}
