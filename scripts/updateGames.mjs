import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Chemin vers le fichier JSON des jeux
const gamesFilePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/data/games.json');

// Fonction pour récupérer les informations du jeu depuis l'API IGDB
async function fetchGameDetailsFromIGDB(gameId, clientId, accessToken) {
  try {
    const response = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'text/plain',
      },
      body: `fields id,name,summary,first_release_date,rating,url; where id = ${gameId};`,
    });

    if (!response.ok) {
      console.error(`Erreur HTTP: ${response.status} lors de la récupération des informations du jeu.`);
      return null;
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des données du jeu:', error);
    return null;
  }
}
// Fonction pour mettre à jour les jeux avec les nouvelles informations
async function updateGames(clientId, accessToken) {
  try {
    console.log('Lecture du fichier JSON des jeux...');
    const data = await fs.readFile(gamesFilePath, 'utf8');
    const games = JSON.parse(data);

    // Mettre à jour chaque jeu avec les nouvelles informations
    const updatedGames = await Promise.all(games.map(async (game) => {
      const gameDetails = await fetchGameDetailsFromIGDB(game.id, clientId, accessToken);
      if (gameDetails) {
        return {
          ...game,
          summary: gameDetails.summary || 'No summary available',
          coverUrl: game.coverUrl || 'default_cover_url', // Assurez-vous de récupérer l'URL de couverture si nécessaire
          first_release_date: gameDetails.first_release_date || 'Unknown release date',
          rating: gameDetails.rating || 0,
          url: gameDetails.url || 'https://default.url',
        };
      }
      return game;
    }));

    console.log('Écriture des jeux mis à jour dans le fichier JSON...');
    await fs.writeFile(gamesFilePath, JSON.stringify(updatedGames, null, 2));
    console.log('Jeux mis à jour avec succès.');
  } catch (err) {
    console.error('Erreur lors de la mise à jour du fichier JSON:', err);
  }
}

// Exécuter la fonction de mise à jour avec les identifiants de l'API
const [clientId, accessToken] = process.argv.slice(2);
if (!clientId || !accessToken) {
  console.error('Veuillez fournir le CLIENT_ID et le ACCESS_TOKEN.');
  console.error('Usage: node updateGames.mjs <CLIENT_ID> <ACCESS_TOKEN>');
} else {
  updateGames(clientId, accessToken);
}