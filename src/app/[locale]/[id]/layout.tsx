import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linkioo: your fast and reliable link shortener",
  description: "Simplify and share: your fast and reliable link shortener",
};

type Params = {
  children: React.ReactNode;
};

export default async function LocaleLayout({ children }: Params) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
