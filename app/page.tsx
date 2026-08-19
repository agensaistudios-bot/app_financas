import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Filter,
  LayoutDashboard,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Dashboard consolidado",
    description:
      "Veja receitas, despesas e saldo do mês em cards claros, sem precisar abrir planilhas.",
  },
  {
    icon: BarChart3,
    title: "Gráficos por categoria",
    description:
      "Entenda para onde vai seu dinheiro com um gráfico de pizza por categoria de despesa.",
  },
  {
    icon: Filter,
    title: "Filtros e busca",
    description:
      "Filtre por mês, ano e categoria, ou busque uma transação pela descrição.",
  },
  {
    icon: ShieldCheck,
    title: "Seus dados, só seus",
    description:
      "Autenticação segura e Row Level Security garantem que só você acessa suas transações.",
  },
  {
    icon: Smartphone,
    title: "Responsivo",
    description:
      "Interface adaptada para desktop e celular, para você registrar gastos de onde estiver.",
  },
  {
    icon: Wallet,
    title: "Exportação em CSV",
    description:
      "Exporte suas transações filtradas para uma planilha com um clique.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Wallet className="size-5 text-primary" />
            Finanças
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" render={<Link href="/login" />}>
              Entrar
            </Button>
            <Button render={<Link href="/signup" />}>Criar conta</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="rounded-full border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Controle financeiro pessoal
          </span>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Organize suas finanças em um só lugar
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-balance">
            Registre receitas e despesas, categorize seus gastos e acompanhe
            seu saldo com um dashboard simples e visual.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" render={<Link href="/signup" />}>
              Começar agora
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/login" />}>
              Já tenho conta
            </Button>
          </div>

          <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col gap-1 py-4">
                <span className="text-xs font-medium text-muted-foreground">
                  Receita total
                </span>
                <span className="text-xl font-semibold tabular-nums text-income">
                  R$ 6.400,00
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-1 py-4">
                <span className="text-xs font-medium text-muted-foreground">
                  Despesa total
                </span>
                <span className="text-xl font-semibold tabular-nums text-expense">
                  R$ 3.180,00
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col gap-1 py-4">
                <span className="text-xs font-medium text-muted-foreground">
                  Saldo
                </span>
                <span className="text-xl font-semibold tabular-nums">
                  R$ 3.220,00
                </span>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t bg-muted/30 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-12 max-w-xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Tudo que você precisa para não perder o controle
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <Card key={feature.title}>
                  <CardContent className="flex flex-col gap-3 py-2">
                    <div className="flex size-9 items-center justify-center rounded-md bg-primary/10">
                      <feature.icon className="size-4.5 text-primary" />
                    </div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 text-center sm:px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Pronto para organizar sua vida financeira?
            </h2>
            <p className="text-muted-foreground">
              Crie sua conta gratuitamente e comece a registrar suas
              transações em menos de um minuto.
            </p>
            <Button size="lg" render={<Link href="/signup" />}>
              Criar conta grátis
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <span className="flex items-center gap-2">
            <Wallet className="size-4" />
            Finanças
          </span>
          <span>Projeto de gestão financeira pessoal.</span>
        </div>
      </footer>
    </div>
  );
}
