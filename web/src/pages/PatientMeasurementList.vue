<template>
	<q-page>
		<div class="column q-pa-lg">
			<div>
				<q-card square>
					<q-card-section class="bg-teal-10">
						<h4 class="text-h5 text-white q-my-md">
							{{ t("titles.patient.measurements") }}
						</h4>
					</q-card-section>
					<q-table
						class="bg-teal-1"
						bordered
						flat
						:rows-per-page-label="t('labels.table.labels.rows per page')"
						:rows="measurements"
						:columns="columns"
						:row-key="measurements.bucket_start"
					></q-table>
				</q-card>
			</div>
		</div>
	</q-page>
</template>

<script setup lang="ts">
import { defineExpose, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { MeasurementeModel } from "../models/MeasurementModel";

const { t } = useI18n();

const measurements = reactive([] as MeasurementeModel[]);
defineExpose({ measurements });

const columns = [
	{
		name: "patientid",
		required: true,
		label: t("labels.table.patient id"),
		align: "center",
		field: "patientid",
	},
	{
		name: "insert_time",
		align: "center",
		label: t("labels.table.bucket start"),
		field: "bucket_start",
		sortable: true,
	},
	{
		name: "bucket_stop",
		label: t("labels.table.bucket stop"),
		field: "bucket_stop",
		sortable: true,
		align: "center",
	},
];
</script>

<script lang="ts">
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { MeasurementService } from "../services/MeasurmentService";
import { errorHandler } from "../handlers/errorHandler";
import { defineComponent } from "vue";
import { useAppStore } from "../stores/appStore";
import * as loadingIndicator from "../helpers/loadingIndicator";

export default defineComponent({
	name: "PatientMeasurementList",

	async beforeRouteEnter(
		to: RouteLocationNormalized,
		from: RouteLocationNormalized,
		next: NavigationGuardNext
	) {
		loadingIndicator?.show();

		try {
			let list: MeasurementeModel[];
			const userId = useAppStore().user.id;
			await new MeasurementService()
				.get(userId)
				.then((result) => (list = result)),
				next((vm: any) => {
					list.forEach((item) =>
						vm.measurements.push({
							patientid: item.patientid,
							bucket_start: new Date(item.bucket_start).toLocaleString("pl-PL"),
							bucket_stop: new Date(item.bucket_stop).toLocaleString("pl-PL"),
							counter3: item.counter3,
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
