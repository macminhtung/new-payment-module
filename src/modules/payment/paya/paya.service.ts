import { HttpService } from '@nestjs/axios';
import { EPaymentType } from '@/modules/payment/enums';
import { IPaymentService, IPayaCredential } from '@/modules/payment/interfaces';
import { HttpStatus } from '@nestjs/common';
import { IPayaCreateContact, IPayaContactResponse, IPayaUpdateContact } from './interfaces';

export class PayaService implements IPaymentService<EPaymentType.PAYA> {
  constructor(credential: IPayaCredential) {
    this.credential = credential;
  }

  credential: IPayaCredential;
  private httpService: HttpService;

  public customers = {
    create: async (customer: IPayaCreateContact): Promise<IPayaContactResponse> => {
      const res = await this.httpService.axiosRef.post<IPayaContactResponse>(
        `${this.credential.baseUrl}/contacts`,
        customer,
      );
      return res.data;
    },

    list: async (): Promise<IPayaContactResponse[]> => {
      const res = await this.httpService.axiosRef.get<IPayaContactResponse[]>(`${this.credential.baseUrl}/contacts`);
      return res.data;
    },

    retrieve: async (id: string): Promise<IPayaContactResponse> => {
      const response = await this.httpService.axiosRef.get<IPayaContactResponse>(
        `${this.credential.baseUrl}/contacts/${id}`,
      );
      return response.data;
    },

    update: async (id: string, update: IPayaUpdateContact): Promise<IPayaContactResponse> => {
      const response = await this.httpService.axiosRef.put<IPayaContactResponse>(
        `${this.credential.baseUrl}/contacts/${id}`,
        update,
      );
      return response.data;
    },

    delete: (id: string): Promise<HttpStatus.NO_CONTENT | HttpStatus.NOT_FOUND> => {
      return this.httpService.axiosRef.delete(`${this.credential.baseUrl}/contacts/${id}`);
    },
  };
}
