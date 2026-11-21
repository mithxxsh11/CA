import { useState, type ReactNode } from 'react'
import { Check, Copy, Loader2, Mail, MessageCircle } from 'lucide-react'
import type { Status } from '../../lib/forms'

type Base = {
  id: string
  name: string
  label: string
  value: string
  error?: string
  required?: boolean
  onChange: (v: string) => void
  light?: boolean
  hint?: string
  className?: string
}

export function TextField({ type = 'text', autoComplete, placeholder, inputMode, ...p }: Base & { type?: string; autoComplete?: string; placeholder?: string; inputMode?: 'text' | 'tel' | 'email' }) {
  return (
    <FieldShell {...p}>
      <input
        id={p.id}
        name={p.name}
        type={type}
        value={p.value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={p.required}
        aria-invalid={p.error ? 'true' : 'false'}
        aria-describedby={p.error ? `${p.id}-err` : p.hint ? `${p.id}-hint` : undefined}
        onChange={(e) => p.onChange(e.target.value)}
        className={`field ${p.light ? 'field-light' : ''}`}
      />
    </FieldShell>
  )
}

export function SelectField({ options, placeholder = 'Select an option', ...p }: Base & { options: string[]; placeholder?: string }) {
  return (
    <FieldShell {...p}>
      <select
        id={p.id}
        name={p.name}
        value={p.value}
        aria-required={p.required}
        aria-invalid={p.error ? 'true' : 'false'}
        aria-describedby={p.error ? `${p.id}-err` : undefined}
        onChange={(e) => p.onChange(e.target.value)}
        className={`field cursor-pointer ${p.light ? 'field-light' : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

export function AreaField({ rows = 4, placeholder, ...p }: Base & { rows?: number; placeholder?: string }) {
  return (
    <FieldShell {...p}>
      <textarea
        id={p.id}
        name={p.name}
        rows={rows}
        value={p.value}
        placeholder={placeholder}
        aria-required={p.required}
        aria-invalid={p.error ? 'true' : 'false'}
        aria-describedby={p.error ? `${p.id}-err` : undefined}
        onChange={(e) => p.onChange(e.target.value)}
        className={`field resize-y ${p.light ? 'field-light' : ''}`}
      />
    </FieldShell>
  )
}

function FieldShell({ id, label, required, error, hint, className = '', light, children }: Base & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={`field-label ${light ? 'text-midnight/70' : 'text-ivory/70'}`}>
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-gold">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-err`} role="alert" className={`mt-2 font-ui text-[13px] ${light ? 'text-[#a3392f]' : 'text-[#f0b4ac]'}`}>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className={`mt-2 font-ui text-[12.5px] ${light ? 'text-midnight/50' : 'text-ivory/45'}`}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function SubmitButton({ status, label, light }: { status: Status; label: string; light?: boolean }) {
  const loading = status === 'loading'
  return (
    <button type="submit" disabled={loading} aria-busy={loading} className={`btn ${light ? 'btn-navy' : 'btn-gold'} w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto`}>
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" /> Preparing…
        </>
      ) : (
        label
      )}
    </button>
  )
}

/** Shown after a valid submit when no backend is configured: honest hand-off. */
export function Handoff({
  whatsapp,
  mailto,
  text,
  onReset,
  light,
}: {
  whatsapp: string
  mailto: string
  text: string
  onReset: () => void
  light?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }
  return (
    <div role="status" aria-live="polite" className={`border p-7 sm:p-9 ${light ? 'border-midnight/15 bg-white' : 'border-champagne/30 bg-midnight/40'}`}>
      <p className="eyebrow text-gold">One last step</p>
      <h3 className={`font-display mt-4 text-[30px] leading-tight ${light ? 'text-midnight' : 'text-ivory'}`}>Your enquiry is ready to send.</h3>
      <p className={`mt-3 max-w-lg text-[15px] ${light ? 'text-charcoal/75' : 'text-ivory/70'}`}>
        It has not been sent yet. Choose WhatsApp or email and your details will be filled in for you, so the academy receives
        them directly.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`btn ${light ? 'btn-navy' : 'btn-gold'}`}>
          <MessageCircle size={16} /> Send on WhatsApp
        </a>
        <a href={mailto} className={`btn ${light ? 'btn-ghost-dark' : 'btn-ghost-light'}`}>
          <Mail size={16} /> Send by email
        </a>
        <button type="button" onClick={copy} className={`btn ${light ? 'btn-ghost-dark' : 'btn-ghost-light'}`}>
          {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy details'}
        </button>
      </div>
      <button type="button" onClick={onReset} className={`ulink mt-7 ${light ? 'text-midnight/70' : 'text-ivory/60'}`}>
        Edit or start a new enquiry
      </button>
    </div>
  )
}

export function SentState({ onReset, light }: { onReset: () => void; light?: boolean }) {
  return (
    <div role="status" aria-live="polite" className={`border p-9 ${light ? 'border-midnight/15 bg-white text-midnight' : 'border-champagne/30 text-ivory'}`}>
      <p className="eyebrow text-gold">Received</p>
      <h3 className="font-display mt-4 text-[30px]">Thank you. We'll be in touch soon.</h3>
      <button type="button" onClick={onReset} className="ulink mt-7 opacity-70">
        Send another enquiry
      </button>
    </div>
  )
}
