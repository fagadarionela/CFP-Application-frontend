import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from "./layout/layout.component";
import {MedicalCasesComponent} from "./medical-cases/medical-cases.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthenticationInterceptor} from "./shared/interceptors/authentication.interceptor";
import {MatCardModule} from "@angular/material/card";
import {SuccessModalComponent} from "./modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "./modals/error-modal/error-modal.component";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {CompleteMedicalCasesComponent} from "./complete-medical-cases/complete-medical-cases.component";
import {InsertMedicalCasesComponent} from "./insert-medical-cases/insert-medical-cases.component";
import {ImageModalComponent} from "./modals/image-modal/image-modal.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatRadioModule} from "@angular/material/radio";
import {MdbCarouselModule} from 'mdb-angular-ui-kit/carousel';
import {SliderModalComponent} from "./modals/slider-modal/slider-modal.component";
import {CarouselModule} from 'ngx-owl-carousel-o';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {EvaluationFileComponent} from './evaluation-file/evaluation-file.component';
import {EvaluationFileModalComponent} from './modals/evaluation-file-modal/evaluation-file-modal.component';
import {AccountsComponent} from './accounts/accounts.component';
import {DiseasesComponent} from './diseases/diseases.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {AddAccountModalComponent} from './modals/add-account-modal/add-account-modal.component';
import {AddDiseaseModalComponent} from './modals/add-disease-modal/add-disease-modal.component';
import {ChipsComponent} from './modals/add-disease-modal/chips/chips.component';
import {ImageDrawingModule} from 'ngx-image-drawing';
import {NgChartsModule} from 'ng2-charts';
import {MedicalCasesChartComponent} from './medical-cases-chart/medical-cases-chart.component';
import {TimerComponent} from './timer/timer.component';
import {MyDateAdapter} from "./shared/my-date-adapter";

let MY_DATE_FORMATS = {
  parse: {
    dateInput: {month: 'numeric', year: 'numeric', day: 'numeric'}
  },
  display: {
    // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'numeric'},
    dateA11yLabel: {year: 'numeric', month: 'numeric', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'numeric'},
  }
};

@NgModule({
  declarations: [
    AppComponent,
    MedicalCasesComponent,
    CompleteMedicalCasesComponent,
    InsertMedicalCasesComponent,
    LayoutComponent,
    NavBarComponent,
    LoginComponent,
    LogoutComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    ImageModalComponent,
    SliderModalComponent,
    EvaluationFileComponent,
    EvaluationFileModalComponent,
    AccountsComponent,
    DiseasesComponent,
    AddAccountModalComponent,
    AddDiseaseModalComponent,
    ChipsComponent,
    MedicalCasesChartComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatRadioModule,
    MdbCarouselModule,
    CarouselModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    ImageDrawingModule,
    NgChartsModule//.forRoot({generateColors:false})
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  },
    {provide: DateAdapter, useClass: MyDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ImageModalComponent]
})

export class AppModule {
}
