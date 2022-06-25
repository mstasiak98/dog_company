import { Component, OnInit } from '@angular/core';
import {AuthStateService} from "../../../shared/services/auth-state/auth-state.service";

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.scss']
})
export class AnnouncementDetailsComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authStateService: AuthStateService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authStateService.isLoggedIn();
  }

}
