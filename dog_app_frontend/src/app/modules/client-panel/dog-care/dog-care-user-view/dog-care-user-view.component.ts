import { Component, Input, OnInit } from '@angular/core';
import {
  DogCarePropositionViewType,
  DogCareUserType,
} from '../../../../shared/enums/dog-care-enums';
import { AuthStateService } from '../../../../shared/services/auth-state/auth-state.service';

@Component({
  selector: 'app-dog-care-user-view',
  templateUrl: './dog-care-user-view.component.html',
  styleUrls: ['./dog-care-user-view.component.scss'],
})
export class DogCareUserViewComponent implements OnInit {
  @Input() userType: DogCareUserType;
  careTypes = DogCarePropositionViewType;

  constructor() {}

  ngOnInit(): void {}
}
