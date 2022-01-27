import { Component } from '@angular/core';
import { UtilService } from './services/util/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'phonerepair-client';

  constructor(
    public utilService: UtilService,
    public router: Router
  ) { }

  redirect(route: string) {
    window.location.href = route;
  }

  logout() {
    this.utilService.logout();
  }
}
