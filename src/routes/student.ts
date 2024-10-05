import express from 'express'
import { getStudentByDni, getStudents } from '../services/student.auth'

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
  const dni:string = req.body
  console.log(dni)
  
  const student = getStudentByDni(dni)
  student.then(student =>{
    console.log(student)
    res.status(200).json(student)
  }).catch(err =>{
    res.status(400).send(err)
  })
})



export default router
