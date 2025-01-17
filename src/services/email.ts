import { Resend } from "resend";



const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendEmail(email: string, nombre: string, codigo: number) {
    try{
        const data =await resend.emails.send({
            from: "admin@vizcacha.lol",
            to: [email],
            subject: 'Correo de verificacion',
            html: `

            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>email_message</title>
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900' rel='stylesheet' type='text/css'>
</head>
<body>
    <h1>Gracias por verificar tu correo con nosotros</h1>
    <h3>Hola ${nombre}, haz click al siguiente enlace para verificar tu correo</h3>
    <img src="https://hackathonvirtual.softaki.com/fisi.png" alt="">
    <a href="http://localhost:3000/alumnos/verify/${codigo}" target="_blank">Verificar Correo</a>
</body>
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
    h3{
        color: #000000;
        text-align: center;
        font-family: "roboto";
    }
    img{
        display: block;
        margin: 0 auto;
        margin-top: 20px;
    }
    a{
        color:#0353a4;
        text-align: center;
        font-family: "roboto";
        display: block;
        text-align: center;
        margin-top: 20px;
        
    }
</style>
</html>

            `
        })
        console.log(data);
        console.log("Sending email..."); 
    }
    catch(error){
        console.error(`Error sending email:`, error);
        throw error;
    }
}