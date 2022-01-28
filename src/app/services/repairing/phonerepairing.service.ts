import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class PhonerepairingService {
  URI = environment.API_URI;// URI de REST API.
  PHONE_ROUTE = environment.PHONE_ROUTE;// Subruta para peticiones de telefono.
  repairingEP = this.URI + this.PHONE_ROUTE + '/repairings';// Endpoint para peticiones de reparaciones de teléfono.

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  /**
   * Envía una petición GET al REST API que obtiene todas las reparaciones guardadas en la base de datos.
   * Adjunta un token JWT para acceso.
   * @returns Arreglo con todas las reparaciones registradas en el sistema.
   */
  public getAllPhoneRepairings() {
    const token = this.utilService.getFromStorage('token');
    if (!token) this.utilService.logout();
    return this.http.get(this.repairingEP, {
      params: {
        token: token
      }
    });
  }

  /**
   * Envía una petición POST al REST API que registra una nueva reparación que contiene el id del teléfono que fue reparado.
   * Adjunta un token JWT para acceso.
   * @param phoneRepairing Datos de la reparación, incluye id de teléfono.
   * @returns Respuesta de creación con mensaje y status HTTP.
   */
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
