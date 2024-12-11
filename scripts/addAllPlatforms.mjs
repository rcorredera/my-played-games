import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Chemin vers le fichier platforms.json
const platformIconsFilePath = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/data/platforms.json",
);

// Fonction pour récupérer toutes les plateformes depuis l'API IGDB
async function fetchAllPlatformsFromIGDB(clientId, accessToken) {
	console.log("Tentative de récupération de toutes les plateformes");
	try {
		const response = await fetch("https://api.igdb.com/v4/platforms", {
			method: "POST",
			headers: {
				"Client-ID": clientId,
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "text/plain",
			},
			body: "fields id,name,platform_logo; limit 500;", // Assurez-vous que 'id' est inclus
		});

		if (!response.ok) {
			console.error(
				`Erreur HTTP: ${response.status} lors de la récupération des plateformes.`,
			);
			return [];
		}
		const platforms = await response.json();
		console.log(`Nombre de plateformes récupérées: ${platforms.length}`);
		return platforms;
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des données des plateformes:",
			error,
		);
		return [];
	}
}

// Fonction pour récupérer les URL des logos de plateforme
// Fonction pour récupérer les URL des logos de plateforme
async function fetchPlatformLogos(platforms, clientId, accessToken) {
	const logoIds = platforms
		.map((platform) => platform.platform_logo)
		.filter(Boolean);
	if (!logoIds.length) {
		console.warn("Aucun logo de plateforme à récupérer.");
		return [];
	}

	const logoMap = {};
	try {
		for (let i = 0; i < logoIds.length; i++) {
			const logoId = logoIds[i];
			const response = await fetch("https://api.igdb.com/v4/platform_logos", {
				method: "POST",
				headers: {
					"Client-ID": clientId,
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "text/plain",
				},
				body: `fields *; where id = ${logoId};`,
			});

			if (!response.ok) {
				console.error(
					`Erreur HTTP: ${response.status} lors de la récupération des logos de plateforme pour le lot ${i / batchSize + 1}.`,
				);
				continue;
			}

			const logo = (await response.json())[0];
			logoMap[logo.id] = { url: `https:${logo.url}`, image_id: logo.image_id };
			console.log(
				`URL du logo de plateforme récupérée pour l'ID ${logo.id}: ${logoMap[logo.id].url}`,
			);
		}

		return platforms.map((platform) => ({
			id: platform.id,
			name: platform.name,
			iconUrl: logoMap[platform.platform_logo]?.url || "",
			image_id: logoMap[platform.platform_logo]?.image_id || "",
		}));
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des données des logos de plateforme:",
			error,
		);
		return [];
	}
}

// Fonction pour ajouter les plateformes au fichier platforms.json
async function appendPlatformsToFile(platforms) {
	if (!platforms.length) {
		console.error("Aucune plateforme à ajouter.");
		return;
	}

	try {
		console.log("Lecture du fichier platforms.json...");
		const data = await fs.readFile(platformIconsFilePath, "utf8");
		const existingPlatforms = JSON.parse(data);

		platforms.forEach((platform) => {
			const platformExists = existingPlatforms.some(
				(existingPlatform) => existingPlatform.id === platform.id,
			);
			if (!platformExists) {
				existingPlatforms.push({
					id: platform.id,
					name: platform.name,
					iconUrl: platform.iconUrl,
					image_id: platform.image_id, // Ajout de 'image_id' dans l'objet de sortie
				});
				console.log("Plateforme ajoutée:", platform.name);
			} else {
				console.log(
					"La plateforme est déjà présente dans la liste:",
					platform.name,
				);
			}
		});

		console.log(
			"Contenu de existingPlatforms avant la sérialisation:",
			JSON.stringify(existingPlatforms, null, 2),
		);
		console.log("Écriture des plateformes dans le fichier platforms.json...");
		const updatedData = JSON.stringify(existingPlatforms, null, 2);
		console.log("Contenu de updatedData après la sérialisation:", updatedData);
		await fs.writeFile(platformIconsFilePath, updatedData, "utf8");
		console.log("Toutes les plateformes ont été ajoutées avec succès.");
	} catch (err) {
		console.error(
			"Erreur lors de la manipulation du fichier platforms.json:",
			err,
		);
	}
}

// Fonction principale
async function main() {
	const [clientId, accessToken] = process.argv.slice(2);
	if (!clientId || !accessToken) {
		console.error("Veuillez fournir le CLIENT_ID et le ACCESS_TOKEN.");
		console.error("Usage: node addAllPlatforms.mjs <CLIENT_ID> <ACCESS_TOKEN>");
		return;
	}

	const platforms = await fetchAllPlatformsFromIGDB(clientId, accessToken);
	const platformsWithLogos = await fetchPlatformLogos(
		platforms,
		clientId,
		accessToken,
	);
	await appendPlatformsToFile(platformsWithLogos);
}

main();
