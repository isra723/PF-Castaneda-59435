import { Injectable } from "@angular/core";
import { AuthData } from "../../features/auth/models";
import { BehaviorSubject, map, Observable, of, throwError } from "rxjs";
import { User } from "../../features/dashboard/users/models";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authUser$ = new BehaviorSubject<null | User>(null)
    public authUser$ = this._authUser$.asObservable()

    constructor(private router: Router, private httpClient: HttpClient){

    }

    private handleAuthentication(alumns: User[]): User | null{
        if(!!alumns[0]){
            this._authUser$.next(alumns[0])
            localStorage.setItem("token", alumns[0].token)
            return alumns[0]
        }else{
            return null
            
        }
    }

    login(data: AuthData): Observable<User> {
        return this.httpClient
        .get<User[]>(
            `http://localhost:3000/alumnos?email=${data.email}&password=${data.password}`
        ).pipe(map((alumns) =>{ 
            const alumn = this.handleAuthentication(alumns)
            if(alumn){
                return alumn
            } else{
                throw throwError(() => new Error("Los datos con invalidos"))
            }
        }))
    }

    logOut(): void {
        this._authUser$.next(null)
        this.router.navigate(['auth', 'login'])
        localStorage.removeItem('token')
    }

    verifyToken(): Observable<boolean>{
        return this.httpClient.get<User[]>(
            `http://localhost:3000/alumnos?token=${localStorage.getItem('token')}`
        ).pipe(map((alums) => {
            const alumn = this.handleAuthentication(alums)
            return !!alumn
        }))
    }
}