import { Injectable } from "@angular/core";
import { Clase } from "../../features/dashboard/clases/models";
import { generateRandomString } from "../../shared/utils";
import { Observable, of } from "rxjs";

export let MY_DATABASE: Clase[] = [
    {
        id: generateRandomString(5),
        name: "Clase-01",
        horario: "17:30 - 19:30",
        categoryId: 'angular'
    },
    {
        id: generateRandomString(5),
        name: "Clase-02",
        horario: "16:30 - 19:30",
        categoryId: "javascript"
    }
]

@Injectable({providedIn: 'root'})
export class ClasesService{
    getClases(): Observable<Clase[]>{
        return of([...MY_DATABASE])
    }

    deleteById(id: string): Observable<Clase[]>{
        MY_DATABASE = MY_DATABASE.filter((p) => p.id !== id)
        return this.getClases()
    }

    createClase(data: Omit<Clase, 'id'>): Observable<Clase[]>{
        MY_DATABASE.push({...data, id: generateRandomString(4)})
        return this.getClases()
    }
}