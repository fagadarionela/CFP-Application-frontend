import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, REQUEST_HEADERS_IMAGE, SERVER_URL} from '../utils/http-constants';
import {MedicalCase} from "../models/medical-case";
import {MedicalCaseCustomized} from "../models/medical-case-customized";

@Injectable(
  {providedIn: 'root'}
)
export class SystemService {
  constructor(public http: HttpClient) {
  }

  public getImages(): Observable<any> {
    return this.http.get<any>(SERVER_URL + '/system/file', REQUEST_HEADERS_IMAGE);
  }

  public getAllTempMedicalCases(): Observable<any> {
    return this.http.get<any>(SERVER_URL + '/system/file/number', REQUEST_HEADERS_IMAGE);
  }

  public deleteTempMedicalCases(): Observable<any> {
    return this.http.delete<any>(SERVER_URL + '/system/file', REQUEST_HEADERS_IMAGE);
  }
}
