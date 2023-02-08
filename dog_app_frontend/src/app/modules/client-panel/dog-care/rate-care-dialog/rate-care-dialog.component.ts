import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DogCareService } from '../../../../shared/services/API/dog-care/dog-care.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DogCare } from '../../../../shared/models/dog-care/DogCare';

@Component({
  selector: 'app-rate-care-dialog',
  templateUrl: './rate-care-dialog.component.html',
  styleUrls: ['./rate-care-dialog.component.scss'],
})
export class RateCareDialogComponent implements OnInit {
  ratingData: any;
  dogCare: DogCare;
  isEdit: boolean = false;
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private dogCareService: DogCareService,
    private toastService: ToastService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.dogCare = this.config.data.dogCare;
    this.ratingData = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (this.dogCare?.rating) {
      this.isEdit = true;
      this.setExisitngRating();
    }
  }

  private setExisitngRating(): void {
    this.ratingData.patchValue({
      rating: this.dogCare.rating,
      comment: this.dogCare.comment,
    });
  }

  get f() {
    return this.ratingData.controls;
  }

  save() {
    if (this.ratingData.invalid) {
      return;
    }

    this.loading = true;
    this.dogCareService
      .rateDogCare(this.dogCare.id, this.ratingData.value)
      .subscribe({
        next: res => {
          this.toastService.showSuccessMessage(
            'Ocena opieki została wystawiona'
          );
          this.loading = false;
          this.dogCareService.triggerCareDataReload();
          this.ref.close();
        },
        error: err => {
          this.loading = false;
          this.toastService.showErrorMessage(err.error.error);
        },
      });
  }
}
