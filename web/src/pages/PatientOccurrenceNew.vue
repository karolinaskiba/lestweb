<template>
	<q-page>
		<div>
			<div class="column q-pa-lg">
				<div class="">
					<q-card square>
						<q-card-section class="bg-teal-10">
							<h4 class="text-h5 text-white q-my-md">
								{{ t("titles.patient.notification add") }}
							</h4>
						</q-card-section>
						<q-card-section>
							<q-form class="q-px-sm q-pt-xl">
								<q-input
									v-model="occurence.spot"
									:label="$t('labels.table.spot')"
									:rules="[
										(val) =>
											(val && val.length > 0) ||
											$t('form.rules.Please complete the field'),
									]"
								/>
								<q-input
									v-model="occurence.description"
									:label="$t('labels.table.description')"
									:rules="[
										(val) =>
											(val && val.length > 0) ||
											$t('form.rules.Please complete the field'),
									]"
								/>

								<div class="q-mb-md" style="max-width: 300px">
									<div class="q-my-md">
										<label>{{ $t("labels.table.occurrence time") }}</label>
									</div>

									<q-input filled v-model="occurence.occurrence_time">
										<template v-slot:prepend>
											<q-icon name="event" class="cursor-pointer">
												<q-popup-proxy
													cover
													transition-show="scale"
													transition-hide="scale"
												>
													<q-date
														v-model="occurence.occurrence_time"
														mask="YYYY-MM-DD HH:mm"
														:locale="calendar"
													>
														<div class="row items-center justify-end">
															<q-btn v-close-popup color="secondary" flat>
																{{ $t("buttons.close") }}
															</q-btn>
														</div>
													</q-date>
												</q-popup-proxy>
											</q-icon>
										</template>

										<template v-slot:append>
											<q-icon name="access_time" class="cursor-pointer">
												<q-popup-proxy
													cover
													transition-show="scale"
													transition-hide="scale"
												>
													<q-time
														v-model="occurence.occurrence_time"
														mask="YYYY-MM-DD HH:mm"
														format24h
													>
														<div class="row items-center justify-end">
															<q-btn v-close-popup color="primary" flat>
																{{ $t("buttons.close") }}
															</q-btn>
														</div>
													</q-time>
												</q-popup-proxy>
											</q-icon>
										</template>
									</q-input>
								</div>
								<q-btn
									class="glossy"
									rounded
									color="secondary"
									icon="add"
									unelevated
									@click="addtOccurrence"
								>
									{{ $t("buttons.add") }}
								</q-btn>
							</q-form>
						</q-card-section>
					</q-card>
				</div>
			</div>

			<div></div>
		</div>
	</q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "../stores/appStore";
import { OccurenceService } from "../services/OccurenceService";
import * as loadingIndicator from "../helpers/loadingIndicator";
import * as toast from "../helpers/toast";
import { errorHandler } from "../handlers/errorHandler";
import { useRouter } from "vue-router";

export default defineComponent({
	name: "PatientOccurrenceNew",

	setup() {
		const { t } = useI18n();

		const router = useRouter();

		const occurence = reactive({
			patientid: useAppStore().getUserData.id,
			spot: "",
			description: "",
			occurrence_time: "",
		});

		const addtOccurrence = (e: FormDataEvent) => {
			e.preventDefault();

			if (
				occurence.patientid === "" ||
				occurence.occurrence_time === "" ||
				occurence.spot === "" ||
				occurence.description === ""
			) {
				const messageErr = t("form.rules.Please complete the fields");

				toast?.error(messageErr);
				return;
			}

			const service = new OccurenceService();
			loadingIndicator?.show();
			service
				.add(occurence)
				.then((result) => {
					loadingIndicator?.hide();

					if (result.message) {
						toast?.error(result.message);
						return;
					}

					const messageSuccess = t("form.rules.The occurrence has been added");

					toast?.open(messageSuccess);

					router.go(-1);
				})
				.catch(errorHandler);
		};
		const calendar = {
			months: [
				t("calendar.months.January"),
				t("calendar.months.February"),
				t("calendar.months.March"),
				t("calendar.months.April"),
				t("calendar.months.May"),
				t("calendar.months.June"),
				t("calendar.months.July"),
				t("calendar.months.August"),
				t("calendar.months.September"),
				t("calendar.months.October"),
				t("calendar.months.November"),
				t("calendar.months.December"),
			],
			days: [
				t("calendar.days.Sunday"),
				t("calendar.days.Monday"),
				t("calendar.days.Tuesday"),
				t("calendar.days.Wednesday"),
				t("calendar.days.Thursday"),
				t("calendar.days.Friday"),
				t("calendar.days.Saturday"),
			],
			daysShort: [
				t("calendar.days.short.Su"),
				t("calendar.days.short.Mo"),
				t("calendar.days.short.Tu"),
				t("calendar.days.short.We"),
				t("calendar.days.short.Th"),
				t("calendar.days.short.Fr"),
				t("calendar.days.short.Sa"),
			],
			monthsShort: [
				t("calendar.months.short.Jan"),
				t("calendar.months.short.Feb"),
				t("calendar.months.short.Mar"),
				t("calendar.months.short.Apr"),
				t("calendar.months.short.May"),
				t("calendar.months.short.Jun"),
				t("calendar.months.short.Jul"),
				t("calendar.months.short.Aug"),
				t("calendar.months.short.Sep"),
				t("calendar.months.short.Oct"),
				t("calendar.months.short.Nov"),
				t("calendar.months.short.Dec"),
			],
		};
		return { t, occurence, addtOccurrence, router, calendar };
	},
});
</script>
