import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  public saveToStorage(key: string, user_data: any) {
    localStorage.setItem(key, JSON.stringify(user_data))
  }

  public getFromStorage(key: string) {
    const local_data = localStorage.getItem(key)
    if (local_data) {
      const data = JSON.parse(local_data)
      return data
    }
  }

  validateLoggedUser() {
    if (!this.isUserLogged()) window.location.href = '/login';
  }

  destroyFromStorage(key: string) {
    localStorage.removeItem(key)
  }

  isUserLogged() {
    const local_user = localStorage.getItem('user')
    return Boolean(local_user)
  }

  logout() {
    this.destroyFromStorage('user')
    this.destroyFromStorage('token')
    window.location.href = 'login'
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action || 'OK', {
      duration: 2000,
    });
  }
}
