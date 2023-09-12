import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Practitioner, Patient } from '../questionnaire';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  static server = 'https://fhir.alliance4u.io/api';

  constructor(private http: HttpClient) {

  }

  getPractitioner(): Observable<Practitioner> {
    return this.http
      .get<Practitioner>(WebserviceService.server + '/practitioner/111')
      .pipe(retry(1));
  }

  getPatients(): Observable<Patient[]> {
    return this.http
      .get<Patient[]>(WebserviceService.server + '/patient')
      .pipe(retry(1));
  }

  
}
