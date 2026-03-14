import fs from 'fs';

const content = fs.readFileSync('cloudinary_assets.txt', 'utf16le');
const lines = content.split('\n');

const assets = {
    brands: [],
    campaigns: [],
    events: []
};

lines.forEach(line => {
    if (line.includes('Public ID: portfolio/brands/')) {
        const id = line.split('Public ID: portfolio/brands/')[1].split(',')[0];
        assets.brands.push(id);
    } else if (line.includes('Public ID: portfolio/campaigns/')) {
        const id = line.split('Public ID: portfolio/campaigns/')[1].split(',')[0];
        assets.campaigns.push(id);
    } else if (line.includes('Public ID: portfolio/events/')) {
        const id = line.split('Public ID: portfolio/events/')[1].split(',')[0];
        assets.events.push(id);
    }
});

console.log(JSON.stringify(assets, null, 2));
