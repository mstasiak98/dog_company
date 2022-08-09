import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Activity } from '../../../shared/models/dogs/Activity';
import {
  FormBuilder,
  ValidatorFn,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CareProposal } from '../../../shared/models/CareProposal';
import { ProposalService } from '../../../shared/services/API/proposal/proposal.service';

@Component({
  selector: 'app-proposal-dialog',
  templateUrl: './proposal-dialog.component.html',
  styleUrls: ['./proposal-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProposalDialogComponent implements OnInit {
  activities: Activity[];
  dogProfileId: number;
  proposal: any;
  submitted: boolean = false;

  constructor(
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private proposalService: ProposalService
  ) {
    this.activities = this.config.data.activities;
    this.dogProfileId = this.config.data.id;
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

    this.proposal.get('startDate').valueChanges.subscribe((value: any) => {
      this.proposal.get('endDate').setValue(value);
    });
  }

  saveProposal() {
    if (this.proposal.invalid) {
      this.submitted = true;
      return;
    }

    const proposal = this.prepareProposalData();
    console.log('TEST DANYCH = ', proposal);

    this.proposalService.makeProposal(proposal).subscribe({
      next: result => {
        if (result.success) {
          this.showSuccessMessage(result.start_date);
          console.log('SUCCESS', result);
        } else {
          this.showErrorMessage();
        }
      },
      error: error => {
        console.log('ERROR = ', error);
        this.showErrorMessage();
      },
      complete: () => {
        this.proposal.reset();
        this.ref.close();
      },
    });
  }

  private prepareProposalData(): CareProposal {
    const start = new Date(
      this.getDate(
        this.proposal.get('startDate').value,
        this.proposal.get('startTime').value
      )
    );
    const end = new Date(
      this.getDate(
        this.proposal.get('endDate').value,
        this.proposal.get('endTime').value
      )
    );

    const newStart = new Date(
      start.getTime() - start.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');
    const newEnd = new Date(end.getTime() - end.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ');

    const proposal: CareProposal = {
      dog_profile_id: this.dogProfileId,
      activity_id: this.proposal.get('proposalActivity').value.id,
      start_date: newStart,
      end_date: newEnd,
      siblings: this.proposal.get('siblings').value,
      additional_info: this.proposal.get('additionalInfo').value,
    };

    console.log('PROPOSAL DATA = ', proposal);
    return proposal;
  }

  private getDate(date: Date, time: Date): any {
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
