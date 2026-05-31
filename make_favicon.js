import sharp from 'sharp';

async function makeCircular() {
  try {
    const size = 256;
    const radius = size / 2;
    const circleSvg = `<svg width="${size}" height="${size}"><circle cx="${radius}" cy="${radius}" r="${radius}"/></svg>`;

    await sharp('public/apkmason_logo_premium.png')
      .resize(size, size)
      .composite([{
        input: Buffer.from(circleSvg),
        blend: 'dest-in'
      }])
      .png()
      .toFile('public/favicon_rounded.png');
      
    console.log('Favicon created successfully.');
  } catch (err) {
    console.error('Error creating favicon:', err);
  }
}

makeCircular();
