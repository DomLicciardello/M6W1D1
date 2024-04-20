import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { authorsRoute } from "./services/routes/authorsRoute.js";
import { blogPostRoute } from "./services/routes/blogPostRoute.js";
import logger from "./services/middlewares/logger.js";
import { badRequestHandler, genericErrorHandle, notFoundHandler, unathorizedHandler } from "./services/middlewares/errorHandler.js";
//import nodemailer from "nodemailer";

// Tutti i file .env saranno legibilli all'interno dell' applicazione.
config();
const PORT = process.env.PORT || 3001;
// Utilizzo la porta 3001 perché il server react (lato frontend) lavora sulla porta 3000.

// Creo il server:
const app = express();

// Middleware di terze parti: abilita comunicazione con dati JSON.
app.use(express.json());

// Middleware: logger richieste http, va messa prima delle routes.
app.use(logger);

// Importo le routes:
app.use("/authors", authorsRoute); //aggiungendo ,logger nella parentesi (tra "/authors" e authorsRoute) usiamo il middlewear solo in quella singola route.
app.use("/blogpost", blogPostRoute);

// Collegamento Middleware 404 Route:
app.get("/*", function(req, res, next) {
    const error = new Error("404 Not Found!");
    error.status = 404;
    next(error);
});

// Middleware: gestione errore da posizionare dopo le route:
app.use(unathorizedHandler);
app.use(badRequestHandler);
app.use(notFoundHandler);
app.use(genericErrorHandle); // Gestore errore generico va messo sempre per ultimo.

const initServer = async () => {
    try {
        // Accesso al database, prima di avviare il server:
        await mongoose.connect(process.env.DBURL);
        console.log ("Connesso al database!")

        // Abilitazione del server, successiva all'accesso al database:
        app.listen(PORT, () => {
        console.log(`Il nostro server sta ascoltando alla porta ${PORT}.`);
        });

    } catch (err) {
        console.log ("Connessione al database fallita!", err);
    }
};

initServer();

// Funzione per inviare mail:
/* const sendEmail = async () => {
    nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.SMTP_MAIL_USERNAME,
            pass: process.env.SMTP_MAIL_PASSWORD,
},
    });

    const mail = await transporter.sendMail({
        from: "Epicode Tester <stephon"
    })

}; */