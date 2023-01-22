import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '../../../../shared/services/auth-state/auth-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementService } from '../../../../shared/services/API/announcement/announcement.service';
import { Announcement } from '../../../../shared/models/announcements/announcement';
import { MakeProposalDialogComponent } from '../../../../shared/components/make-proposal-dialog/make-proposal-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { MessagesService } from '../../../../shared/services/API/messages/messages.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-announcement-details',
  templateUrl: './announcement-details.component.html',
  styleUrls: ['./announcement-details.component.scss'],
})
export class AnnouncementDetailsComponent implements OnInit {
  isLoggedIn: boolean = false;
  isContentLoading = false;
  announcementId: number;
  announcement: Announcement;
  authenticatedUserId: number;
  isOldAnnouncement: boolean = false;

  constructor(
    private authStateService: AuthStateService,
    private route: ActivatedRoute,
    private announcementService: AnnouncementService,
    private router: Router,
    private dialogService: DialogService,
    public messagesService: MessagesService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isContentLoading = true;
    this.isLoggedIn = this.authStateService.isLoggedIn();
    this.authenticatedUserId = this.isLoggedIn
      ? this.authStateService.userId()
      : -1;

    this.route.params.subscribe(parameter => {
      this.announcementId = parameter.id;
      this.announcementService.getAnnouncementDetails(parameter.id).subscribe({
        next: data => {
          this.announcement = data;
          const dateNow = this.getDateNow();
          this.isOldAnnouncement = !(
            this.announcement.start_date > dateNow &&
            this.announcement.end_date > dateNow
          );
        },
        error: err => {
          this.router.navigate(['/aplikacja/ogloszenia']);
        },
        complete: () => {
          this.isContentLoading = false;
        },
      });
    });
  }

  makeAnnouncementProposal(): void {
    if (!this.isLoggedIn) {
      return;
    }

    const ref = this.dialogService.open(MakeProposalDialogComponent, {
      width: '50rem',
      data: {
        announcementId: this.announcement.id,
        activities: this.announcement.activity,
        startDate: this.announcement.start_date,
        endDate: this.announcement.end_date,
      },
    });
  }

  deleteAnnouncement() {
    this.confirmationService.confirm({
      message: `Czy chesz usunąć ogłoszenie: ${this.announcement.title}?`,
      header: 'Potwierdzenie',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Tak',
      rejectLabel: 'Nie',
      accept: () => {
        this.announcementService
          .deleteAnnouncement(this.announcement.id)
          .subscribe({
            next: data => {
              this.router.navigate(['/aplikacja/ogloszenia']);
            },
            error: err => {
              this.toastService.showErrorMessage(
                'Wysąpił błąd podczas usuwania ogłoszenia'
              );
            },
          });
      },
    });
  }

  getDateNow(): any {
    const datepipe: DatePipe = new DatePipe('pl-PL');
    return datepipe.transform(new Date(), 'YYYY-MM-dd HH:mm:ss');
  }
}
