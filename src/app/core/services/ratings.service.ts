import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Ratings } from '../models/ratings.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  private baseUrlRatings: string = 'http://localhost:3000/api/ratings/';
  private httpClient = inject(HttpClient);

  constructor() { }

  newRating(values: Ratings) {
    return lastValueFrom(
      this.httpClient.post<Ratings>(`${this.baseUrlRatings}`, values)
    );
  }

  getRatingsByUserAndTeacher(teacherId:number, userId:number): any {
    const secondaryRoute = "/user/"+userId+"/teacher/"+teacherId;
    return lastValueFrom(
      this.httpClient.get<Ratings>(`${this.baseUrlRatings}`+secondaryRoute)
    );
  }
}
