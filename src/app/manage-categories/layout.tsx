import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jalan-Heula | Manage Categories",
  description: "Create and manage categories for travel articles"
};

export default function ManageCategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
