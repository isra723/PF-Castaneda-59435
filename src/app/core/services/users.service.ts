import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { concatMap, map, Observable, of } from 'rxjs';
import { generateRandomString } from '../../shared/utils';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseURL = environment.apiBaseURL
  
  constructor(private httpClient: HttpClient) {
    
  }

  getById(id: string): Observable<User | undefined> {
    return this.httpClient.get<User>(`${this.baseURL}/alumnos/${id}`)
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/alumnos`)

  }

  removeUserById(id: string): Observable<User[]> {
    return this.httpClient.delete<User>(`${this.baseURL}/alumnos/${id}`).pipe(concatMap(() => this.getUsers()))
  }

  updateUserById(id: string, update: Partial<User>) {
    return this.httpClient.patch<User>(`${this.baseURL}/alumnos/${id}`, update)
      .pipe(concatMap(() => this.getUsers()));
  }

  createAlumn(data: Omit<User, 'id'>): Observable<User>{
    return this.httpClient.post<User>(`${this.baseURL}/alumnos`, {
      ...data, 
      role: 'USER',
      datecreated: new Date().toISOString(),
      token: generateRandomString(10),

    })
  }
}