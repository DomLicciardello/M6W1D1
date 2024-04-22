import multer from "multer";
import {v2 as cloudinary} from "cloudinary"; // Importo v2 e lo utilizzo col nome di cloudinary tramite "as".
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";

config();

// Configurazione di Cloudinary:
cloudinary.config ({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

export default multer ({
    storage: new CloudinaryStorage({
        cloudinary,
        params: {
            folder: "covers",
        },
    }),
}).single("cover");