import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  // Obter os cabeçalhos usando await
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");
  const locale = acceptLanguage?.split(",")[0].split("-")[0] || "en"; // Extrair o idioma principal

  return {
    locale,
    messages: (
      await import(`../../messages/${locale}.json`).catch(
        () => import(`../../messages/en.json`) // Padrão em caso de erro
      )
    ).default,
  };
});
