import { Component, OnInit } from '@angular/core';
import { AuthStateService } from '../../../shared/services/auth-state/auth-state.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { TokenService } from '../../../shared/services/token/token.service';
import { FormBuilder } from '@angular/forms';
import { DogService } from '../../../shared/services/API/dog/dog.service';
import { DogProfile } from '../../../shared/models/dogs/DogProfile';
import { Link } from '../../../shared/models/pagination/Link';
import { forkJoin } from 'rxjs';
import { createLogErrorHandler } from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';
import { Breed } from '../../../shared/models/dogs/Breed';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  //DOG PROFILES
  dogProfiles: DogProfile[] = [];

  //PAGINATION
  links: Link[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  profilesPerPage: number = 9;

  //GUI
  showFilters = false;
  isContentLoading = false;
  isPageChanging = false;

  // FILTERS
  breeds: Breed[];
  filters: any;
  traits: any[];
  activities: any[];
  availabilities: any[];
  sizes: any[];
  suggestions: Breed[];

  constructor(
    public authStateService: AuthStateService,
    private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private dogService: DogService
  ) {}

  ngOnInit(): void {
    this.isContentLoading = true;
    const filters = this.dogService.getDogProfileFilters();
    const dogProfiles = this.dogService.getDogProfiles();

    forkJoin([filters, dogProfiles]).subscribe(this.proccessCombinedResult());

    this.filters = this.formBuilder.group({
      breed: [null],
      trait: [null],
      activity: [null],
      availability: [null],
      size: [null],
    });
  }

  onPageChange(event: any): void {
    this.isPageChanging = true;
    const page = event.page + 1;
    const link = this.links.find(link => link.label === page.toString());
    this.dogService.getDogProfiles(link?.url).subscribe(this.processResult());
  }

  private processResult() {
    return (data: any) => {
      this.dogProfiles = data.data;
      this.links = data.meta.links;
      this.totalPages = data.meta.total;
      this.currentPage = data.meta.current_page;
      this.profilesPerPage = data.meta.per_page;
      this.isPageChanging = false;
    };
  }

  searchFilters(): void {
    this.isPageChanging = true;
    const filters = this.filters.value;
    this.dogService
      .getDogProfiles('http://127.0.0.1:8000/api/dogs', filters)
      .subscribe(this.processResult());
  }

  private proccessCombinedResult() {
    return (data: any) => {
      this.dogProfiles = data[1].data;
      this.links = data[1].meta.links;
      this.totalPages = data[1].meta.total;
      this.currentPage = data[1].meta.current_page;
      this.profilesPerPage = data[1].meta.per_page;

      this.traits = data[0].features;
      this.sizes = data[0].sizes;
      this.activities = data[0].activities;
      this.availabilities = data[0].availabilities;
      this.breeds = data[0].breeds;
      this.isContentLoading = false;
    };
  }
}
