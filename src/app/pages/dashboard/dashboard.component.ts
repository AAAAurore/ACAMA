import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { Patient, Practitioner, Questionnaire, QuestionnaireItem} from 'src/app/questionnaire';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isLoadingPatient: boolean = false;
  isLoadingPractitioner: boolean = false;
  template_item: QuestionnaireItem[] = [
        {
            "linkId": "1",
            "text": "Comment allez-vous (sur une échelle de 1 à 10)",
            "type": "integer"
        },
        {
            "linkId": "2",
            "text": "Est-ce que vous avez bu ces derniers jours?",
            "type": "boolean"
        },
        {
            "linkId": "2",
            "text": "Avez vous de la fièvre?",
            "type": "boolean"
        }
    ]

  practitioner: Practitioner = new Practitioner();
  patients: Array<Patient> = [];
  questionnaire: Questionnaire = new Questionnaire();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public webService: WebserviceService,
  ){};

  ngOnInit() {
    this.isLoadingPatient = true;
    this.isLoadingPractitioner = true;

    this.loadPractitioner();
    this.loadPatients();
  }

  loadPractitioner() {
    this.webService.getPractitioner().subscribe((data : Practitioner) => {
      this.practitioner = data;

      this.isLoadingPractitioner = false;
    });
  }

  loadPatients() {
    this.webService.getPatients().subscribe((data : Patient[]) => {
      this.patients = data;

      this.isLoadingPatient = false;
    })
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

  goToStatistiques(){
    this.router.navigate(['statistiques'], { relativeTo: this.activatedRoute });
  }

  getAddress(){
    let address: string = "";

    if(this.practitioner.address != undefined){
      address = (this.practitioner.address.line != undefined
        ? this.practitioner.address.line + "< br />"
        : "");
      address = (this.practitioner.address.city != undefined
        ? this.practitioner.address.city + "< br />"
        : "");
      address = (this.practitioner.address.state != undefined
        ? this.practitioner.address.state + "< br />"
        : "");
      address = (this.practitioner.address.postalCode != undefined
        ? this.practitioner.address.postalCode + "< br />"
        : "");
      address = (this.practitioner.address.country != undefined
        ? this.practitioner.address.country + "< br />"
        : "");
      address = (this.practitioner.telecom.value != undefined
        ? this.practitioner.telecom.value
        : "");
    }

    return address;
  }

  createAndSendQuestionnaire(event: Event, patient: Patient) {
    event.stopPropagation()
    this.fulfillQuestionnaire(patient.id)
    var data = JSON.stringify(this.questionnaire)
    return this.webService.postQuestionnaire(data).subscribe((data) => {
      console.log('successfully Added')
    })
  }

  fulfillQuestionnaire(id: string) {
    this.questionnaire.id = Math.floor(Math.random() * 10000000000000).toString()
    this.questionnaire.publisher = this.practitioner.id
    this.questionnaire.item = this.template_item
    this.questionnaire.title = "Voici le questionnaire eCare"
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(this.questionnaire)
    //this.questionnaire.item  = [{}]
  }
}