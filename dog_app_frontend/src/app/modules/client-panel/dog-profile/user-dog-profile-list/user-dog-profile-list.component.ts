import { Component, OnInit } from '@angular/core';
import { DogService } from '../../../../shared/services/API/dog/dog.service';
import { DogProfile } from '../../../../shared/models/dogs/DogProfile';

@Component({
  selector: 'app-user-dog-profile-list',
  templateUrl: './user-dog-profile-list.component.html',
  styleUrls: ['./user-dog-profile-list.component.scss'],
})
export class UserDogProfileListComponent implements OnInit {
  isContentLoading = false;
  isSignedIn = true;
  dogProfiles: DogProfile[];
  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.isContentLoading = true;
    this.dogService.getUserDogProfiles().subscribe(this.processResults());
  }

  private processResults() {
    return (data: any) => {
      this.dogProfiles = data;
      this.isContentLoading = false;
    };
  }
}
