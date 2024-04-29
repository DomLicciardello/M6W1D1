import { Schema, model } from "mongoose";

const blogPostSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: false,
        },
        readTime: {
            value: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            }
        },
        comments : [
            {
                type: Schema.Types.ObjectId,
                ref: "Comments"
            },
        ],
        content: {
            type: String,
            required: true
        }
    },

    {
        collection: "blogposts",
        timestamps: true //per ricevere da MongoDB la data di creazione/modifica
    }
);

export default model("BlogPost", blogPostSchema);