import { Schema, model } from "mongoose"

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: { type: Schema.Types.ObjectId, ref: "Author", required: true }
    },
    { collection: "comments", timestamps: true }
)

export default model("Comment", commentSchema)