export default Object.freeze({
	development: process.env.NODE_ENV === "development" ? true : false,

	requestCache: <RequestCache>"no-cache",

	containerElementId: "#app",

	languages: [
		{
			locale: "pl-PL",
			culture: "pl",
			name: "Polski",
			currency: "PLN",
		},
	],

	api: {
		url: (process.env as any)[process.env.NODE_ENV].APP_API,
		routes: {
			account: {
				login: "/login",
				register: "/register",
				confirm: "/confirm",
				passwordNew: "/password-new",
				passwordConfirm: "/password-confirm",
			},
			user: {
				get: "/user",
				put: "/user",
				delete: "/user",
				passwordChange: "/user/password",
			},
		},
	},

	nx_api: {
		url: (process.env as any)[process.env.NODE_ENV].APP_NX_API,
		routes: {
			account: {
				login: "api/Token",
			},
			user: {
				get: "api/User",
			},
		},
	},

	patient_api: {
		url: (process.env as any)[process.env.NODE_ENV].APP_PATIENT_API,
		routes: {
			occurrence: {
				post: "/pain_occurrence/add",
				get: "/pain_occurrence2?patientid={userId}&inserttime_n_older_than={inserttime}&occurrence_n_older_than={occurrence}",
			},
			measurement: {
				get: "/measurements2/{patient_id}",
			},
		},
	},
});
