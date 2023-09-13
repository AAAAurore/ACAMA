import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientComponent } from './pages/patient/patient.component';
import { StatistiquesComponent } from './pages/statistiques/statistiques.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
      path: 'patient',
      children: [
        {
          path: '',
          component: DashboardComponent
        },
        {
          path: ':idPatient',
          component: PatientComponent
        }
    ],
  },
  {
    path: 'statistiques',
    component: StatistiquesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
