import { createTransport } from "nodemailer";
import config from '../../config/config.js';


const transporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
});

const createMsgRegister = (first_name) => {
    return (
      `<h2>Hola ${first_name}, ahora podés usar nuestros servicios</h2>`
    )};

const createMsgInactiveUser = (first_name) => {
    return (
        `<h2>Hola ${first_name}, dimos de baja tu cuenta por inactividad</h2>`
    )};

export const sendMail = async ( user, service, token = null) => {
    try {
        const { first_name, email } = user;
        let message = '';
        let subj = '';

       switch(service) {
        case "register":
            message = createMsgRegister(first_name);
            subj = 'Registro existoso';
            break;
        case "inactiveUser":
            message = createMsgInactiveUser(first_name);
            subj = 'Eliminación de cuenta';
            break;
        default:
            message = "";
            break;
       };

       const gmailOptions = {
        from: config.EMAIL,
        to: email,
        subject: subj,
        html: message
       };

       const response = await transporter.sendMail(gmailOptions)
       if(token !== null) {
        return token
       }else {
        return (
            console.log("Mail enviado", response)
        )
       }

    }catch(error){
        throw new Error (error.message);
    };
};