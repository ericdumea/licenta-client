import {Component, OnInit} from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {ProviderService} from '../provider.service';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {

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
          borderColor: 'orange',
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

  constructor(private providerService: ProviderService) {
  }

  ngOnInit() {
  }

  dataSetGeneration() {
    let chartData: ChartDataSets[];
    chartData = [{
      data: this.providerService.PROVIDERS[0].energy,
      label: 'Energy provided'
    }, {
      data: this.providerService.PROVIDERS[1].energy,
      label: 'Energy consumed'
    }];
    return chartData;
  }

}
