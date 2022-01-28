import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UtilService } from '../util/util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URI = environment.API_URI;// URI de REST API.
  USER_ROUTE = environment.USER_ROUTE;// Subruta para peticiones de usuario.
  loginEP = this.URI + this.USER_ROUTE + '/authenticate';// Endpoint para peticiones de autenticación.
  registerEP = this.URI + this.USER_ROUTE // Endpoint para peticiones de registro.;
  clientEP = this.URI + this.USER_ROUTE + '/client'; // Endpoint para peticiones de usuario de tipo cliente.

  constructor(
    private http: HttpClient,
    private utilService: UtilService
  ) { }

  /**
   * Envía una petición POST al REST API que verifica las credenciales de un usuario administrador
   * y genera un token en caso de login exitoso para futuras peticiones.
   * @param credentials Nombre de usuario y contraseña del usuario que está intentando iniciar sesión.
   * @returns Respuesta de cliente con mensaje, token y status HTTP al iniciar sesión, error al fallar autenticación.
   */
  public verifyCredentials(credentials: any) {
    return this.http.post(this.loginEP, credentials);
  }

  /**
   * Envía una petición POST al REST API que crea un usuario de tipo administrador con nombre de usuario y contraseña encriptada.
   * @param user Datos del usuario a registrar.
   * @returns Mensaje de resultado de operación y status HTTP. Error al enviar un input inválido o usuario repetido.
   */
  public register(user: any) {
    return this.http.post(this.URI + this.USER_ROUTE, user);
  }

  /**
   * Envía una petición POST al REST API que obtiene todos los clientes de la base de datos. Adjunta un token JWT para acceso.
   * @returns Todos los usuarios de tipo cliente registrados en el sistema.
   */
  public getAllClients() {
    const token = this.utilService.getFromStorage('token');
    if (!token) this.utilService.logout();
    return this.http.get(this.clientEP, {
      params: {
        token: token
      }
    });
  }

  /**
   * Obtiene todos los datos, teléfonos y reparaciones realizadas al usuario con el id provisto.
   * @param user_id Id de usuario del cual se busca obtener los datos.
   * @returns Objeto usuario con teléfonos (y estos con reparaciones) en caso de ser encontrado.
   */
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
