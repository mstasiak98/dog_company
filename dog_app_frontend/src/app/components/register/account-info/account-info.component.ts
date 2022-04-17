import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  personalInformation: any;

  submitted: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.personalInformation = {firstName: '', lastName: '', age: 0};
  }

}
