import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
import fs from 'fs';
import path from 'path';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

const localPortfolioDir = 'public/assets/portfolio';

// Categorization based on filenames
const categorization = {
    'allyprime_1.jpg': 'brands',
    'allyprime_2.jpg': 'brands',
    'branding_1.jpg': 'brands',
    'branding_2.jpg': 'brands',
    'remax_branding.jpg': 'brands',
    'bridgee_escrow.jpg': 'brands',
    'campaign_1.jpg': 'campaigns',
    'campaign_2.jpg': 'campaigns',
    'boys_quarters.jpg': 'campaigns',
    'choice_estate.jpg': 'campaigns',
    'events_1.jpg': 'events',
    'events_2.jpg': 'events'
};

async function uploadLocal() {
    console.log('Uploading local portfolio assets...');
    const files = fs.readdirSync(localPortfolioDir);
    
    for (const file of files) {
        const filePath = path.join(localPortfolioDir, file);
        if (fs.lstatSync(filePath).isDirectory()) continue;

        const category = categorization[file] || 'events'; // Default to events if unknown
        const publicId = file.split('.')[0];
        
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: `portfolio/${category}`,
                public_id: publicId,
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            console.log(`Uploaded ${file} to portfolio/${category}: ${result.secure_url}`);
        } catch (error) {
            console.error(`Error uploading ${file}:`, error.message);
        }
    }
    console.log('Local portfolio upload complete!');
}

uploadLocal();
