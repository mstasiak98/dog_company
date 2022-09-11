import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { DogCare } from '../../../../shared/models/dog-care/DogCare';
import { DogCareUserType } from '../../../../shared/enums/dog-care-enums';

@Component({
  selector: 'app-proposal-details-dialog',
  templateUrl: './proposal-details-dialog.component.html',
  styleUrls: ['./proposal-details-dialog.component.scss'],
})
export class ProposalDetailsDialogComponent implements OnInit {
  withSiblings: boolean = true;
  dogCare: DogCare;
  userType: DogCareUserType;

  constructor(
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.dogCare = this.config.data.dogCare;
    this.userType = this.config.data.userType;
  }
}
