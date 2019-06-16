import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProviderFormData} from './provider-form-data';

@Injectable({
  providedIn: 'root'
})
export class ProviderInsertService {

  providerInsertURL: string;

  constructor(private http: HttpClient) {
    this.providerInsertURL = 'http://localhost:8080/api/provider-upload/insert';
  }

  public addNewProvider(fileName: string, providerData: ProviderFormData) {
    providerData.fileName = fileName;

    console.log(providerData.fileName + ' ' + providerData.providerType + ' ' + providerData.price);

    return this.http.post<ProviderFormData>(this.providerInsertURL, providerData);

  }
}
