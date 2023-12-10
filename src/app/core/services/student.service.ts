import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user.interface';
import { Subject } from '../models/subject.interface';
import { Ratings } from '../models/ratings.interface';
import { TeacherProfile } from '../models/teacher.interface';
import { Student } from '../models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  //inyectamos el httpclient
  private httpClient = inject(HttpClient)
  // creamos la base del url para las peticiones
  private baseUrlStudent: string = 'http://localhost:3000/api/students/';
  private baseUrlSubjects: string = 'http://localhost:3000/api/subjects/';
  private baseUrlRanking: string = 'http://localhost:3000/api/ratings/user/';
  private baseUrlTeacher: string = 'http://localhost:3000/api/teachers/';
  private baseUrlRankingUpdate: string = 'http://localhost:3000/api/ratings/';

  getAllStudents() {
    return lastValueFrom(
      this.httpClient.get<Student[]>(`${this.baseUrlStudent}`)
    );
  }

  getStudentById(id: number) {
    return lastValueFrom(
      this.httpClient.get<User>(`${this.baseUrlStudent}${id}`)
    );
  };

  getSubjectById(id: number) {
    return lastValueFrom(
      this.httpClient.get<Subject>(`${this.baseUrlSubjects}${id}`)
    );
  };

  getRatingByUserIdAndTeacherId(userId: number, teacherId: number) {
    return lastValueFrom(
      this.httpClient.get<Ratings>(`${this.baseUrlRanking}${userId}/teacher/${teacherId}`)
    );
  };

  getTeacherById(id: number) {
    return lastValueFrom(
      this.httpClient.get<TeacherProfile>(`${this.baseUrlTeacher}${id}`)
    );
  };

  updateRatingByRankingIdAndComment(rankingId: number, teacherComment: string) {
    const values = { id: rankingId, comment_teacher: teacherComment }
    return lastValueFrom(
      this.httpClient.put<any>(`${this.baseUrlRankingUpdate}update/${rankingId}`, values)
    );
  };

};




