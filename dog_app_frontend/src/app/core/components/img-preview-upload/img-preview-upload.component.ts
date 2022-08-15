import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-img-preview-upload',
  templateUrl: './img-preview-upload.component.html',
  styleUrls: ['./img-preview-upload.component.scss'],
})
export class ImgPreviewUploadComponent implements OnInit {
  imgUploaded = false;
  file: File;
  imgUrl: any;

  @Output() fileChangedEvent = new EventEmitter<File>();
  @Output() fileUnloadEvent = new EventEmitter<boolean>();
  @Input() imgUrlEdit: string | undefined;

  constructor() {}

  ngOnInit(): void {}

  onFileChange(event: any) {
    const files = event.target.files;
    if (FileReader && files && files.length > 0) {
      this.file = files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = _event => {
        this.imgUrl = reader.result;
        this.imgUploaded = true;
        this.fileChangedEvent.emit(this.file);
        this.imgUrlEdit = undefined;
      };
    } else {
      this.imgUploaded = false;
    }
  }

  unloadPhoto() {
    this.imgUrl = null;
    this.imgUploaded = false;
    this.fileUnloadEvent.emit(true);
    this.imgUrlEdit = undefined;
  }
}
