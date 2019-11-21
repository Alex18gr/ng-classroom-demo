import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Classroom} from '../../models/classroom.model';
import {ClassroomService} from '../../classroom/classroom.service';
import {Student} from '../../models/student.model';
import {StudentService} from '../../student/student.service';

declare var $: any;

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @ViewChild('modal', {static: false}) deleteModal: ElementRef;
  @Output() editFormSubmitted = new EventEmitter<Classroom>();
  deletingData = false;
  deleteClassroomMode = false;
  deletingComponent: Classroom | Student;
  currentClassroom: Classroom;
  title = '';
  message = '';
  Student = Student;
  Classroom = Classroom;

  constructor(private classroomService: ClassroomService,
              private studentService: StudentService) { }

  ngOnInit() {
  }

  // showModal(component?: Classroom | Student, currentClassroom?: Classroom) {
  //   this.deletingComponent = component;
  //   if (this.deletingComponent instanceof Classroom) {
  //     this.title = 'Delete Classroom ' + this.deletingComponent.name;
  //     this.message = 'Are you sure you want to delete classroom ' + this.deletingComponent.name + '?';
  //   } else if (this.deletingComponent instanceof Student) {
  //     this.currentClassroom = currentClassroom;
  //     this.title = 'Delete Student ' + this.deletingComponent.firstName + ' ' + this.deletingComponent.lastName;
  //     this.message = 'Are you sure you want to delete student ' + this.deletingComponent.firstName + ' '
  //       + this.deletingComponent.lastName + '?';
  //   }
  //   $(this.deleteModal.nativeElement).modal();
  // }

  showClassroomDeleteModal(component: Classroom) {
    this.deletingComponent = component;
    this.deleteClassroomMode = true;
    this.title = 'Delete Classroom ' + this.deletingComponent.name;
    this.message = 'Are you sure you want to delete classroom ' + this.deletingComponent.name + '?';
    $(this.deleteModal.nativeElement).modal();
  }

  showStudentDeleteModal(component: Student, currentClassroom: Classroom) {
    this.deletingComponent = component;
    this.deleteClassroomMode = false;
    this.currentClassroom = currentClassroom;
    this.title = 'Delete Student ' + this.deletingComponent.firstName + ' ' + this.deletingComponent.lastName;
    this.message = 'Are you sure you want to delete student ' + this.deletingComponent.firstName + ' '
      + this.deletingComponent.lastName + '?';
    $(this.deleteModal.nativeElement).modal();
  }

  hideModal() {
    this.deletingComponent = null;
    this.currentClassroom = null;
    this.title = '';
    this.message = '';
    $(this.deleteModal.nativeElement).modal('hide');
  }

  onDelete() {
    if (this.deleteClassroomMode) {
      this.deleteClassroom();
    } else {
      this.deleteStudent();
    }
  }

  private deleteClassroom() {
    this.deletingData = true;
    this.classroomService.deleteClassroom(this.deletingComponent as Classroom)
      .subscribe(() => {
        this.deletingData = false;
          this.editFormSubmitted.emit();
        this.hideModal();
      },
        error => {
          this.deletingData = false;
        });
  }

  private deleteStudent() {
    this.deletingData = true;
    this.studentService.deleteStudent(this.currentClassroom, this.deletingComponent as Student)
      .subscribe(() => {
        this.deletingData = false;
        this.editFormSubmitted.emit();
        this.hideModal();
      }, error => {
        this.deletingData = false;
      });
  }
}
