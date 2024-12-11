<template>
  <div>
    <div class="game-list">
      <div v-for="game in paginatedGames" :key="game.id" class="game-item">
        <img :src="game.url" :alt="game.name" class="game-image">
        <h3>{{ game.name }}</h3>
      </div>
    </div>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';

export default defineComponent({
  props: {
    games: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const itemsPerPage = ref(5); // Nombre d'éléments par page
    const currentPage = ref(1);

    const totalPages = computed(() => Math.ceil(props.games.length / itemsPerPage.value));

    const paginatedGames = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return props.games.slice(start, end);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    watch(currentPage, (newPage) => {
      if (newPage < 1) currentPage.value = 1;
      if (newPage > totalPages.value) currentPage.value = totalPages.value;
    });
    return {
      paginatedGames,
      currentPage,
      totalPages,
      nextPage,
      prevPage
    };
  }
});
</script>

<style scoped>
.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  min-height: 450px; /* Fixe la hauteur pour éviter le déplacement */
  width: 100%; /* Utilise toute la largeur disponible */
  max-width: 800px; /* Fixe la largeur maximale */
  margin: 0 auto; /* Centre le conteneur horizontalement */
  padding: 20px;
  border-radius: 8px;
}

.game-item {
  width: 90px;
  text-align: center;
}

.game-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
}

button {
  margin: 0 10px;
  padding: 5px 10px;
  border: none;
  background-color: #646cff;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #5353e0;
}
</style>