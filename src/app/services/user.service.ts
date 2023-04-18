import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, SERVER_URL} from '../utils/http-constants';
import {UserCredentials} from '../models/user-credentials.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  public login(userCredentials: UserCredentials): Observable<any> {
    console.log(userCredentials);
    return this.http.get<any>(SERVER_URL + '/login', {headers: this.createLoginHeader(userCredentials)});
  }

  public logout(): Observable<any> {
    return this.http.get<any>(SERVER_URL + '/logout', REQUEST_HEADERS);
  }

  private createLoginHeader(userCredentials: UserCredentials): HttpHeaders {
    return new HttpHeaders(userCredentials ?
      ({
        authorization: 'Basic ' + btoa(userCredentials.username + ':' + userCredentials.password)
      }) : ({}));
  }
}

