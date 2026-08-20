import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";

  // Supabase appends these when the link itself is invalid/expired,
  // before a "code" is ever generated.
  const linkError = searchParams.get("error_description");
  if (linkError) {
    const url = new URL("/login", origin);
    url.searchParams.set("error", linkError);
    return NextResponse.redirect(url);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      const url = new URL("/login", origin);
      url.searchParams.set(
        "error",
        "Não foi possível confirmar seu e-mail. Abra o link de confirmação no mesmo navegador em que você criou a conta, ou solicite um novo link.",
      );
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.redirect(`${origin}${redirectTo}`);
}
