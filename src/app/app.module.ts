import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
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
      { path: "success/:id", component: SuccessPageComponent },
      { path: "track/:id", component: TrackingPageComponent },
      { path: "gha", component: GhaUpdatePageComponent }

    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    BookingFormComponent,
    GhaUpdatePageComponent,
    TrackingPageComponent,
    SuccessPageComponent,

  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
