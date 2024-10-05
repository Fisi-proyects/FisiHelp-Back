import { PrismaClient } from "@prisma/client";

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