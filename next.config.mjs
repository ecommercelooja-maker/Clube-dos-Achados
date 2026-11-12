/** @type {import('next').NextConfig} */
// O site é exportado como arquivos estáticos (pasta out/). Cabeçalhos, cache e
// redirecionamentos ficam no vercel.json.
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
