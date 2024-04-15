import { Router } from "express";
import User from "../models/user.model.js";

export const apiRoute = Router();

apiRoute.get("/", async (req, res) => {
  res.send("Sei al route principale dell'API!");
});

/* apiRoute.get("/prova", async (req, res) => {
  res.send("Sei al route di prova dell'API!");
}); */

// Chiamata ad un oggetto specifico tramite id:
apiRoute.get("/:id", async (req, res, next) => {
  try {
    let user =  await User.findById(req.params.id)
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// Aggiunta di un oggetto al server:
apiRoute.post("/", async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    res.send(user).status(400);
  } catch (err) {
    next(err);
  }
});

// Modifica di un oggetto del server:
apiRoute.put("/:id", async (req, res, next) => {
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
apiRoute.delete("/:id", async (req, res, next) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    res.send("Utente eliminato dal database con successo!").status(204);
  } catch (err) {
    next(err);
  }
});