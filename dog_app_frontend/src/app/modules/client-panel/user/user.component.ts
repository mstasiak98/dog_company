import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../shared/services/API/users/users.service';
import { UserAccountFullDetails } from '../../../shared/models/users/UserAccountFullDetails';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  userAccountFullDetails: UserAccountFullDetails;
  isContentLoading: boolean = false;
  accountDataTriggerSubscription: Subscription;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getUserAccountData();
    this.listenOnAccountDataTrigger();
  }

  ngOnDestroy(): void {
    this.accountDataTriggerSubscription.unsubscribe();
  }

  private getUserAccountData(): void {
    this.isContentLoading = true;
    this.userService
      .getAccountDetails()
      .subscribe((data: UserAccountFullDetails) => {
        this.userAccountFullDetails = data;
        this.isContentLoading = false;
      });
  }

  private listenOnAccountDataTrigger(): void {
    this.accountDataTriggerSubscription = this.userService
      .getAccountDataSubject()
      .subscribe(() => {
        this.getUserAccountData();
      });
  }
}
