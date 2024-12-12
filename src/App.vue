<template>
  <div id="mainApp">
    <div class="header">
      <LanguageSelector />
      <ThemeToggle />
    </div>
    <div class="fixed-header">
      <h1>{{ $t('title') }}</h1>
      <SearchBar v-model="searchQuery" :placeholder="$t('searchPlaceholder')" />
      <QuickFilters :platforms="uniquePlatforms" :selected-platform="selectedPlatform" @filter="filterByPlatform"
        @clear="clearAllFilters" />
    </div>
    <GameList :games="filteredGames" @select="openModal" />
    <GameModal v-if="selectedGame" :game="selectedGame" :platforms="platforms" :isVisible="isModalVisible"
      @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import SearchBar from "@/components/SearchBar.vue";
import QuickFilters from "@/components/QuickFilters.vue";
import GameList from "@/components/GameList.vue";
import LanguageSelector from "@/components/LanguageSelector.vue";
import ThemeToggle from "@/components/ThemeToggle.vue";
import GameModal from '@/components/GameModal.vue';
import platformsData from "@/data/platforms.json";
import gamesData from "@/data/games.json";

import type { Game, Platform } from '@/types';

export default defineComponent({
  components: {
    SearchBar,
    QuickFilters,
    GameList,
    GameModal,
    LanguageSelector,
    ThemeToggle,
  },
  setup() {
    const games = ref<Game[]>(gamesData);
    const platforms = ref<Platform[]>(platformsData);
    const searchQuery = ref<string>("");
    const selectedPlatform = ref<Platform | null>(null);

    const uniquePlatforms = computed<Platform[]>(() => {
      const platformIds = Array.from(new Set(games.value.map(game => game.platformId)));
      return platforms.value.filter(platform => platformIds.includes(platform.id));
    });

    const filteredGames = computed<Game[]>(() => {
      return games.value
        .filter(
          (game) =>
            (game.name
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())) &&
            (selectedPlatform.value === null ||
              game.platformId === selectedPlatform.value.id),
        )
        .sort((a, b) => a.name.localeCompare(b.name)); // Tri par ordre alphabétique
    });

    const selectedGame = ref<Game | null>(null);
    const isModalVisible = ref<boolean>(false);

    function openModal(game: Game) {
      selectedGame.value = game;
      isModalVisible.value = true;
      console.log(`Open modal for game: ${game.name}`);
    }

    function closeModal() {
      isModalVisible.value = false;
      selectedGame.value = null;
    }

    const filterByPlatform = (platform: Platform) => {
      selectedPlatform.value = platform;
    };

    const clearAllFilters = () => {
      selectedPlatform.value = null;
      searchQuery.value = "";
    };

    return {
      searchQuery,
      filteredGames,
      uniquePlatforms,
      selectedPlatform,
      filterByPlatform,
      clearAllFilters,
      openModal,
      closeModal,
      selectedGame,
      isModalVisible,
      platforms
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

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: var(--background-color);
  /* Utilise la couleur de fond du thème */
  color: var(--text-color);
  /* Utilise la couleur du texte du thème */
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