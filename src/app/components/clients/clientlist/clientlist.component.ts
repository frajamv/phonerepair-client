import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.css']
})
export class ClientlistComponent implements OnInit {
  token = '';
  user: any;
  route = 'client';
  clients = [];
  columns = ['full_name', 'username', 'phones', 'status'];
  newClient!: User;
  passwordComp = '.root123';

  constructor(
    public utilService: UtilService,
    public userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.utilService.validateLoggedUser();
    this.token = this.utilService.getFromStorage('token');
    this.user = this.utilService.getFromStorage('user');

    this.newClient = {
      full_name: '',
      username: '',
      password: '',
      role_id: 2
    }
    this.fetchAllClients();
  }

  fetchAllClients() {
    this.userService.getAllClients().subscribe((res: any) => {
      this.clients = res;
    }, (error: any) => {
      if (error.status === 403) return this.utilService.logout();
      this.utilService.openSnackBar(error.error, 'OK');
    })
  }

  goToClientDetails(client: any) {
    if (client.phones?.length > 0) window.location.href = `/clients/${client.user_id}`;
  }

  openDialog(dialogTemplate: any) {
    const dialogRef = this.dialog.open(dialogTemplate, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newClient.password = this.newClient.username + this.passwordComp;
        this.userService.register(this.newClient).subscribe((res: any) => {
          this.utilService.openSnackBar(res.message, 'OK');
          this.fetchAllClients();
        }, (error: any) => {
          this.utilService.openSnackBar(`${error.error}`, 'OK');
        })
      }
    });
  }

  creationButtonEnabled() {
    return this.newClient.full_name != '' && this.newClient.username != '';
  }
}
