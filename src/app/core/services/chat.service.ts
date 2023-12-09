import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Chats } from '../models/chat.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl: string = 'http://localhost:3000/api/chats/';
  private httpClient = inject(HttpClient);
  

  constructor() { }

  contactTeacher(values: Chats) {

    /* const httpOptions = {
      headers: new HttpHeaders({
        authorization: localStorage.getItem('auth_token')! // para que no de error usamos la exclamación 
      })
    } */

    return lastValueFrom(
      this.httpClient.post<Chats>(`${this.baseUrl}`, values/* , httpOptions */)
    );
  }
}