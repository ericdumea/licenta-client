import {Component, OnInit} from '@angular/core';
import {ConsumerService} from '../consumer.service';
import {Consumer} from '../consumer';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-consumer-overview',
  templateUrl: './consumer-overview.component.html',
  styleUrls: ['./consumer-overview.component.scss']
})
export class ConsumerOverviewComponent implements OnInit {

  consumerList: Consumer[];

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

  constructor(private consumerService: ConsumerService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.consumerService.findAll().subscribe(data => {
      this.consumerList = data;
      console.log(data);
    });
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
