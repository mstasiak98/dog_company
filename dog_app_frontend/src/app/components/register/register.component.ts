import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  steps: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.steps = [
      { label: "Dane konta" },
      { label: "Dane osobowe" },
      { label: "Zdjęcie" },
      { label: "Opis" },
    ];
  }
}
