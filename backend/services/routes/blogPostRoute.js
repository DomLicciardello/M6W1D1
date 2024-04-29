import { Router } from "express";
import BlogPost from "../models/blogPostModel.js";
import uploadCover from "../middlewares/multercover.js";
//import sendEmail from "../sendEmail.js"

export const blogPostRoute = Router();

// Chiama tutto l'array di oggetti col find vuoto:
blogPostRoute.get("/", async (req, res) => {
  try {
    let blogposts =  await BlogPost.find()
    res.send(blogposts);
  } catch (err) {
    next(err);
  }
});

// Chiama gli oggetti in ordine alfabetico/numerico grazie a "sort", in base all'elemento dell'oggetto dichiarato (title in questo caso):
blogPostRoute.get("/sorting", async (req, res, next) => {
  try {
    let blogposts = await BlogPost.find().sort({
      title: 1, //1 in maniera crescente e -1 in maniera decrescente
    })
    //.skip(2); -> skip serve per saltare i risultati, in questo caso i primi due.
    //.limit(1); -> limit serve a limitare i risultati, in questo caso mostra solo il primo.;
    res.send(blogposts);
  } catch (err) {
    next(err);
  }
});

/* // Oppure pagination con parametro order diretammente nell'url:
blogPostRoute.get("/sorting/:order", async (req, res, next) => {
  let orderParam = parseInt(req.params.order);

  try {
    let blogposts = await BlogPost.find().sort({
      title: orderParam !== -1 && orderParam !== 1 ? 1 : orderParam, 
    });
    res.send(blogposts);
  } catch (err) {
    next(err);
  }
}); */

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
    //sendEmail("test@gmail.com", '<h1>Email di prova!</h1>');
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

// Richiesta PATCH per aggiornare immagini di un utente già esistente:
blogPostRoute.patch("/:id/cover", uploadCover, async(req, res, next) => {
  try {
    let updateBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {cover: req.file.path},
      {new: true}
    );
    res.send(updateBlogPost);
  } catch (error) {
    next(error);
  }
});