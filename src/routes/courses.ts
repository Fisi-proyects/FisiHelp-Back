import { Router } from "express";

const router = Router();

const courses = [
  { name: "Algorítmica 1", approved: 50, failed: 5 },
  { name: "Redacción 1", approved: 50, failed: 5 },
  { name: "Calculo 1", approved: 20, failed: 10 },
];

const continuationCourses = [
  { name: "Algorítmica 2", approved: 0, failed: 0 },
  { name: "Redacción 2", approved: 0, failed: 0 },
  { name: "Calculo 2", approved: 0, failed: 0 },
];

router.get(
  "/open-sections",
  async (req, res) => {
    const maxStudentsPerSection = 30;
    const minStudents = 8;

    const sectionResults = continuationCourses.map((course, index) => {
      const totalStudents = courses[index].approved; // Usar la cantidad de aprobados del curso anterior

      if (totalStudents < minStudents) {
        return { course: course.name, sections: 0, message: "No se puede abrir sección" };
      }

      const sections = Math.ceil(totalStudents / maxStudentsPerSection);
      const sectionDistribution = [];
      let remainingStudents = totalStudents;

      for (let i = 0; i < sections; i++) {
        const studentsInSection = Math.min(remainingStudents, maxStudentsPerSection);
        sectionDistribution.push(studentsInSection);
        remainingStudents -= studentsInSection;
      }

      return { course: course.name, sections, sectionDistribution };
    });

    res.status(200).send(sectionResults);
  },
);

export default router;

