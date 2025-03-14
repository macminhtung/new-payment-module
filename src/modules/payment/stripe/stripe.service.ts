import Stripe from 'stripe';
import { EPaymentType } from '@/modules/payment/enums';
import {
  IStripeCredential,
  IPaymentService,
} from '@/modules/payment/interfaces';

export class StripeService implements IPaymentService<EPaymentType.STRIPE> {
  constructor(credential: IStripeCredential) {
    const { apiKey, config } = credential;
    this.service = new Stripe(apiKey, config);
  }

  private readonly service: Stripe;

  public readonly customers: IPaymentService<EPaymentType.STRIPE>['customers'] =
    {
      create: (
        customer: Stripe.CustomerCreateParams,
      ): Promise<Stripe.Response<Stripe.Customer>> =>
        this.service.customers.create(customer),

      list: (): Stripe.ApiListPromise<Stripe.Customer> =>
        this.service.customers.list(),

      retrieve: (
        id: string,
      ): Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>> =>
        this.service.customers.retrieve(id),

      update: (
        id: string,
        update: Stripe.CustomerUpdateParams,
      ): Promise<Stripe.Response<Stripe.Customer>> =>
        this.service.customers.update(id, update),

      delete: (id: string): Promise<Stripe.DeletedCustomer> =>
        this.service.customers.del(id),
    };
}
