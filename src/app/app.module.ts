import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientComponent } from './pages/patient/patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StatistiquesComponent } from './pages/statistiques/statistiques.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientComponent,
    StatistiquesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    MatIconModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
