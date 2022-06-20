import { string2UTC } from "common-ts/src/common/date";

export class MeasurementeModel {
	patientid: string;
	bucket_start: Date;
	bucket_stop: Date;
	counter3: number;

	constructor(values: any = {}) {
		this.patientid = values.patientid ?? "";

		this.bucket_start = values.bucket_start
			? string2UTC(values.bucket_start)
			: new Date();
		this.bucket_stop = values.bucket_stop
			? string2UTC(values.bucket_stop)
			: new Date();
		this.counter3 = values.counter3 ?? 0;
	}
}
