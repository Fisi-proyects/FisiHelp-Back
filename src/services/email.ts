import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendEmail(email: string, nombre: string, codigo: number) {
    try{
        const data =await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [email],
            subject: 'Correo de verificacion',
            html: `<h1>Gracias por verificar tu correo ${nombre}</h1><p>Por favor, haz click en el siguiente enlace para verificar tu correo</p>
            <a href="http://localhost:3000/verify/${codigo}">Verificar correo
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