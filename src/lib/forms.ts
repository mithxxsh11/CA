import { useState, type FormEvent } from 'react'

/* ------------------------------------------------------------------
   FORM DELIVERY
   No backend is configured, so forms never claim a message was sent.
   On submit they prepare the enquiry and hand it to WhatsApp or email.
   To deliver enquiries directly, set VITE_FORM_ENDPOINT to a form
   service URL that accepts JSON POST (e.g. Formspree, Basin, a
   serverless function). A real success state shows only on a 2xx.
------------------------------------------------------------------- */
export const FORM_ENDPOINT: string = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? ''

export type Errors<T> = Partial<Record<keyof T, string>>
export type Status = 'idle' | 'loading' | 'sent' | 'handoff' | 'error'

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
export const isPhone = (v: string) => {
  const d = v.replace(/[\s()-]/g, '')
  return /^\+?\d{10,15}$/.test(d)
}

export function useEnquiryForm<T extends Record<string, string>>(
  initial: T,
  validate: (v: T) => Errors<T>,
  kind: 'general' | 'corporate',
) {
  const [values, setValues] = useState<T>(initial)
  const [errors, setErrors] = useState<Errors<T>>({})
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const set = (k: keyof T, v: string) => {
    const next = { ...values, [k]: v }
    setValues(next)
    if (touched) setErrors(validate(next))
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTouched(true)
    const errs = validate(values)
    setErrors(errs)
    const firstBad = Object.keys(errs)[0]
    if (firstBad) {
      ;(e.currentTarget.querySelector(`[name="${firstBad}"]`) as HTMLElement | null)?.focus()
      return
    }
    setStatus('loading')
    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ kind, ...values }),
        })
        setStatus(res.ok ? 'sent' : 'error')
      } catch {
        setStatus('error')
      }
    } else {
      // Brief pause so the state change is perceptible, then hand off.
      await new Promise((r) => setTimeout(r, 650))
      setStatus('handoff')
    }
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setTouched(false)
    setStatus('idle')
  }

  return { values, errors, status, set, submit, reset, setStatus }
}
