import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/dogs/Activity';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { ProposalService } from '../../services/API/proposal/proposal.service';
import { CareProposal } from '../../models/CareProposal';
import { pl_calendar } from '../../util/calendar_pl';

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
  locale = pl_calendar;
  showDateBeforeTodayMessage: boolean = false;
  showEndDateBeforeStartMessage: boolean = false;

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
    const proposalData = this.prepareProposalData();
    const dateIncorrect = this.validateDates(
      proposalData.start_date,
      proposalData.end_date
    );

    if (this.proposal.invalid || dateIncorrect) {
      this.submitted = true;
      return;
    }

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
        let errors = '';
        Object.keys(error?.error?.errors).forEach(key => {
          error.error.errors[key]?.forEach((error: any) => {
            errors += `${error}\n`;
          });
        });
        this.showErrorMessage(errors);
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

  showErrorMessage(errors: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Wystąpił błąd',
      detail: `Wystąpił błąd podczas składania propozycji opieki: ${errors}`,
    });
  }

  isDateBeforeToday(
    startDate: Date,
    endDate: Date,
    currentDate: Date
  ): boolean {
    if (startDate < currentDate || endDate < currentDate) {
      this.showDateBeforeTodayMessage = true;
      return true;
    }
    return false;
  }

  isEndDateBeforeStartDate(startDate: Date, endDate: Date) {
    if (new Date(endDate) <= new Date(startDate)) {
      this.showEndDateBeforeStartMessage = true;
      return true;
    }
    return false;
  }

  validateDates(startDate: string, endDate: string): boolean {
    const currentDate = new Date();
    const isDateBefore = this.isDateBeforeToday(
      new Date(startDate),
      new Date(endDate),
      currentDate
    );

    const isEndBeforeStart = this.isEndDateBeforeStartDate(
      new Date(startDate),
      new Date(endDate)
    );

    return isDateBefore || isEndBeforeStart;
  }
}
