import { Injectable } from "@angular/core";
import { AuthData } from "../../features/auth/models";
import { map, Observable } from "rxjs";
import { User } from "../../features/dashboard/users/models";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Store } from "@ngrx/store";
import { AuthActions } from "../../store/actions/auth.actions";
import { selectAuthAlumn } from "../../store/selector/auth.selector";


@Injectable({ providedIn: 'root' })
export class AuthService {
    public authAlumn$: Observable<User | null>
    private baseURL = environment.apiBaseURL

    constructor(private router: Router, private httpClient: HttpClient, private store: Store){
        this.authAlumn$ = this.store.select(selectAuthAlumn)
    }

    private handleAuthentication(alumns: User[]): User | null{
        if(!!alumns[0]){
            this.store.dispatch(AuthActions.setAuthAlumn( {alumn: alumns[0]} ))
            localStorage.setItem("token", alumns[0].token)
            return alumns[0]
        }else{
            return null
        }
    }

    login(data: AuthData): Observable<User> {
        return this.httpClient.get<User[]>(
            `${this.baseURL}/alumnos?email=${data.email}&password=${data.password}`
        ).pipe(map((alumns) =>{ 
            const alumn = this.handleAuthentication(alumns)
            if(alumn){
                return alumn
            } else{
                throw  new Error("Los datos son invalidos")
            }
        }))
    }

    logOut(): void {
        this.store.dispatch(AuthActions.unsetAuthAlumn())
        this.router.navigate(['auth', 'login'])
        localStorage.removeItem('token')
    }

    verifyToken(): Observable<boolean>{
        return this.httpClient.get<User[]>(
            `${this.baseURL}/alumnos?token=${localStorage.getItem('token')}`
        ).pipe(map((alums) => {
            const alumn = this.handleAuthentication(alums)
            return !!alumn
        }))
    }
}