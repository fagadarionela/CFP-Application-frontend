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

  public addDisease(disease: Disease): Observable<any> {
    return this.http.post<any>(SERVER_URL + '/disease', disease, REQUEST_HEADERS);
  }

  public getAllDiseases(): Observable<Disease[]> {
    return this.http.get<Disease[]>(SERVER_URL + '/disease', REQUEST_HEADERS);
  }

  public getDiseaseByName(name: string): Observable<Disease> {
    return this.http.get<Disease>(SERVER_URL + '/disease/' + name, REQUEST_HEADERS);
  }

  public getAllDiseasesInfo(): Observable<any> {
    return this.http.get<any>(SERVER_URL + '/disease/all', REQUEST_HEADERS);
  }

  public deleteDisease(nume: string): Observable<any> {
    return this.http.delete<any>(SERVER_URL + '/disease/' + nume, REQUEST_HEADERS);
  }
}
