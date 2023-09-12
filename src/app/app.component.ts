import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ACAMA';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

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
