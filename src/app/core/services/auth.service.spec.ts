import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { AuthData } from "../../features/auth/models"
import { User } from "../../features/dashboard/users/models"
import { MockProvider } from 'ng-mocks';
import { NavigationExtras, Router } from "@angular/router"

const alumnData: User = {
    id: "ae0c",
    firstName: "Israelfake",
    lastName: "Pina",
    email: "israelfake@gmail.com",
    password: "12345",
    role: "ADMIN",
    token: "quihflskadjhlknjsad",
    datecreated: new Date()
}

const mockAuthData: AuthData = {
    email: 'israelfake@gmail.com',
    password: '12345',
};

describe("AuthService", () => {
    let service: AuthService
    let httpController: HttpTestingController
    let router: Router

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                AuthService,
                MockProvider(Router, { navigate: (commands: any[], extras?: NavigationExtras) => { 
                    return new Promise((res) => res(true)) 
                }})
            ]
        })

        httpController = TestBed.inject(HttpTestingController)
        service = TestBed.inject(AuthService)
        localStorage.clear()
        router = TestBed.inject(Router)
    })

    it("El servicio debe ser definido", () => {
        expect(service).toBeTruthy()
    })

    it("Al realizar el login se debe de crear el token el local storage", (done) => {
        service.login(mockAuthData).subscribe({
            next: (alumn)=> {
                expect(alumn).toEqual(alumnData)
                expect(localStorage.getItem('token')).toEqual(alumnData.token)
                done()
            }
        })
        const req = httpController.expectOne({
            url: `${service['baseURL']}/alumnos?email=${mockAuthData.email}&password=${mockAuthData.password}`,
            method: 'GET'
        })
        req.flush([alumnData])
    })

    it("Debe retornar un error cuando el login es incorrecto", (done) => {
        service.login(mockAuthData).subscribe({
            error: (err) => {
                expect(err).toBeInstanceOf(Error)
                expect(err['message']).toBe('Los datos son invalidos')
                done()
            }
        })

        const req = httpController.expectOne({
            url: `${service['baseURL']}/alumnos?email=${mockAuthData.email}&password=${mockAuthData.password}`,
            method: 'GET'
        })
        req.flush([])
    })

    it("Al momento de realizar el logout, verificar que se borre el token", () => {
        service.logOut()
        const token = localStorage.getItem('token')
        expect(token).toBeFalsy()
    })

    it("Debe desestablecer el autenticamiento", () => {
        service.login(mockAuthData).subscribe()
        const req = httpController.expectOne({
            url: `${service['baseURL']}/alumnos?email=${mockAuthData.email}&password=${mockAuthData.password}`,
            method: 'GET'
        })
        req.flush([alumnData])
        service.logOut()

        service.authUser$.subscribe({
            next: (alumn) => {
                expect(alumn).toBeNull()
            }
        })

        
    })

    it("Debe de redirigir a /auth/login", () =>{
        service.login(mockAuthData).subscribe()
        const req = httpController.expectOne({
            url: `${service['baseURL']}/alumnos?email=${mockAuthData.email}&password=${mockAuthData.password}`,
            method: 'GET'
        })
        req.flush([alumnData])
        
        const spyNavigate = spyOn(router, 'navigate')
        service.logOut()
        expect(spyNavigate).toHaveBeenCalledOnceWith(['auth', 'login'])
    })

    
   
})