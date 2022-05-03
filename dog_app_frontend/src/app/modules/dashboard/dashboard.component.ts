import { Component, OnInit } from '@angular/core';
import {AuthStateService} from "../../shared/services/auth-state/auth-state.service";
import {AuthService} from "../../shared/services/auth/auth.service";
import {TokenService} from "../../shared/services/token/token.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showFilters = false;

  results: string[];
  filters: any;
  traits: any[] = [{name: 'Przyjazny psom', key: 'df'}, {name: 'Przyjazny dzieciom', key: 'chf'}, {name: 'Przyjazny kotom', key: 'cf'}, {name: 'Wytresowany', key: 't'}];
  activities: any[] = [{name: 'Spacer', key: 'w'}, {name: 'Opieka w domu właściciela', key: 'o'}, {name: 'Opieka w domu opiekuna', key: 'b'}];
  availabilities: any[] = [{name: 'Tydzień - do południa', key: 'dp'}, {name: 'Tydzień - po południu', key: 'pp'}, {name: 'Tydzień - wieczorem', key: 'tw'}, {name: 'Weekend', key: 'ww'}];
  sizes: any[] = [{name: 'Mały (do 7kg)', key: 'm'}, {name: 'Średni', key: 'sr'}, {name: 'Duży', key: 'dz'}];


  constructor(
    public authStateService: AuthStateService,
    private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.filters = this.formBuilder.group({
      breed: [''],
      trait: [''],
      activity: [''],
      availability: [''],
      size: ['']
    });
  }

  search(event: any) {
    this.results = [
      'test', 'test2'
    ];
  }

}
