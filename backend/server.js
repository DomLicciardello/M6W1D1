import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from 'cors';
import { authorRoute } from "./services/authors/index.js"
import { blogRoute } from "./services/blogs/index.js"
import { badRequestHandler, genericErrorHandler, notfoundHandler, unauthorizedHandler } from "./errorHandlers.js"

config();
const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(cors());

app.use("/authors", authorRoute)
app.use("/blogs", blogRoute)

app.use(badRequestHandler)
app.use(unauthorizedHandler)
app.use(notfoundHandler)
app.use(genericErrorHandler)

const initServer = async () => {
    try {
        await mongoose.connect(process.env.DBURL);
        console.log ("Connesso al database!")
        app.listen(PORT, () => {
        console.log(`Il nostro server sta ascoltando alla porta ${PORT}.`);
        });
    } catch (err) {
        console.log ("Connessione al database fallita!", err);
    }
};

initServer();