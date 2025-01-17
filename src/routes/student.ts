import express from 'express'
import { getStudentByDni, getStudents, setPassword } from '../services/student.auth'
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

//haz que reciba parametros
router.get('/verify/:codigo', (req, res) => {
  const {codigo} = req.params
  console.log(codigo)
  res.send(`
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Change Password</title>
</head>
<body>
    <h1>Introduce tu nueva contraseña</h1>
    <div>
        <div >
            <div class="password-container">
                <input type="password" id="password" placeholder="Contraseña">
                <span class="toggle-password" onclick="togglePasswordVisibility()">👁️</span>
            </div>
            <button id="change_password">Cambiar Contraseña</button>
        </div>
    </div>
    <style>
        body{
            background-color: #ffffff;
        }
        h1{
            color: #000000;
            text-align: center;
            margin-top: 200px;
            font-family: "roboto";
        }
        div{
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            margin-top: 20px;
            align-items: center;
            justify-content: center;
        }
        .password-container{
            display: flex;
            gap: 10px;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
        }

        button{
            color:#0353a4;
            text-align: center;
            font-family: "roboto";
            display: block;
            text-align: center;
            margin-top: 20px;
        }
    </style>
    <script>
        function togglePasswordVisibility() {
            const passwordInput = document.getElementById('password');
            //alert('wasa');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        }

        document.getElementById("change_password").addEventListener("click", function(){

            let password = document.getElementById("password").value;
            if(password.length < 8){
                alert("La contraseña debe tener al menos 8 caracteres");
            }else{

                const data = {
                    codigo: ${parseInt(codigo)},
                    password: password
                }

                fetch("http://localhost:8000/change_password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then(response => response.json()).then(value => {
                    if(value.stats == "success"){
                        alert("Contraseña cambiada con éxito");
                        window.location.href = "http://localhost:8000/login";
                    }else{
                        alert("Error al cambiar la contraseña");
                    }
                }).catch((err) => {
                    console.log(err);
                    alert("Error al cambiar la contraseña");
                });
            }
        });

    </script>
</body>
</html>
    `)
})

router.post('/changePassword', (req, res) => {
  const {password, codigo} = req.body
  setPassword(codigo, password).then((student) => {
    res.status(200).json(student)
  }).catch(err => {
    res.status(400).send(err)
  })
})

router.post('/login', (req, res) => {
  const {email, password} = req.body

})

export default router
