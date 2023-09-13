import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { Answer, Patient, Questionnaire, QuestionnaireResponse } from 'src/app/questionnaire';
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

  idPatient: string = "";
  idQuestionnaire: string = "";

  patient: Patient = new Patient;
  questionnaire: Questionnaire | null = new Questionnaire;
  response: QuestionnaireResponse | null = new QuestionnaireResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    public webService: WebserviceService
  ){}

  ngOnInit() {
    this.isLoadingPatient = true;
    this.isLoadingPatientResponse = true;

    let id = this.activatedRoute.snapshot.paramMap.get('idPatient');
    
    if(id){
      this.idPatient = id;

      this.idQuestionnaire = "65003ac27a32ea001909459f";

      this.loadPatient(this.idPatient);
      this.loadQuestionnaire();
      this.loadPatientResponse();

      this.getProfil();
    }
  }

  loadPatient(id : string) {
    this.webService.getPatient(id).subscribe((data) => {
      this.patient = data;

      this.isLoadingPatient = false;
    },
    () => {
      this.isError = true;
    });
  }

  loadQuestionnaire(){
    this.webService.getQuestionnaire(this.idQuestionnaire).subscribe((data) => {
      this.questionnaire = data;
    },
    () => {
      this.questionnaire = null;
    });
  }

  loadPatientResponse() {
    this.webService.getPatientResponses().subscribe((data) => {
      let responses: QuestionnaireResponse[] = data.filter(q => q.questionnaire == this.idQuestionnaire
                                                                && q.source
                                                                && q.source.identifier
                                                                && q.source.identifier.value == this.idPatient
                                                );
      this.response = responses[responses.length - 1];
      
      this.isLoadingPatientResponse = false;
    },
    () => {
      this.response = null;
    });
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

  getProfil(){
    this.isLoadingPatient = true;

    this.profil = "/assets/patient-" + Math.floor(Math.random() * (7 - 1) + 1) + ".png";

    this.isLoadingPatient = false;
  }

  isAlerte(question: string, reponse: string){
    return ( (question.includes("fièvre") && reponse == "Oui")
          || (question.includes("saignement") && reponse == "Oui")
          || (question.includes("parler") && reponse == "Oui"))
          ? true : false;
  }

  getReponse(type: string, reponse: Answer): string{
    switch (type) {
      case 'integer':
        return reponse.valueInteger ? reponse.valueInteger?.toString() : "";
      case 'boolean':
        return reponse.valueBoolean ? "Oui" : "Non";
      default:
        return reponse.valueString;
    }
  }
}