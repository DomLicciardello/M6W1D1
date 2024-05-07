import { Router } from "express"
import Blog from "./model.js"
import Comment from "../comments/model.js"
import cloudinary from "../../config/cloudinary.js"
import { authMidd } from "../../auth/index.js"

export const blogRoute = Router()

blogRoute.get("/", async (req, res, next) => {
  try {
    //http://localhost:3001/blogs?title=tech&page=3
    const page = req.query.page || 1
    let blogs = await Blog.find(
      req.query.title ? { title: { $regex: req.query.title } } : {}
    )
      .limit(20)
      .skip(20 * (page - 1))
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: ["name", "lastName", "avatar"],
        },
        options: {
          limit: 2,
        },
      })
    res.send(blogs)
  } catch (error) {
    next(error)
  }
})

blogRoute.get("/:id", async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id)
    res.send(blog)
  } catch (error) {
    next(error)
  }
})

blogRoute.put("/:id", async (req, res, next) => {
  try {
    let blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(blog)
  } catch (error) {
    next(error)
  }
})

blogRoute.patch("/:id/cover", cloudinary, async (req, res, next) => {
  try {
    let blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { cover: req.file.path },
      {
        new: true,
      }
    )
    res.send(blog)
  } catch (error) {
    next(error)
  }
})

blogRoute.get("/:id/comments", async (req, res, next) => {
  try {
    let post = await Blog.findById(req.params.id).populate({
      path: "comments",
      populate: {
        path: "author",
        select: ["name", "lastName", "avatar"],
      },
    })
    if (post) {
      res.send(post.comments)
    } else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

blogRoute.post("/:id/comments", authMidd, async (req, res, next) => {
  try {
    let comm = new Comment({...req.body, author: req.user._id})
    await comm.save()

    await Blog.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: comm._id,
      },
    })
    res.send(comm)
  } catch (error) {
    next(error)
  }
})

blogRoute.get("/:id/comments/:commentId", async (req, res, next) => {
  try {
    let comment = await Comment.findById(req.params.commentId).populate({
      path: "author",
      select: ["name", "lastName", "avatar"],
    })
    res.send(comment)
  } catch (error) {
    next(error)
  }
})

blogRoute.put("/:id/comments/:commentId", async (req, res, next) => {
  try {
    let comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    )
    res.send(comment)
  } catch (error) {
    next(error)
  }
})

blogRoute.delete("/:id/comments/:commentId", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

blogRoute.delete("/:id", async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

blogRoute.post("/", authMidd, async (req, res, next) => {
  try {
    let blog = await Blog.create({...req.body, author: req.user._id})
/*     const msg = {
      to: req.body.email, // Change to your recipient
      from: "...", // Change to your verified sender
      subject: "Il tuo articolo su Nerd Blog!",
      html: `Grazie, hai pubblicato con successo l'articolo "${req.body.title}" su Nerd Blog!`,
    }
    await sgMail.send(msg) */
    res.send(blog)
  } catch (error) {
    next(error)
  }
})