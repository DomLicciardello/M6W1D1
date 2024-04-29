import { Router } from "express";
import BlogPost from "../models/blogPostModel.js";
import Comment from "../models/commentsModel.js";

export const commentsRoute = Router();

// Chiamo tutti i commenti:
commentsRoute.get("/:id/comments", async (req, res) => {
    try {
      let comments =  await BlogPost.findById(req.params.id)//.populate("comments");
      res.send(comments);
    } catch (err) {
      next(err);
    }
  });

  // Chiamo il singolo commento per id:
  commentsRoute.get("/:id/comments/:commentId", async (req, res) => {
    try {
      let comment =  await Comment.find()
      res.send(comment);
    } catch (err) {
      next(err);
    }
  });

  // Aggiunta commento ad uno specifico post:
  commentsRoute.post("/:id/comment", async (req, res, next) => {
    try {
      // Prendiamo l'id del post:
      let post = await BlogPost.findById(req.params.id);
      if (!post) next (err);
      // Successivamente creiamo il commento e lo inseriamo nell'array del post e dell'autore:
      let comment = await Comment.create({...req.body, blogpost: post});
      post.comments.push(comment._id);
      await post.save();
      //sendEmail("test@gmail.com", '<h1>Email di prova!</h1>');
      res.send(comment).status(400);
    } catch (err) {
      next(err);
    }
  });

/*   // Modifica di un oggetto del server:
  commentsRoute.put("/:id/comment/:commentId", async (req, res, next) => {
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
  commentsRoute.delete("/:id/comment/:commentId", async (req, res, next) => {
    try {
      await BlogPost.deleteOne({
        _id: req.params.id
      });
      res.send("Utente eliminato dal database con successo!").status(204);
    } catch (err) {
      next(err);
    }
  }); */