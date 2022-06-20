<template>
	<q-page class="row items-center justify-evenly">
		<h1>{{ t("titles.patient.messages") }}</h1>
	</q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "PatientMessages",

	setup() {
		const { t } = useI18n();

		return { t };
	},
});
</script>
