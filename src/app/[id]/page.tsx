"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const t = useTranslations("Redirect");
  const [link, setLink] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Busca o link na API
    fetch(`/api/links?key=${id}`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedLink = data.data.link;
        setLink(fetchedLink);

        // Redireciona o usuário
        if (fetchedLink) {
          window.location.href = fetchedLink;
        }
      });
  }, [id]);

  return (
    <div className="flex flex-col h-[100dvh]">
      <p className="flex flex-col items-center justify-center h-[calc(100dvh-80px)] text-2xl opacity-70">
        {t("title")}
      </p>
      <div>
        {/* Header Logo */}
        <div className="flex items-center justify-center gap-1">
          <Image
            src="/Linkioo-logo.png"
            width={200}
            height={150}
            alt="Linkioo"
            className="w-10 rounded-lg"
          />
          <Image
            src="/Linkioo-text.png"
            width={200}
            height={20}
            alt="Linkioo"
            className="w-20 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
