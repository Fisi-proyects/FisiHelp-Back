import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(){
    try{
        const data ={
            from: "",
            to: [''],
            subject: 'Hello from Resend',
            html: '<h1>Hello from Resend</h1>'
        } 
    }
    catch(error){
        console.error(`Error sending email:`, error);
        throw error;
    }
}