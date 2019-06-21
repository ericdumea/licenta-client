import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConsumerData} from './consumer-data';

@Injectable({
  providedIn: 'root'
})
export class ConsumerInsertService {

  consumerInsertUrl: string;

  constructor(private http: HttpClient) {
    this.consumerInsertUrl = 'http://localhost:8080/api/consumer-upload/insert';
  }

  public insertConsumer(consumerData: ConsumerData) {
    console.log(consumerData.fileName + ' ' + consumerData.name + ' ' + consumerData.price);

    return this.http.post<ConsumerData>(this.consumerInsertUrl, consumerData);

  }
}
