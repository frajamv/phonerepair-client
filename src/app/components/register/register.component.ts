import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  full_name = '';
  username = '';
  password = ''; // Prueba con usuario existente, puede ser limpiado.
  role_id = 1; // Sólo los administradores se registran por sí mismos.
  newClient: User = {
    full_name: '',
    username: '',
    password: '',
    role_id: 2
  }

  constructor(
    public userService: UserService,
    public utilService: UtilService
  ) { }

  ngOnInit() {
  }

  /**
   * Crea un objeto con los datos personales del usuario en la UI y llama al servicio que lo registra.
   * Si este proceso es exitoso se redirige al login para que inicie sesión.
   */
  register() {
    const user = {
      full_name: this.full_name,
      username: this.username,
      password: this.password,
      role_id: this.role_id,
    }
    this.userService.register(user).subscribe((res: any) => {
      this.utilService.openSnackBar(`${res.message}`, 'OK');
      window.location.href = '/login';
    }, (error: any) => {
      console.log(error)
      return this.utilService.openSnackBar(`${error.error}`, 'OK');
    })
  }

}
