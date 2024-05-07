import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storageAvatars = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "avatars",
    },
});

const storageCovers = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "covers",
    },
});

export const uploadAvatar = multer({ storage: storageAvatars }).single("avatar");
export const uploadCover = multer({ storage: storageCovers }).single("cover");