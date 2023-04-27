import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, SERVER_URL} from '../utils/http-constants';
import {UserCredentials} from '../models/user-credentials.model';
import {Account} from "../models/account";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  public login(userCredentials: UserCredentials): Observable<any> {
    return this.http.get<any>(SERVER_URL + '/login', {headers: this.createLoginHeader(userCredentials)});
  }

  public logout(): Observable<any> {
    return this.http.get<any>(SERVER_URL + '/logout', REQUEST_HEADERS);
  }

  private createLoginHeader(userCredentials: UserCredentials): HttpHeaders {
    return new HttpHeaders(userCredentials ?
      ({
        authorization: 'Basic ' + btoa(userCredentials.username + ':' + userCredentials.password),
        'Access-Control-Allow-Origin': '*'
      }) : ({}));
  }

  public getAllUsers(): Observable<Account[]> {
    return this.http.get<Account[]>(SERVER_URL + '/users', REQUEST_HEADERS);
  }

  public insertUser(account: Account): Observable<any> {
    return this.http.post<any>(SERVER_URL + '/users', account, REQUEST_HEADERS);
  }

  public deleteUser(username: string): Observable<any> {
    return this.http.delete<any>(SERVER_URL + '/users/' + username, REQUEST_HEADERS);
  }
}

