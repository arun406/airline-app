import { UploadService } from './../upload.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  form: FormGroup;
  error: string;

  uploadResponse = {
    fileName: '',
    fileDownloadUri: '',
    fileType: '',
    documentType: '',
    owner: '',
    size: 0,
    bread: '',
    status: '',
    message: ''
  };

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {

    const formData = new FormData();

    formData.append('files', this.form.get('avatar').value);
    this.uploadService.uploadImage(formData).subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err
    );

  }
}
