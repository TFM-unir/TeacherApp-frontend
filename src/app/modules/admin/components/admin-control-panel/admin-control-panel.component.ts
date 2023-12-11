import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/core/models/student.interface';
import { TeacherProfile } from 'src/app/core/models/teacher.interface';
import { StudentService } from 'src/app/core/services/student.service';
import { TeacherService } from 'src/app/core/services/teacher.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.css']
})
export class AdminControlPanelComponent {

  router = inject(Router);

  userService = inject(UsersService)

  // Alomejor no hace falta
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

  async updateUserStatus(userId: number, status: number): Promise<void> {
    try {
      const response = await this.userService.updateUserStatus(userId, status);
      // teacher updated:
      console.log(userId);
      console.log(this.teachers);
      console.log(this.students);
      
      
      console.log('User status updated successfully:', response);

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

      this.getAllStudents();
      this.getAllTeachers();

    } catch (error) {
      console.error('Error updating user status:', error);
    }
  }

  showTeachersOrStudents(): void {
    this.showTeachers = !this.showTeachers;
    this.showStudents = !this.showStudents;
  };
};

// IBA ANTES DE QUERER PILLAR STUDENTS Y TEACHERS
// export class AdminControlPanelComponent {

//   router = inject(Router);

//   userService = inject(UsersService)

//   // Alomejor no hace falta
//   teacherService = inject(TeacherService);
//   studentService = inject(StudentService);

//   teachers: TeacherProfile[] = [];
//   students: Student[] = [];

//   showTeachers: boolean = true;
//   showStudents: boolean = false;

//   ngOnInit() {
//     this.getAllTeachers();
//     this.getAllStudents();
//   };

//   async getAllTeachers(): Promise<void> {
//     try {
//       this.teachers = await this.teacherService.getAllTeachers();
//     } catch (error) {
//       console.error('Error fetching teachers:', error);
//     };
//   };

//   async getAllStudents() {
//     try {
//       this.students = await this.studentService.getAllStudents();
//     } catch (error) {
//       console.error('Error fetching students:', error);
//     }
//   };

//   async updateUserStatus(userId: number, status: number): Promise<void> {
//     try {
//       const response = await this.userService.updateUserStatus(userId, status);
//       console.log('User status updated successfully:', response);

//       // Actualizar array de teachers o students
//       const updatedTeacher = this.teachers.find(teacher => teacher.id === userId);
//       if (updatedTeacher) {
//         updatedTeacher.status = status;
//       }

//     } catch (error) {
//       console.error('Error updating user status:', error);
//       // Handle error, if needed
//     }
//   }

//   showTeachersOrStudents(): void {
//     this.showTeachers = !this.showTeachers;
//     this.showStudents = !this.showStudents;
//   };
// };