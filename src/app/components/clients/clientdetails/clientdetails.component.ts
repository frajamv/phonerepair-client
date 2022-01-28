import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Phone } from 'src/app/models/phone';
import { PhoneRepairing } from 'src/app/models/phone-repairing';
import { PhoneService } from 'src/app/services/phone/phone.service';
import { PhonerepairingService } from 'src/app/services/repairing/phonerepairing.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilService } from 'src/app/services/util/util.service';
import { PhoneCreationFormComponent } from '../../phones/phone-creation-form/phone-creation-form.component';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.css']
})
export class ClientdetailsComponent implements OnInit {

  user_id: any;
  client: any;
  columns = ['phone_entrance_status', 'phone_exit_status', 'repairing_cost', 'created_at'];
  newPhone!: Phone;
  newPhoneRepairing!: PhoneRepairing;
  maxYear = (new Date()).getFullYear();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private phoneService: PhoneService,
    private repairingService: PhonerepairingService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.user_id = this.route.snapshot.paramMap.get('id')
    this.fetchClientData();
    this.resetNewData();
  }

  fetchClientData() {
    this.userService.getClientData(this.user_id).subscribe((res: any) => {
      this.client = res;
    }, (error: any) => {
      this.utilService.openSnackBar(error.error, 'OK');
    });
  }

  openPhoneDialog() {
    if (this.client.user_id) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { client: this.client };
      dialogConfig.id = 'phone-dialog-component';
      const modalDialog = this.dialog.open(PhoneCreationFormComponent, dialogConfig);
      modalDialog.afterClosed().subscribe(result => {
        if (result) this.fetchClientData();
      })
    }
  }

  openPhoneRepairingDialog(phone: Phone, dialogTemplate: any) {
    if (phone.phone_id) {
      this.newPhoneRepairing.phone_id = phone.phone_id;
      const dialogRef = this.dialog.open(dialogTemplate, {
        data: { phoneName: phone.brand + ' ' + phone.reference }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.repairingService.createPhoneRepairing(this.newPhoneRepairing).subscribe((res: any) => {
            this.utilService.openSnackBar(res.message, 'OK');
            this.fetchClientData();
            this.resetNewData();
          }, (error: any) => {
            this.utilService.openSnackBar(`${error.error}`, 'OK');
          })
        }
      });
    }
  }

  phoneCreationButtonEnabled() {
    return this.newPhone.brand !== '' && this.newPhone.reference !== '' && this.newPhone.purchase_year > 2000 && this.newPhone.user_id != 0
  }

  phoneRepairingCreationButtonEnabled() {
    return this.newPhoneRepairing.phone_entrance_status !== '' && this.newPhoneRepairing.phone_exit_status !== '' && this.newPhoneRepairing.repairing_cost > 0 && this.newPhoneRepairing.phone_id;
  }

  resetNewData() {
    this.newPhone = {
      brand: '',
      reference: '',
      purchase_year: this.maxYear,
      user_id: this.user_id
    };
    this.newPhoneRepairing = {
      phone_entrance_status: '',
      phone_exit_status: '',
      repairing_cost: 0,
      phone_id: 0
    };
  }
}