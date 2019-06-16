import {Injectable} from '@angular/core';
import {Provider} from './provider';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  const;
  PROVIDERS: Provider[] = [
    {
      id: '1',
      type: 'WIND',
      price: 200,
      energy: [100, 111, 123, 133, 143, 153, 100, 111, 123, 133, 143, 153, 123, 133, 143, 153, 100, 111, 123, 133, 143, 153]
    },
    {
      id: '2',
      type: 'SOLAR',
      price: 200,
      energy: [100, 111, 123, 133, 143, 153, 100, 111, 123, 133, 143, 153, 123, 133, 143, 153, 100, 111, 123, 133, 143, 153]
    },
    {
      id: '3',
      type: 'TRADITIONAL',
      price: 200,
      energy: [100, 111, 123, 133, 143, 153, 100, 111, 123, 133, 143, 990, 123, 133, 143, 153, 100, 111, 123, 133, 143, 153]
    }
  ];

  private providersUrl: string;

  constructor(private http: HttpClient) {
    this.providersUrl = 'http://localhost:8080/api/provider';
  }

  public findAll(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.providersUrl);
  }
}
