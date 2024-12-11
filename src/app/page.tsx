"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("Home");
  const [userUrl, setUserUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [message, setMessage] = useState("");
  const linkiooURL = window.location.origin;

  function messageBox(message: string) {
    setMessage(message);
    setTimeout(() => setMessage(""), 5000);
  }

  async function handleShortenUrl(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userUrl) {
      messageBox("Both fields are required!");
      return;
    }

    fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: userUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.error
          ? messageBox(data.error)
          : setShortenedUrl(`${linkiooURL}/${data.post.key}`);
      });
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
            <li>
              <a href="#about">{t("about")}</a>
            </li>
            <li>
              <a href="#price">{t("price")}</a>
            </li>
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
              {/* Error result */}
              {message ? (
                <div className="w-[100%] p-1 rounded-md bg-red-500/20 text-red-600">
                  {message}
                </div>
              ) : (
                ""
              )}

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
              {shortenedUrl ? (
                <div className="w-[100%] border-2 border-violet-80 p-1 rounded-md bg-slate-500/20 text-slate-600">
                  {shortenedUrl}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* Infos */}
          <div className="flex flex-col items-center justify-center">
            {/* About project */}
            <div className="mt-12 w-[100%] max-w-lg" id="about">
              <div>
                <h2 className="text-xl text-violet-900 font-bold">
                  {t("about")}
                </h2>
                <p className="opacity-60">{t("about-content")}</p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-12 w-[100%] max-w-lg" id="price">
              <div>
                <h2 className="text-xl text-violet-900 font-bold">
                  {t("price")}
                </h2>
                <p className="opacity-60">{t("price-content")}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
