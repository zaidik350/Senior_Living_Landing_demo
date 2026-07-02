const problems = [
  {
    icon: 'schedule',
    iconColor: 'text-error',
    title: 'Missed After-Hours Inquiries',
    body: "70% of senior care inquiries happen outside standard business hours. Without instant response, families move to the next option."
  },
  {
    icon: 'hourglass_empty',
    iconColor: 'text-secondary',
    title: 'Slow Staff Follow-up',
    body: 'Busy marketing directors struggle to reply instantly while handling tours. Every hour delayed reduces conversion chance by 10x.'
  },
  {
    icon: 'filter_alt',
    iconColor: 'text-on-surface-variant',
    title: 'Unqualified Leads',
    body: "Sales teams waste hours calling prospects who don't fit budget or care requirements, instead of focusing on high-intent families."
  }
]

export default function ProblemSection(): JSX.Element {
  return (
    <section className="bg-surface-container-low py-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">
            The Cost of Missed Connections
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Families searching for care expect immediate answers. Delays cost trust and move-ins.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-gutter">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-lg soft-shadow transition-transform hover:-translate-y-1"
            >
              <span className={`material-symbols-outlined text-4xl ${p.iconColor} mb-stack-md`}>
                {p.icon}
              </span>
              <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm">{p.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
