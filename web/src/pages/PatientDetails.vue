<template>
	<q-page>
		<div class="column q-pa-lg">
			<div>
				<q-card square>
					<q-card-section class="bg-teal-10">
						<h4 class="text-h5 text-white q-my-md">
							{{ t("titles.patient.details") }}
						</h4>
					</q-card-section>
					<q-card-section class="bg-teal-1">
						<q-list dense separator class="bg-teal-1">
							<q-item>
								<q-item-section class="q-py-sm"
									>{{ $t("labels.first name") }} : {{ user.firstName }}
								</q-item-section>
							</q-item>

							<q-item>
								<q-item-section class="q-py-sm">
									{{ $t("labels.last name") }} : {{ user.lastName }}
								</q-item-section>
							</q-item>

							<q-item>
								<q-item-section class="q-py-sm">
									{{ $t("labels.email") }} : {{ user.email }}
								</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="q-py-sm">
									{{ $t("labels.phone number") }} : {{ user.phoneNumber }}
								</q-item-section>
							</q-item>
							<q-item>
								<q-item-section class="q-py-sm">
									{{ $t("labels.position") }} : {{ user.position }}
								</q-item-section>
							</q-item>
						</q-list>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "../stores/appStore";

export default defineComponent({
	name: "PatientDetails",

	setup() {
		const { t } = useI18n();
		const store = useAppStore();

		return { t, user: store.getUserData };
	},
});
</script>
