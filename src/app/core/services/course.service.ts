import { Injectable } from "@angular/core";
import { Course } from "../../features/dashboard/cursos/models";
import { generateRandomString } from "../../shared/utils";
import { concatMap, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class CourseService {
    private baseURL = environment.apiBaseURL
    constructor(private httpClient: HttpClient){

    }

    getById(id: string):Observable<Course | undefined>{
        return this.httpClient.get<Course>(`${this.baseURL}/cursos/${id}`)
    }

    getCourses(): Observable <Course[]>{
        return this.httpClient.get<Course[]>(`${this.baseURL}/cursos`)
    }

    removeCourseById(id: string): Observable<Course[]>{
        return this.httpClient.delete<Course>(`${this.baseURL}/cursos/${id}`).pipe(concatMap(() => this.getCourses()))
    }

    updateCourseById(id: String, update: Partial<Course>){
        return this.httpClient.patch<Course>(`${this.baseURL}/cursos/${id}`, update)
        .pipe(concatMap(() => this.getCourses()))
    }

    createCourse(data: Omit<Course, "id">): Observable<Course>{
       return this.httpClient.post<Course>(`${this.baseURL}/cursos`, {
        ...data,
        datecreated: new Date().toISOString(),
        token: generateRandomString(15),
       })
    }
}