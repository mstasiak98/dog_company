import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { AnnouncementService } from '../../../../shared/services/API/announcement/announcement.service';
import { Activity } from '../../../../shared/models/dogs/Activity';
import { ActivatedRoute, Router } from '@angular/router';
import { Announcement } from '../../../../shared/models/announcements/announcement';
import { AuthStateService } from '../../../../shared/services/auth-state/auth-state.service';

@Component({
  selector: 'app-announcement-create',
  templateUrl: './announcement-create.component.html',
  styleUrls: ['./announcement-create.component.scss'],
})
export class AnnouncementCreateComponent implements OnInit {
  announcementForm: any;
  file: File | null;
  activities: Activity[];
  isContentLoading: boolean = false;
  isEdit: boolean = false;
  announcement: Announcement;
  authenticatedUserId: number;
  deletePhoto: boolean = false;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService,
    private router: Router,
    private route: ActivatedRoute,
    private authStateService: AuthStateService
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.isEdit = true;
      this.route.params.subscribe(parameter => {
        this.announcementService
          .getAnnouncementDetails(parameter.id)
          .subscribe({
            next: data => {
              this.announcement = data;
              console.log('OGLOSZENIE = ', this.announcement);

              this.setFormEditData();
              console.log(
                'ustawiona data do edycji = ',
                this.announcementForm.value
              );
            },
            error: err => {
              this.router.navigate([`/announcements/details/${parameter.id}`]);
            },
            complete: () => {
              this.isContentLoading = false;
            },
          });
      });
    }

    this.isContentLoading = true;
    this.announcementService
      .getAvailableActivities()
      .subscribe(this.processReceivedActivities());

    this.authenticatedUserId = this.authStateService.userId();

    this.announcementForm = this.formBuilder.group({
      title: ['', Validators.required],
      city: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      description: [''],
      activity_id: ['', Validators.required],
      user_id: [this.authenticatedUserId, Validators.required],
    });
  }

  setFormEditData(): void {
    console.log('options = ');

    let announcement = {
      title: this.announcement.title,
      city: this.announcement.city,
      quantity: this.announcement.quantity,
      start_date: new Date(this.announcement.start_date),
      end_date: new Date(this.announcement.end_date),
      description: this.announcement.description,
      activity_id: this.announcement.activity,
      user_id: this.authenticatedUserId,
    };

    this.announcementForm.setValue(announcement);
  }

  processReceivedActivities() {
    return (data: any) => {
      this.activities = data;
      this.isContentLoading = false;
    };
  }

  addPhoto(event: any) {
    this.file = event;
    this.deletePhoto = false;
  }

  saveAnnouncement() {
    if (!this.announcementForm.valid || this.announcementForm.errors) {
      return;
    }

    const formData = this.getFormData();

    console.log('data form = ', formData.get('data')?.toString());
    console.log('FORMULARz = ', this.announcementForm.value);

    let request = !this.isEdit
      ? this.announcementService.storeAnnouncement(formData)
      : this.announcementService.updateAnnouncement(formData);

    request.subscribe({
      next: result => {
        console.log('result = ', result);
        let url;
        if (this.isEdit) {
          url = `announcements/details/${this.announcement.id}`;
        } else {
          url = `announcements/details/${result?.announcementId}`;
        }
        this.router.navigate([url]);
      },
      error: error => {
        this.router.navigate(['announcements']);
      },
      complete: () => {
        this.announcementForm.reset();
      },
    });
  }

  convertDates(): void {
    const startDate = formatDate(
      this.announcementForm.get('start_date').value,
      'yyyy-MM-dd HH:mm:ss',
      this.locale
    );

    const endDate = formatDate(
      this.announcementForm.get('end_date').value,
      'yyyy-MM-dd HH:mm:ss',
      this.locale
    );

    this.announcementForm.get('start_date').setValue(startDate);
    this.announcementForm.get('end_date').setValue(endDate);
  }

  getFormData(): FormData {
    const formData = new FormData();
    if (this.file) {
      formData.append('photo', this.file);
      console.log('z foto');
    }
    this.convertDates();
    this.convertActivitiesFormField();

    let announcement;
    if (this.isEdit) {
      console.log('jest edit wartosc przed = ', this.announcementForm.value);
      announcement = {
        ...this.announcementForm.value,
        id: this.announcement.id,
      };
    } else {
      announcement = this.announcementForm.value;
    }

    formData.append('data', JSON.stringify(announcement));
    console.log('DATA WYSLANA W DATA', JSON.stringify(announcement));

    return formData;
  }

  convertActivitiesFormField(): void {
    this.announcementForm
      .get('activity_id')
      .setValue(
        this.announcementForm
          .get('activity_id')
          .value.map((activity: any) => activity.id)
      );
  }

  unloadPhoto(event: any) {
    this.file = null;
    this.deletePhoto = true;
  }

  f() {
    return this.announcementForm.controls;
  }

  navigateBack(): void {
    if (this.isEdit) {
      this.router.navigate([`announcements/details/${this.announcement.id}`]);
    } else {
      this.router.navigate(['announcements']);
    }
  }
}
