import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { Patient, Practitioner } from 'src/app/questionnaire';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  practitioner: Practitioner = new Practitioner();
  patients: Array<Patient> = [];

  constructor(
    public webService: WebserviceService,
  ){}

  ngOnInit() {
    this.loadPractitioner();
    this.loadPatients();
  }

  loadPractitioner() {
    return this.webService.getPractitioner().subscribe((data) => {
      this.practitioner = data;
      console.log(this.practitioner)
    })
  }

  loadPatients() {
    return this.webService.getPatients().subscribe((data) => {
      this.patients = data;
      console.log(this.patients)
    })
  }

  getGender(){
    return this.practitioner.gender != undefined
    ? (this.practitioner.gender == "male" ? "Homme" : "Femme")
    : "";
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
}
