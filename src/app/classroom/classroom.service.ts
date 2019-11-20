import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'http://localhost:8080/';

  getClassrooms() {
    const url = this.apiUrl + 'classrooms';
    return this.httpClient.get(url);
  }
}
