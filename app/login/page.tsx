import { Suspense } from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Entrar — Finanças",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted/40 p-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Wallet className="size-5 text-primary" />
        Finanças
      </Link>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
