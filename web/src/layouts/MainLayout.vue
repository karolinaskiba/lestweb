<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated class="bg-teal-10">
			<q-toolbar>
				<q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/>

				<q-toolbar-title> LetsWeb </q-toolbar-title>
				<div v-if="state.isAuthenticated" class="q-mr-sm">
					{{ state.user.firstName }} {{ state.user.lastName }}
				</div>
				<div class="mobile-hide">
					<q-btn
						unelevated
						rounded
						class="glossy"
						color="secondary"
						@click="signOut"
						icon="logout"
					>
						{{ $t("buttons.logout") }}
					</q-btn>
				</div>
				<div class="q-ml-md mobile-hide">
					<q-btn flat round color="white" @click="setLang('pl-PL')">PL</q-btn>
					<q-btn flat round color="white" @click="setLang('en-US')">EN</q-btn>
				</div>
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" show-if-above bordered>
			<MainMenu />
		</q-drawer>
		<q-page-container class="page-bg">
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
//import EssentialLink from "../components/EssentialLink.vue";
import MainMenu from "../components/MainMenu.vue";
import { useAppStore } from "../stores/appStore";
import { logout } from "../helpers/auth";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "MainLayout",

	components: {
		//EssentialLink,
		MainMenu,
	},

	setup() {
		const leftDrawerOpen = ref(false);
		const state = useAppStore();
		const router = useRouter();
		const route = useRoute();

		function signOut() {
			logout();
			if ("redirect" in route.query) {
				router.push({ path: route.query.redirect as string });
			} else {
				router.push({ name: "home" });
			}
		}

		const { locale } = useI18n({ useScope: "global" });

		function setLang(lang: string) {
			locale.value = lang;
		}
		return {
			setLang,
			leftDrawerOpen,
			state,
			signOut,
			toggleLeftDrawer() {
				leftDrawerOpen.value = !leftDrawerOpen.value;
			},
		};
	},
});
</script>
<style scoped>
.page-bg {
	background: url("../assets/bg9.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
