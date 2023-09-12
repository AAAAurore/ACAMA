import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { Patient } from 'src/app/questionnaire';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {

  patient: Patient = new Patient;

  constructor(
    public webService: WebserviceService,
  ){}

  ngOnInit() {
    //TODO change cause its only for test purpose
    this.loadPatient('64ff2226d00b5a0019c07fa3');
  }

  loadPatient(id : string) {
    return this.webService.getPatient(id).subscribe((data) => {
      this.patient = data
      console.log(this.patient)
    })
  }
}
