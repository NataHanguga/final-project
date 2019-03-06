import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VariableTableComponent } from './components/variable-table/variable-table.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StartPropertyService } from './services/start-property.service';
import { TablesComponent } from './components/tables/tables.component';

@NgModule({
  declarations: [
    AppComponent,
    VariableTableComponent,
    TablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlimLoadingBarModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [StartPropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
