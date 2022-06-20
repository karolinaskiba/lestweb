import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", {
	state: () => {
		const authToken = ref("");

		function setAuthToken(token: string) {
			authToken.value = token;
		}

		function getAuthToken() {
			return authToken.value;
		}

		return {
			authToken,
			setAuthToken,
			getAuthToken,
		};
	},
});
