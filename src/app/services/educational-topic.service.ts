import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {REQUEST_HEADERS, SERVER_URL} from '../utils/http-constants';
import {ClinicalSign} from "../models/clinical-sign";
import {EducationalTopic} from "../models/educational-topic";

@Injectable(
  {providedIn: 'root'}
)
export class EducationalTopicService {
  constructor(public http: HttpClient) {
  }

  public getAllEducationalTopics(): Observable<EducationalTopic[]> {
    return this.http.get<EducationalTopic[]>(SERVER_URL + '/educational-topic', REQUEST_HEADERS);
  }
}
