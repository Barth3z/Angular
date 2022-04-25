import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-page-d-accueil',
  templateUrl: './page-d-accueil.component.html',
  styleUrls: ['./page-d-accueil.component.css']
})
export class PageDAccueilComponent implements OnInit {

  constructor(private router:Router) {
  }

  ngOnInit(): void {
  }
  
/**
* This method allows to navigate to another web page
* @param pageName - An address to access the page
*/
  navigateTo(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

}
