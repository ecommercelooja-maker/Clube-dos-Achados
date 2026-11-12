import type { Metadata } from "next";
import { GRUPOS, LINKS_WHATSAPP, TELEGRAM, type SlugGrupo } from "@/config";

// Página de passagem: leva para o WhatsApp (ou Telegram com ?p=telegram).
// O site é publicado como arquivos estáticos, então o redirecionamento é feito no navegador.
// Slugs antigos (/g/casa, /g/beleza…) caem aqui pelo rewrite do vercel.json.
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(GRUPOS).map((slug) => ({ slug }));
}

export const metadata: Metadata = { title: "Entrando no grupo…", robots: { index: false, follow: false } };

export default function Entrar({ params }: { params: { slug: string } }) {
  const grupo = GRUPOS[params.slug as SlugGrupo] ?? GRUPOS.achadinhos;
  const zap = grupo.whatsapp || LINKS_WHATSAPP[0] || "/#exemplos";
  const tele = TELEGRAM || zap;
  const script = `(function(){var t=/[?&]p=telegram\\b/.test(location.search);location.replace(t?${JSON.stringify(tele)}:${JSON.stringify(zap)});})();`;

  return (
    <main className="legal" style={{ textAlign: "center", paddingTop: "18vh" }}>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <div className="wrap">
        <h1>Abrindo o grupo…</h1>
        <p>Se não abrir sozinho, toque na opção abaixo.</p>
        <p style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
          <a className="btn-zap" href={zap}>Entrar pelo WhatsApp</a>
          <a className="btn-tele quadrado" href={tele}>Telegram</a>
        </p>
      </div>
    </main>
  );
}
