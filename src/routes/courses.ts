import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get("/open-sections", async (req: Request, res: Response) => {
  const maxStudentsPerSection = 30;
  const minStudents = 8;

  try {
    const courses = await prisma.curso.findMany({
      where: {
        aprobados: {
          gte: minStudents 
        }
      },
      select: {
        codigo: true,
        aprobados: true,
        curso_posterior: true, 
      },
    });

    const continuationCourses: { [key: string]: { approved: number; failed: number } } = {};

    // Ya pongan data dummy pe
    const continuationCoursesData = await prisma.curso.findMany({
      where: {
        prerequisito: {
          in: courses.map(course => course.codigo), // Buscar cursos que son continuación de los cursos aprobados
        }
      },
      select: {
        codigo: true,
        aprobados: true,
        desaprobados: true,
      },
    });

    continuationCoursesData.forEach(course => {
      continuationCourses[course.codigo] = {
        approved: course.aprobados,
        failed: course.desaprobados,
      };
    });

    const sectionResults = continuationCoursesData.map(course => {
      const totalStudents = courses.find(c => c.curso_posterior === course.codigo)?.aprobados || 0;

      if (totalStudents < minStudents) {
        return { course: course.codigo, sections: 0, message: "No se puede abrir sección" };
      }

      const sections = Math.ceil(totalStudents / maxStudentsPerSection);
      const sectionDistribution = [];
      let remainingStudents = totalStudents;

      for (let i = 0; i < sections; i++) {
        const studentsInSection = Math.min(remainingStudents, maxStudentsPerSection);
        sectionDistribution.push(studentsInSection);
        remainingStudents -= studentsInSection;
      }

      return { course: course.codigo, sections, sectionDistribution };
    });

    res.status(200).send(sectionResults);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al obtener las secciones." });
  }
});

//test
router.get("/courses", async (req: Request, res: Response) => {
    try {
      const cursos = await prisma.curso.findMany({
        select: {
          id: true,
          codigo: true,
          creditos: true,
          cupos: true,
          matriculados: true,
          aprobados: true,
          desaprobados: true,
          nro_salon: true,
          prerequisito: true,
          curso_posterior: true,
        },
      });
      res.status(200).json(cursos);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al obtener los cursos." });
    }
  });

export default router;
