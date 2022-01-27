import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientdetailsComponent } from './components/clients/clientdetails/clientdetails.component';
import { ClientlistComponent } from './components/clients/clientlist/clientlist.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RepairinglistComponent } from './components/repairings/repairinglist/repairinglist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'clients/:id',
    component: ClientdetailsComponent
  },
  {
    path: 'clients',
    component: ClientlistComponent
  },
  {
    path: 'repairings',
    component: RepairinglistComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
