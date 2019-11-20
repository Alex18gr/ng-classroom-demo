import { Component, OnInit } from '@angular/core';
import {ClassroomService} from '../classroom.service';
import {Classroom} from '../../models/classroom.model';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {
  classroomsList: Classroom[] = [];

  constructor(private classroomService: ClassroomService) { }

  ngOnInit() {
    this.getClassrooms();
  }

  getClassrooms() {
    this.classroomService.getClassrooms().subscribe((data: Classroom[]) => {
      this.classroomsList = data;
    });
  }

}
