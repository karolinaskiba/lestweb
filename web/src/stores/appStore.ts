import { defineStore } from "pinia";
import { LanguageInterface } from "@/interfaces/LanguageInterface";
import { UserModel } from "@/models/UserModel";

export const useAppStore = defineStore("app", {
	state: () => ({
		isAuthenticated: false,
		isAdmin: false,
		user: <UserModel>{},
		loadingOverlay: false,
		language: <LanguageInterface>{},
	}),
	getters: {
		getUserData: (state) => state.user,
	},
	//   actions: {
	//     increment() {
	//       this.counter++;
	//     },
	//   },
});
