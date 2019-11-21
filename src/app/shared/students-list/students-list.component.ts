import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../models/student.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  @Input() students: Student[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onStudentSelected(student: Student) {
    this.router.navigate(['students', student.id]);
  }
}
