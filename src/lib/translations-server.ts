import { cookies } from "next/headers";
import { translations } from "./translations";

export async function getLanguage() {
  const cookieStore = await cookies();
  return cookieStore.get("lang")?.value || "en";
}

export async function useTranslation() {
  const lang = await getLanguage();
  return {
    t: (key: string) => {
      return translations[lang]?.[key] || translations["en"]?.[key] || key;
    },
    lang
  };
}
