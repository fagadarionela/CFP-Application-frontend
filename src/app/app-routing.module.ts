import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {IncompleteMedicalCasesComponent} from "./incomplete-medical-cases/incomplete-medical-cases.component";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {CompleteMedicalCasesComponent} from "./complete-medical-cases/complete-medical-cases.component";
import {InsertMedicalCasesComponent} from "./insert-medical-cases/insert-medical-cases.component";
import {ReviewMedicalCasesComponent} from "./review-medical-cases/review-medical-cases.component";

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
      component: IncompleteMedicalCasesComponent
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
      path: 'medical-cases/review',
      component: ReviewMedicalCasesComponent
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
