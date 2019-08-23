import {Component, OnInit} from '@angular/core';
import {Consumer} from '../consumer';
import {ConsumerService} from '../consumer.service';
import ObjectID from 'bson-objectid';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {DashboardFormData} from '../dashboard-form-data';
import {ProviderType} from '../provider-type';
import {AlgoFormData} from '../algo-form-data';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Label} from 'ng2-charts';
import {AlgoRequest} from '../algo-request';
import {AlgoService} from '../algo.service';
import {NavigationExtras, Router} from '@angular/router';

const types = ['WIND', 'TIDE', 'SOLAR', 'TRADITIONAL'];

class AlgoHoursData {
  startHour: number;
  endHour: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private consumerService: ConsumerService,
              private modalService: NgbModal,
              private algoService: AlgoService,
              private router: Router) {
  }

  consumerList: Consumer[];
  consumerChosenMessage: string;
  formFlag: boolean[];
  selectedCustomer: ObjectID;
  successMessage: string;
  providerType: ProviderType[] = [];

  algoData: AlgoFormData = new AlgoFormData();

  chartLabels: Label[] = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];

  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    animation: {
      duration: 0
    },
    annotation: {
      annotations: [
        {
          type: 'liprne',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'blue',
          borderWidth: 2,
          label: {
            enabled: false,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  private solId: string;
  private failMessage: string;
  loading = false;

  private changedHour: string = null;
  private algorithmParam: AlgoRequest = new AlgoRequest();

  ngOnInit() {
    this.consumerService.findAll().subscribe(data =>
        this.consumerList = data
      , err => {
        alert('Server can not be contacted.');
        console.log(err);
      });
    this.formFlag = [true, true, true];
    this.algoData.iterations = 150;
    this.algoData.fireflies = 50;
    this.algorithmParam.startHour = 0;
    this.algorithmParam.endHour = 23;
  }

  selectConsumer(consumer: Consumer): string {
    console.log(consumer.id + 'was chosen');
    this.selectedCustomer = ObjectID.createFromHexString(consumer.id);
    this.consumerChosenMessage = 'Consumer ' + consumer.name + ' was selected';
    return consumer.id;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : types.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );


  setHoursForAlgo(formData: AlgoHoursData) {

    if (formData.startHour > formData.endHour) {
      this.failMessage = 'Please select reasonable hours. (The start hour can\'t be more than the end hour';
      return;
    }
    if (formData.startHour < 0 || formData.startHour > 24 || formData.endHour < 0 || formData.endHour > 23) {
      this.failMessage = 'Please select reasonable hours. (0-24)';
      return;
    }
    this.algorithmParam.startHour = formData.startHour;
    this.algorithmParam.endHour = formData.endHour;
    this.changedHour = 'Changed hours.';
  }

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
      const temp: ProviderType = new ProviderType();
      temp.type = formData.providerType0;
      temp.percentage = formData.providerPercentage0;
      this.providerType.push(temp);
    }
    if (formData.providerPercentage1 !== undefined && formData.providerType1 !== undefined) {
      const temp: ProviderType = new ProviderType();
      temp.type = formData.providerType1;
      temp.percentage = formData.providerPercentage1;
      this.providerType.push(temp);
    }
    if (formData.providerPercentage2 !== undefined && formData.providerType2 !== undefined) {
      const temp: ProviderType = new ProviderType();
      temp.type = formData.providerType2;
      temp.percentage = formData.providerPercentage2;
      this.providerType.push(temp);
    }
    if (formData.providerPercentage3 !== undefined && formData.providerType3 !== undefined) {
      const temp: ProviderType = new ProviderType();
      temp.type = formData.providerType3;
      temp.percentage = formData.providerPercentage3;
      this.providerType.push(temp);
    }
    console.log(this.providerType);


    this.algorithmParam.consumerId = this.selectedCustomer.toHexString();
    this.algorithmParam.numberOfFireflies = this.algoData.fireflies;
    this.algorithmParam.numberOfIterations = this.algoData.iterations;
    this.algorithmParam.providerTypes = this.providerType;


    if (this.providerType.length === 0) {
      this.failMessage = 'Please choose at least a type of provider.';
      return;
    }

    if (this.selectedCustomer === null) {
      this.failMessage = 'Please choose a consumer.';
      this.providerType = [];
      return;
    }

    let percentage: number = 0;
    for (let i = 0; i < this.providerType.length; i++) {
      percentage += this.providerType[i].percentage;
    }
    console.log(percentage);
    if (percentage === 0 || percentage > 90) {
      this.failMessage = 'Please choose reasonable percentages for the provider types.';
      this.providerType = [];
      console.log(percentage + ' ');
      return;
    }

    this.loading = true;
    this.algoService.runAlgorithm(this.algorithmParam).subscribe(data => {
      console.log(data);
      this.solId = data;
    }, err => {
      console.log(err);
    }, () => this.router.navigate(['/results-page'], {
      queryParams: {
        'solutionId': this.solId
      }
    }));
  }

  changeParameters(value: AlgoFormData) {
    if (value.iterations === undefined || value.fireflies === undefined ||
      isNaN(value.fireflies) || isNaN(value.iterations) || value.iterations.toString().length === 0
      || value.fireflies.toString().length === 0) {
      this.failMessage = 'Please insert valid algorithm data.';
      console.log('ALGO DATA not available: ' + value);
      return;
    } else if (value.fireflies > 100 || value.iterations > 200 || value.fireflies < 10 || value.iterations < 50) {
      this.failMessage = 'The parameters chosen will not yield optimal results.';
    } else {
      this.algoData = value;
    }
    console.log(this.algoData);
  }

  openLg(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  dataSetGeneration(energy: number[]) {
    let chartData: ChartDataSets[];
    chartData = [{data: energy, label: 'Energy needed (kWh)'}];
    console.log(energy);
    return chartData;
  }

}
