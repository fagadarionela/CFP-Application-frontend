import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from "./layout/layout.component";
import {IncompleteMedicalCasesComponent} from "./incomplete-medical-cases/incomplete-medical-cases.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {FooterComponent} from "./footer/footer.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {MatNativeDateModule} from "@angular/material/core";
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
import {ReviewMedicalCasesComponent} from "./review-medical-cases/review-medical-cases.component";
import {ImageModalComponent} from "./modals/image-modal/image-modal.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatRadioModule} from "@angular/material/radio";
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import {SliderModalComponent} from "./modals/slider-modal/slider-modal.component";
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    AppComponent,
    IncompleteMedicalCasesComponent,
    CompleteMedicalCasesComponent,
    InsertMedicalCasesComponent,
    ReviewMedicalCasesComponent,
    FooterComponent,
    LayoutComponent,
    NavBarComponent,
    LoginComponent,
    LogoutComponent,
    SuccessModalComponent,
    ErrorModalComponent,
    ImageModalComponent,
    SliderModalComponent
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
    CarouselModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  },],
  bootstrap: [AppComponent]
})

export class AppModule {
}
