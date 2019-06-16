import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Consumer} from './consumer';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  consumerUrl: string;

  constructor(private http: HttpClient) {
    this.consumerUrl = 'http://localhost:8080/api/consumer';
  }

  public findAll(): Observable<Consumer[]> {
    return this.http.get<Consumer[]>(this.consumerUrl);
  }

}
