import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, SERVER_URL} from '../utils/http-constants';
import {Resident} from "../models/resident";

@Injectable(
  {providedIn: 'root'}
)
export class ResidentService {
  constructor(public http: HttpClient) {
  }

  public addResident(resident: Resident): Observable<Resident> {
    return this.http.post<Resident>(SERVER_URL + '/residents', resident, REQUEST_HEADERS);
  }

  public getCurrentResident(): Observable<number> {
    return this.http.get<number>(SERVER_URL + '/residents/current', REQUEST_HEADERS);
  }
}
