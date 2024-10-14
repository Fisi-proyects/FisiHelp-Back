import express from 'express';
import cors from 'cors';
import student from './routes/student';
import reserva from './routes/reserva';
import courses from './routes/courses';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/alumnos', student);
app.use('/reservas', reserva);

app.use('/cursos', courses); // Agrega la ruta para cursos

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
