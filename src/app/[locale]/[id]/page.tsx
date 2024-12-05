"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [link, setLink] = useState("");
  const { id } = useParams();

  fetch(
    `https://obscure-dollop-ggr55xwg4942w7rw-3001.app.github.dev/links?key=${id}`
  )
    .then((response) => response.json())
    .then((data) => {
      setLink(data[0].link);
    });

  console.log(link);

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex flex-col items-center justify-center h-[calc(100dvh-80px)]">
        <p className="max-w-xs text-center mb-2">Confira se esse é mesmo o link que deseja acessar: </p>
        <a href={link} className="bg-violet-200 max-w-xs break-all p-2 rounded-md">{link}</a>
        <a href={link} className="w-32 h-32 mt-4 bg-violet-800 text-white flex items-center  text-center rounded-full">Clique para acessar!</a>
      </div>

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
