import { Router } from "express"
import Author from "./model.js"
import bcrypt from "bcryptjs"
import Blog from "../blogs/model.js"
import cloudinary from "../../config/cloudinary.js"
import "dotenv/config"
import { authMidd, generateJWT } from "../../auth/index.js"

export const authorRoute = Router()

authorRoute.get("/", async (req, res, next) => {
  try {
    const page = req.query.page || 1
    let authors = await Author.find()
      .limit(20)
      .skip(20 * (page - 1))
    res.send(authors)
  } catch (error) {
    next(error)
  }
})

authorRoute.post("/login", async ({ body }, res, next) => {
  try {
    let foundUser = await Author.findOne({
      email: body.email,
    })
    if (foundUser) {
      const matching = await bcrypt.compare(body.password, foundUser.password)
      if (matching) {
        const token = await generateJWT({
          lastName: foundUser.lastName,
          email: foundUser.email,
        })
        res.send({ user: foundUser, token })
      } else res.status(400).send("Wrong password")
    } else res.status(400).send("User does not exist.")
  } catch (error) {
    next(error)
  }
})

authorRoute.get("/me", authMidd, async (req, res, next) => {
  try {
    let author = await Author.findById(req.user.id)
    res.send(author)
  } catch (error) {
    next(error)
  }
})

authorRoute.get("/:id", async (req, res, next) => {
  try {
    let author = await Author.findById(req.params.id)
    res.send(author)
  } catch (error) {
    next(error)
  }
})

authorRoute.get("/:id/blogPosts", async (req, res, next) => {
  try {
    let author = await Author.findById(req.params.id)

    let posts = await Blog.find({
      author: author.email,
    })
    res.send(posts)
  } catch (error) {
    next(error)
  }
})

authorRoute.patch("/:id/avatar", cloudinary, async (req, res, next) => {
  try {
    let author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        avatar: req.file.path,
      },
      { new: true }
    )
    res.send(author)
  } catch (error) {
    next(error)
  }
})

authorRoute.put("/:id", async (req, res, next) => {
  try {
    let author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(author)
  } catch (error) {
    next(error)
  }
})

authorRoute.delete("/:id", async (req, res, next) => {
  try {
    await Author.deleteOne({
      _id: req.params.id,
    })
    res.send(204)
  } catch (error) {
    next(error)
  }
})

authorRoute.post("/", async (req, res, next) => {
  try {
    let author = await Author.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    })
/*     const msg = {
      to: req.body.email, // Change to your recipient
      from: "...", // Change to your verified sender
      subject: "Benvenuto su Nerd Blog",
      html: `Hai creato un account su Nerd Blog`,
    }
    await sgMail.send(msg) */
    res.send(author)
  } catch (error) {
    next(error)
  }
})
