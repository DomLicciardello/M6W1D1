import { Router } from "express";
import BlogPost from "../models/blogPostModel.js";

export const blogPostRoute = Router();

// Chiama tutto l'array di oggetti:
blogPostRoute.get("/", async (req, res) => {
  try {
    let blogposts =  await BlogPost.find()
    res.send(blogposts);
  } catch (err) {
    next(err);
  }
});

// Chiamata ad un oggetto specifico tramite id:
blogPostRoute.get("/:id", async (req, res, next) => {
  try {
    let blogpost =  await BlogPost.findById(req.params.id)
    res.send(blogpost);
  } catch (err) {
    next(err);
  }
});

// Aggiunta di un oggetto al server:
blogPostRoute.post("/", async (req, res, next) => {
  try {
    let blogpost = await BlogPost.create(req.body);
    res.send(blogpost).status(400);
  } catch (err) {
    next(err);
  }
});

// Modifica di un oggetto del server:
blogPostRoute.put("/:id", async (req, res, next) => {
  try {
    let blogpost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true // L'oggetto deve essere la nuova versione aggiornata di se stesso.
    });
    res.send(blogpost);
  } catch (err) {
    next(err);
  }
});

// Elimina un oggetto dal server:
blogPostRoute.delete("/:id", async (req, res, next) => {
  try {
    await BlogPost.deleteOne({
      _id: req.params.id
    });
    res.send("Utente eliminato dal database con successo!").status(204);
  } catch (err) {
    next(err);
  }
});