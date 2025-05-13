import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jalan-Heula | Home",
  description: "Discover your next adventure with Jalan-Heula"
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
