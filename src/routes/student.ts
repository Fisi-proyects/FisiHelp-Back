import express from 'express'
import { getStudentByDni, getStudents } from '../services/student.auth'
import { sendEmail } from '../services/email'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('Hello World!')
})

router.get('/all', (_req,res) => {
  const students = getStudents()
    students.then(students =>{
    res.status(200).json(students)
  }).catch(err =>{
    res.status(500).send(err)
  })
})

router.post('/auth', (req, res) => {
  const dni = req.body
  console.log(dni.dni)
  //password = dni.dni
  const student = getStudentByDni(dni.dni)
  student.then(student =>{
    console.log(student)
    if(null == student){
      res.status(404).send('No se encontro el alumno')
    }
    const response = {
      student: student,
      message: "Alumno encontrado, Se le enviara un correo de verificacion"
    }
    //envio del correo
    sendEmail(student.email, student.nombre, student.codigo)
    res.status(200).json(response)
  }).catch(err =>{
    res.status(400).send(err)
  })
})

router.post('/login', (req, res) => {
  const {email, password} = req.body
  
})
/* router.get("/auth/:dni", (req, res) => {
  const dni = req.params.dni
  const student = getStudentByDni(dni)
  student.then(student =>{
    if(null == student){
      res.status(404).send('No se encontro el alumno')
    }
    res.status(200).json(student)
  }).catch(err =>{
    res.status(400).send(err)
  })
}) */


export default router
