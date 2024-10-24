import { Injectable } from "@angular/core";
import { Course } from "../../features/dashboard/cursos/models";
import { generateRandomString } from "../../shared/utils";
import { map, Observable, of } from "rxjs";


let DATABASE: Course[] = [
    {
        id: 'fakjshdf',
        courseName: 'Angular',
        datecreated: new Date(),
        token: generateRandomString(20)
    }
]

@Injectable({
    providedIn: "root",
})
export class CourseService {
    constructor(){

    }

    getById(id: string):Observable<Course | undefined>{
        return this.getUsers().pipe(map((courses) => courses.find((c) => c.id === id)))
    }

    getUsers(): Observable <Course[]>{
        return new Observable((observer) => {
            setInterval(() => {
                observer.next(DATABASE)
                observer.complete()
            })
        })
    }

    removeCourseById(id: string): Observable<Course[]>{
        DATABASE = DATABASE.filter((course) => course.id != id)
        return of(DATABASE)
    }

    updateCourseById(id: String, update: Partial<Course>){
        DATABASE = DATABASE.map((course) => course.id === id ? { ...course, ...update} : course)

        return new Observable<Course[]>((observer) => {
            setInterval(() => {
                observer.next(DATABASE)
                observer.complete()
            })
        })
    }
}