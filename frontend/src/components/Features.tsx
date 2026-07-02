const features = [
  {
    icon: 'bolt',
    title: 'Instant Response',
    body: '24/7 automated replies to website forms and chat, so no inquiry ever sits unanswered.'
  },
  {
    icon: 'checklist',
    title: 'Automatic Lead Qualification',
    body: 'Every conversation captures care type and move-in timeline without a staff member lifting a finger.'
  },
  {
    icon: 'table_chart',
    title: 'CRM Logging',
    body: 'Leads land in your CRM instantly, with full contact details and a summary of the conversation.'
  },
  {
    icon: 'notifications_active',
    title: 'Staff Notifications',
    body: 'The right person on your team is alerted the moment a qualified lead comes in.'
  }
]

export default function Features(): JSX.Element {
  return (
    <section id="features" className="bg-surface-container-low py-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">
            Everything You Need to Convert More Inquiries
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Built specifically for how senior living communities capture and follow up on leads.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-lg soft-shadow"
            >
              <span className="material-symbols-outlined text-4xl text-secondary mb-stack-md">
                {f.icon}
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm">{f.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
