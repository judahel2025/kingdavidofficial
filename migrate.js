import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const uploadImage = async (filePath, folder) => {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  
  console.log(`Uploading ${folder}/${fileName}...`);
  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(`${folder}/${fileName}`, fileBuffer, {
      upsert: true,
      contentType: fileName.endsWith('.pdf') ? 'application/pdf' : 
                   fileName.endsWith('.png') ? 'image/png' : 
                   fileName.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg'
    });

  if (error) {
    console.error(`Error uploading ${fileName}:`, error.message);
    return null;
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('portfolio')
    .getPublicUrl(`${folder}/${fileName}`);
    
  return { fileName, publicUrl, localPath: filePath };
};

const runMigration = async () => {
  // Ensure bucket exists
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    console.error('Error listing buckets:', bucketError.message);
    process.exit(1);
  }

  if (!buckets.find(b => b.name === 'portfolio')) {
    console.log('Creating portfolio bucket...');
    const { error: createError } = await supabase.storage.createBucket('portfolio', {
      public: true
    });
    if (createError) {
      console.error('Error creating bucket:', createError.message);
      process.exit(1);
    }
  }

  const folders = {
    'public/assets/portfolio/brands': 'brands',
    'public/assets/portfolio/campaigns': 'campaigns',
    'public/assets/portfolio/events': 'events'
  };

  const results = {};

  for (const [localDir, remoteFolder] of Object.entries(folders)) {
    if (!fs.existsSync(localDir)) {
      console.log(`Directory ${localDir} not found, skipping...`);
      continue;
    }
    
    const files = fs.readdirSync(localDir);
    results[remoteFolder] = [];
    
    for (const file of files) {
      const fullPath = path.join(localDir, file);
      if (fs.lstatSync(fullPath).isDirectory()) continue;

      if (file.match(/\.(jpg|jpeg|png|webp|svg|pdf)$/i)) {
        const result = await uploadImage(fullPath, remoteFolder);
        if (result) results[remoteFolder].push(result);
      }
    }
  }

  fs.writeFileSync('migration_results.json', JSON.stringify(results, null, 2));
  console.log('Migration complete. Results saved to migration_results.json');
};

runMigration();
