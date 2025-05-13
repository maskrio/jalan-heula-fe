import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jalan-Heula | Article",
  description: "Read travel articles and experiences on Jalan-Heula"
};

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
