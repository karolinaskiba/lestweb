<template>
	<q-item clickable tag="a" :to="path">
		<q-item-section v-if="icon" avatar>
			<q-icon :name="icon" />
		</q-item-section>

		<q-item-section>
			<q-item-label>{{ $t(title) }}</q-item-label>
		</q-item-section>
	</q-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "EssentialLink",
	props: {
		title: {
			type: String,
			required: true,
		},

		path: {
			type: String,
			default: "#",
		},

		icon: {
			type: String,
			default: "",
		},
	},
});
</script>
