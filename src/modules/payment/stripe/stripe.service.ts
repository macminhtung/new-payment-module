import Stripe from 'stripe';
import { EPaymentType } from '@/modules/payment/enums';
import { IStripeCredential, IPaymentService } from '@/modules/payment/interfaces';

export class StripeService implements IPaymentService<EPaymentType.STRIPE> {
  constructor(credential: IStripeCredential) {
    const { apiKey, config } = credential;
    this.service = new Stripe(apiKey, config);
    this.credential = credential;
  }

  credential: IStripeCredential;
  private readonly service: Stripe;

  public readonly customers = {
    create: (customer: Stripe.CustomerCreateParams) => this.service.customers.create(customer),

    list: () => this.service.customers.list(),

    retrieve: (id: string) => this.service.customers.retrieve(id),

    update: (id: string, update: Stripe.CustomerUpdateParams) => this.service.customers.update(id, update),

    delete: (id: string) => this.service.customers.del(id),
  };
}
