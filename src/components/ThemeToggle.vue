<template>
	<div>
		<button @click="toggleTheme" class="theme-toggle">
    {{ isDarkTheme ? '☀️' : '🌙' }}
  </button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
	setup() {
		const isDarkTheme = ref(localStorage.getItem("theme") === "dark");

		const toggleTheme = () => {
			isDarkTheme.value = !isDarkTheme.value;
			localStorage.setItem("theme", isDarkTheme.value ? "dark" : "light");
			applyTheme();
		};

		const applyTheme = () => {
			document.documentElement.setAttribute(
				"data-theme",
				isDarkTheme.value ? "dark" : "light",
			);
		};

		watch(isDarkTheme, applyTheme, { immediate: true });

		return {
			isDarkTheme,
			toggleTheme,
		};
	},
});
</script>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
}
</style>