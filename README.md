# 🛍️ Clube dos Achados

Landing page do grupo de ofertas **Clube dos Achados** (WhatsApp e Telegram). Feita em Next.js 14 e publicada na Vercel.

Base copiada do projeto Oferta Certa, com identidade nova: cores roxo/rosa/dourado, fontes Bricolage Grotesque e Plus Jakarta Sans, logo de sacola com estrela e textos do topo ajustados.

## Onde mudar cada coisa

| O quê                                       | Arquivo                       |
|---------------------------------------------|-------------------------------|
| Links dos grupos de WhatsApp e do Telegram  | `src/config.ts`               |
| Textos de aviso e afiliados                 | `src/config.ts`               |
| Empresa, CNPJ e e-mail de contato           | `src/lib/empresa.ts`          |
| Produtos de exemplo                         | `src/data/ofertas.json`       |
| Textos da página                            | `src/app/page.tsx`            |
| Cores                                       | `src/app/globals.css` (`:root`) |
| Fontes, tamanhos e detalhes visuais         | `src/app/clube.css`           |
| Logo                                        | `src/components/Logo.tsx` e `src/app/icon.svg` |

## Rodar no computador

```bash
npm install
npm run dev
```

## Publicar

O site é gerado como arquivos estáticos (pasta `out/`, configuração no `vercel.json`). Todo push na `main` publica na Vercel automaticamente. Domínio e Google Ads: veja `DOMINIO.md`.
