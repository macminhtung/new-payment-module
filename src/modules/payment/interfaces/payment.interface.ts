import type { Stripe } from 'stripe';
import { HttpStatus } from '@nestjs/common';
import { IPayaCreateContact, IPayaUpdateContact, IPayaContactResponse } from '@/modules/payment/paya/interfaces';
import { IStripeCredential, IPayaCredential } from '@/modules/payment/interfaces';
import { EPaymentType } from '@/modules/payment/enums';

type CreateCustomerParamsTypeMap = {
  [EPaymentType.STRIPE]: Stripe.CustomerCreateParams;
  [EPaymentType.PAYA]: IPayaCreateContact;
};

type UpdateCustomerParamsTypeMap = {
  [EPaymentType.STRIPE]: Stripe.CustomerUpdateParams;
  [EPaymentType.PAYA]: IPayaUpdateContact;
};

type CustomerResponseTypeMap = {
  [EPaymentType.STRIPE]: Stripe.Response<Stripe.Customer>;
  [EPaymentType.PAYA]: IPayaContactResponse;
};

type ListCustomerResponseTypeMap = {
  [EPaymentType.STRIPE]: Stripe.ApiListPromise<Stripe.Customer>;
  [EPaymentType.PAYA]: Promise<IPayaContactResponse[]>;
};

type RetrieveCustomerResponseTypeMap = {
  [EPaymentType.STRIPE]: Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>;
  [EPaymentType.PAYA]: IPayaContactResponse;
};

type CustomerDeletedResponseTypeMap = {
  [EPaymentType.STRIPE]: Stripe.DeletedCustomer;
  [EPaymentType.PAYA]: HttpStatus.NO_CONTENT | HttpStatus.NOT_FOUND;
};

type CreateCustomerParamsType<T extends EPaymentType> = CreateCustomerParamsTypeMap[T];
type UpdateCustomerParamsType<T extends EPaymentType> = UpdateCustomerParamsTypeMap[T];
type CustomerResponseType<T extends EPaymentType> = CustomerResponseTypeMap[T];
type ListCustomerResponseType<T extends EPaymentType> = ListCustomerResponseTypeMap[T];
type RetrieveCustomerResponseType<T extends EPaymentType> = RetrieveCustomerResponseTypeMap[T];
type CustomerDeletedResponseType<T extends EPaymentType> = CustomerDeletedResponseTypeMap[T];

type PaymentCredentialTypeMap = {
  [EPaymentType.STRIPE]: IStripeCredential;
  [EPaymentType.PAYA]: IPayaCredential;
};
export type PaymentConfigsType<T extends EPaymentType> = PaymentCredentialTypeMap[T];

export interface IPaymentService<T extends EPaymentType> {
  customers: {
    create: (customer: CreateCustomerParamsType<T>) => Promise<CustomerResponseType<T>>;
    list(): ListCustomerResponseType<T>;
    retrieve: (id: string) => Promise<RetrieveCustomerResponseType<T>>;
    update: (id: string, update: UpdateCustomerParamsType<T>) => Promise<CustomerResponseType<T>>;
    delete: (id: string) => Promise<CustomerDeletedResponseType<T>>;
  };
}
