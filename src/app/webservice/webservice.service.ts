import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Practitioner, Patient, QuestionnaireResponse, Questionnaire } from '../questionnaire';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  static server = 'https://fhir.alliance4u.io/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

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


  postQuestionnaire(data: string): Observable<Questionnaire> {
    return this.http
      .post<Questionnaire>(WebserviceService.server + '/questionnaire', data, this.httpOptions)
      .pipe(retry(1))
  }
  
  getQuestionnaires(): Observable<Questionnaire[]> {
    return this.http
      .get<Questionnaire[]>(WebserviceService.server + '/questionnaire')
      .pipe(retry(1))
  }
}
