import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '../../../../shared/services/auth-state/auth-state.service';
import { Router } from '@angular/router';
import { Announcement } from '../../../../shared/models/announcements/announcement';
import { Link } from '../../../../shared/models/pagination/Link';
import { AnnouncementService } from '../../../../shared/services/API/announcement/announcement.service';
import { ConfirmationService } from 'primeng/api';
import { AddPhotoDialogComponent } from '../../../../shared/components/add-photo-dialog/add-photo-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { PhotoEndpointsEnum } from '../../../../shared/enums/photo-endpoints-enum';

@Component({
  selector: 'app-announcement-list-user',
  templateUrl: './announcement-list-user.component.html',
  styleUrls: ['./announcement-list-user.component.scss'],
})
export class AnnouncementListUserComponent implements OnInit {
  isSignedIn: boolean;
  authenticatedUserId: number;
  isContentLoading: boolean = false;
  isPageChanging: boolean = false;

  //ANNOUNCEMENTS
  announcements: Announcement[] = [];

  //PAGINATION
  links: Link[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  announcementsPerPage: number = 5;

  constructor(
    private authStateService: AuthStateService,
    private router: Router,
    private announcementService: AnnouncementService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.isContentLoading = true;
    this.isSignedIn = this.authStateService.isLoggedIn();
    this.authenticatedUserId = this.authStateService.userId();

    this.getAnnouncementsForUser();
    this.listenOnTriggerReloadEvent();
  }

  private getAnnouncementsForUser(): void {
    this.announcementService
      .getAnnouncementListForUser()
      .subscribe(this.processResults());
  }

  private listenOnTriggerReloadEvent(): void {
    this.announcementService.subject.subscribe(() => {
      this.getAnnouncementsForUser();
    });
  }

  private processResults() {
    return (data: any) => {
      this.announcements = data.data;
      this.links = data.meta.links;
      this.totalPages = data.meta.total;
      this.currentPage = data.meta.current_page;
      this.announcementsPerPage = data.meta.per_page;
      this.isContentLoading = false;
      this.isPageChanging = false;
    };
  }

  onPageChange(event: any) {
    const page = event.page + 1;
    const link = this.links.find(link => link.label === page.toString());
    this.announcementService
      .getAnnouncementList(link?.url)
      .subscribe(this.processResults());
    this.isPageChanging = true;
  }

  delete(announcement: Announcement): void {
    console.log('event = ', event);
    this.confirmationService.confirm({
      message: `Czy chesz usunąć ogłoszenie ${announcement.title}?`,
      header: 'Potwierdzenie',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.announcementService.deleteAnnouncement(announcement.id).subscribe({
          next: data => {
            this.announcementService
              .getAnnouncementListForUser()
              .subscribe(this.processResults());
          },
          error: err => {
            this.router.navigate(['/aplikacja/ogloszenia/moje-ogloszenia']);
          },
          complete: () => {
            this.router.navigate(['/aplikacja/ogloszenia/moje-ogloszenia']);
          },
        });
      },
    });
  }

  public openChangePhotoDialog(photoId: number): void {
    const ref = this.dialogService.open(AddPhotoDialogComponent, {
      width: '40rem',
      height: '30rem',
      data: {
        isAnnouncementChangePhoto: true,
        photoId: photoId,
        photoEndpoint: PhotoEndpointsEnum.ANNOUNCEMENT_PHOTO,
      },
    });
  }
}
