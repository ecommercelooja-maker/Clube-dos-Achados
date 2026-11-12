// Ícone da marca: sacola de compras com estrela (o "achado").
export function IconeMarca({ corpo = "#6d28d9", simbolo = "#ffc933" }: { corpo?: string; simbolo?: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 120 120" role="img" aria-label="Clube dos Achados">
      <path d="M42 44V36a18 18 0 0 1 36 0v8" stroke={corpo} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M22 44a6 6 0 0 1 6-6h64a6 6 0 0 1 6 6l-4 56a12 12 0 0 1-12 11H38a12 12 0 0 1-12-11z" fill={corpo} />
      <path
        d="M60 52l6.5 13.2 14.5 2.1-10.5 10.2 2.5 14.5L60 85.2 47 92l2.5-14.5L39 67.3l14.5-2.1z"
        fill={simbolo}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconeZap() {
  // Ícone removido dos botões
  return null;
}

export function IconeTelegram() {
  // Ícone removido dos botões
  return null;
}
