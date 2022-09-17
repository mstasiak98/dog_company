import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-photo-dialog',
  templateUrl: './add-photo-dialog.component.html',
  styleUrls: ['./add-photo-dialog.component.scss'],
})
export class AddPhotoDialogComponent implements OnInit {
  isLoading: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  save(): void {}
}
