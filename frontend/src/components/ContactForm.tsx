import { useState, type ChangeEvent, type FormEvent } from 'react'

interface LeadForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  careType: '' | 'Independent Living' | 'Assisted Living' | 'Memory Care'
  moveInTimeline: '' | 'Immediate' | 'Within 30 Days' | '1-3 Months' | 'Researching'
  tourDate: string
  tourTime: string
  message: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const careTypeOptions: Array<LeadForm['careType']> = [
  'Independent Living',
  'Assisted Living',
  'Memory Care'
]

const moveInTimelineOptions: Array<NonNullable<LeadForm['moveInTimeline']>> = [
  'Immediate',
  'Within 30 Days',
  '1-3 Months',
  'Researching'
]

const generateTimeSlots = () => {
  const slots: string[] = []

  for (let hour = 8; hour <= 20; hour += 1) {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12
    const amPm = hour < 12 ? 'AM' : 'PM'

    slots.push(`${hour12}:00 ${amPm}`)

    if (hour < 20) {
      slots.push(`${hour12}:30 ${amPm}`)
    }
  }

  return slots
}

const timeSlots = generateTimeSlots()

const initialForm: LeadForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  careType: '',
  moveInTimeline: '',
  tourDate: '',
  tourTime: '',
  message: ''
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function ContactForm(): JSX.Element {
  const [form, setForm] = useState<LeadForm>(initialForm)
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      console.error('Lead submission failed:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-surface-container-low py-24">
      <div className="max-w-2xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">Get in Touch</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Tell us about your community and we'll show you how it works.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-lg soft-shadow grid gap-stack-md"
        >
          <div className="grid md:grid-cols-2 gap-stack-md">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={handleChange}
                className="w-full rounded border border-surface-variant px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring focus:ring-primary/10 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={form.lastName}
                onChange={handleChange}
                className="w-full rounded border border-surface-variant px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring focus:ring-primary/10 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-stack-md">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded border border-surface-variant px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring focus:ring-primary/10 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded border border-surface-variant px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring focus:ring-primary/10 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="careType">
              Care Type
            </label>
            <select
              id="careType"
              name="careType"
              required
              value={form.careType}
              onChange={handleChange}
              className="w-full rounded border border-surface-variant px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring focus:ring-primary/10 focus:outline-none bg-surface-container-lowest"
            >
              <option value="" disabled>Select one</option>
              {careTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="moveInTimeline">
              Move-In Timeline
            </label>
            <select
              id="moveInTimeline"
              name="moveInTimeline"
              required
              value={form.moveInTimeline}
              onChange={handleChange}
              className="w-full rounded border border-surface-variant px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring focus:ring-primary/10 focus:outline-none bg-surface-container-lowest"
            >
              <option value="" disabled>Select one</option>
              {moveInTimelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-stack-md">
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="tourDate">
                Schedule a tour on
              </label>
              <input
                id="tourDate"
                name="tourDate"
                type="date"
                required
                value={form.tourDate}
                onChange={handleChange}
                className="w-full rounded border border-surface-variant px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring focus:ring-primary/10 focus:outline-none bg-surface-container-lowest"
              />
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="tourTime">
                Choose a time
              </label>
              <select
                id="tourTime"
                name="tourTime"
                required
                value={form.tourTime}
                onChange={handleChange}
                className="w-full rounded border border-surface-variant px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring focus:ring-primary/10 focus:outline-none bg-surface-container-lowest"
              >
                <option value="" disabled>Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={1000}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded border border-surface-variant px-4 py-2 font-body-md text-body-md focus:border-primary focus:ring focus:ring-primary/10 focus:outline-none"
            />
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">Maximum 1000 characters.</p>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="bg-secondary-container text-primary font-label-md text-label-md px-6 py-3 rounded shadow-sm hover:bg-secondary-fixed-dim transition-colors disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending...' : 'Request a Demo'}
          </button>

          {status === 'success' && (
            <p className="font-body-sm text-body-sm text-primary">
              Thanks — we've got your details and will be in touch shortly.
            </p>
          )}
          {status === 'error' && (
            <p className="font-body-sm text-body-sm text-error">
              Something went wrong sending your request. Please try again, or email us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
