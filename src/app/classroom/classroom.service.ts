import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Classroom} from '../models/classroom.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  classroomDataChanged = new Subject<any>();

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

  saveClassroom(classroom: Classroom) {
    const url = this.apiUrl + 'classrooms';
    return this.httpClient.post<Classroom>(url, classroom);
  }

  updateClassroom(classroom: Classroom) {
    const url = this.apiUrl + 'classrooms/' + classroom.id;
    return this.httpClient.put<Classroom>(url, classroom);
  }

  deleteClassroom(classroom: Classroom) {
    const url = this.apiUrl + 'classrooms/' + classroom.id;
    return this.httpClient.delete<Classroom>(url);
  }
}
