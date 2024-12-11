<template>
  <div id="mainApp">
    <div class="header">
      <LanguageSelector />
      <ThemeToggle />
    </div>
    <div class="fixed-header">
      <h1>{{ $t('title') }}</h1>
      <SearchBar v-model="searchQuery" :placeholder="$t('searchPlaceholder')" />
      <QuickFilters 
        :platforms="uniquePlatforms" 
        :selected-platform="selectedPlatform"
        @filter="filterByPlatform"
        @clear="clearAllFilters"
      />
    </div>
    <div class="game-list-container">
      <GameList :games="filteredGames" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import SearchBar from "./components/SearchBar.vue";
import QuickFilters from "./components/QuickFilters.vue";
import GameList from "./components/GameList.vue";
import LanguageSelector from "./components/LanguageSelector.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import gamesData from "./data/games.json";

export default defineComponent({
	components: {
		SearchBar,
		QuickFilters,
		GameList,
		LanguageSelector,
		ThemeToggle,
	},
	setup() {
		const games = ref(gamesData);
		const searchQuery = ref("");
		const selectedPlatform = ref(0);

		const uniquePlatforms = computed(() => {
			return [...new Set(games.value.map((game) => game.platform))];
		});

		const filteredGames = computed(() => {
			return games.value
				.filter(
					(game) =>
						(game.name
							.toLowerCase()
							.includes(searchQuery.value.toLowerCase()) ||
							game.platform
								.toLowerCase()
								.includes(searchQuery.value.toLowerCase())) &&
						(selectedPlatform.value === 0 ||
							game.platformId === selectedPlatform.value),
				)
				.sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
		});

		const filterByPlatform = (platformId: number) => {
			selectedPlatform.value = platformId;
		};

		const clearAllFilters = () => {
			selectedPlatform.value = 0;
			searchQuery.value = "";
		};

		return {
			searchQuery,
			filteredGames,
			uniquePlatforms,
			selectedPlatform,
			filterByPlatform,
			clearAllFilters,
		};
	},
});
</script>

<style scoped>
#mainApp {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
  font-family: 'Roboto', sans-serif;
}

.header {
  width: 100%;
  max-width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--background-color);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  margin-top: 20px;
}

.fixed-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.game-list-container {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  background-color: var(--background-color); /* Utilise la couleur de fond du thème */
  color: var(--text-color); /* Utilise la couleur du texte du thème */

}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: var(--background-color); /* Utilise la couleur de fond du thème */
  color: var(--text-color); /* Utilise la couleur du texte du thème */
  padding: 10px;
  border-radius: 5px;
}

button {
  background-color: var(--button-bg);
  color: var(--button-text);
  border: 1px solid var(--button-border);
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: var(--button-hover);
  transform: translateY(-2px);
}

input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #747bff;
  outline: none;
}
</style>