import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Announcement } from '../../../../shared/models/announcements/announcement';
import { AnnouncementService } from '../../../../shared/services/API/announcement/announcement.service';
import { forkJoin } from 'rxjs';
import { Link } from '../../../../shared/models/pagination/Link';
import { DogQuantity } from '../../../../shared/enums/dog-quantity';

@Component({
  selector: 'app-announcement-dashboard',
  templateUrl: './announcement-dashboard.component.html',
  styleUrls: ['./announcement-dashboard.component.scss'],
})
export class AnnouncementDashboardComponent implements OnInit {
  //GUI
  showFilters = false;
  isContentLoading = false;
  isPageChanging = false;
  activities: any[];
  dogUrl = 'http://127.0.0.1:8000/api/announcements';

  //ANNOUNCEMENTS
  announcements: Announcement[] = [];
  filters: any;

  //PAGINATION
  links: Link[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  announcementsPerPage: number = 5;

  constructor(
    private formBuilder: FormBuilder,
    private announcementService: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.isContentLoading = true;
    const announcements = this.announcementService.getAnnouncementList();
    const activities = this.announcementService.getAvailableActivities();

    forkJoin([announcements, activities]).subscribe(
      this.processCombinedResults()
    );

    this.filters = this.formBuilder.group({
      city: [null],
      activity: [null],
      count: [null],
      start_date: [null],
      end_date: [null],
    });
  }

  onPageChange(event: any) {
    const page = event.page + 1;
    const link = this.links.find(link => link.label === page.toString());
    this.announcementService
      .getAnnouncementList(link?.url)
      .subscribe(this.processChangePageResult());
    this.isPageChanging = true;
  }

  private processChangePageResult() {
    return (data: any) => {
      this.announcements = data.data;
      this.links = data.meta.links;
      this.totalPages = data.meta.total;
      this.currentPage = data.meta.current_page;
      this.announcementsPerPage = data.meta.per_page;
      this.isPageChanging = false;
    };
  }

  private processCombinedResults() {
    return (data: any) => {
      console.log('OTRZYMALEM = ', data);
      this.announcements = data[0].data;
      this.links = data[0].meta.links;
      this.totalPages = data[0].meta.total;
      this.currentPage = data[0].meta.current_page;
      this.announcementsPerPage = data[0].meta.per_page;

      this.activities = data[1];
      console.log('PRZETWORZYLEM = ', this.announcements);
      console.log('PRZETWORZYLEM2 = ', this.activities);
      this.isContentLoading = false;
    };
  }

  applyFilters() {
    this.isPageChanging = true;
    const filters = this.filters.value;
    this.announcementService
      .getAnnouncementList(this.dogUrl, filters)
      .subscribe(this.processChangePageResult());
  }
}
