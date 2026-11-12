import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./movimento.css";
import "./conversao.css";
import "./clube.css";
import { ADS_ID, GA_ID, GTM_ID, SITE_URL } from "@/config";

const titulos = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], variable: "--f-titulo" });
const textos = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--f-texto" });

const titulo = "Clube dos Achados — Curadoria independente de promoções";
const descricao =
  "Curadoria independente de promoções de eletrônicos, eletrodomésticos e enxoval, divulgadas em grupo no WhatsApp e canal no Telegram. Não vendemos produtos e podemos receber comissão de afiliado.";
const imagem = { url: "/og-clube-dos-achados.jpg", width: 1200, height: 630, alt: titulo };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: titulo,
  description: descricao,
  robots: { index: true, follow: true },
  openGraph: {
    title: titulo,
    description: descricao,
    locale: "pt_BR",
    type: "website",
    siteName: "Clube dos Achados",
    images: [imagem],
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao, images: [imagem.url] },
};

export const viewport: Viewport = { themeColor: "#2e1065" };

// Google tag com Consent Mode v2. Roda antes da tag carregar: tudo começa "denied" e, se a pessoa já aceitou
// em uma visita anterior (localStorage "cda-cookies"), o update "granted" é aplicado antes de qualquer evento.
const consentimentoGoogle = `
window.dataLayer = window.dataLayer || [];
window.gtag = function(){ window.dataLayer.push(arguments); };
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
try {
  if (localStorage.getItem('cda-cookies') === 'sim') {
    gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
${ADS_ID ? `gtag('config', ${JSON.stringify(ADS_ID)});` : ""}
${GA_ID ? `gtag('config', ${JSON.stringify(GA_ID)});` : ""}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${titulos.variable} ${textos.variable}`}>
      <body>
        {children}
        {(ADS_ID || GTM_ID) && (
          <Script id="google-consent" strategy="beforeInteractive">
            {consentimentoGoogle}
          </Script>
        )}
        {ADS_ID && <Script src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`} strategy="afterInteractive" />}
        {/* Google Tag Manager: usa o mesmo dataLayer/gtag e o Consent Mode definidos acima. */}
        {GTM_ID && <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />}
        {/* TODO Meta Pixel: quando for ativado, o script entra aqui, carregado só depois do aceite no aviso de cookies. */}
      </body>
    </html>
  );
}
