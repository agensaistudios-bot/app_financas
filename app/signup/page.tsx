import Link from "next/link";
import { Wallet } from "lucide-react";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Criar conta — Finanças",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/40 p-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Wallet className="size-5 text-primary" />
        Finanças
      </Link>
      <SignupForm />
    </div>
  );
}
