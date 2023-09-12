import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { Patient, QuestionnaireResponse } from 'src/app/questionnaire';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {

  patient: Patient = new Patient;
  response: QuestionnaireResponse = new QuestionnaireResponse;

  constructor(
    public webService: WebserviceService,
  ){}

  ngOnInit() {
    //TODO change cause its only for test purpose
    this.loadPatient('64ff2226d00b5a0019c07fa3');
    this.loadPatientResponse('65003ac27a32ea001909459f', '65001f377a32ea0019094590');
  }

  loadPatient(id : string) {
    return this.webService.getPatient(id).subscribe((data) => {
      this.patient = data
      console.log(this.patient)
    })
  }

  loadPatientResponse(idQuestionnaire : string, idPatient : string) {
    return this.webService.getPatientResponses().subscribe((data) => {
      this.response = data.filter(q => 
        q.questionnaire === idQuestionnaire &&
        q.source === idPatient) [0]
      console.log(this.response)
    })
  }
}
