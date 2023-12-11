import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/core/models/student.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { StudentService } from 'src/app/core/services/student.service';
import { TeacherService } from 'src/app/core/services/teacher.service';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.css']
})
export class AdminControlPanelComponent {

  router = inject(Router);

  teacherService = inject(TeacherService);
  studentService = inject(StudentService);

  teachers: TeacherProfile[] = [];
  students: Student[] = [];

  showTeachers: boolean = true;
  showStudents: boolean = false;

  ngOnInit() {
    this.getAllTeachers();
    this.getAllStudents();
  };

  async getAllTeachers(): Promise<void> {
    try {
      this.teachers = await this.teacherService.getAllTeachers();
    } catch (error) {
      console.error('Error fetching teachers:', error);
    };
  };

  async getAllStudents() {
    try {
      this.students = await this.studentService.getAllStudents();
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  showTeachersOrStudents(): void {
    this.showTeachers = !this.showTeachers;
    this.showStudents = !this.showStudents;
  };
};
