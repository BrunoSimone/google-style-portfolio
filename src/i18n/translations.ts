import { es } from "./es";
import { en } from "./en";

export type Locale = "es" | "en";

export const translations = { es, en };

export type Translations = typeof es;
