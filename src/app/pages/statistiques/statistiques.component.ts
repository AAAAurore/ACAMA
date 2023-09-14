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
  public feverChartData: Number[] = [];
  public feverAnswers: Boolean[] = [];

  public stateChart: any;
  public stateChartData: Number[] = [];
  public stateAnswers: Number[] = [];

  public bleedingChart: any;
  public bleedingChartData: Number[] = [];
  public bleedingAnswers: Boolean[] = [];

  public contactChart: any;
  public contactChartData: Number[] = [];
  public contactAnswers: Boolean[] = [];


  ngOnInit() {
    this.loadPatientResponses()
  }

  loadPatientResponses() {
    return (this.webService.getPatientResponses()).subscribe((data) => {
      this.responses = data;
      this.treatAnswers();
    })
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

    this.feverChartData = [this.feverAnswers.filter((ba) => ba).length, this.feverAnswers.filter((ba) => !ba).length]
    this.stateChartData = [
      this.stateAnswers.filter((ba) => ba === 1).length,
      this.stateAnswers.filter((ba) => ba === 2).length,
      this.stateAnswers.filter((ba) => ba === 3).length,
      this.stateAnswers.filter((ba) => ba === 4).length,
      this.stateAnswers.filter((ba) => ba === 5).length,
      this.stateAnswers.filter((ba) => ba === 6).length,
      this.stateAnswers.filter((ba) => ba === 7).length,
      this.stateAnswers.filter((ba) => ba === 8).length,
      this.stateAnswers.filter((ba) => ba === 9).length,
      this.stateAnswers.filter((ba) => ba === 10).length
    ]
    this.bleedingChartData = [this.bleedingAnswers.filter((ba) => ba).length, this.bleedingAnswers.filter((ba) => !ba).length]
    this.contactChartData = [this.contactAnswers.filter((ba) => ba).length, this.contactAnswers.filter((ba) => !ba).length]

    this.createStateChart()
    this.createFeverChart()
    this.createBleedingChart()
    this.createContactChart()
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
          data: this.feverChartData,
          backgroundColor: [
            '#FB8960',
            '#FFBBAB',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio:2.5, 
        plugins: {
          legend: {
            labels: {
              color: 'white', 
            },
            position: 'right',
          },
          title: {
            display: true,
            color: 'white',
            text: 'Nombre de personne ayant répondu avoir de la fièvre : ',
          }
        }
      }
    })
  }

  createStateChart() {
    this.chart = new Chart("StateChart", {
      type: 'bar',

      data: {
        labels: [1,2,3,4,5,6,7,8,9,10], 
	       datasets: [
          {
            label: "Etat du patient",
            data: this.stateChartData,
            backgroundColor: '#F8DE65'
          },
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            labels: {
              color: 'white', 
            },
          },
          title: {
            color: 'white',
            display: true,
            text: 'Nombre de personne ayant indiqué sur une échelle de 1 à 10 leur état de santé : ',
          },
        },
      }
      
    });
  }

  createBleedingChart() {
    this.bleedingChart = new Chart("BleedingChart", {
      type: 'doughnut',

      data: {
        labels: [
          'Oui',
          'Non'
        ],
        datasets: [{
          label: 'BleedingChart',
          data: this.bleedingChartData,
          backgroundColor: [
            '#FB8960',
            '#FFBBAB',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            labels: {
              color: 'white', 
            },
            position: 'right'
          },
          title: {
            color: 'white',
            display: true,
            text: 'Nombre de personne ayant répondu avoir des saignements : ',
          }
        }
      }
    })
  }

  createContactChart() {
    this.contactChart = new Chart("ContactChart", {
      type: 'doughnut',

      data: {
        labels: [
          'Oui',
          'Non'
        ],
        datasets: [{
          label: 'ContactChart',
          data: this.contactChartData,
          backgroundColor: [
            '#FB8960',
            '#FFBBAB',
          ],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          legend: {
            labels: {
              color: 'white', 
            },
            position: 'right'
          },
          title: {
            color: 'white',
            display: true,
            text: 'Nombre de personne ayant répondu avoir besoin de contacter un professionnel de santé : ',
          }
        }
      }
    })
  }
}
