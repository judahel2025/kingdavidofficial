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

async function listAssets(folder) {
  try {
    console.log(`Listing assets in folder: ${folder}...`);
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 500
    });
    
    console.log('--- ASSETS FOUND ---');
    result.resources.forEach(asset => {
      console.log(`Public ID: ${asset.public_id}, URL: ${asset.secure_url}`);
    });
    console.log('--------------------');
  } catch (error) {
    console.error('Error listing assets:', error.message);
  }
}

listAssets('portfolio');
