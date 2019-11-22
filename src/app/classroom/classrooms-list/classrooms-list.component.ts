import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Classroom} from '../../models/classroom.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassroomService} from '../classroom.service';

@Component({
  selector: 'app-classrooms-list',
  templateUrl: './classrooms-list.component.html',
  styleUrls: ['./classrooms-list.component.css']
})
export class ClassroomsListComponent implements OnInit {
  @Input() classrooms: Classroom[];
  @Output() selectedClassroomChanged = new EventEmitter<Classroom>();
  @Output() editSelected = new EventEmitter<Classroom>();
  @Output() deleteSelected = new EventEmitter<Classroom>();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private classroomService: ClassroomService) { }

  ngOnInit() {
  }

  onClassroomSelect(classroom: Classroom) {
    this.router.navigate([classroom.id], {relativeTo: this.route});
  }

  isSelected(c: Classroom) {
    return this.classroomService.selectedClassroom && this.classroomService.selectedClassroom.id === c.id;
  }
}
