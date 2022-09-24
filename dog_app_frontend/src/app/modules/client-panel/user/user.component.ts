import { Component, OnInit } from '@angular/core';
import { Link } from '../../../shared/models/pagination/Link';
import { UsersService } from '../../../shared/services/API/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { Comment, User, UserDetails } from '../../../shared/models/User';
import { AddPhotoDialogComponent } from '../../../shared/components/add-photo-dialog/add-photo-dialog.component';
import { PhotoEndpointsEnum } from '../../../shared/enums/photo-endpoints-enum';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isContentLoading: boolean = false;
  rating = 3;
  isContent: boolean = true;
  showContact: boolean = false;
  userId: number;
  userDetails: UserDetails;
  comments: Comment[];

  //PAGINATION
  links: Link[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  commentsPerPage: number = 10;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getUserIdFromRoute();
    this.loadUserData(this.userId);
    this.listenOnTriggerDataReload();
  }

  private listenOnTriggerDataReload(): void {
    this.usersService.subject.subscribe(() => {
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
        })
      )
      .subscribe(this.processCombinedRequestResults());
  }

  private processChangePageResults() {
    return (data: any) => {
      this.comments = data.data;
      this.links = data.meta.links;
      this.totalPages = data.meta.total;
      this.currentPage = data.meta.current_page;
      this.commentsPerPage = data.meta.per_page;
    };
  }

  private processCombinedRequestResults() {
    return (data: any) => {
      this.userDetails = data[0];
      this.comments = data[1].data;
      this.links = data[1].meta.links;
      this.totalPages = data[1].meta.total;
      this.currentPage = data[1].meta.current_page;
      this.commentsPerPage = data[1].meta.per_page;
      console.log('user details = ', this.userDetails);
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
