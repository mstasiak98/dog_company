import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/dogs/Activity';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { ProposalService } from '../../services/API/proposal/proposal.service';
import { CareProposal } from '../../models/CareProposal';

@Component({
  selector: 'app-make-proposal-dialog',
  templateUrl: './make-proposal-dialog.component.html',
  styleUrls: ['./make-proposal-dialog.component.scss'],
})
export class MakeProposalDialogComponent implements OnInit {
  activities: Activity[];
  dogProfileId: number;
  announcementId: number;
  proposal: any;
  submitted: boolean = false;
  isSaving: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private proposalService: ProposalService
  ) {
    this.activities = this.config.data.activities;
    this.dogProfileId = this.config.data.dogProfileId ?? null;
    this.announcementId = this.config.data.announcementId ?? null;
    console.log('DOG ID = ', this.dogProfileId);
    console.log('ANN ID = ', this.announcementId);
  }

  ngOnInit(): void {
    this.proposal = this.formBuilder.group({
      proposalActivity: ['', [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      additionalInfo: [''],
      siblings: [false],
    });

    if (this.announcementId) {
      this.loadAnnouncementDate();
    }

    this.proposal.get('startDate').valueChanges.subscribe((value: any) => {
      this.proposal.get('endDate').setValue(value);
    });
  }

  loadAnnouncementDate(): void {
    const startDate = new Date(this.config.data.startDate);
    const endDate = new Date(this.config.data.endDate);

    this.proposal.get('startDate').setValue(startDate);
    this.proposal.get('endDate').setValue(endDate);
    this.proposal.get('startTime').setValue(startDate);
    this.proposal.get('endTime').setValue(endDate);
  }

  saveProposal() {
    if (this.proposal.invalid) {
      this.submitted = true;
      return;
    }

    const proposalData = this.prepareProposalData();
    console.log('TEST DANYCH = ', proposalData);
    const proposal = this.announcementId
      ? this.proposalService.makeAnnouncementProposal(proposalData)
      : this.proposalService.makeProposal(proposalData);

    this.isSaving = true;
    proposal.subscribe({
      next: result => {
        this.showSuccessMessage(result.start_date);
        this.isSaving = false;
      },
      error: error => {
        this.showErrorMessage();
        console.log('error = ', error);
        this.isSaving = false;
      },
      complete: () => {
        this.proposal.reset();
        this.ref.close();
      },
    });
  }

  private prepareProposalData(): CareProposal {
    let start, end, newStart, newEnd;

    if (this.dogProfileId) {
      start = new Date(
        this.getDateWithTime(
          this.proposal.get('startDate').value,
          this.proposal.get('startTime').value
        )
      );
      end = new Date(
        this.getDateWithTime(
          this.proposal.get('endDate').value,
          this.proposal.get('endTime').value
        )
      );

      newStart = new Date(start.getTime() - start.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      newEnd = new Date(end.getTime() - end.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
    }

    const proposal: CareProposal = {
      dog_profile_id: this.dogProfileId,
      announcement_id: this.announcementId,
      activity_id: this.proposal.get('proposalActivity').value.id,
      start_date: newStart ?? this.config.data.startDate,
      end_date: newEnd ?? this.config.data.endDate,
      siblings: this.dogProfileId ? this.proposal.get('siblings').value : null,
      additional_info: this.proposal.get('additionalInfo').value,
    };

    console.log('PROPOSAL DATA = ', proposal);
    return proposal;
  }

  private getDateWithTime(date: Date, time: Date): any {
    const day = date;

    day.setHours(time.getHours());
    day.setMinutes(time.getMinutes());

    return day.getTime();
  }

  get f() {
    return this.proposal.controls;
  }

  showSuccessMessage(date: any): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Propozycja opieki została złożona',
      detail: `Pomyślnie złożyłeś porpozycję opieki na dzień: ${date}`,
    });
  }

  showErrorMessage(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Wystąpił błąd',
      detail: `Wystąpił błąd podczas składania propozycji opieki. Spróbuj złożyć opiekę jeszcze raz.`,
    });
  }
}
