export default function Navbar(): JSX.Element {
  return (
    <nav className="bg-surface text-primary shadow-sm fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto transition-all duration-200 ease-in-out">
      <div className="font-headline-md text-headline-md font-bold text-primary">
        ElderAI
      </div>
      <div className="hidden md:flex gap-gutter items-center">
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#features">Features</a>
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#how-it-works">How It Works</a>
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#testimonials">Testimonials</a>
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-secondary transition-colors" href="#contact">Contact</a>
      </div>
      <div>
        <a
          href="#contact"
          className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded shadow-sm hover:bg-tertiary transition-colors inline-block"
        >
          Book a Demo
        </a>
      </div>
    </nav>
  )
}
