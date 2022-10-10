import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  steps: MenuItem[];
  activeIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.steps = [
      {
        routerLink: 'dane_konta',
      },
      {
        routerLink: 'dane_profilowe',
      },
      {
        routerLink: 'dodatkowe_informacje',
      },
    ];
  }
}
