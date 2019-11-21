import {Component, OnInit, ViewChild} from '@angular/core';
import {ClassroomService} from '../classroom.service';
import {Classroom} from '../../models/classroom.model';
import {ClassroomEditModalComponent} from '../../shared/classroom-edit-modal/classroom-edit-modal.component';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit {
  @ViewChild('classroomEditModal', {static: false}) classroomEditModal: ClassroomEditModalComponent;
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

  openEditClassroomModal(classroom?: Classroom) {
    this.classroomEditModal.showModal(classroom);
  }

  onDataSaved() {
    this.getClassrooms();
  }
}
