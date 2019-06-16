import {Component, OnInit} from '@angular/core';
import {FileLikeObject, FileUploader} from 'ng2-file-upload';
import {ProviderInsertService} from '../provider-insert.service';
import {NgForm} from '@angular/forms';
import {ProviderFormData} from '../provider-form-data';
import {Router} from '@angular/router';

@Component({
  selector: 'app-provider-insertion',
  templateUrl: './provider-insertion.component.html',
  styleUrls: ['./provider-insertion.component.scss']
})
export class ProviderInsertionComponent implements OnInit {
  uploader: FileUploader;
  providerData: ProviderFormData;
  fileName: string;
  successMessage: string;
  failMessage: string;


  constructor(private providerInsertService: ProviderInsertService,
              private router: Router) {
  }

  ngOnInit() {
    this.uploader = new FileUploader({url: 'http://localhost:8080/api/provider-upload', removeAfterUpload: false, autoUpload: false});

    this.uploader.onCompleteAll = () => this.providerInsertService.addNewProvider(this.fileName, this.providerData).subscribe(null,
      error1 => {
        console.log('error!', error1);
        this.failMessage = 'There was an error uploading the file.';
      },
      () => {
        this.successMessage = 'The provider was successfully added. You will be redirected.';

        setTimeout(() => this.router.navigateByUrl('/provider-overview'), 5000);
      });
  }

  onSubmit(providerFormData: ProviderFormData) {
    if (this.uploader.getNotUploadedItems().length === 0) {
      this.failMessage = 'Please select a file.';
      return;
    }
    console.log('object', providerFormData);
    const file: FileLikeObject = this.uploader.getNotUploadedItems()[0].file;
    this.fileName = file.name;

    console.log(file.name);
    if (isNaN(providerFormData.price)) {
      this.failMessage = 'Please insert a valid price.';
      return;

    }

    if(providerFormData.providerType === undefined ){
      this.failMessage = 'Please insert a valid type for the producer(s).';
      return;
    }

    this.providerData = providerFormData;

    this.uploader.uploadAll();
  }
}
