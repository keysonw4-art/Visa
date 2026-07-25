import { whatsappLink } from "@/lib/site.config";

/** Botão flutuante do WhatsApp (preservado da migração). */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.593 4.463 1.72 6.403L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.62h.005c7.06 0 12.8-5.74 12.8-12.8s-5.74-12.7-12.8-12.7zm0 23.36h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.003 1.05 1.07-3.9-.252-.4a10.56 10.56 0 0 1-1.62-5.6c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.5 1.107 7.51 3.117a10.56 10.56 0 0 1 3.11 7.52c0 5.86-4.77 10.63-10.63 10.63zm5.83-7.96c-.32-.16-1.89-.933-2.18-1.04-.293-.106-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.573-1.587-.95-.847-1.59-1.893-1.777-2.213-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.626-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.46 4.826.763.33 1.36.526 1.824.674.767.243 1.464.21 2.016.127.615-.092 1.89-.773 2.156-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373z" />
      </svg>
    </a>
  );
}
