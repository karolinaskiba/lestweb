import { RouteRecordRaw } from "vue-router";
import PatientDetails from "../pages/PatientDetails.vue";
import PatientMeasurementList from "../pages/PatientMeasurementList.vue";
import PatientOccurrenceList from "../pages/PatientOccurrenceList.vue";
import PatientMessages from "../pages/PatientMessages.vue";
import PatientOccurrenceNew from "../pages/PatientOccurrenceNew.vue";
import IndexPage from "../pages/IndexPage.vue";
import MainLayout from "../layouts/MainLayout.vue";
const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "home",
		component: MainLayout,
		children: [
			{ path: "", component: IndexPage },
			{ path: "details", component: PatientDetails },
			{ path: "measurements", component: PatientMeasurementList },
			{ path: "occurrences", component: PatientOccurrenceList },
			{ path: "occurrence/add", component: PatientOccurrenceNew },
			{ path: "messages", component: PatientMessages },
		],
		meta: { requiresAuth: true },
	},

	{
		name: "login",
		path: "/login",
		component: () => import("pages/Login.vue"),
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: "/:catchAll(.*)*",
		component: () => import("pages/ErrorNotFound.vue"),
	},
];

export default routes;
