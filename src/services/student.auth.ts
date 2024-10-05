import { PrismaClient } from "@prisma/client";
import { comparePassword, hashPassword } from "../utils/utils";
import { error } from "node:console";

const prisma = new PrismaClient();

export async function getStudents() {
    console.log('getStudents');
    return await prisma.alumno.findMany();
}

export async function getStudentById(id: number) {
    return await prisma.alumno.findUnique({
        where: {
            id: id
        }
    });
}

export async function getStudentByDni(dni: string) {
    try {
        return await prisma.alumno.findUnique({
            where: {
                DNI: dni
            }
        });
    } catch (error) {
        console.error(`Error fetching student with DNI ${dni}:`, error);
        throw error;
    }
}

export async function getStudentByEmail(email: string) {
    return await prisma.alumno.findFirst({
        where:{
            email: email
        }
    })
}

export async function setPassword(codigo: number, password: string) {
    try {
        const hashedPassword = await hashPassword(password);
        return await prisma.alumno.update({
            where: {
                codigo: codigo
            },
            data: {
                password: hashedPassword
            }
        });
    } catch (error) {
        console.error(`Error updating student with codigo ${codigo}:`, error);
        throw error;
    }
}


export async function login(email:string, password: string){
    const student = await getStudentByEmail(email).then((value) => {
        
        if(value != null){
            
            if(value.password == ""){
                return new error("Falta validar su correo");

            }
            
            const dato = comparePassword(password, value.password);
            if(dato){
                return {alumno:student, message: "Bienvenido"};
            }
            else{
                return {error: "Contraseña incorrecta"};
            }
        }
    })

}