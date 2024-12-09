import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "@/App.vue";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";
import "@/assets/themes.css";
import "@/style.css";

const getBrowserLocale = () => {
	const navigatorLocale =
		navigator.languages !== undefined
			? navigator.languages[0]
			: navigator.language;

	if (!navigatorLocale) {
		return "en";
	}

	const trimmedLocale = navigatorLocale.trim().split(/-|_/)[0];
	return ["en", "fr"].includes(trimmedLocale) ? trimmedLocale : "en";
};

const i18n = createI18n({
	locale: getBrowserLocale(),
	fallbackLocale: "en",
	messages: { en, fr },
});

const app = createApp(App);
app.use(i18n);
app.mount("#app");
