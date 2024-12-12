<template>
  <div class="quick-filters">
    <button v-for="platform in filteredPlatforms" :key="platform.id" @click="$emit('filter', platform)"
      :class="{ active: selectedPlatform === platform }" class="platform-filter">
      <img :src="platform.iconUrl" :alt="platform.name" class="platform-icon">
      {{ platform.name }}
    </button>
    <button @click="$emit('clear')" class="clear-filter">{{ $t('clearFilters') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import platformsData from "../data/platforms.json"; // Importez les données des plateformes
import gamesData from "../data/games.json"; // Importez les données des jeux
import type { Platform } from '@/types';

export default defineComponent({
  props: {
    selectedPlatform: {
      type: Object as () => Platform | null
    }
  },
  setup() {
    // Obtenez les plateformes uniques à partir des jeux
    const uniquePlatformIds = computed(() => {
      const platformIds = gamesData.map((game: any) => game.platformId);
      return [...new Set(platformIds)];
    });

    // Filtrez les plateformes disponibles
    const filteredPlatforms = computed(() => {
      return platformsData.filter((platform: Platform) =>
        uniquePlatformIds.value.includes(platform.id),
      );
    });

    return {
      filteredPlatforms,
    };
  },
});
</script>

<style scoped>
.quick-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  /* Center items vertically */
}

.platform-filter,
.clear-filter {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  /* Center content vertically */
}

.platform-filter:hover,
.clear-filter:hover {
  background-color: #e0e0e0;
}

.platform-filter.active {
  background-color: #d0d0d0;
}

.platform-icon {
  width: 24px;
  /* Set a fixed width */
  height: 24px;
  /* Set a fixed height */
  margin-right: 5px;
}

.clear-filter {
  background-color: #ffcccc;
}

.clear-filter:hover {
  background-color: #ff9999;
}
</style>