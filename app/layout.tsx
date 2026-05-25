import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QazQorgan — Беспилотные системы и средства защиты",
  description: "НПЦ ОТ «QazQorgan» — разработчик и производитель беспилотных авиационных систем двойного назначения, комплексов обнаружения и подавления БПЛА, профессиональной радиосвязи BARYS KZTE. Астана, Казахстан.",
  icons: {
    icon: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}