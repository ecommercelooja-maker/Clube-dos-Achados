# Clube dos Achados — como conectar o domínio

Projeto na Vercel: **clube** (time *ecommercelooja*)
Domínio: ainda não conectado (endereço da Vercel: https://clube-gamma.vercel.app)
Repositório: https://github.com/ecommercelooja-maker/Clube-dos-Achados

## 1. Adicionar o domínio na Vercel

Pelo painel: Vercel → projeto **clube** → *Settings* → *Domains* → *Add* e adicione os dois:

- `seudominio.com.br`
- `www.seudominio.com.br`

Escolha qual é o principal (recomendado: `www`) e deixe o outro redirecionando para ele (a Vercel oferece isso na tela).

Ou pela linha de comando, dentro desta pasta:

```bash
vercel domains add seudominio.com.br clube --scope ecommercelooja
vercel domains add www.seudominio.com.br clube --scope ecommercelooja
```

## 2. Configurar o DNS (no painel onde o domínio foi comprado: Registro.br, Hostinger, GoDaddy…)

| Tipo  | Nome / Host | Valor                  |
|-------|-------------|------------------------|
| A     | `@`         | `76.76.21.21`          |
| CNAME | `www`       | `cname.vercel-dns.com` |

- Apague outros registros **A** ou **CNAME** que já existam para `@` e `www` (ex.: "parking" da registradora).
- Não mexa em registros **MX** / **TXT** de e-mail.
- **Registro.br:** em "Editar zona" → modo avançado ("Configurar DNS" → usar os DNS do Registro.br) e crie os registros acima.
- A propagação costuma levar de alguns minutos a poucas horas. O HTTPS (cadeado) é emitido pela Vercel automaticamente.

## 3. Avisar o site do endereço novo

Na Vercel → *Settings* → *Environment Variables*, crie para **Production**:

```
NEXT_PUBLIC_SITE_URL = https://www.seudominio.com.br
```

Depois faça um novo deploy (abaixo). Isso atualiza o link canônico, o `sitemap.xml`, o `robots.txt`
e a imagem das prévias de compartilhamento (WhatsApp, Facebook).

## 4. Publicar alterações

O repositório está conectado à Vercel (*Settings* → *Git*): todo push na `main` publica em produção
automaticamente, e as outras branches geram um link de prévia.

## 5. Conferir

- `https://www.seudominio.com.br` abre a página com cadeado
- `https://seudominio.com.br` redireciona para o `www`
- `https://www.seudominio.com.br/sitemap.xml` lista o domínio novo

## Medição para anúncios (opcional)

Na Vercel → *Settings* → *Environment Variables* (Production), depois novo deploy (modelo em `.env.example`):

```
NEXT_PUBLIC_GADS_ID     = AW-XXXXXXXXXX  (ID da tag do Google Ads deste site)
NEXT_PUBLIC_GADS_LABEL  = XXXXXXXXXXX    (rótulo da conversão "Entrar no grupo")
NEXT_PUBLIC_GTM_ID      = GTM-XXXXXXX    (Google Tag Manager, opcional)
NEXT_PUBLIC_GA_ID       = G-XXXXXXXXXX   (Google Analytics 4, opcional)
```

Sem essas variáveis nenhuma tag do Google carrega (os IDs do Oferta Certa foram retirados para não misturar as conversões). Com elas, a tag carrega em todas as páginas e aparece o aviso de cookies (LGPD).

- **Consent Mode v2:** `ad_storage`, `analytics_storage`, `ad_user_data` e `ad_personalization` começam em
  `denied` e só viram `granted` com o "Aceitar". A escolha fica salva no navegador e é aplicada na próxima visita.
- **Meta Pixel:** ainda não instalado (há um TODO no `layout.tsx` e no aviso de cookies).

Eventos enviados (todos por `beacon`, sem atrasar a ida para o grupo):

| Ação no site                                          | Google Ads                      | Evento         |
|-------------------------------------------------------|---------------------------------|----------------|
| Clique em qualquer botão de grupo (WhatsApp/Telegram) | conversão (`send_to` ID/rótulo) | `entrar_grupo` |
| Indicar (WhatsApp/Telegram/link)                      | —                               | `compartilhar` |

O `entrar_grupo` leva `grupo` (achadinhos, casa…), `plataforma` (whatsapp/telegram) e `origem` (seção da página).

## O que ainda falta preencher (src/config.ts)

- `OFERTA_DO_DIA`: qual exemplo aparece em destaque; cada exemplo tem `grupo` (define filtro e o grupo do botão)
- `INTERESSES`: opções do quiz "Não sabe qual escolher?"

- Links dos 5 grupos de WhatsApp e do Telegram
- Exemplos atuais em `OFERTAS` (sem preço nem cupom)
