import "./globals.css";
import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import { GanttChart } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "To-do App",
  description:
    "To-do app built with Next.js, Typescript, Tailwind CSS, and shadcn/ui.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <header className="sticky top-0 z-10 rounded bg-background/80 py-4 backdrop-blur">
          <div className="flex items-center justify-center gap-2 drop-shadow-[0_0_0.3rem_#ffffff70]">
            <h1
              className={`${pacifico.className} text-2xl font-black lg:text-3xl`}
            >
              To-do App
            </h1>
            <GanttChart className="h-8 w-8" />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
