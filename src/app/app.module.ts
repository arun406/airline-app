import { BookingService } from './booking.service';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from './material.module';

import { AppComponent } from "./app.component";
import { TopBarComponent } from "./top-bar/top-bar.component";
import { BookingFormComponent } from './booking-form/booking-form.component';
import { TrackingPageComponent } from './tracking-page/tracking-page.component';
import { GhaUpdatePageComponent } from './gha-update-page/gha-update-page.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TrackComponent } from './track/track.component';
import { AttachmentDialogComponent } from './attachment-dialog/attachment-dialog.component';
import { LoaderComponent } from './loader/loader.component';
import { PnrService } from "./pnr.service";
import { LoaderService } from './loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { FlightComponent } from './flight/flight.component';
import { PassengerComponent } from './passenger/passenger.component';
import { ServicesComponent } from './services/services.component';

library.add(fas);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: "", component: BookingFormComponent },
      { path: "success", component: SuccessPageComponent },
      { path: "track", component: TrackComponent },
      { path: "track/:id", component: TrackingPageComponent },
      { path: "gha/:id", component: GhaUpdatePageComponent }

    ], {useHash: true})
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    BookingFormComponent,
    GhaUpdatePageComponent,
    TrackingPageComponent,
    SuccessPageComponent,
    TrackComponent,
    AttachmentDialogComponent,
    LoaderComponent,
    PetDetailsComponent,
    FlightComponent,
    PassengerComponent,
    ServicesComponent
  ],
  entryComponents: [AttachmentDialogComponent],
  bootstrap: [AppComponent],
  providers: [PnrService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, BookingService, LoaderService]
})
export class AppModule { }

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
