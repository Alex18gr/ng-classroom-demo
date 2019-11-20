import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Classroom} from '../../models/classroom.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-classrooms-list',
  templateUrl: './classrooms-list.component.html',
  styleUrls: ['./classrooms-list.component.css']
})
export class ClassroomsListComponent implements OnInit {
  @Input() classrooms: Classroom[];
  @Output() selectedClassroomChanged = new EventEmitter<Classroom>();

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onClassroomSelect(classroom: Classroom) {
    this.router.navigate([classroom.id], {relativeTo: this.route});
  }

}
