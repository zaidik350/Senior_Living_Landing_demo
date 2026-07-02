export default function Testimonials(): JSX.Element {
  return (
    <section id="testimonials" className="bg-surface py-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-sm">
            Trusted by Senior Living Communities
          </h2>
        </div>

        <div className="max-w-2xl mx-auto bg-surface-container-lowest border border-surface-variant rounded-lg p-stack-lg soft-shadow text-center mb-16">
          <p className="font-body-lg text-body-lg text-on-surface italic mb-stack-md">
            "Replace this with a real quote from an early client once you have one —
            for example, a Marketing Director describing fewer missed inquiries
            or faster follow-up after switching on the assistant."
          </p>
          <p className="font-label-md text-label-md text-on-surface-variant">
            — Marketing Director, [Community Name]
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-gutter opacity-60">
          {['Community A', 'Community B', 'Community C', 'Community D'].map((name) => (
            <div
              key={name}
              className="font-label-md text-label-md text-on-surface-variant border border-outline-variant rounded px-6 py-3"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
