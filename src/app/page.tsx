"use client";
import * as React from "react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const t = useTranslations("Home");
  const [userUrl, setUserUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [message, setMessage] = useState("");
  const [copyButton, setCopyButton] = useState(t("button-copy"));
  const [key, setKey] = useState("");
  const linkiooURL = "https://lkoo.xyz";

  function messageBox(message: string) {
    setMessage(message);
    setTimeout(() => setMessage(""), 3000);
  }

  function copyContent() {
    navigator.clipboard.writeText(shortenedUrl);
    setCopyButton(t("button-copied"));
    setTimeout(() => setCopyButton(t("button-copy")), 3000);
  }

  function generateKey(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    const lenght = 8;
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
    let generatedKey = "";

    for (let i = 0; i < lenght; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedKey += chars[randomIndex];
    }

    setKey(generatedKey);
  }

  async function handleShortenUrl(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userUrl || !key) {
      messageBox(t("form-message"));
      return;
    }

    // Indicador de link em processamento
    setShortenedUrl(t("input-link-being-processed"));

    fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: userUrl, key: key }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.error
          ? messageBox(data.error)
          : setShortenedUrl(`${linkiooURL}/${data.post.key}`);
      });

    setUserUrl("");
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 pb-8">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="flex items-center justify-center h-20 mb-4">
          <Image
            src="/Linkioo-logo.png"
            width={200}
            height={100}
            alt="Linkioo"
            className="w-10"
          />
          <Image
            src="/Linkioo-text.png"
            width={200}
            height={100}
            alt="Linkioo"
            className="w-24"
          />
        </header>

        {/* Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("subtitle")}</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleShortenUrl}>
              <div className="grid w-full items-center gap-4">
                {/* Error message */}
                {message ? (
                  <div className="flex flex-col">
                    <div className="w-full p-1.5 rounded-md bg-red-500/20 text-red-600">
                      {message}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="url">{t("form-url-label")}</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder={t("form-url-input")}
                    onChange={(e) => setUserUrl(e.target.value)}
                    value={userUrl}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="key">{t("form-key-label")}</Label>
                  <Input
                    id="key"
                    placeholder={t("form-key-input")}
                    onChange={(e) => setKey(e.target.value)}
                    value={key}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button
                    onClick={(event) => {
                      generateKey(event);
                    }}
                    variant="outline"
                  >
                    {t("button-key-aleatory")}
                  </Button>
                  <Button type="submit" className="text-white">
                    {t("button-submit")}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>

          {/* Url result */}
          {shortenedUrl ? (
            <CardFooter className="flex justify-between">
              <div className="flex w-full items-center space-x-2">
                <Input value={shortenedUrl} disabled />
                <Button
                  className="text-white"
                  onClick={() => {
                    copyContent();
                  }}
                >
                  {copyButton}
                </Button>
              </div>
            </CardFooter>
          ) : (
            ""
          )}
        </Card>

        {/* FAQ */}
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 mt-8">
          <h2 className="font-bold">{t("about-title")}</h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t("question-1-title")}</AccordionTrigger>
              <AccordionContent>{t("question-1-paragraph")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>{t("question-2-title")}</AccordionTrigger>
              <AccordionContent>{t("question-2-paragraph")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>{t("question-3-title")}</AccordionTrigger>
              <AccordionContent>{t("question-3-paragraph")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>{t("question-4-title")}</AccordionTrigger>
              <AccordionContent>{t("question-4-paragraph")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>{t("question-5-title")}</AccordionTrigger>
              <AccordionContent>{t("question-5-paragraph")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>{t("question-6-title")}</AccordionTrigger>
              <AccordionContent>{t("question-6-paragraph")}</AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>{t("question-7-title")}</AccordionTrigger>
              <AccordionContent>{t("question-7-paragraph")}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* footer */}
        <footer className="flex items-center gap-2 justify-center h-20 mt-4">
          <a href="https://www.carlosdev.top/" className="opacity-80">
            {t("developer-link")}
          </a>
          |
          <a
            href="https://github.com/CarlosEduts/linkioo"
            className="opacity-80"
          >
            {t("github-link")}
          </a>
        </footer>
      </div>
    </div>
  );
}
