<template>
	<q-page class="row items-center justify-evenly">
		<!--	{{ $t("failed") }}
	 	<button @click="setLang('pl-PL')">PL</button>
		<button @click="setLang('en-US')">EN</button>
		<example-component
			title="Example component"
			active
			:todos="todos"
			:meta="meta"
		></example-component> -->
	</q-page>
</template>

<script lang="ts">
import { Todo, Meta } from "components/models";
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "IndexPage",
	setup() {
		return {};
	},
});
</script>
