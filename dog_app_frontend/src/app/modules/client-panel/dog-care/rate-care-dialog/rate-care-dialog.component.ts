import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rate-care-dialog',
  templateUrl: './rate-care-dialog.component.html',
  styleUrls: ['./rate-care-dialog.component.scss'],
})
export class RateCareDialogComponent implements OnInit {
  ratingData: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.ratingData = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  get f() {
    return this.ratingData.controls;
  }

  save() {
    console.log('TEST = ', this.f.value.invalid);
    console.log(this.ratingData.value);
  }
}
