import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        blogpost: {
            type: Schema.Types.ObjectId,
            ref: "BlogPost"
        },
        content: {
            type: String,
            required: true
        }
    },

    {
        collection: "comments",
        timestamps: true //per ricevere da MongoDB la data di creazione/modifica
    },
);

export default model("Comment", commentSchema);