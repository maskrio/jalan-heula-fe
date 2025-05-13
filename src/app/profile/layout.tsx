import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jalan-Heula | Your Profile",
  description: "Manage your Jalan-Heula profile and preferences"
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
