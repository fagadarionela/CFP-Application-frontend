import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {MedicalCasesComponent} from "./medical-cases/medical-cases.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {CompleteMedicalCasesComponent} from "./complete-medical-cases/complete-medical-cases.component";
import {InsertMedicalCasesComponent} from "./insert-medical-cases/insert-medical-cases.component";
import {DiseasesComponent} from "./diseases/diseases.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {MedicalCasesChartComponent} from "./medical-cases-chart/medical-cases-chart.component";

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: 'medical-cases/incomplete',
      component: MedicalCasesComponent
    },
    {
      path: 'medical-cases/insert',
      component: InsertMedicalCasesComponent
    },
    {
      path: 'medical-cases/completed',
      component: CompleteMedicalCasesComponent
    },
    {
      path: 'diseases',
      component: DiseasesComponent
    },
    {
      path: 'users',
      component: AccountsComponent
    },
    {
      path: 'medical-cases/charts',
      component: MedicalCasesChartComponent
    }]
},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
