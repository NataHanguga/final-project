import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TarifListComponent } from './components/tarif-list/tarif-list.component';
import { MidleTarifPriceComponent } from './components/midle-tarif-price/midle-tarif-price.component';
import { ManagerTarifComponent } from './components/manager-tarif/manager-tarif.component';
import { SummaryDataListComponent } from './components/summary-data-list/summary-data-list.component';
import { RepaireListComponent } from './components/repaire-list/repaire-list.component';
import { SettingComponent } from './components/setting/setting.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { LandingComponent } from './components/landing/landing.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  {path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard]},
  {path: 'tarifList', component: TarifListComponent, canActivate: [AuthGuard]},
  {path: 'middleTarifPrice', component: MidleTarifPriceComponent, canActivate: [AuthGuard]},
  {path: 'managerList', component: ManagerTarifComponent, canActivate: [AuthGuard]},
  {path: 'summaryDataList', component: SummaryDataListComponent, canActivate: [AuthGuard]},
  {path: 'repaireList', component: RepaireListComponent, canActivate: [AuthGuard]},
  {path: 'setting', component: SettingComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'adminPage', component: AdminPageComponent, canActivate: [AuthGuard]},
  {path: '', component: LandingComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: '*', redirectTo: 'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
