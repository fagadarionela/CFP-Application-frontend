import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, SERVER_URL} from '../utils/http-constants';
import {ClinicalSign} from "../models/clinical-sign";

@Injectable(
  {providedIn: 'root'}
)
export class ClinicalSignService {
  constructor(public http: HttpClient) {
  }

  public getAllClinicalSigns(): Observable<ClinicalSign[]> {
    return this.http.get<ClinicalSign[]>(SERVER_URL + '/clinical-signs', REQUEST_HEADERS);
  }
}
