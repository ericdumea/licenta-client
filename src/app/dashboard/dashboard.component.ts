import {Component, OnInit} from '@angular/core';
import {Consumer} from '../consumer';
import {ConsumerService} from '../consumer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  consumerList: Consumer[];
  consumerChosenMessage: string;

  constructor(private consumerService: ConsumerService) {
  }

  ngOnInit() {
    this.consumerService.findAll().subscribe(data =>
        this.consumerList = data
      , err => {
        alert('Server can not be contacted.');
        console.log(err);
      });
  }

  selectConsumer(consumer: Consumer) {
    console.log(consumer.id + 'was chosen');
  }
}
