import { Component } from '@angular/core';
import { WebserviceService } from 'src/app/webservice/webservice.service';
import { QuestionnaireResponse } from 'src/app/questionnaire';
import { Chart } from 'chart.js'


@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.scss']
})
export class StatistiquesComponent {
  constructor(
    public webService: WebserviceService,
  ) {}

  public responses: QuestionnaireResponse[] = [];

  public chart: any;

  public feverChart: any;
  public feverAnswers: Boolean[] = [];

  public stateChart: any;
  public stateAnswers: Number[] = [];

  public bleedingChart: any;
  public bleedingAnswers: Boolean[] = [];

  public contactChart: any;
  public contactAnswers: Boolean[] = [];


  ngOnInit() {
    this.loadPatientResponses()
    this.createChart()
    this.createFeverChart()
  }

  loadPatientResponses() {
    return (this.webService.getPatientResponses()).subscribe((data) => {
      this.responses = data;
      this.treatAnswers()
    })
  }

  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }

  treatAnswers() {
    let usuableResponses = this.responses.filter((r) => 
      r.item.length === 4 
    )
    usuableResponses.forEach(r => {
      r.item.forEach(i => {
        if(i.linkId === '1') {
          this.stateAnswers.push(i.answer[0].valueInteger ? i.answer[0].valueInteger : 5)
        }
        if(i.linkId === '2') {
          this.feverAnswers.push(i.answer[0].valueBoolean ? i.answer[0].valueBoolean : false)
        }
        if(i.linkId === '3') {
          this.bleedingAnswers.push(i.answer[0].valueBoolean ? i.answer[0].valueBoolean : false)
        }
        if(i.linkId === '4') {
          this.contactAnswers.push(i.answer[0].valueBoolean ? i.answer[0].valueBoolean : false)
        }
      });
    })
    
    console.log(typeof(this.bleedingAnswers.filter((ba) => !ba).length))
  }


  createFeverChart() {
    this.feverChart = new Chart("FeverChart", {
      type: 'doughnut',

      data: {
        labels: [
          'Oui',
          'Non'
        ],
        datasets: [{
          label: 'FeverChart',
          data: [
            this.feverAnswers.filter((ba) => ba).length,
            //this.feverAnswers.filter((ba) => !ba).length,
            //11,
            12
          ],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: 'Nombre de personne ayant répondu avoir de la fièvre : ',
          }
        }
      }
    })
  }
}
