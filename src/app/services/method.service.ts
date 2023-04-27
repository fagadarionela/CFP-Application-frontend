import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, SERVER_URL} from '../utils/http-constants';
import {Method} from "../models/method";

@Injectable(
  {providedIn: 'root'}
)
export class MethodService {
  constructor(public http: HttpClient) {
  }

  public getAllMethods(): Observable<Method[]> {
    return this.http.get<Method[]>(SERVER_URL + '/methods', REQUEST_HEADERS);
  }
}
