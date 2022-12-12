import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DogService } from '../../../../shared/services/API/dog/dog.service';
import { DogProfile } from '../../../../shared/models/dogs/DogProfile';
import { Owner } from '../../../../shared/models/Owner';
import { Sibling } from '../../../../shared/models/dogs/Sibling';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthStateService } from '../../../../shared/services/auth-state/auth-state.service';
import { MakeProposalDialogComponent } from '../../../../shared/components/make-proposal-dialog/make-proposal-dialog.component';
import { MessagesService } from '../../../../shared/services/API/messages/messages.service';
import PhotoHelper from '../../../../shared/helpers/PhotoHelper';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dog-profile',
  templateUrl: './dog-profile.component.html',
  styleUrls: ['./dog-profile.component.scss'],
})
export class DogProfileComponent implements OnInit {
  @ViewChild('outlet', { read: ViewContainerRef }) outletRef: ViewContainerRef;
  @ViewChild('content', { read: TemplateRef }) contentRef: TemplateRef<any>;

  dogProfileId: number;
  dogProfile: DogProfile;
  owner: Owner;
  siblings: Sibling[];
  isLoggedIn: boolean = false;
  authenticatedUserId: number;

  isContentLoading = false;

  images: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dogService: DogService,
    private router: Router,
    private dialogService: DialogService,
    private authStateService: AuthStateService,
    private messagesService: MessagesService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authStateService.isLoggedIn();
    this.authenticatedUserId = this.authStateService.userId();
    this.isContentLoading = true;

    this.route.params.subscribe(parameter => {
      this.dogProfileId = parameter.id;
      this.dogService.getDogProfileDetails(parameter.id).subscribe({
        next: data => {
          this.dogProfile = data.dog;
          this.owner = data.owner;
          this.siblings = data.siblings;
          this.initPhotoGallery();
        },
        error: err => {
          this.router.navigate(['/aplikacja']);
        },
        complete: () => {
          this.isContentLoading = false;
        },
      });
    });
  }

  private initPhotoGallery(): void {
    this.images = PhotoHelper.getImagesArrayFromPhoto(this.dogProfile.photos);
    if (this.outletRef) {
      this.outletRef.clear();
      this.outletRef.createEmbeddedView(this.contentRef);
    }
  }

  makeProposal() {
    if (!this.isLoggedIn) {
      return;
    }

    const ref = this.dialogService.open(MakeProposalDialogComponent, {
      width: '50rem',
      data: {
        dogProfileId: this.dogProfile.id,
        activities: this.dogProfile.activity,
      },
    });
  }

  showMessageDialog(): void {
    this.messagesService.openSendMessageDialog(this.owner.id);
  }
}
