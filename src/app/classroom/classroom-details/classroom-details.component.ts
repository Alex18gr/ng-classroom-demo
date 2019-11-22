import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ClassroomService} from '../classroom.service';
import {Classroom} from '../../models/classroom.model';
import {StudentEditModalComponent} from '../../shared/student-edit-modal/student-edit-modal.component';
import {Student} from '../../models/student.model';
import {DeleteModalComponent} from '../../shared/delete-modal/delete-modal.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.css']
})
export class ClassroomDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('studentEditModal', {static: false}) studentEditModal: StudentEditModalComponent;
  @ViewChild('deleteModal', {static: false}) deleteModal: DeleteModalComponent;
  classroom: Classroom;
  classroomDataChangedSubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private classroomService: ClassroomService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (isNaN(+params.get('cid'))) {
        this.router.navigate(['classrooms']);
      } else {
        this.classroomDataChangedSubscription = this.classroomService.classroomDataChanged
          .subscribe(() => {
            this.getClassroomData(parseInt(params.get('cid'), 10));
          });
        this.getClassroomData(parseInt(params.get('cid'), 10));
      }
    });
  }

  private getClassroomData(classroomId: number) {
    this.classroomService.getClassroom(classroomId).subscribe((data: Classroom) => {
      this.classroom = data;
      this.classroomService.selectedClassroom = this.classroom;
    }, error => {
      console.log(error);
      if (error.status === 404) {
        this.router.navigate(['classrooms']);
      }
    });
  }

  openEditStudentModal(student?: Student) {
    this.studentEditModal.showModal(this.classroom, student);
  }

  onDataSaved() {
    this.classroomService.classroomDataChanged.next();
  }

  openDeleteModal(student: Student) {
    this.deleteModal.showStudentDeleteModal(student, this.classroom);
  }

  ngOnDestroy(): void {
    if (this.classroomDataChangedSubscription) {
      this.classroomDataChangedSubscription.unsubscribe();
    }
  }
}
