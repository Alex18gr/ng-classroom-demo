import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Classroom} from '../../models/classroom.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClassroomService} from '../../classroom/classroom.service';
import {Student} from '../../models/student.model';
import {StudentService} from '../../student/student.service';

declare var $: any;

@Component({
  selector: 'app-student-edit-modal',
  templateUrl: './student-edit-modal.component.html',
  styleUrls: ['./student-edit-modal.component.css']
})
export class StudentEditModalComponent implements OnInit {

  @ViewChild('modal', {static: false}) editModal: ElementRef;
  @Output() editFormSubmitted = new EventEmitter<Student>();
  studentForm: FormGroup;
  savingData = false;
  editMode = false;
  currentStudent: Student;
  currentClassroom: Classroom;
  title = '';

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(student?: Student) {
    this.studentForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      grade: new FormControl('', [
        Validators.min(0),
        Validators.max(20)
      ]),
      birthDate: new FormControl('', [
        Validators.required
      ])
    });
    if (student) {
      this.currentStudent = student;
      this.studentForm.setValue({
        firstName: this.currentStudent.firstName,
        lastName: this.currentStudent.lastName,
        grade: this.currentStudent.grade,
        birthDate: this.currentStudent.birthDate
      });
    } else {
      this.currentStudent = new Student(0);
    }
  }

  showModal(classroom: Classroom, student?: Student) {
    this.currentClassroom = classroom;
    $(this.editModal.nativeElement).modal();
    if (student) {
      this.title = 'Edit Student data';
      this.editMode = true;
    } else {
      this.title = 'Create new Student';
      this.editMode = false;
    }
    this.initForm(student);
  }

  hideModal() {
    this.currentStudent = null;
    this.currentClassroom = null;
    this.savingData = false;
    this.editMode = false;
    this.title = '';
    $(this.editModal.nativeElement).modal('hide');
  }

  onSaveChanges() {
    const formValues = this.studentForm.getRawValue();
    console.log(this.studentForm);
    this.currentStudent.firstName = formValues.firstName;
    this.currentStudent.lastName = formValues.lastName;
    this.currentStudent.birthDate = formValues.birthDate;
    this.currentStudent.grade = formValues.grade;
    this.savingData = true;
    if (this.editMode) {
      this.updateStudent();
    } else {
      this.saveStudent();
    }
  }

  saveStudent() {
    this.studentService.saveStudent(this.currentClassroom, this.currentStudent).subscribe((data: Student) => {
        this.editFormSubmitted.emit(data);
        console.log(data);
        this.hideModal();
      },
      (error => {
        this.savingData = false;
      }));
  }

  updateStudent() {
    this.studentService.updateStudent(this.currentClassroom, this.currentStudent).subscribe((data: Student) => {
        this.editFormSubmitted.emit(data);
        console.log(data);
        this.hideModal();
      },
      (error => {
        this.savingData = false;
      }));
  }

  getErrorsList(component: AbstractControl) {
    const errors = [];
    if (component.errors.required) {
      errors.push('Field required');
    }
    if (component.errors.min) {
      errors.push('The value must be between 0 and 20');
    }
    if (component.errors.max) {
      errors.push('The value must be between 0 and 20');
    }
    return errors;
  }

  formTouchedCondition(control: AbstractControl) {
    return control.invalid && (control.dirty || control.touched);
  }

  isInvalidControlCondition(control: AbstractControl) {
    return control.invalid && this.formTouchedCondition(control);
  }
}
