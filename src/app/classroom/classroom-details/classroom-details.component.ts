import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ClassroomService} from '../classroom.service';
import {Classroom} from '../../models/classroom.model';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.css']
})
export class ClassroomDetailsComponent implements OnInit {

  classroom: Classroom;

  constructor(private route: ActivatedRoute,
              private classroomService: ClassroomService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getClassroomData(parseInt(params.get('cid'), 10));
    });
  }

  private getClassroomData(classroomId: number) {
    this.classroomService.getClassroom(classroomId).subscribe((data: Classroom) => {
      this.classroom = data;
    });
  }
}
