import {Component, OnInit} from '@angular/core';
import {Consumer} from '../consumer';
import {ConsumerService} from '../consumer.service';
import ObjectID from 'bson-objectid';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {DashboardFormData} from '../dashboard-form-data';
import {ProviderType} from '../provider-type';
import {AlgoFormData} from '../algo-form-data';

const types = ['WIND', 'TIDE', 'SOLAR', 'TRADITIONAL'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  consumerList: Consumer[];
  consumerChosenMessage: string;
  formFlag: boolean[];
  selectedCustomer: ObjectID;
  successMessage: string;
  providerType: ProviderType[] = [];

  algoData: AlgoFormData;

  constructor(private consumerService: ConsumerService) {
  }

  ngOnInit() {
    this.consumerService.findAll().subscribe(data =>
        this.consumerList = data
      , err => {
        alert('Server can not be contacted.');
        console.log(err);
      });
    this.formFlag = [true, true, true];
  }

  selectConsumer(consumer: Consumer) {
    console.log(consumer.id + 'was chosen');
    this.selectedCustomer = ObjectID.createFromHexString(consumer.id);
    this.consumerChosenMessage = 'Consumer ' + consumer.name + ' was selected';
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : types.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  btn0click() {
    this.formFlag[0] = false;
  }

  btn1click() {
    this.formFlag[1] = false;
  }

  btn2click() {
    this.formFlag[2] = false;
  }

  onSubmit(formData: DashboardFormData) {
    console.log(formData);
    if (formData.providerPercentage0 !== undefined && formData.providerType0 !== undefined) {
      let temp: ProviderType = new ProviderType();
      temp.type = formData.providerType0;
      temp.percentage = formData.providerPercentage0;
      this.providerType.push(temp);
    }
    if (formData.providerPercentage1 !== undefined && formData.providerType1 !== undefined) {
      let temp: ProviderType = new ProviderType();
      temp.type = formData.providerType1;
      temp.percentage = formData.providerPercentage1;
      this.providerType.push(temp);
    }
    if (formData.providerPercentage2 !== undefined && formData.providerType2 !== undefined) {
      let temp: ProviderType = new ProviderType();
      temp.type = formData.providerType2;
      temp.percentage = formData.providerPercentage2;
      this.providerType.push(temp);
    }
    if (formData.providerPercentage3 !== undefined && formData.providerType3 !== undefined) {
      let temp: ProviderType = new ProviderType();
      temp.type = formData.providerType3;
      temp.percentage = formData.providerPercentage3;
      this.providerType.push(temp);
    }
    console.log(this.providerType);
  }

  changeParameters(value: AlgoFormData) {
    if (value.iterations === undefined || value.fireflies === undefined ||
      isNaN(value.fireflies) || isNaN(value.iterations) || value.iterations.toString().length === 0
      || value.fireflies.toString().length === 0) {
      console.log('ALGO DATA not available: ' + this.algoData);
      return;
    }

    this.algoData = value;
    console.log(this.algoData);
  }
}
