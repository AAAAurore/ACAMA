import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router)
  {}

  goToDashboard(){
    this.router.navigate([''], { relativeTo: this.activatedRoute });
  }

  isDashboard(){
    return this.router.url == "/";
  }

  isStatistiques(){
    return this.router.url.includes("statistiques");
  }

}
