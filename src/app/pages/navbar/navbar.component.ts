import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public webService: WebserviceService)
  {}

  ngOnInit() {
    this.isLoadingPractitioner = true;
    this.loadPractitioner();
  }

  goToDashboard(){
    this.router.navigate([''], { relativeTo: this.activatedRoute });
  }

  loadPractitioner() {
    this.webService.getPractitioner().subscribe((data : Practitioner) => {
      this.practitioner = data;

      this.isLoadingPractitioner = false;
    });
  }

  isDashboard(){
    return this.router.url == "/";
  }

  isStatistiques(){
    return this.router.url.includes("statistiques");
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
