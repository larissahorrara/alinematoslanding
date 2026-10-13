import React from 'react';
import { Clock, MapPin, MessageCircle } from 'lucide-react';
import { CARRIERS } from '../../data/carriers';
import { KIDS_PLAN_URL, WHATSAPP_DISPLAY } from '../../utils/whatsapp';
import { openPrivacyPolicy } from './PrivacyDialog';

export const SiteFooter: React.FC = () => (
  <footer className="bg-[#efe8de] px-5 pb-28 pt-16 text-ink sm:pb-16">
    <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 lg:grid-cols-4">
      <div className="lg:col-span-1">
        <p className="font-display text-2xl leading-none">Aline Matos</p>
        <p className="mt-2 text-sm text-ink-soft">Revendedora de planos de saúde há mais de 15 anos</p>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">Contato</h2>
        <ul className="mt-4 space-y-3 text-[0.95rem] text-ink-soft">
          <li>
            <a
              href={KIDS_PLAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 hover:text-brand"
            >
              <MessageCircle className="h-4 w-4 text-brand" aria-hidden="true" />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            Belo Horizonte - MG · Atendimento Nacional
          </li>
          <li className="flex items-start gap-2">
            <Clock className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span>
              Segunda a sexta: 08h às 19h
              <br />
              Sábados: 09h às 14h
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">Operadoras parceiras</h2>
        <ul className="mt-4 space-y-2 text-[0.95rem] text-ink-soft">
          {CARRIERS.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">Guias</h2>
        <ul className="mt-4 space-y-1 text-[0.95rem] text-ink-soft">
          <li>
            <a href="#autismo" className="inline-flex min-h-11 items-center hover:text-brand">
              Plano de saúde para autistas (TEA)
            </a>
          </li>
          <li>
            <a href="#noticias" className="inline-flex min-h-11 items-center hover:text-brand">
              Notícias sobre saúde suplementar
            </a>
          </li>
          <li>
            <button type="button" onClick={openPrivacyPolicy} className="inline-flex min-h-11 items-center text-left hover:text-brand">
              Política de privacidade
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div className="mx-auto mt-12 max-w-6xl space-y-3 border-t border-ink/10 pt-8 text-sm leading-relaxed text-ink-soft">
      <p>
        <strong className="font-semibold text-ink">Importante:</strong> coberturas, carências e valores dependem da operadora e do plano
        escolhido. As informações desta página não substituem as condições do contrato.
      </p>
      <p>
        Aline Matos é revendedora e intermediária autorizada na comercialização de planos de saúde, atuante nas principais corretoras de
        Belo Horizonte, em observância à Lei nº 9.656/1998 e às normas da Agência Nacional de Saúde Suplementar (ANS).
      </p>
      <p>
        Os dados enviados pelo formulário são usados somente para a cotação, com o seu consentimento, conforme a Lei Geral de Proteção de
        Dados (Lei nº 13.709/2018).{' '}
        <button type="button" onClick={openPrivacyPolicy} className="font-medium text-brand underline underline-offset-2">
          Ler a política de privacidade
        </button>
        .
      </p>
      <p className="pt-2">© {new Date().getFullYear()} Aline Matos. Todos os direitos reservados.</p>
    </div>
  </footer>
);
