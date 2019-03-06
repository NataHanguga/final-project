import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VariableTableComponent } from './components/variable-table/variable-table.component';
import { TableService } from './services/table.service';
import { TablesComponent } from './components/tables/tables.component';

const routes: Routes = [
  {path: 'variable', component: VariableTableComponent },
  {path: 'table', component: TablesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
