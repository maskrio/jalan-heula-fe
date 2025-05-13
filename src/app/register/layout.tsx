import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jalan-Heula | Sign Up",
  description: "Create a new Jalan-Heula account to start sharing your travel experiences"
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
