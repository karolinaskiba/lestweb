<template>
	<q-page>
		<div class="column q-pa-lg">
			<div>
				<q-card square>
					<q-card-section class="bg-teal-10 row items-center">
						<h4 class="text-h5 text-white q-my-md">
							{{ t("titles.patient.notification") }}
						</h4>
						<q-btn
							class="glossy q-mx-md"
							rounded
							color="secondary"
							icon="add"
							unelevated
							:to="{ path: '/occurrence/add' }"
						>
							{{ $t("buttons.add") }}
						</q-btn>
					</q-card-section>
					<div>
						<q-table
							:rows-per-page-label="t('labels.table.labels.rows per page')"
							class="bg-teal-1"
							:flat="false"
							:rows="occurences"
							:columns="columns"
							row-key="name"
						></q-table>
					</div>
				</q-card>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { defineExpose, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { OccurenceModel } from "../models/OccurenceModel";

const { t } = useI18n();

const occurences = reactive([] as OccurenceModel[]);
defineExpose({ occurences });

const columns = [
	{
		name: "id",
		required: true,
		label: t("labels.table.id"),
		align: "left",
		field: "id",
	},
	{
		name: "insert_time",
		align: "center",
		label: t("labels.table.insert time"),
		field: "insert_time",
		sortable: true,
	},
	{
		name: "patientid",
		label: t("labels.table.patient id"),
		field: "patientid",
		sortable: true,
		align: "center",
	},
	{
		name: "occurrence_time",
		label: t("labels.table.occurrence time"),
		field: "occurrence_time",
		align: "center",
	},
	{
		name: "spot",
		label: t("labels.table.spot"),
		field: "spot",
		align: "center",
	},
	{
		name: "description",
		label: t("labels.table.description"),
		field: "description",
		align: "center",
	},
];
</script>

<script lang="ts">
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { OccurenceService } from "../services/OccurenceService";
import { errorHandler } from "../handlers/errorHandler";
import { defineComponent } from "vue";
import { useAppStore } from "../stores/appStore";
import * as loadingIndicator from "../helpers/loadingIndicator";

export default defineComponent({
	name: "PatientOccurrenceList",

	async beforeRouteEnter(
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) {
		loadingIndicator?.show();

		try {
			let list: OccurenceModel[];
			const userId = useAppStore().user.id;
			await new OccurenceService()
				.get(userId, 0, 0)
				.then((result) => (list = result)),
				next((vm: any) => {
					list.forEach((item) =>
						vm.occurences.push({
							id: item.id,
							insert_time: new Date(item.insert_time).toLocaleString("pl-PL"),
							patientid: item.patientid,
							occurrence_time: new Date(item.occurrence_time).toLocaleString(
								"pl-PL"
							),
							spot: item.spot,
							description: item.description,
						})
					);
				});
		} catch (e: any) {
			errorHandler(e);
		}

		loadingIndicator?.hide();
	},
});
</script>
