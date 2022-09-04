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
        label: 'Dane konta',
        routerLink: 'account_info',
      },
      {
        label: 'Miejsce zamieszkania',
        routerLink: 'personal_info',
      },
      {
        label: 'Dane dodatkowe',
        routerLink: 'additional_info',
      },
    ];
  }
}
