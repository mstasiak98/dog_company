import { Component, Input, OnInit } from '@angular/core';
import { DogCareUserType } from '../../../../shared/enums/dog-care-enums';

@Component({
  selector: 'app-dog-care-user-view',
  templateUrl: './dog-care-user-view.component.html',
  styleUrls: ['./dog-care-user-view.component.scss'],
})
export class DogCareUserViewComponent implements OnInit {
  @Input() userType: DogCareUserType;

  constructor() {}

  ngOnInit(): void {}
}
