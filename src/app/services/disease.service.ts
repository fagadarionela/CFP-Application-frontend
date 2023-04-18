import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, SERVER_URL} from '../utils/http-constants';
import {Disease} from "../models/disease";

@Injectable(
  {providedIn: 'root'}
)
export class DiseaseService {
  constructor(public http: HttpClient) {
  }

  public getAllDiseases(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_URL + '/disease', REQUEST_HEADERS);
  }

  public getDiseaseByName(name: string): Observable<Disease> {
    return this.http.get<Disease>(SERVER_URL + '/disease/' + name, REQUEST_HEADERS);
  }

}
