import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Phone } from 'src/app/models/phone';
import { PhoneService } from 'src/app/services/phone/phone.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-phone-creation-form',
  templateUrl: './phone-creation-form.component.html',
  styleUrls: ['./phone-creation-form.component.css']
})
export class PhoneCreationFormComponent implements OnInit {

  newPhone!: Phone;
  maxYear = (new Date()).getFullYear();

  constructor(
    public dialogRef: MatDialogRef<PhoneCreationFormComponent>,
    @Inject(MAT_DIALOG_DATA) private modalData: any,
    private phoneService: PhoneService,
    private utilService: UtilService
  ) {
  }

  ngOnInit(): void {
    this.resetNewData();
  }

  phoneCreationButtonEnabled() {
    return this.newPhone.brand !== '' && this.newPhone.reference !== '' && this.newPhone.purchase_year > 2000 && Boolean(this.modalData.client.user_id);
  }

  resetNewData() {
    this.newPhone = {
      brand: '',
      reference: '',
      purchase_year: this.maxYear,
      user_id: 0
    };
  }

  closeDialog(save: boolean) {
    if (save && this.modalData?.client?.user_id) {
      this.newPhone.user_id = this.modalData.client.user_id;
      this.phoneService.createPhone(this.modalData.client.user_id, this.newPhone).subscribe((res: any) => {
        this.utilService.openSnackBar(res.message, 'OK');
        this.resetNewData();
      }, (error: any) => {
        this.utilService.openSnackBar(`${error.error}`, 'OK');
      });
    }
    this.dialogRef.close(save);
  }
}
