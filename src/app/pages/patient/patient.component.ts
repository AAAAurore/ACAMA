import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { Patient, Questionnaire, QuestionnaireResponse } from 'src/app/questionnaire';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {

  patient: Patient = new Patient;
  response: QuestionnaireResponse = new QuestionnaireResponse;
  questionnaire: Questionnaire = new Questionnaire();

  constructor(
    public webService: WebserviceService,
  ){}

  ngOnInit() {
    //TODO change cause its only for test purpose
    this.loadPatient('64ff2226d00b5a0019c07fa3');
    this.loadPatientResponse('65003ac27a32ea001909459f', '65001f377a32ea0019094590');
    this.fullfilQuestionnaire();
    this.createQuestionnaire(JSON.stringify(this.questionnaire));
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

  createQuestionnaire(data : string) {
    console.log(data)
    return this.webService.postQuestionnaire(data).subscribe((data) => {
      console.log('successfully Added')
    })
  }

  fullfilQuestionnaire() {
    this.questionnaire.id = '2';
    this.questionnaire.publisher = "Dr Boucher"
    this.questionnaire.purpose = "Take care of my sweet patient"
    this.questionnaire.contact =  [{"name":"Mister Cotelette"}]
    //this.questionnaire.item  = [{}]
  }
}
