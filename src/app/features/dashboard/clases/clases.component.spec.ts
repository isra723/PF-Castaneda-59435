import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HttpClientTestingModule, provideHttpClientTesting } from "@angular/common/http/testing"
import { ClasesComponent } from "./clases.component"
import { SharedModule } from "../../../shared/shared.module"


describe("ClasesComponent", () => {
    let component: ClasesComponent
    let fixture: ComponentFixture<ClasesComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                SharedModule,
            ],
            providers: [
                provideHttpClientTesting(),
                //MockProvider()
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(ClasesComponent)
        component = fixture.componentInstance


    })

    it("El componente debe haber sido instanciado", () => {
        expect(component).toBeTruthy()
    })

    it("El componente debe borrar la clase satisfactoriamente", () => {
        const del = spyOn(component, "deleteClase")
        component.deleteClase("UFMHK")
        expect(del).toHaveBeenCalled()
    })

    it("Se debe de cargar los datos del servicio satistactoriamente", () => {
        const load = spyOn(component, "loadClase")
        component.loadClase()
        expect(load).toHaveBeenCalled()
    })
})