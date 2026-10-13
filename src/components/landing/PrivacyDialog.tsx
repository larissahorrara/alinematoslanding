import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { CONSULTANT_NAME, WHATSAPP_DISPLAY } from '../../utils/whatsapp';

const EVENT = 'abrir-politica-privacidade';

export const openPrivacyPolicy = () => window.dispatchEvent(new Event(EVENT));

/** Política de privacidade e consentimento (LGPD) em uma janela acessível */
export const PrivacyDialog: React.FC = () => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => ref.current?.showModal();
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="titulo-privacidade"
      className="m-auto max-h-[85svh] w-[min(92vw,640px)] rounded-[2rem] bg-cream p-0 text-ink shadow-[var(--shadow-lift)] backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <div className="max-h-[85svh] overflow-y-auto p-7 sm:p-9" data-lenis-prevent>
        <div className="flex items-start justify-between gap-4">
          <h2 id="titulo-privacidade" className="font-display text-2xl leading-tight sm:text-3xl">
            Política de privacidade
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink hover:bg-cream-deep"
            aria-label="Fechar política de privacidade"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-[0.97rem] leading-relaxed text-ink-soft">
          <p>
            Esta página é mantida por {CONSULTANT_NAME}, revendedora de planos de saúde, e segue a Lei Geral de Proteção de Dados Pessoais
            (Lei nº 13.709/2018).
          </p>
          <h3 className="font-display pt-2 text-lg text-ink">Quais dados usamos</h3>
          <p>
            Somente os dados que você digita no formulário de cotação: nome, telefone (WhatsApp), idade da criança, cidade e quantidade de
            pessoas no plano.
          </p>
          <h3 className="font-display pt-2 text-lg text-ink">Para que usamos</h3>
          <p>
            Exclusivamente para preparar e enviar a sua cotação de plano de saúde e conversar com você sobre ela. Os dados não são vendidos
            nem repassados para fins de publicidade.
          </p>
          <h3 className="font-display pt-2 text-lg text-ink">Como os dados são enviados</h3>
          <p>
            O formulário não grava as informações em nenhum servidor desta página: ele apenas monta uma mensagem que é aberta no seu
            WhatsApp. Você vê o texto antes de enviar e decide se quer mandar.
          </p>
          <h3 className="font-display pt-2 text-lg text-ink">Seus direitos</h3>
          <p>
            A qualquer momento você pode pedir para confirmar, corrigir ou excluir os seus dados, ou retirar o consentimento, falando com a
            Aline pelo WhatsApp {WHATSAPP_DISPLAY}.
          </p>
          <p>Ao marcar a caixa de autorização no formulário, você concorda com o uso dos dados nos termos acima.</p>
        </div>
      </div>
    </dialog>
  );
};
