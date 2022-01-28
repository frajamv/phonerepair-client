import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';
import { PhoneCreationFormComponent } from '../../phones/phone-creation-form/phone-creation-form.component';

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
  dialogRef!: any;

  constructor(
    private utilService: UtilService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.utilService.validateLoggedUser();
    this.token = this.utilService.getFromStorage('token');
    this.user = this.utilService.getFromStorage('user');
    this.fetchAllClients();
    this.resetNewData();
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
    this.dialogRef = this.dialog.open(dialogTemplate, {
    });
    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.registerClient();
      }
      this.resetNewData();
    });
  }

  closeDialog() {
    this.dialogRef.close();
    this.registerClient();

  }

  registerClient() {
    console.table(this.newClient)
    this.newClient.password = `${this.newClient.username}.${this.passwordComp}`
    this.userService.register(this.newClient).subscribe((res: any) => {
      this.utilService.openSnackBar(res.message, 'OK');
      this.fetchAllClients();
      this.resetNewData();
    }, (error: any) => {
      this.resetNewData();
      this.utilService.openSnackBar(`${error.error}`, 'OK');
    })
  }

  creationButtonEnabled() {
    return this.newClient.full_name != '' && this.newClient.username != '';
  }

  openPhoneDialog(client: User) {
    if (client.user_id) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { client };
      dialogConfig.id = 'phone-dialog-component';
      const modalDialog = this.dialog.open(PhoneCreationFormComponent, dialogConfig);
      modalDialog.afterClosed().subscribe(result => {
        if (result) this.fetchAllClients();
      })
    }
  }

  resetNewData() {
    this.newClient = {
      full_name: '',
      username: '',
      password: '',
      role_id: 2
    }
  }
}
