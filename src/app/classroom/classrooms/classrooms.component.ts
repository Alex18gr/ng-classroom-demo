import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ClassroomService} from '../classroom.service';
import {Classroom} from '../../models/classroom.model';
import {ClassroomEditModalComponent} from '../../shared/classroom-edit-modal/classroom-edit-modal.component';
import {StudentEditModalComponent} from '../../shared/student-edit-modal/student-edit-modal.component';
import {Student} from '../../models/student.model';
import {Subscription} from 'rxjs';
import {DeleteModalComponent} from '../../shared/delete-modal/delete-modal.component';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css']
})
export class ClassroomsComponent implements OnInit, OnDestroy {
  @ViewChild('classroomEditModal', {static: false}) classroomEditModal: ClassroomEditModalComponent;
  @ViewChild('deleteModal', {static: false}) deleteModal: DeleteModalComponent;
  classroomsList: Classroom[] = [];
  classroomDataChanged: Subscription;

  constructor(private classroomService: ClassroomService) { }

  ngOnInit() {
    this.classroomDataChanged = this.classroomService.classroomDataChanged.subscribe((data) => {
      this.getClassrooms();
    });
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
    this.classroomService.classroomDataChanged.next();
  }

  ngOnDestroy(): void {
    if (this.classroomDataChanged) {
      this.classroomDataChanged.unsubscribe();
    }
  }

  openDeleteModal(classroom: Classroom) {
    this.deleteModal.showClassroomDeleteModal(classroom);
  }
}
