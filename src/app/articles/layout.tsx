import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jalan-Heula | Articles",
  description: "Explore travel articles and guides from around the world"
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
