<template>
  <div class="quick-filters">
    <button 
      v-for="platform in platforms" 
      :key="platform"
      @click="$emit('filter', platform)"
      :class="{ active: selectedPlatform === platform }"
      class="platform-filter"
    >
      <img :src="getPlatformIcon(platform)" :alt="platform" class="platform-icon">
      {{ platform }}
    </button>
    <button @click="$emit('clear')" class="clear-filter">{{ $t('clearFilters') }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getPlatformIcon } from "@/components/PlatformIcons";

export default defineComponent({
  props: {
    platforms: Array,
    selectedPlatform: String
  },
  methods: {
    getPlatformIcon
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