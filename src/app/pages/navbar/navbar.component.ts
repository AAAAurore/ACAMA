import { Component } from '@angular/core';
import { Practitioner } from 'src/app/questionnaire';
import { WebserviceService } from 'src/app/webservice/webservice.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  practitioner: Practitioner = new Practitioner();
  isLoadingPractitioner: boolean = false;
  

  constructor(
    public webService: WebserviceService
  ){}

  ngOnInit() {
    this.isLoadingPractitioner = true;

    this.loadPractitioner();
  }

  loadPractitioner() {
    this.webService.getPractitioner().subscribe((data : Practitioner) => {
      this.practitioner = data;

      this.isLoadingPractitioner = false;
    });
  }
}
