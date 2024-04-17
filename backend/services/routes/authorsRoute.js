import { Router } from "express";
import User from "../models/authorsModel.js";

export const authorsRoute = Router();

// Chiama tutto l'array di oggetti:
authorsRoute.get("/", async (req, res) => {
  try {
    let users =  await User.find()
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// Chiamata ad un oggetto specifico tramite id:
authorsRoute.get("/:id", async (req, res, next) => {
  try {
    let user =  await User.findById(req.params.id)
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// Aggiunta di un oggetto al server:
authorsRoute.post("/", async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    res.send(user).status(400);
  } catch (err) {
    next(err);
  }
});

// Modifica di un oggetto del server:
authorsRoute.put("/:id", async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true // L'oggetto deve essere la nuova versione aggiornata di se stesso.
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// Elimina un oggetto dal server:
authorsRoute.delete("/:id", async (req, res, next) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    res.send("Utente eliminato dal database con successo!").status(204);
  } catch (err) {
    next(err);
  }
});