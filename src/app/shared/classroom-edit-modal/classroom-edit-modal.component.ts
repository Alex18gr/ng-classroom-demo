import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Classroom} from '../../models/classroom.model';
import {ClassroomService} from '../../classroom/classroom.service';

declare var $: any;

@Component({
  selector: 'app-classroom-edit-modal',
  templateUrl: './classroom-edit-modal.component.html',
  styleUrls: ['./classroom-edit-modal.component.css']
})
export class ClassroomEditModalComponent implements OnInit {
  @ViewChild('modal', {static: false}) editModal: ElementRef;
  @Output() editFormSubmitted = new EventEmitter<Classroom>();
  classroomForm = new FormGroup({
    name: new FormControl('')
  });
  savingData = false;
  editMode = false;
  currentClassroom: Classroom;
  title = '';

  constructor(private classroomService: ClassroomService) { }

  ngOnInit() {

  }

  initForm(classroom?: Classroom) {
    this.classroomForm = new FormGroup({
      name: new FormControl('')
    });
    if (classroom) {
      this.currentClassroom = classroom;
      this.classroomForm.setValue({
        name: classroom.name
      });
    } else {
      this.currentClassroom = new Classroom(0);
    }
  }

  showModal(classroom?: Classroom) {
    $(this.editModal.nativeElement).modal();
    if (classroom) {
      this.title = 'Edit Classroom';
      this.editMode = true;
    } else {
      this.title = 'Create new Classroom';
      this.editMode = false;
    }
    this.initForm(classroom);
  }

  hideModal() {
    this.currentClassroom = null;
    this.savingData = false;
    this.title = '';
    this.editMode = false;
    $(this.editModal.nativeElement).modal('hide');
  }

  onSaveChanges() {
    this.currentClassroom.name = this.classroomForm.getRawValue().name;
    this.savingData = true;
    if (this.editMode) {
      this.updateClassroom();
    } else {
      this.saveClassroom();
    }
    // this.editFormSubmitted.emit(this.currentClassroom);
    // this.hideModal();
  }

  saveClassroom() {
    this.classroomService.saveClassroom(this.currentClassroom).subscribe((data: Classroom) => {
        this.editFormSubmitted.emit(data);
        console.log(data);
        this.hideModal();
      },
      (error => {
        this.savingData = false;
      }));
  }

  private updateClassroom() {
    this.classroomService.updateClassroom(this.currentClassroom).subscribe((data: Classroom) => {
      this.editFormSubmitted.emit(data);
      this.hideModal();
    }, error => {
      this.savingData = false;
    });
  }
}
