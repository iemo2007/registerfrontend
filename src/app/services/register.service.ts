import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Governate } from '../models/governate.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  getGovernatesWithCities() {
    return this.http.get<Governate[]>(`${environment.apiUrl}/api/governate`);
  }

  createAccount(account: Account) {
    console.log('account');
    console.log(account);
    return this.http.post(`${environment.apiUrl}/api/account`, account);
  }
}
