import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class PhonerepairingService {
  URI = environment.API_URI;
  PHONE_ROUTE = environment.PHONE_ROUTE;
  repairingEP = this.URI + this.PHONE_ROUTE + '/repairings';

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  public getAllPhoneRepairings() {
    const token = this.utilService.getFromStorage('token');
    if (!token) this.utilService.logout();
    return this.http.get(this.repairingEP, {
      params: {
        token: token
      }
    });
  }

  public createPhoneRepairing(phoneRepairing: any) {
    const token = this.utilService.getFromStorage('token');
    console.log(this.repairingEP);
    if (!token) this.utilService.logout();
    return this.http.post(this.repairingEP, phoneRepairing, {
      params: {
        token: token
      }
    });
  }
}
