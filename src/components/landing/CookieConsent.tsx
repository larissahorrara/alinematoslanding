import React, { useEffect, useState } from 'react';
import { Cookie } from 'lucide-react';
import { ANALYTICS_ENABLED, loadAnalytics, readConsent, saveConsent } from '../../lib/analytics';
import { openPrivacyPolicy } from './PrivacyDialog';

/** Aviso de cookies (LGPD). Só aparece quando a medição está configurada em src/lib/analytics.ts. */
export const CookieConsent: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;
    const consent = readConsent();
    if (consent === 'aceito') loadAnalytics();
    else if (consent === null) setOpen(true);
  }, []);

  if (!open) return null;

  const choose = (accepted: boolean) => {
    saveConsent(accepted ? 'aceito' : 'recusado');
    if (accepted) loadAnalytics();
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-3xl border border-line bg-white p-5 shadow-[var(--shadow-lift)] sm:inset-x-6 sm:bottom-6 sm:flex sm:items-center sm:gap-5"
    >
      <div className="flex items-start gap-3">
        <Cookie className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden="true" />
        <p className="text-sm text-ink">
          Usamos cookies para medir as visitas e melhorar o atendimento. Você pode aceitar ou recusar.{' '}
          <button type="button" onClick={openPrivacyPolicy} className="font-semibold text-brand-hover underline underline-offset-2">
            Saiba mais
          </button>
        </p>
      </div>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button
          type="button"
          onClick={() => choose(false)}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-brand/30 px-5 text-sm font-semibold text-brand hover:bg-brand-soft sm:flex-none"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => choose(true)}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-hover sm:flex-none"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
};
