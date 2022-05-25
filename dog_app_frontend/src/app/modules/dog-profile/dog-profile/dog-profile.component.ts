import { Component, OnInit } from '@angular/core';
import {Feature} from "../../../shared/models/dogs/Feature";
import {Activity} from "../../../shared/models/dogs/Activity";
import {Availability} from "../../../shared/models/dogs/Availability";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DogService} from "../../../shared/services/API/dog/dog.service";
import {DogProfile} from "../../../shared/models/dogs/DogProfile";
import {Owner} from "../../../shared/models/Owner";
import {Sibling} from "../../../shared/models/dogs/Sibling";
import {DialogService} from "primeng/dynamicdialog";
import {ProposalDialogComponent} from "../proposal-dialog/proposal-dialog.component";
import {AuthStateService} from "../../../shared/services/auth-state/auth-state.service";

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.component.html',
  styleUrls: ['./dog-profile.component.scss']
})
export class DogProfileComponent implements OnInit {

  dogProfileId: number;
  dogProfile: DogProfile;
  owner: Owner;
  siblings: Sibling[];
  isLoggedIn: boolean = false;


  isContentLoading = false;

  images: any = [
    {
      previewImageSrc: "http://localhost:8000/storage/photos/dog.png",
      thumbnailImageSrc: "http://localhost:8000/storage/photos/dog.png",
      alt: "Description for Image 1",
      title: "Title 1"
    },
    {
      previewImageSrc: "http://localhost:8000/storage/photos/TskIqukqoENONBqBa4gNG0qbsgp5u3aEPrKzJPbM.png",
      thumbnailImageSrc: "http://localhost:8000/storage/photos/TskIqukqoENONBqBa4gNG0qbsgp5u3aEPrKzJPbM.png",
      alt: "Description for Image 2",
      title: "Title 2"
    },
    {
      previewImageSrc: "http://localhost:8000/storage/photos/dog.png",
      thumbnailImageSrc: "http://localhost:8000/storage/photos/dog.png",
      alt: "Description for Image 3",
      title: "Title 3"
    },
    {
      previewImageSrc: "http://localhost:8000/storage/photos/dog.png",
      thumbnailImageSrc: "http://localhost:8000/storage/photos/dog.png",
      alt: "Description for Image 4",
      title: "Title 4"
    },
    {
      previewImageSrc: "http://localhost:8000/storage/photos/dog.png",
      thumbnailImageSrc: "http://localhost:8000/storage/photos/dog.png",
      alt: "Description for Image 5",
      title: "Title 5"
    },
  ];

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private dogService: DogService,
              private router: Router,
              private dialogService: DialogService,
              private authStateService: AuthStateService

  ) { }


  ngOnInit(): void {
    this.isLoggedIn = this.authStateService.isLoggedIn();

    this.isContentLoading = true;

    this.route.params.subscribe(parameter => {
      this.dogProfileId = parameter.id;
      this.dogService.getDogProfileDetails(parameter.id).subscribe({
        next: (data) => {
          this.dogProfile = data.dog;
          this.owner = data.owner;
          this.siblings = data.siblings;
        },
        error: (err) => {
          this.router.navigate(['/dashboard']);
        },
        complete: () => {
          this.isContentLoading = false;
        }
      })
    });
  }


  makeProposal() {
    if(!this.isLoggedIn){
      return;
    }

    const ref = this.dialogService.open(ProposalDialogComponent, {
      width: '50rem',
      height: '60rem',
      data: {
        id: this.dogProfile.id,
        activities: this.dogProfile.activity,
      },
    });

    ref.onClose.subscribe(response => {
      console.log('response = ', response);
    });
  }
}
