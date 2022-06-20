<template>
	<div>
		<q-list>
			<q-item-label header> </q-item-label>

			<EssentialLink
				v-for="link in essentialLinks"
				:key="link.title"
				v-bind="link"
			/>
		</q-list>
		<div class="desktop-hide q-px-md">
			<q-btn flat round color="secondary" @click="setLang('pl-PL')">PL</q-btn>
			<br />
			<q-btn flat round color="secondary" @click="setLang('en-US')">EN</q-btn>
			<br />
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
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import EssentialLink from "./EssentialLink.vue";
import { useI18n } from "vue-i18n";
import { logout } from "../helpers/auth";
import { useRouter } from "vue-router";
import { useAppStore } from "../stores/appStore";

export default defineComponent({
	name: "MainMenu",

	components: {
		EssentialLink,
	},

	setup(props) {
		const { t } = useI18n();
		const state = useAppStore();
		const router = useRouter();

		function signOut() {
			logout();
			router.push({ name: "login" });
		}

		const { locale } = useI18n({ useScope: "global" });

		function setLang(lang: string) {
			locale.value = lang;
		}
		const linksList = [
			{
				title: "menu.details",
				icon: "manage_accounts",
				path: "/details",
			},
			{
				title: "menu.measurements",
				icon: "biotech",
				path: "/measurements",
			},
			{
				title: "menu.occurrence",
				icon: "contact_emergency",
				path: "/occurrences",
			},
			{
				title: "menu.messages",
				icon: "message",
				path: "/messages",
			},
		];

		return {
			t,
			setLang,
			state,
			signOut,
			essentialLinks: linksList,
		};
	},
});
</script>
