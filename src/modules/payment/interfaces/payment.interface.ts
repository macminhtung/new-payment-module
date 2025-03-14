import type { Stripe } from 'stripe';
import { HttpStatus } from '@nestjs/common';
import {
  IPayaCreateContact,
  IPayaUpdateContact,
  IPayaContactResponse,
} from '@/modules/payment/paya/interfaces';
import { EPaymentType } from '@/modules/payment/enums';

type CreateCustomerParamsType<T extends EPaymentType> =
  T extends EPaymentType.STRIPE
    ? Stripe.CustomerCreateParams
    : IPayaCreateContact;

type UpdateCustomerParamsType<T extends EPaymentType> =
  T extends EPaymentType.STRIPE
    ? Stripe.CustomerUpdateParams
    : IPayaUpdateContact;

type CustomerResponseType<T extends EPaymentType> =
  T extends EPaymentType.STRIPE
    ? Stripe.Response<Stripe.Customer>
    : Promise<IPayaContactResponse[]>;

type ListCustomerResponseType<T extends EPaymentType> =
  T extends EPaymentType.STRIPE
    ? Stripe.ApiListPromise<Stripe.Customer>
    : Promise<IPayaContactResponse[]>;

type RetrieveCustomerResponseType<T extends EPaymentType> =
  T extends EPaymentType.STRIPE
    ? Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>
    : IPayaContactResponse;

type CustomerDeletedResponseType<T extends EPaymentType> =
  T extends EPaymentType.STRIPE
    ? Stripe.DeletedCustomer
    : HttpStatus.NO_CONTENT | HttpStatus.NOT_FOUND;

export interface IPaymentService<T extends EPaymentType> {
  customers: {
    create: (
      customer: CreateCustomerParamsType<T>,
    ) => Promise<CustomerResponseType<T>>;
    list(): ListCustomerResponseType<T>;
    retrieve: (id: string) => Promise<RetrieveCustomerResponseType<T>>;
    update: (
      id: string,
      update: UpdateCustomerParamsType<T>,
    ) => Promise<CustomerResponseType<T>>;
    delete: (id: string) => Promise<CustomerDeletedResponseType<T>>;
  };
}
