import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersentsComponent } from './components/persents/persents.component';
import { PersentsService } from './services/persents.service';
import { HttpClientModule } from '@angular/common/http';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TarifListComponent } from './components/tarif-list/tarif-list.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
import { MDBBootstrapModule, ChartsModule, WavesModule, TableModule } from 'angular-bootstrap-md';
import { MidleTarifPriceComponent } from './components/midle-tarif-price/midle-tarif-price.component';
import { ManagerTarifComponent } from './components/manager-tarif/manager-tarif.component';
import { RepaireListComponent } from './components/repaire-list/repaire-list.component';
import { SettingComponent } from './components/setting/setting.component';
import { SummaryDataListComponent } from './components/summary-data-list/summary-data-list.component';
import { PropertyComponent } from './components/property/property.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { CookieService } from 'ngx-cookie-service';
import { LandingComponent } from './components/landing/landing.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { HomeComponent } from './components/home/home.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    PersentsComponent,
    TeachersComponent,
    TarifListComponent,
    // NavbarComponent,
    MidleTarifPriceComponent,
    ManagerTarifComponent,
    RepaireListComponent,
    SettingComponent,
    SummaryDataListComponent,
    PropertyComponent,
    LoginComponent,
    RegistrationComponent,
    AdminPageComponent,
    LandingComponent,
    ErrorPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    WavesModule,
    ChartsModule,
    TableModule,
    FormsModule,
    BrowserModule,
    AgmCoreModule
  ],
  providers: [
    PersentsService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
