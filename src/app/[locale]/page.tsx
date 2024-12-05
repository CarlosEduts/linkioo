"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("Home");

  const [userUrl, setUserUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const keyLength = 10;

  console.log(userUrl);
  console.log(shortenedUrl);

  function generateKey(lenght: number): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";

    for (let i = 0; i < lenght; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      key += chars[randomIndex];
    }

    return key;
  }

  async function handleShortenUrl(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userUrl) {
      alert("Both fields are required!");
      return;
    }

    console.log(`Url of function ...: ${userUrl}`);
    console.log(generateKey(keyLength));

    try {
      const key = generateKey(keyLength);
      const response = await fetch(
        "https://obscure-dollop-ggr55xwg4942w7rw-3001.app.github.dev/links",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: key, link: userUrl }),
        }
      );

      if (response.ok) {
        alert("Post added successfully!");
        setShortenedUrl(key);
      } else {
        alert("Failed to add post.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 pb-8">
      <div className="w-[100%] max-w-[800px]">
        {/* Header */}
        <header className="flex items-center justify-between h-20">
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

          {/* Header Links */}
          <ul className="flex item-center gap-4">
            <li>{t("about")}</li>
            <li>{t("price")}</li>
            <li>GitHub</li>
          </ul>
        </header>

        {/* Main */}
        <main className="flex flex-col">
          {/* Title and subtitle */}
          <div className="flex flex-col items-center justify-center pt-12 pb-8 text-center">
            {/* Main Logo */}
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/Linkioo-logo.png"
                width={400}
                height={150}
                alt="Linkioo"
                className="w-40 rounded-lg"
              />
              <Image
                src="/Linkioo-text.png"
                width={200}
                height={20}
                alt="Linkioo"
                className="w-28 rounded-lg"
              />
            </div>
            <p>{t("subtitle")}</p>
          </div>

          {/* Form */}
          <div className="flex items-center flex-col">
            <div className="flex items-center flex-col gap-3 justify-center w-[100%] max-w-96 px-2 py-4 border border-[--foreground] rounded-md">
              <form
                onSubmit={handleShortenUrl}
                className="flex flex-col gap-3 w-[100%] "
              >
                <input
                  type="url"
                  name=""
                  id=""
                  placeholder={t("form-input")}
                  onChange={(e) => setUserUrl(e.target.value)}
                  className="w-[100%] border-2 border-violet-80 p-1 rounded-md bg-slate-500/20"
                />
                <button
                  type="submit"
                  className="w-[100%] bg-violet-800 text-white p-1 rounded-md"
                >
                  {t("form-button")}
                </button>
              </form>

              {/* Url result */}
              <div className="w-[100%] border-2 border-violet-80 p-1 rounded-md bg-slate-500/20 text-slate-600">
                {shortenedUrl ? shortenedUrl : t("form-result")}
              </div>
            </div>
          </div>

          {/* Infos */}
          <div className="flex flex-col items-center justify-center">
            {/* About project */}
            <div className="mt-12 w-[100%] max-w-lg">
              <div>
                <h2 className="text-xl text-violet-900 font-bold">{t("about")}</h2>
                <p className="opacity-60">
                  {t("about-content")}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-12 w-[100%] max-w-lg">
              <div>
                <h2 className="text-xl text-violet-900 font-bold">{t("price")}</h2>
                <p className="opacity-60">
                  {t("price-content")}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
