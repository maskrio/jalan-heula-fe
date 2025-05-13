import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jalan-Heula | Sign In",
  description: "Sign in to your Jalan-Heula account"
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
