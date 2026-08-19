# Finanças

Web app de gestão financeira pessoal: registre receitas e despesas, categorize seus gastos e acompanhe um dashboard com o resumo mensal.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- Tailwind CSS + [shadcn/ui](https://ui.shadcn.com)
- [Supabase](https://supabase.com) (PostgreSQL + Auth + Row Level Security)
- [Recharts](https://recharts.org) para os gráficos
- Deploy na [Vercel](https://vercel.com)

## Funcionalidades

- Autenticação por e-mail/senha (Supabase Auth), com rotas protegidas
- Dashboard com cards de receita total, despesa total e saldo do mês, e gráfico de despesas por categoria
- CRUD completo de transações (descrição, valor, data, tipo, categoria)
- Categorias pré-definidas: Alimentação, Transporte, Moradia, Lazer, Saúde, Educação, Salário, Freelance, Outros
- Filtros por mês/ano, categoria e busca por descrição
- Exportação das transações filtradas em CSV
- Layout responsivo (desktop e mobile)
- Row Level Security: cada usuário só acessa as próprias transações

## Configuração do Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor** do projeto, execute o conteúdo de [`supabase/schema.sql`](supabase/schema.sql). Isso cria a tabela `transactions`, os índices e as políticas de RLS.
3. Em **Authentication > Providers**, confirme que o provedor de e-mail/senha está habilitado.
   - Se quiser pular a confirmação por e-mail durante o desenvolvimento, desative "Confirm email" em **Authentication > Settings**.
4. Em **Authentication > URL Configuration**, adicione a URL do seu app (ex: `http://localhost:3000` e a URL da Vercel) em *Site URL* e *Redirect URLs* (`.../auth/callback`).
5. Copie a **Project URL** e a **anon public key** em **Project Settings > API**.

## Rodando localmente

```bash
npm install
cp .env.local.example .env.local
# preencha NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY em .env.local
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Importe o projeto na Vercel.
3. Configure as variáveis de ambiente `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Adicione a URL de produção da Vercel em **Authentication > URL Configuration** no Supabase.

## Estrutura do projeto

```
app/
  page.tsx                 # Landing page
  login/, signup/           # Autenticação
  auth/callback/             # Troca do código de confirmação por sessão
  (app)/dashboard/           # Dashboard (protegido)
  (app)/transactions/        # CRUD de transações (protegido)
components/
  auth/                     # Formulários de login/cadastro
  dashboard/                # Cards de resumo e gráfico de pizza
  transactions/              # Tabela, filtros, formulário, exportação CSV
  nav/                      # Navegação do app autenticado
  ui/                       # Componentes shadcn/ui
lib/
  supabase/                 # Clients Supabase (browser, server, middleware)
  hooks/use-transactions.ts # Hook de acesso a dados (CRUD)
  types.ts, colors.ts, format.ts, csv.ts
supabase/schema.sql          # Schema + RLS do banco
```
