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
    this.repairingService.getAllPhoneRepairings().subscribe((res: any) => {
      this.repairings = res;
    }, (error: any) => {
      this.utilService.openSnackBar(`${error.error}`, 'OK');
    })
  }

}
