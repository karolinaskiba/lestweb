import { LanguageInterface } from "@/interfaces/LanguageInterface";

export interface ITranslateService {
	setLocale(locale: LanguageInterface): Promise<void>;
	getLocale(): LanguageInterface;
	_(phrase: string, params?: any): string;
}
