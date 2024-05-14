import GoogleStrategy from "passport-google-oauth20"
import Author from "../services/authors/model.js"
import { config } from "dotenv";
import { generateJWT } from "./index.js"

config();

const options = {
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.G_CLIENT_SECRET,
    callbackURL: process.env.G_CB
}
const googleStrategy = new GoogleStrategy(
    options,
    async(_accessToken, _refreshToken, profile, passportNext) => {
        try {
            const {email, sub, given_name, family_name, picture} = profile._json;
            const user = await Author.findOne({email});
            if (user) {
                // Se l'utente esiste:
                const accToken = await createAccessToke({
                    _id: user._id
                })
                passportNext(null, { accToken });
            } else {
                // Se l'utente non esiste:
                const newUser = new Author({
                    name: given_name,
                    lastName: family_name,
                    email: email,
                    avatar: picture,
                    googleId: sub
                });
                await newUser.save();
                const accToken = await generateJWT({
                    _id: newUser._id,
                });
                passportNext(null, { accToken });
            }
        } catch (error) {
            passportNext(error);
        }
});

export default googleStrategy;