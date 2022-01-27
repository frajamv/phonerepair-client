import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'mocha';
  password = 'root123';

  constructor(
    public userService: UserService,
    public utilService: UtilService
  ) { }

  ngOnInit() {
  }

  login() {
    const credentials = { username: this.username, password: this.password };
    this.userService.verifyCredentials(credentials).subscribe((res: any) => {
      this.utilService.saveToStorage('user', res.user)
      this.utilService.saveToStorage('token', res.token)
      this.utilService.openSnackBar(`${res.message}`, 'OK');
      window.location.href = '/clients';
    }, (error: any) => {
      return this.utilService.openSnackBar(`${error.error.status}`, 'OK');
    })
  }

}
