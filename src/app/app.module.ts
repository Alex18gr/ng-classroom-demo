import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClassroomsComponent } from './classroom/classrooms/classrooms.component';
import { ClassroomsListComponent } from './classroom/classrooms-list/classrooms-list.component';
import { StudentsComponent } from './student/students/students.component';
import { ClassroomEditModalComponent } from './shared/classroom-edit-modal/classroom-edit-modal.component';
import { StudentEditModalComponent } from './shared/student-edit-modal/student-edit-modal.component';
import { StudentsListComponent } from './shared/students-list/students-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassroomsComponent,
    ClassroomsListComponent,
    StudentsComponent,
    ClassroomEditModalComponent,
    StudentEditModalComponent,
    StudentsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
