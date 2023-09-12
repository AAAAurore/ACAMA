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
}
