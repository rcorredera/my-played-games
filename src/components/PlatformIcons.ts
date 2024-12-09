interface PlatformIcons {
	[key: string]: string;
}

export const platformIcons: PlatformIcons = {
	"Nintendo Switch":
		"https://toppng.com/uploads/preview/nintendo-switch-logo-vector-11573945521cm2t4rtbkk.png",
	"PlayStation 4":
		"https://upload.wikimedia.org/wikipedia/commons/8/87/PlayStation_4_logo_and_wordmark.svg",
	PC: "https://icon-library.com/images/pc-game-icon/pc-game-icon-6.jpg",
	// Ajoutez d'autres plateformes au besoin
};

export function getPlatformIcon(platform: string): string {
	return platformIcons[platform] || "https://example.com/default-icon.png";
}
