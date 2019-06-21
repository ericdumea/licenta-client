import {Component, OnInit} from '@angular/core';
import {FileLikeObject, FileUploader} from 'ng2-file-upload';
import {Router} from '@angular/router';
import {ConsumerData} from '../consumer-data';
import {ConsumerInsertService} from '../consumer-insert.service';

@Component({
  selector: 'app-consumer-insertion',
  templateUrl: './consumer-insertion.component.html',
  styleUrls: ['./consumer-insertion.component.scss']
})
export class ConsumerInsertionComponent implements OnInit {
  uploader: FileUploader;
  consumerData: ConsumerData;
  successMessage: string;
  failMessage: string;
  fileNameHolder = 'Choose file';

  constructor(private consumerInsertService: ConsumerInsertService,
              private router: Router) {
  }

  ngOnInit() {
    this.uploader = new FileUploader({url: 'http://localhost:8080/api/file-upload', removeAfterUpload: false, autoUpload: false});

    this.uploader.onCompleteAll = () => this.consumerInsertService.insertConsumer(this.consumerData).subscribe(null,
      error1 => {
        console.log('error!', error1);
        this.failMessage = 'There was an error uploading the file.';
      },
      () => {
        this.successMessage = 'The consumer was successfully added. You will be redirected.';

        setTimeout(() => this.router.navigateByUrl('/consumer-overview'), 5000);
      });
  }

  onSubmit(consumerData: ConsumerData) {
    if (this.uploader.getNotUploadedItems().length === 0) {
      this.failMessage = 'Please select a file.';
      return;
    }
    console.log('object', consumerData);
    const file: FileLikeObject = this.uploader.getNotUploadedItems()[0].file;
    file.name = Date.now() + file.name;

    console.log(file.name);
    if (isNaN(consumerData.price)) {
      this.failMessage = 'Please insert a valid price.';
      return;

    }

    if (consumerData.name === undefined) {
      this.failMessage = 'Please insert a valid name for the consumer(s).';
      return;
    }
    consumerData.fileName = file.name;
    this.consumerData = consumerData;


    this.uploader.uploadAll();
  }

  changeFileNime() {
    this.fileNameHolder = this.uploader.getNotUploadedItems()[0].file.name;
  }
}
