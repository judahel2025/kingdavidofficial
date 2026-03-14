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

const images = [
    // Brands
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/brands/Reviews.jpg", folder: "portfolio/brands" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/brands/Videos.jpg", folder: "portfolio/brands" },
    
    // Campaigns
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/3_20240917_155459_0001.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/6_20241030_231855_0000.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/988C342B-EEC0-43D2-9D0E-7391BFA7AC0F.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/Campus%20Your%20with%20Babatunmise.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/Quantum%20Leap%20with%20Image.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/The%20Creators%20Upgrade%20Flyer%201.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/The%20Creators%20Upgrade%20Flyer%202.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/Trading%20made%20Easy.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/IMG_5356.JPG", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/IMG_5357-1.JPG", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/IMG_5358.JPG", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/PRE-ILFC%20HANGOUT%20FINAL%20EDIT!!!.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/Artix%20Solutions%20Flyer%20Mockup.jpg", folder: "portfolio/campaigns" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/campaigns/Smart%20tips%20Academy.jpg", folder: "portfolio/campaigns" },

    // Events
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/Copy%20of%202nd%20Half%20Static.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/Copy%20of%20FutureProof%20Static.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/Copy%20of%20Hyper%20Growth%20Full%20Details.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/Copy%20of%20Metanoia_.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/Copy%20of%20Zero%20to%20One.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/HyperGrowth%20With%20Solomon%20Cohort%202%20(1).jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/Copy%20of%20HyperGrowth%20Landscape.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/Copy%20of%20Solomon_s%20Story.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/Copy%20of%20Uyoyo%20Edioso_.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/Copy%20of%20Victor%20Fatanmi.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/13_20240930_001823_0003.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/15_20240523_173111_0000%20(1).jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/34_20240321_112057_0004.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/IMG_5360-1.JPG", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/The%20Creators%20Upgrade%20Emblem.jpg", folder: "portfolio/events" },
    { url: "https://etedzmnzlxipmhvgjepy.supabase.co/storage/v1/object/public/portfolio/events/IMG_20241002_182558_682.jpg", folder: "portfolio/events" }
];

const main = async () => {
    console.log(`Starting migration of ${images.length} images...`);
    for (const item of images) {
        const filename = decodeURIComponent(item.url.split('/').pop());
        const publicId = filename.split('.')[0];
        try {
            const result = await cloudinary.uploader.upload(item.url, {
                folder: item.folder,
                public_id: publicId,
                use_filename: true,
                unique_filename: false,
                overwrite: true
            });
            console.log(`Synced ${filename}: ${result.secure_url}`);
        } catch (error) {
            console.error(`Error syncing ${filename}:`, error.message);
        }
    }
    console.log("Migration complete!");
};

main().catch(console.error);
