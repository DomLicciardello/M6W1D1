import { Router } from "express";
import User from "../models/authorsModel.js";
import cloudinaryMiddleware from "../middlewares/multer.js";

export const authorsRoute = Router();

// Chiama tutto l'array di oggetti col find vuoto:
authorsRoute.get("/", async (req, res, next) => {
  try {
    let users =  await User.find()
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// Utilizzo le query all'interno del find per trovare determinati oggetti:
authorsRoute.get("/domenico", async (req, res, next) => {
  try {
    let users =  await User.find({name: "Domenico"})
    res.send(users);
  } catch (err) {
    next(err);
  }
});

// Dividi gli autori per pagina cambiando il valore di page -> http://localhost:3001/authors/pagination?page=0
authorsRoute.get("/pagination", async (req, res, next) => {
  // Prendiamo il valore di page, numero 1 in esempio -> http://localhost:3001/authors/pagination?page=1
  const pageQuery = req.query.page || 0;
  // Quanti documenti/oggetti vogliamo mostrare per pagina (in questo caso 2):
  const itemsPage = 2;

  try {
    let users = await User.find()
    .skip(itemsPage * pageQuery)
    .limit(itemsPage);

    res.send(users);
  } catch (err) {
    next(err);
  }
});

// Chiama gli oggetti in ordine alfabetico/numerico grazie a "sort", in base all'elemento dell'oggetto dichiarato (name in questo caso):
authorsRoute.get("/sorting", async (req, res, next) => {
  try {
    let users = await User.find().sort({
      lastname: 1, //1 in maniera crescente e -1 in maniera decrescente
    })
    //.skip(2); -> skip serve per saltare i risultati, in questo caso i primi due.
    //.limit(1); -> limit serve a limitare i risultati, in questo caso mostra solo il primo.
    res.send(users);
  } catch (err) {
    next(err);
  }
});

/* // Oppure pagination con parametro order diretammente nell'url:
authorsRoute.get("/sorting/:order", async (req, res, next) => {
  let orderParam = parseInt(req.params.order);

  try {
    let users = await User.find().sort({
      title: orderParam !== -1 && orderParam !== 1 ? 1 : orderParam, 
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
}); */

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

// Richiesta PATCH per aggiornare immagini di un utente già esistente:
authorsRoute.patch("/:id/avatar", cloudinaryMiddleware, async(req, res, next) => {
  try {
    let updateAuthor = await User.findByIdAndUpdate(
      req.params.id,
      {avatar: req.file.path},
      {new: true}
    );
    res.send(updateAuthor);
  } catch (error) {
    next(error);
  }
});