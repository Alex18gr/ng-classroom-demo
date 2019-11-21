import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ClassroomService} from '../classroom.service';
import {Classroom} from '../../models/classroom.model';
import {StudentEditModalComponent} from '../../shared/student-edit-modal/student-edit-modal.component';
import {Student} from '../../models/student.model';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.css']
})
export class ClassroomDetailsComponent implements OnInit {
  @ViewChild('studentEditModal', {static: false}) studentEditModal: StudentEditModalComponent;
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

  openEditStudentModal(student?: Student) {
    this.studentEditModal.showModal(this.classroom, student);
  }

  onDataSaved() {
    this.classroomService.classroomDataChanged.next();
  }
}
