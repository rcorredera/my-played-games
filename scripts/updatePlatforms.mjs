import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

async function updatePlatforms() {
  const platformsFilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/platforms.json');

  try {
    const data = await fs.readFile(platformsFilePath, 'utf8');
    const platforms = JSON.parse(data);

    const updatedPlatforms = platforms.map(platform => {
      if (platform.iconUrl) {
        platform.coverUrl = platform.iconUrl.replace('t_thumb', 't_cover_big');
      }
      return platform;
    });

    await fs.writeFile(platformsFilePath, JSON.stringify(updatedPlatforms, null, 2));
    console.log('Platforms updated successfully.');
  } catch (err) {
    console.error('Error updating platforms:', err);
  }
}

updatePlatforms();