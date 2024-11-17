import { Injectable } from "@angular/core";
import { Clase } from "../../features/dashboard/clases/models";
import { generateRandomString } from "../../shared/utils";
import { concatMap, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class ClasesService{
    private baseURL = environment.apiBaseURL

    constructor(private httpClient: HttpClient){

    }

    getById(id: string): Observable<Clase | undefined>{
        return this.httpClient.get<Clase>(`${this.baseURL}/clases/${id}`)
    }

    getClases(): Observable<Clase[]>{
        return this.httpClient.get<Clase[]>(`${this.baseURL}/clases`)
    }

    removeClaseById(id: string): Observable<Clase[]>{
        return this.httpClient.delete<Clase>(`${this.baseURL}/clases/${id}`)
        .pipe(concatMap(() => this.getClases()))
    }

    createClase(data: Omit<Clase, 'id'>): Observable<Clase>{
        return this.httpClient.post<Clase>(`${this.baseURL}/clases`, {
            ...data,
            categoryid: generateRandomString(5)
        })
    }

    updateClaseById(id: string, update: Partial<Clase>){
        return this.httpClient.patch<Clase>(`${this.baseURL}/clases/${id}`, update)
        .pipe(concatMap(() => this.getClases()))
    }
}