import { Component, OnInit } from '@angular/core';
import { PhoneRepairing } from 'src/app/models/phone-repairing';
import { PhonerepairingService } from 'src/app/services/repairing/phonerepairing.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-repairinglist',
  templateUrl: './repairinglist.component.html',
  styleUrls: ['./repairinglist.component.css']
})
export class RepairinglistComponent implements OnInit {

  repairings: PhoneRepairing[] = [];
  fetchingData = false;

  constructor(
    private repairingService: PhonerepairingService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.fetchAllRepairings();
  }

  /**
   * Llama al servicio que obtiene todas las reparaciones guardadas en el sistema y las guarda en 'repairings'.
   */
  fetchAllRepairings() {
    this.fetchingData = true;
    this.repairingService.getAllPhoneRepairings().subscribe((res: any) => {
      this.repairings = res;
      this.fetchingData = false;
    }, (error: any) => {
      if (error.status === 403) return this.utilService.logout();
      this.utilService.openSnackBar(`${error.error}`, 'OK');
      this.fetchingData = false;
    })
  }

}
