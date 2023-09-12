import { Component } from '@angular/core';
import { WebserviceService } from './webservice/webservice.service';
import { Patient, Practitioner } from './questionnaire';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ACAMA';
  practitioner: Practitioner = new Practitioner();
  patients: Array<Patient> = [];

  constructor(
    public webService: WebserviceService
  ) {}

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
