import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Provider} from './provider';
import {Results} from './results';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private resultsUrl: string;

  constructor(private http: HttpClient) {
    this.resultsUrl = 'http://localhost:8080/api/get-solution/';
  }

  public getResultsById(id: string): Observable<Results> {
    return this.http.get<Results>(this.resultsUrl + id);
  }
}
