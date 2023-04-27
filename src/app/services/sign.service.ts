import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, SERVER_URL} from '../utils/http-constants';
import {Sign} from "../models/sign";

@Injectable(
  {providedIn: 'root'}
)
export class SignService {
  constructor(public http: HttpClient) {
  }

  public getAllSigns(): Observable<Sign[]> {
    return this.http.get<Sign[]>(SERVER_URL + '/signs', REQUEST_HEADERS);
  }
}
