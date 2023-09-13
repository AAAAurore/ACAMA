import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { Patient, Questionnaire, QuestionnaireResponse } from 'src/app/questionnaire';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {

  isLoadingPatient: boolean = false;
  isLoadingPatientResponse: boolean = false;
  isError: boolean = false;

  profil: string = "";

  patient: Patient = new Patient;
  response: QuestionnaireResponse = new QuestionnaireResponse;
  questionnaire: Questionnaire = new Questionnaire();

  constructor(
    private activatedRoute: ActivatedRoute,
    public webService: WebserviceService
  ){}

  ngOnInit() {
    this.isLoadingPatient = true;
    this.isLoadingPatientResponse = true;

    this.profil = "/assets/patient-" + Math.floor(Math.random() * (7 - 1) + 1) + ".png";

    let idPatient = this.activatedRoute.snapshot.paramMap.get('idPatient');
    if(idPatient){
      this.loadPatient(idPatient);
      this.loadPatientResponse('65003ac27a32ea001909459f', '65001f377a32ea0019094590');
      this.fulfillQuestionnaire();
      this.createQuestionnaire(JSON.stringify(this.questionnaire));
    }
  }

  loadPatient(id : string) {
    this.webService.getPatient(id).subscribe((data) => {
      this.patient = data

      this.isLoadingPatient = false;
    },
    () => {
      this.isError = true;
    })
  }

  loadPatientResponse(idQuestionnaire : string, idPatient : string) {
    return this.webService.getPatientResponses().subscribe((data) => {
      this.response = data.filter(q => 
        q.questionnaire === idQuestionnaire &&
        q.source === idPatient) [0]
      
      this.isLoadingPatientResponse = false;
    })
  }

  createQuestionnaire(data : string) {
    console.log(data)
    return this.webService.postQuestionnaire(data).subscribe((data) => {
      console.log('successfully Added')
    })
  }

  fulfillQuestionnaire() {
    this.questionnaire.id = '2';
    this.questionnaire.publisher = "Dr Boucher"
    this.questionnaire.purpose = "Take care of my sweet patient"
    this.questionnaire.contact =  [{"name":"Mister Cotelette"}]
    //this.questionnaire.item  = [{}]
  }

  calculAge(birthDate : string) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
  
    return age;
  }
}