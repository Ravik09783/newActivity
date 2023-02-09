import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class GiftCardsService {

  providerId:string= environment.providerId;
  baseUrl:string = environment.baseUrl;
  accessToken: string= this.apiRequestService.accessToken;

  constructor(
    private http: HttpClient,
    private apiRequestService:ApiRequestService
  ) { }

  header = {
    headers:new HttpHeaders().set(
      `Authorization`,
      `Bearer ${this.accessToken}`
    )
  }

getGiftCards(){
  return this.http.get<any>(`${this.baseUrl}v1/wp/providers/${this.providerId}/giftCards`, this.header)
}

}
