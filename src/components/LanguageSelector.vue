<template>
  <div class="language-selector">
    <button v-for="lang in availableLanguages" :key="lang.code" @click="changeLanguage(lang.code)">
      <img :src="lang.flag" :alt="lang.name" class="flag-icon">
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	setup() {
		const { locale } = useI18n();

		const availableLanguages = [
			{ code: "en", name: "English", flag: "./flags/en.png" },
			{ code: "fr", name: "Français", flag: "./flags/fr.png" },
			// Ajoutez d'autres langues ici
		];

		const changeLanguage = (langCode: string) => {
			locale.value = langCode;
		};

		return {
			availableLanguages,
			changeLanguage,
		};
	},
});
</script>

<style scoped>
.language-selector {
  display: flex;
  gap: 10px;
}

.flag-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}
</style>