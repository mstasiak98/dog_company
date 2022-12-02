import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comment, UserDetails } from '../../../../shared/models/User';
import { Link } from '../../../../shared/models/pagination/Link';
import { UsersService } from '../../../../shared/services/API/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { finalize, forkJoin, Subscription } from 'rxjs';
import { MessagesService } from '../../../../shared/services/API/messages/messages.service';
import PhotoHelper from '../../../../shared/helpers/PhotoHelper';
import { AuthStateService } from '../../../../shared/services/auth-state/auth-state.service';

@Component({
  selector: 'app-guardian-profile-view',
  templateUrl: './guardian-profile-view.component.html',
  styleUrls: ['./guardian-profile-view.component.scss'],
})
export class GuardianProfileViewComponent implements OnInit, OnDestroy {
  isContentLoading: boolean = false;
  rating = 3;
  isContent: boolean = true;
  showContact: boolean = false;
  userId: number;
  userDetails: UserDetails;
  comments: Comment[];
  displayBasic: boolean = false;
  images: any[] = [];
  responsiveOptions: any[] = [];
  triggerReloadSubscription: Subscription;

  //PAGINATION
  links: Link[] = [];
  currentPage: number = 1;
  totalRecords: number = 0;
  commentsPerPage: number = 10;
  totalPages: number;

  authenticatedUserId: number;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    public messagesService: MessagesService,
    private authStateService: AuthStateService
  ) {}

  ngOnInit(): void {
    this.authenticatedUserId = this.authStateService.userId();
    this.getUserIdFromRoute();
    this.loadUserData(this.userId);
    this.listenOnTriggerDataReload();
  }

  ngOnDestroy() {
    this.triggerReloadSubscription.unsubscribe();
  }

  private initPhotoGallery(): void {
    this.responsiveOptions = PhotoHelper.getGalleryResponsiveOptions();
    this.images = PhotoHelper.getImagesArrayFromPhoto(this.userDetails.photo);
  }

  private listenOnTriggerDataReload(): void {
    this.triggerReloadSubscription = this.usersService.subject.subscribe(() => {
      this.loadUserData(this.userId);
    });
  }

  private getUserIdFromRoute(): void {
    this.route.params.subscribe(params => {
      this.userId = params.id;
    });
  }

  private loadUserData(userId: number): void {
    this.isContentLoading = true;
    forkJoin([
      this.usersService.getUserDetails(userId),
      this.usersService.getUserComments(userId),
    ])
      .pipe(
        finalize(() => {
          this.isContentLoading = false;
          this.initPhotoGallery();
        })
      )
      .subscribe(this.processCombinedRequestResults());
  }

  private processChangePageResults() {
    return (data: any) => {
      this.comments = data.data;
      this.links = data.meta.links;
      this.totalRecords = data.meta.total;
      this.currentPage = data.meta.current_page;
      this.commentsPerPage = data.meta.per_page;
      this.totalPages = data.meta.last_page;
    };
  }

  private processCombinedRequestResults() {
    return (data: any) => {
      this.userDetails = data[0];
      this.comments = data[1].data;
      this.links = data[1].meta.links;
      this.totalRecords = data[1].meta.total;
      this.currentPage = data[1].meta.current_page;
      this.commentsPerPage = data[1].meta.per_page;
      this.totalPages = data[1].meta.last_page;
    };
  }

  onPageChange(event: any) {
    const page = event.page + 1;
    const link = this.links.find(link => link.label === page.toString());

    this.usersService
      .getUserComments(this.userId, link!.url)
      .subscribe(this.processChangePageResults());
  }
}
