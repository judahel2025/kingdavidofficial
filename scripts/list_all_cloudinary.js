import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
import fs from 'fs';

dotenv.config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

async function dumpAll() {
  try {
    console.log('Dumping all Cloudinary assets...');
    let allResources = [];
    let nextCursor = null;

    do {
      const result = await cloudinary.api.resources({
        type: 'upload',
        max_results: 500,
        next_cursor: nextCursor
      });
      allResources = allResources.concat(result.resources);
      nextCursor = result.next_cursor;
    } while (nextCursor);

    fs.writeFileSync('cloudinary_dump.json', JSON.stringify(allResources, null, 2));
    console.log(`Successfully dumped ${allResources.length} assets to cloudinary_dump.json`);
  } catch (error) {
    console.error('Error dumping assets:', error.message);
  }
}

dumpAll();
