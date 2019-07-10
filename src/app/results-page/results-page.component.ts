import {Component, OnInit} from '@angular/core';
import {Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {ProviderService} from '../provider.service';
import {ResultsService} from '../results.service';
import {Results} from '../results';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';

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

  private energyProvided: Results;
  private flag = false;

  private fitnessValues: number[] = [];

  private chartData: ChartDataSets[] = [{
    data: [0.0, 0.0, 0.0],
    label: 'Energy provided'
  }, {
    data: [0.0, 0.0, 0.0],
    label: 'Energy consumed'
  }];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    animation: {
      duration: 2000
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
  private sumConsumed = 0;
  private sumProduced = 0;

  constructor(private providerService: ProviderService,
              private resultsService: ResultsService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      let id = params['solutionId'];
      console.log(id);
      if (id) {
        this.resultsService.getResultsById(id).subscribe(
          data => {
            this.energyProvided = data;
            console.log(data);
          }, error => {
            console.log(error);
          }, () => {
            this.flag = true;
            console.log(this.energyProvided.consumerDTO);
            this.dataSetGeneration();

          }
        );
      }
    });
  }

  dataSetGeneration() {
    if (this.flag) {
      this.chartData = [{
        data: this.energyProvided.computedEnergy,
        label: 'Energy provided'
      }, {
        data: this.energyProvided.consumerDTO.power,
        label: 'Energy consumed'
      }];
      for (let i = 0; i < 24; i++) {
        this.sumConsumed += this.energyProvided.consumerDTO.power[i];
        this.sumProduced += this.energyProvided.computedEnergy[i];
        this.fitnessValues[i] = this.energyProvided.computedEnergy[i] - this.energyProvided.consumerDTO.power[i];
      }
    }
  }
}
