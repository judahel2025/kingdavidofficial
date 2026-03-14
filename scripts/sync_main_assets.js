import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

const mainAssets = [
    { name: "kingdavid_hero.jpg", path: "public/assets/kingdavid_hero.jpg", folder: "assets" },
    { name: "kingdavid_about_new.jpg", path: "public/assets/kingdavid_about_new.jpg", folder: "assets" },
    { name: "crafting_1.jpg", path: "public/assets/crafting_1.jpg", folder: "assets" },
    { name: "crafting_2.jpg", path: "public/assets/crafting_2.jpg", folder: "assets" },
    { name: "crafting_3.jpg", path: "public/assets/crafting_3.jpg", folder: "assets" },
    { name: "crafting_4.jpg", path: "public/assets/crafting_4.jpg", folder: "assets" },
    { name: "signature.png", path: "public/assets/signature.png", folder: "assets" }
];

const main = async () => {
    console.log(`Starting sync of ${mainAssets.length} main assets...`);
    for (const item of mainAssets) {
        const publicId = item.name.split('.')[0];
        try {
            const result = await cloudinary.uploader.upload(item.path, {
                folder: item.folder,
                public_id: publicId,
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            console.log(`Synced ${item.name}: ${result.secure_url}`);
        } catch (error) {
            console.error(`Error syncing ${item.name}:`, error.message);
        }
    }
    console.log("Main assets sync complete!");
};

main().catch(console.error);
