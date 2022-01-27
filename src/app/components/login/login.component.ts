import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public utilService: UtilService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    const credentials = { username: this.username, password: this.password };
    this.userService.verifyCredentials(credentials).subscribe((res: any) => {
      this.utilService.saveToStorage('user', res.user)
      this.utilService.saveToStorage('token', res.token)
      // window.location.href = '/clients';
      this.router.navigate(['/clients']).then((navigated: boolean) => {
        if (navigated) {
          this.utilService.openSnackBar(`${res.message}`, 'OK');
        }
      });
    }, (error: any) => {
      return this.utilService.openSnackBar(`${error.error.status}`, 'OK');
    })
  }

}
