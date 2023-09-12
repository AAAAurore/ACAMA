import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Practitioner, Patient, QuestionnaireResponse } from '../questionnaire';

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

  getPatient(id: string): Observable<Patient> {
    return this.http
      .get<Patient>(WebserviceService.server + '/patient/' + id)
      .pipe(retry(1));
  }

  getPatientResponses(): Observable<QuestionnaireResponse[]> {
    return this.http
      .get<QuestionnaireResponse[]>(WebserviceService.server + '/questionnaire-response/')
      .pipe(retry(1))
  }
  
}
