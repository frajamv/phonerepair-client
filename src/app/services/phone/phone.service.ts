import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  URI = environment.API_URI;
  PHONE_ROUTE = environment.PHONE_ROUTE;
  addPhoneEP = this.URI + this.PHONE_ROUTE;

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  public createPhone(user_id: any, phone: any) {
    const token = this.utilService.getFromStorage('token');
    if (!token) this.utilService.logout();
    return this.http.post(`${this.addPhoneEP}/${user_id}`, phone, {
      params: {
        token: token
      }
    });
  }
}
