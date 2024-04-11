import { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        birthdate: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        },
    },

    {
        collection: "users",
    }
);

export default model("User", userSchema);