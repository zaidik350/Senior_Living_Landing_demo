export default function Footer(): JSX.Element {
  return (
    <footer className="bg-primary w-full py-stack-lg px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-stack-md">
      <div className="font-headline-md text-headline-md text-on-primary">
        ElderAI
      </div>
      <div className="font-body-sm text-body-sm text-on-primary opacity-80">
        © 2026 ElderAI Lead Systems. All rights reserved.
      </div>
      <div className="flex gap-gutter">
        <a className="font-body-sm text-body-sm text-on-primary-container hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100" href="mailto:hello@elderai.com">Email Support</a>
        <a className="font-body-sm text-body-sm text-on-primary-container hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Privacy Policy</a>
        <a className="font-body-sm text-body-sm text-on-primary-container hover:text-secondary-fixed transition-colors opacity-80 hover:opacity-100" href="#">Terms of Service</a>
      </div>
    </footer>
  )
}
