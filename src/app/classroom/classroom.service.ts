import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Classroom} from '../models/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'http://localhost:8080/';

  getClassrooms() {
    const url = this.apiUrl + 'classrooms';
    return this.httpClient.get<Classroom[]>(url);
  }

  getClassroom(classroomId: number) {
    const url = this.apiUrl + 'classrooms/' + classroomId;
    return this.httpClient.get<Classroom>(url);
  }
}
