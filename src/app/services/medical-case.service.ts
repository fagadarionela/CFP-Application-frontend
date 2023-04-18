import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, REQUEST_HEADERS_IMAGE, SERVER_URL} from '../utils/http-constants';
import {MedicalCase} from "../models/medical-case";
import {MedicalCaseCustomized} from "../models/medical-case-customized";

@Injectable(
  {providedIn: 'root'}
)
export class MedicalCaseService {
  constructor(public http: HttpClient) {
  }

  public getAllAssignedIncomplete(page: number, size: number, searchedEncodedInfo: string): Observable<any> {
    return this.http.get<any>(SERVER_URL + '/cases/assigned/incomplete', {
      'headers': {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }, 'params': {
        'page': page,
        "size": size,
        "encodedInfo": searchedEncodedInfo
      }
    });
  }

  public getAllAssigendComplete(page: number, size: number, searchedDiagnostic: string): Observable<any> {
    return this.http.get<any>(SERVER_URL + '/cases/assigned/completed', {
      'headers': {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }, 'params': {
        'page': page,
        "size": size,
        "diagnostic": searchedDiagnostic
      }
    });
  }

  public addMedicalCase(medicalCase: any): Observable<any> {
    return this.http.post<any>(SERVER_URL + '/cases', medicalCase, REQUEST_HEADERS_IMAGE);
  }

  public updateMedicalCase(medicalCase: MedicalCase): Observable<any> {
    return this.http.put<any>(SERVER_URL + '/cases', medicalCase, REQUEST_HEADERS);
  }

  public getAllCompletedMedicalCases(page: number, size: number, encodedInfo: string): Observable<any> {
    return this.http.get<any>(SERVER_URL + '/cases/completed', {
      'headers': {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }, 'params': {
        'page': page,
        "size": size,
        "encodedInfo": encodedInfo
      }
    });
  }

  public getAllMedicalCasesAssignedTo(encodedInfo: string): Observable<MedicalCaseCustomized[]> {
    return this.http.get<MedicalCaseCustomized[]>(SERVER_URL + '/cases', {
      'headers': {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }, 'params': {'encodedInfo': encodedInfo}
    });
  }
}
