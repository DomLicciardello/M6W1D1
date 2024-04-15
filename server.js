import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import { authorsRoute } from "./services/routes/authorsRoute.js";

// Tutti i file .env saranno legibilli all'interno dell' applicazione.
config();
const PORT = process.env.PORT || 3001;
// Utilizzo la porta 3001 perché il server react (lato frontend) lavora sulla porta 3000.

// Creo il server:
const app = express();

// Abilito comunicazione con dati JSON:
app.use(express.json());

// Importo le routes:
app.use("/authors", authorsRoute);

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

// node server.js -> scrivere questo sul terminale per avviare il server.
// Andando (lato browser) su localhost:3001 troviamo il server.