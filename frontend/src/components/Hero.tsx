export default function Hero(): JSX.Element {
  return (
    <section className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 md:py-32 grid md:grid-cols-2 gap-gutter items-center">
      <div>
        <h1 className="font-display-lg text-display-lg text-primary mb-stack-md">
          Never Miss a Family Inquiry Again.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-lg">
          24/7 automated lead response and qualification for senior living communities.
        </p>
        <a
          href="#contact"
          className="bg-secondary text-on-secondary-fixed font-label-md text-label-md px-6 py-3 rounded shadow-sm hover:bg-secondary-fixed-dim transition-colors inline-block"
        >
          See It In Action
        </a>
      </div>
      <div className="relative h-[400px] rounded-xl overflow-hidden shadow-sm border border-surface-variant">
        <img
          className="w-full h-full object-cover"
          alt="A warm, professional senior living community lobby with a staff member speaking with a resident and family member."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEvm8ocKFn8OETdlfHIKBzHEXFNwVR8Kk_-HJw1zC5d7HOy-Zas1reqxBIwFM__45pa9NBq59RQiM_VNSE8e8REI0OxR78seqj3oS-dAvh60LMcKOvUMYLzsU2qk-BCHPLH8POtuwPZgaZVOVwsKLUjRFf4vwx_CRGeQsOUF-xehvy8IGYJj7r7fllHrHTJP7NQU8HOu2V7NONmuNh2U_PLiT3ImPj2owW6og_nbd-5Ta0gYFU-DNBNgOciH1aUZkQgBW36ojZdS0"
        />
      </div>
    </section>
  )
}
