import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contacts } from '../models/contacts';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private endpoint = 'http://localhost:3000/api/contacts';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient) { }

  public getContacts(): Observable<any> {
    return this.http.get<any>(this.endpoint, this.httpOptions);
  }
}