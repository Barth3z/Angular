import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <h3>
      Page 404, la page que vous recherché n'existe pas !
    </h3>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
