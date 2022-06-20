import { string2UTC } from "common-ts/src/common/date";

export class OccurenceModel {
	id: string;
	insert_time: Date;
	patientid: string;
	occurrence_time: Date;
	spot: string;
	description: string;

	constructor(values: any = {}) {
		this.id = values.id ?? "";
		this.insert_time = values.insert_time
			? string2UTC(values.insert_time)
			: new Date();
		this.patientid = values.patientid ?? "";
		this.occurrence_time = values.occurrence_time
			? string2UTC(values.occurrence_time)
			: new Date();
		this.spot = values.spot ?? "";
		this.description = values.description ?? "";
	}
}
