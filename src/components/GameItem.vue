<template>
  <li class="game-item">
    <img :src="game.url" :alt="game.name" class="game-image">
    <div class="game-info">
      <h2>{{ game.name }}</h2>
      <p>
        <img :src="getPlatformIcon(game.platform)" :alt="game.platform" class="platform-icon">
        {{ game.platform }}
      </p>
    </div>
  </li>
</template>

<script lang="ts">
import { getPlatformIcon } from "@/components/platformIcons";

export default {
	props: ["game"],
	setup() {
		return { getPlatformIcon };
	},
};
</script>

<style scoped>
.game-item {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.game-image {
  width: 100%;
  height: 100%;
  height: auto;
  border-radius: 4px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin: 5px 0;
}

.platform-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>