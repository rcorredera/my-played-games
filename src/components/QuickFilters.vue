<template>
  <div class="quick-filters">
    <button 
      v-for="platform in filteredPlatforms"
      :key="platform.id"
      @click="$emit('filter', platform.id)"
      :class="{ active: selectedPlatform === platform.id }"
      class="platform-filter"
    >
      <img :src="getPlatformIcon(platform.id)" :alt="platform.name" class="platform-icon">
      {{ platform.name }}
    </button>
    <button @click="$emit('clear')" class="clear-filter">{{ $t('clearFilters') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import platformsData from "../data/platforms.json"; // Importez les données des plateformes
import gamesData from "../data/games.json"; // Importez les données des jeux

export default defineComponent({
  props: {
    selectedPlatform: Number,
  },
  setup() {
    // Obtenez les plateformes uniques à partir des jeux
    const uniquePlatformIds = computed(() => {
      const platformIds = gamesData.map((game: any) => game.platformId);
      return [...new Set(platformIds)];
    });

    // Filtrez les plateformes disponibles
    const filteredPlatforms = computed(() => {
      return platformsData.filter((platform: any) => uniquePlatformIds.value.includes(platform.id));
    });

    const getPlatformIcon = (platformId: number) => {
      const platform = platformsData.find((p: any) => p.id === platformId);
      return platform ? platform.iconUrl : '';
    };

    return {
      filteredPlatforms,
      getPlatformIcon
    };
  }
});
</script>

<style scoped>
.quick-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center; /* Center items vertically */
}

.platform-filter, .clear-filter {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center; /* Center content vertically */
}

.platform-filter:hover, .clear-filter:hover {
  background-color: #e0e0e0;
}

.platform-filter.active {
  background-color: #d0d0d0;
}

.platform-icon {
  width: 24px; /* Set a fixed width */
  height: 24px; /* Set a fixed height */
  margin-right: 5px;
}

.clear-filter {
  background-color: #ffcccc;
}

.clear-filter:hover {
  background-color: #ff9999;
}
</style>