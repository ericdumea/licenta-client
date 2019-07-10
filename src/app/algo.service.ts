import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AlgoRequest} from './algo-request';

@Injectable({
  providedIn: 'root'
})
export class AlgoService {

  private algoUrl: string;

  constructor(private http: HttpClient) {
    this.algoUrl = 'http://localhost:8080/api/provider/run-algorithm';
  }

  public runAlgorithm(algoData: AlgoRequest): Observable<string> {
    return this.http.post<string>(this.algoUrl, algoData, {responseType: 'text' as 'json'});
  }
}

