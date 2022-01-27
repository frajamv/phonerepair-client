import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URI = environment.API_URI;
  USER_ROUTE = environment.USER_ROUTE;
  loginEP = this.URI + this.USER_ROUTE + '/authenticate';
  registerEP = this.URI + this.USER_ROUTE;
  clientEP = this.URI + this.USER_ROUTE + '/client';

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  public verifyCredentials(credentials: any) {
    return this.http.post(this.loginEP, credentials);
  }

  public register(user: any) {
    return this.http.post(this.URI + this.USER_ROUTE, user);
  }

  public getAllClients() {
    const token = this.utilService.getFromStorage('token');
    if (!token) this.utilService.logout();
    return this.http.get(this.clientEP, {
      params: {
        token: token
      }
    });
  }

  public getClientData(user_id: any) {
    const token = this.utilService.getFromStorage('token');
    if (!token) this.utilService.logout();
    return this.http.get(`${this.clientEP}/${user_id}`, {
      params: {
        token: token
      }
    });
  }
}
