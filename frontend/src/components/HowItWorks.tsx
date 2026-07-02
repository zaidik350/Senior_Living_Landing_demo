const steps = [
  {
    number: '01',
    title: 'Family Reaches Out',
    body: 'A family submits your website contact form or messages your AI chat assistant, day or night.'
  },
  {
    number: '02',
    title: 'AI Responds & Qualifies',
    body: 'The assistant replies instantly and asks the questions that matter: care type needed and move-in timeline.'
  },
  {
    number: '03',
    title: 'Lead Logged Automatically',
    body: 'Every detail — contact info, care type, timeline, and a summary of the conversation — is saved to your CRM in real time.'
  },
  {
    number: '04',
    title: 'Staff Notified Instantly',
    body: 'Your team gets an immediate alert with everything they need to follow up while the lead is still warm.'
  }
]

export default function HowItWorks(): JSX.Element {
  return (
    <section id="how-it-works" className="bg-surface py-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">How It Works</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            From first message to notified staff member — in seconds, not hours.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-gutter">
          {steps.map((s) => (
            <div key={s.number} className="relative">
              <div className="font-display-lg text-headline-lg text-primary-container mb-stack-sm">
                {s.number}
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm">{s.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
