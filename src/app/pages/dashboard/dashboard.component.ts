import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { Patient, Practitioner } from 'src/app/questionnaire';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isLoadingPatient: boolean = false;
  isLoadingPractitioner: boolean = false;

  practitioner: Practitioner = new Practitioner();
  patients: Array<Patient> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public webService: WebserviceService,
  ){}

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
}