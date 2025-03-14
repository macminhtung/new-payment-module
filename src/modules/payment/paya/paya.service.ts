import { HttpService } from '@nestjs/axios';
import { IPayaCredential } from '@/modules/payment/interfaces/credential.interface';

export class PayaService {
  constructor(credential: IPayaCredential) {
    this.credential = credential;
    this.httpService = new HttpService();
  }

  private credential: IPayaCredential;
  private httpService: HttpService;
}
