import { UserTypeEnum } from "@/enums/UserTypeEnum";

export class UserModel {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	position: string;

	constructor(values: any = {}) {
		this.id = values.id ?? "";
		this.firstName = values.firstName ?? "";
		this.lastName = values.lastName ?? "";
		this.email = values.email ?? "";
		this.phoneNumber = values.phoneNumber ?? "";
		this.position = values.position ?? "";
	}
}
