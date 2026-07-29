/**
 * Assinatura no console do DevTools — aparece assim que o usuário curioso
 * abre o F12. Roda como <script> inline pra não depender de hidratação.
 * Cores da paleta da SK Agency (laranja + preto).
 */
export function ConsoleSignature() {
  const script = `
    (function(){
      var b = 'background: #0a0a0a; color: #e8461e; font-size: 22px; font-weight: 700; padding: 14px 22px 6px; font-family: system-ui, -apple-system, Segoe UI, sans-serif;';
      var s = 'background: #0a0a0a; color: #d1d5db; font-size: 13px; padding: 0 22px 14px; font-family: system-ui, -apple-system, Segoe UI, sans-serif;';
      var l = 'background: #0a0a0a; color: #e8461e; font-size: 13px; padding: 0 22px 14px; font-weight: 700; font-family: system-ui, -apple-system, Segoe UI, sans-serif;';
      console.log('%cDesenvolvido por SK Agency%c\\nGostou? Acesse: %cskagency.com.br', b, s, l);
    })();
  `;
  return (
    <script
      id="sk-signature"
      // Script controlado por nós, sem dado do usuário — safe.
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
