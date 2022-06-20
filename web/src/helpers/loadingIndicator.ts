import { useQuasar, Loading, QSpinnerGears } from "quasar";

let indicatorVisible = false;

export async function show() {
	const $q = useQuasar();
	indicatorVisible = true;
	$q?.loading.show();
	Loading.show({
		spinner: QSpinnerGears,
	});
}

export async function hide() {
	const $q = useQuasar();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	indicatorVisible = false;
	$q?.loading.hide();
	Loading.hide();
}
