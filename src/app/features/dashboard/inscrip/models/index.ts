import { Clase } from "../../clases/models";
import { User } from "../../users/models";

export interface Ins{
    id: string
    alumnId: string
    clasId: string
    alumno?: User
    clase?: Clase
}