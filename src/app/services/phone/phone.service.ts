import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  URI = environment.API_URI; // URI de REST API.
  PHONE_ROUTE = environment.PHONE_ROUTE; // Subruta para peticiones de telefono.
  addPhoneEP = this.URI + this.PHONE_ROUTE; // Endpoint para peticiones de telefono.

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  /**
   * Envía una petición POST al REST API que crea un teléfono a un usuario, adjunta un token de JWT como parámetro para el acceso.
   * @param user_id Id de usuario al que pertenece el teléfono.
   * @param phone Datos del teléfono a agregar.
   * @returns Respuesta del servicio.
   */
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
