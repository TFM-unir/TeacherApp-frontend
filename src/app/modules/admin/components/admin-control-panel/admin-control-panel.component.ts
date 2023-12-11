import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.css'],
})
export class AdminControlPanelComponent {
  router = inject(Router);

  userService = inject(UsersService);

  teachers: User[] = [];
  students: User[] = [];

  showTeachers: boolean = true;
  showStudents: boolean = false;

  ngOnInit() {
    this.getAllUsers();
  }

  async getAllUsers(): Promise<void> {
    try {
      const response = await this.userService.getAllUsers();

      this.teachers = response.teachers;
      this.students = response.students;

    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  }

  async updateUserStatus(userId: number, status: number): Promise<void> {
    try {
      const response = await this.userService.updateUserStatus(userId, status);

      // // Buscar si es un teacher para actualizar después el array de teachers
      // const updatedTeacher = this.teachers.find(teacher => teacher.id === userId && teacher.role_id === 2);

      // // Buscar si es un student para actualizar después el array de students
      // const updatedStudent = this.students.find(student => student.id === userId && student.role_id === 1);

      // console.log('Updated Student: ', updatedStudent);
      // console.log('Updated Teacher: ', updatedTeacher);

      // if (updatedTeacher) {
      //   console.log('it is a teacher!');
      //   updatedTeacher.status = status;
      // }
      // if (updatedStudent) {
      //   console.log('it is a student!');
      //   updatedStudent.status = status;
      // }

      this.getAllUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  }

  showTeachersOrStudents(): void {
    this.showTeachers = !this.showTeachers;
    this.showStudents = !this.showStudents;
  }
}
