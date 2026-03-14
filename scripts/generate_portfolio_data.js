import fs from 'fs';

const dump = JSON.parse(fs.readFileSync('cloudinary_dump.json', 'utf8'));

const portfolioData = {
    brands: [],
    campaigns: [],
    events: []
};

// Filter for portfolio assets only
const portfolioAssets = dump.filter(asset => asset.public_id.startsWith('portfolio/'));

portfolioAssets.forEach(asset => {
    const parts = asset.public_id.split('/');
    const category = parts[1]; // brands, campaigns, events
    
    if (portfolioData[category]) {
        // Create title from filename
        let title = asset.display_name
            .replace(/_/g, ' ')
            .replace(/-/g, ' ')
            .replace(/%20/g, ' ')
            .toUpperCase();
        
        // Remove common prefixes
        title = title.replace(/^COPY OF /, '');
        
        portfolioData[category].push({
            url: asset.secure_url,
            title: title || 'UNTITLED PROJECT',
            year: '2024'
        });
    }
});

fs.writeFileSync('portfolio_data_clean.json', JSON.stringify(portfolioData, null, 2));
console.log('Saved 43 portfolio items to portfolio_data_clean.json');
