import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersentsComponent } from './components/persents/persents.component';
import { PersentsService } from './services/persents.service';
import { HttpClientModule } from '@angular/common/http';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherItemComponent } from './components/teacher-item/teacher-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TarifListComponent } from './components/tarif-list/tarif-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MDBBootstrapModule, WavesModule, TableModule } from 'angular-bootstrap-md';
import { MidleTarifPriceComponent } from './components/midle-tarif-price/midle-tarif-price.component';
import { ManagerTarifComponent } from './components/manager-tarif/manager-tarif.component';
import { RepaireListComponent } from './components/repaire-list/repaire-list.component';
import { SettingComponent } from './components/setting/setting.component';
import { SummaryDataListComponent } from './components/summary-data-list/summary-data-list.component';
import { RefreshPipePipe } from './pipes/refresh-pipe.pipe';
import { PropertyComponent } from './components/property/property.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    PersentsComponent,
    TeachersComponent,
    TeacherItemComponent,
    TarifListComponent,
    NavbarComponent,
    MidleTarifPriceComponent,
    ManagerTarifComponent,
    RepaireListComponent,
    SettingComponent,
    SummaryDataListComponent,
    RefreshPipePipe,
    PropertyComponent,
    LoginComponent,
    RegistrationComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    WavesModule,
    TableModule,
    FormsModule,
    BrowserModule
  ],
  providers: [
    PersentsService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
