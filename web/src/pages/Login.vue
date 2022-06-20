<template>
	<div id="q-app">
		<q-layout view="lHh Lpr fff">
			<q-page
				class="window-height window-width row justify-center items-center login-bg"
			>
				<div class="column q-pa-lg">
					<div class="row justify-center">
						<h1 class="text-h4 text-weight-bold text-secondary">LetsWeb</h1>
					</div>
					<div class="row">
						<q-card square>
							<q-card-section class="bg-teal-10">
								<h4 class="text-h5 text-white q-my-md">
									{{ $t("labels.login") }}
								</h4>
							</q-card-section>
							<q-card-section>
								<q-form class="q-px-sm q-pt-xl" @submit="signIn">
									<q-input
										square
										clearable
										v-model="userLogin"
										type="text"
										lazy-rules
										:rules="[required]"
										label="Login"
									>
										<template v-slot:prepend>
											<q-icon name="email" />
										</template>
									</q-input>
									<q-input
										square
										clearable
										v-model="password"
										:type="passwordFieldType"
										lazy-rules
										:rules="[required, short]"
										label="Password"
									>
										<template v-slot:prepend>
											<q-icon name="lock" />
										</template>
										<template v-slot:append>
											<q-icon
												:name="visibilityIcon"
												@click="switchVisibility"
												class="cursor-pointer"
											/>
										</template>
									</q-input>
									<q-btn
										class="glossy full-width"
										rounded
										unelevated
										color="secondary"
										type="submit"
									>
										{{ $t("buttons.login") }}
									</q-btn>
								</q-form>
							</q-card-section>

							<!-- <q-card-section class="text-center q-pa-sm">
								<p class="text-grey-6">Forget password ?</p>
							</q-card-section> -->
						</q-card>
					</div>
				</div>
			</q-page>
		</q-layout>
	</div>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login, logout } from "@/helpers/auth";
import * as loadingIndicator from "@/helpers/loadingIndicator";
import * as toast from "@/helpers/toast";
import { errorHandler } from "@/handlers/errorHandler";

let userLogin = ref(process.env.NODE_ENV === "development" ? "admin" : "");
let password = ref(process.env.NODE_ENV === "development" ? "ADMIN" : "");
let passwordFieldType: Ref<"password" | "text"> = ref("password");
let visibility = ref(false);
let visibilityIcon = ref("visibility");

function required(val: string) {
	return (val && val.length > 0) || "Field required";
}

function short(val: string) {
	return (val && val.length > 3) || "To short";
}

function isEmail(val: string) {
	const emailPattern =
		/^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
	return emailPattern.test(val) || "Email incorrect";
}

const router = useRouter();
const route = useRoute();

async function signIn() {
	loadingIndicator?.show();

	let isLogged = false;

	try {
		isLogged = await login(userLogin.value, password.value);
	} catch (e: any) {
		logout();
		errorHandler(e);
	}

	loadingIndicator?.hide();

	if (!isLogged) {
		toast?.error("not logged");
		return;
	}

	if ("redirect" in route.query) {
		router.push({ path: route.query.redirect as string });
	} else {
		router.push({ name: "home" });
	}

	return false;
}

function switchVisibility() {
	visibility.value = !visibility.value;
	passwordFieldType.value = visibility.value ? "text" : "password";
	visibilityIcon.value = visibility.value ? "visibility_off" : "visibility";
}
</script>

<script lang="ts">
import { useI18n } from "vue-i18n";

export default {
	name: "LoginPage",
	setup() {
		const { t } = useI18n();

		return { t };
	},
};
</script>

<style scoped>
.login-bg {
	background: url("../assets/bg.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
