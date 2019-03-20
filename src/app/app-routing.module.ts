import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersentsComponent } from './components/persents/persents.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherItemComponent } from './components/teacher-item/teacher-item.component';
import { TarifListComponent } from './components/tarif-list/tarif-list.component';
import { MidleTarifPriceComponent } from './components/midle-tarif-price/midle-tarif-price.component';
import { ManagerTarifComponent } from './components/manager-tarif/manager-tarif.component';

const routes: Routes = [
  {path: 'teachers', component: TeachersComponent},
  {path: 'teacher/:id', component: TeacherItemComponent},
  {path: 'tarifList', component: TarifListComponent},
  {path: 'middleTarifPrice', component: MidleTarifPriceComponent},
  {path: 'managerList', component: ManagerTarifComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
