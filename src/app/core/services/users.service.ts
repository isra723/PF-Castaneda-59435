import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { map, Observable, of } from 'rxjs';
import { generateRandomString } from '../../shared/utils';

let DATABASE: User[] = [
  {
    id: 'skahgil',
    firstName: 'jose',
    lastName: 'israel',
    password: '123456',
    email: 'israel@gmail.com',
    datecreated: new Date(),
    token: generateRandomString(20),
    
  },
];

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getById(id: string): Observable<User | undefined> {
    return this.getUsers().pipe(map((users) => users.find((u) => u.id === id)));
  }

  getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(DATABASE);
        observer.complete();
      });
    });
  }

  removeUserById(id: string): Observable<User[]> {
    DATABASE = DATABASE.filter((user) => user.id != id);
    return of(DATABASE);
  }

  updateUserById(id: string, update: Partial<User>) {
    DATABASE = DATABASE.map((user) =>
      user.id === id ? { ...user, ...update } : user
    );

    return new Observable<User[]>((observer) => {
      setInterval(() => {
        observer.next(DATABASE);
        observer.complete();
      }, 1000);
    });
  }
}