import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../models/student.model';
import {Classroom} from '../models/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'http://localhost:8080/';

  saveStudent(classroom: Classroom, student: Student) {
    const url = this.apiUrl + 'classrooms/' + classroom.id + '/students';
    return this.httpClient.post<Student>(url, student);
  }

  updateStudent(classroom: Classroom, student: Student) {
    const url = this.apiUrl + 'classrooms/' + classroom.id + '/students/' + student.id;
    return this.httpClient.put<Student>(url, student);
  }
}
