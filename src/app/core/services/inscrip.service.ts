import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap, Observable } from "rxjs";
import { Ins } from "../../features/dashboard/inscrip/models";
import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class InscrpService {
    constructor(private httpClient: HttpClient){

    }

    getInscript(): Observable<Ins[]>{
        return this.httpClient.get<Ins[]>(`${environment.apiBaseURL}/inscrip?_embed=alumn&_embed=clas`)
    }

    createInscrip(payLoad: Omit<Ins , 'id'| 'alumno' | 'calse'>): Observable<Ins> {
        return this.httpClient.post<Ins>(`${environment.apiBaseURL}/inscrip`, payLoad)
    }

    removeInsById(id: string): Observable<Ins[]>{
        return this.httpClient.delete<Ins>(`${environment.apiBaseURL}/inscrip/${id}`)
        .pipe(concatMap(() => this.getInscript()))
    }

    updateInscripById(id: string, update: Partial<Ins>){
        return this.httpClient.patch<Ins>(`${environment.apiBaseURL}/inscrip/${id}`, update)
        .pipe(concatMap(() => this.getInscript()))
    }
}