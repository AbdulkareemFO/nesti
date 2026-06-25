import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nesti",
  description: "What are you expecting?",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
