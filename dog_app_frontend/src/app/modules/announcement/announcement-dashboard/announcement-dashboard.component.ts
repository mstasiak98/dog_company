import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-announcement-dashboard',
  templateUrl: './announcement-dashboard.component.html',
  styleUrls: ['./announcement-dashboard.component.scss']
})
export class AnnouncementDashboardComponent implements OnInit {

  //GUI
  showFilters = false;
  isContentLoading = false;


  filters: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.filters = this.formBuilder.group({
      city: [null],
      activity: [null],
      count: [null],
      start_date: [null],
      end_date: [null],
    });
  }

  search(){

  }

}
