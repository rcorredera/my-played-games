import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Chemin vers le fichier JSON des jeux
const gamesFilePath = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/data/games.json",
);

// Fonction pour récupérer les informations du jeu depuis l'API IGDB
async function fetchGameFromIGDB(gameId, clientId, accessToken) {
	console.log(
		`Tentative de récupération des informations pour le jeu ID: ${gameId}`,
	);
	try {
		const response = await fetch("https://api.igdb.com/v4/games", {
			method: "POST",
			headers: {
				"Client-ID": clientId,
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "text/plain",
			},
			body: `fields id,name,platforms,summary, rating, first_release_date, url; where id = ${gameId};`,
		});

		if (!response.ok) {
			console.error(
				`Erreur HTTP: ${response.status} lors de la récupération des informations du jeu.`,
			);
			return null;
		}
		const data = await response.json();
		const game = data[0];
		if (game) {
			console.log(`Informations du jeu récupérées avec succès: ${game.name}`);
			const coverResponse = await fetch("https://api.igdb.com/v4/covers", {
				method: "POST",
				headers: {
					"Client-ID": clientId,
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "text/plain",
				},
				body: `fields url; where game = ${gameId};`,
			});

			if (!coverResponse.ok) {
				console.error(
					`Erreur HTTP: ${coverResponse.status} lors de la récupération de la couverture du jeu.`,
				);
				return null;
			}
			const coverData = await coverResponse.json();
			game.coverUrl = `https:${coverData[0]?.url}`.replace('t_thumb', 't_cover_big');
			game.thumbUrl = `https:${coverData[0]?.url}`;
			game.platformId = game.platforms[0];
			if (game.coverUrl) {
				console.log(`URL de la couverture récupérée: ${game.coverUrl}`);
			} else {
				console.warn("Aucune couverture trouvée pour ce jeu.");
			}
		} else {
			console.warn("Aucun jeu trouvé avec cet ID.");
		}

		return game;
	} catch (error) {
		console.error("Erreur lors de la récupération des données du jeu:", error);
		return null;
	}
}

// Fonction pour ajouter le jeu au fichier JSON
async function appendGameToFile(game) {
	if (!game) {
		console.error("Aucun jeu à ajouter.");
		return;
	}

	try {
		console.log("Lecture du fichier JSON des jeux...");
		const data = await fs.readFile(gamesFilePath, "utf8");
		const games = JSON.parse(data);

		// Vérifier si le jeu est déjà présent
		const gameExists = games.some(
			(existingGame) => existingGame.id === game.id,
		);
		if (gameExists) {
			console.log("Le jeu est déjà présent dans la liste:", game.name);
			return;
		}
		games.push(game);

		console.log("Écriture du jeu dans le fichier JSON...");
		await fs.writeFile(gamesFilePath, JSON.stringify(games, null, 2));
		console.log("Jeu ajouté avec succès:", game.name);
	} catch (err) {
		console.error("Erreur lors de la manipulation du fichier JSON:", err);
	}
}

// Fonction principale
async function main() {
	const [clientId, accessToken, gameId] = process.argv.slice(2);
	if (!clientId || !accessToken || !gameId) {
		console.error(
			"Veuillez fournir le CLIENT_ID, le ACCESS_TOKEN, et l'identifiant de jeu.",
		);
		console.error(
			"Usage: node addGame.mjs <CLIENT_ID> <ACCESS_TOKEN> <GAME_ID>",
		);
		return;
	}

	const game = await fetchGameFromIGDB(gameId, clientId, accessToken);
	await appendGameToFile(game);
}

main();
