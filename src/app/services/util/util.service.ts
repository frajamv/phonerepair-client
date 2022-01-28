import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  /**
   * Guarda un objeto en memoria. Esta información persiste al cierre de navegador.
   * @param key Llave de acceso al objeto en memoria.
   * @param data Objeto que se guardará en memoria. 
   */
  public saveToStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  /**
   * Obtiene un objeto en memoria que se haya guardado previamente con la llave provista.
   * @param key Llave de objeto que se obtendrá.
   * @returns Objeto en memoria, si existe.
   */
  public getFromStorage(key: string) {
    const local_data = localStorage.getItem(key)
    if (local_data) {
      const data = JSON.parse(local_data)
      return data
    }
  }

  /**
   * Llama la función isUserLogged para verificar que exista el usuario en sesión, si no existe, redirigirá a la pantalla de login.
   */
  validateLoggedUser() {
    if (!this.isUserLogged()) window.location.href = '/login';
  }

  /**
   * Elimina un objeto en memoria que exista con la llave provista.
   * @param key Llave del objeto en memoria a eliminar.
   */
  destroyFromStorage(key: string) {
    localStorage.removeItem(key)
  }

  /**
   * Determina si existe un objeto usuario con llave 'user' en memoria.
   * @returns true si existe un usuario válido en memoria, false de lo contrario.
   */
  isUserLogged() {
    const local_user = localStorage.getItem('user')
    return Boolean(local_user)
  }

  /**
   * Elimina el token y el usuario de la memoria y redirige al usuario a la pantalla de login.
   */
  logout() {
    this.destroyFromStorage('user')
    this.destroyFromStorage('token')
    window.location.href = 'login'
  }

  /**
   * Renderiza un mensaje emergente de tipo Material Snackbar con un mensaje y un botón en contraste.
   * Dura 2 segundos y se puede cerrar al presionar en el botón 'action'.
   * @param message Mensaje que se renderizará en el snackbar.
   * @param action Mensaje del botón de acción que se mostrará a la derecha del snackbar en contraste.
   */
  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action || 'OK', {
      duration: 5000,
    });
  }
}
