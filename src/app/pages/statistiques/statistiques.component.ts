import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { QuestionnaireResponse } from 'src/app/questionnaire';


@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent {
  responses: Array<QuestionnaireResponse> = [];

  constructor(
    public webService: WebserviceService,
  ) {}

  ngOnInit() {
    this.loadPatientResponses()
  }

  loadPatientResponses() {
    return this.webService.getPatientResponses().subscribe((data) => {
      this.responses = data
      console.log(this.responses)
    })
  }
}
