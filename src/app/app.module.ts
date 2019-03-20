import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersentsComponent } from './components/persents/persents.component';
import { PersentsService } from './services/persents.service';
import { HttpClientModule } from '@angular/common/http';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherItemComponent } from './components/teacher-item/teacher-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TarifListComponent } from './components/tarif-list/tarif-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MDBBootstrapModule, WavesModule, TableModule } from 'angular-bootstrap-md';
import { TeacherFunctionsService } from './services/teacherFunctions.service';
import { MidleTarifPriceComponent } from './components/midle-tarif-price/midle-tarif-price.component';
import { ManagerTarifComponent } from './components/manager-tarif/manager-tarif.component';

@NgModule({
  declarations: [
    AppComponent,
    PersentsComponent,
    TeachersComponent,
    TeacherItemComponent,
    TarifListComponent,
    NavbarComponent,
    MidleTarifPriceComponent,
    ManagerTarifComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    WavesModule,
    TableModule
  ],
  providers: [
    PersentsService,
    TeacherFunctionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
