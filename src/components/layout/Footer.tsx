import Image from "next/image"
import Link from "next/link"
import { Send, ArrowRight } from "lucide-react"

const footerLinks = [
  { href: "/shipping", label: "Shipping" },
  { href: "/returns", label: "Returns" },
  { href: "/privacy", label: "Privacy" },
  { href: "/careers", label: "Careers" },
  { href: "/terms", label: "Terms" },
]

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="M10 15l5-3-5-3z" fill="currentColor" />
    </svg>
  )
}

const socialLinks = [
  { href: "#", icon: TwitterIcon, label: "Twitter" },
  { href: "#", icon: InstagramIcon, label: "Instagram" },
  { href: "#", icon: YoutubeIcon, label: "Youtube" },
]

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t-4 border-dashed border-primary bg-background overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
          <path d="M0,200 Q200,100 400,250 T800,150" stroke="#ffb1c4" strokeWidth="3" fill="none" />
          <path d="M0,400 Q150,500 350,350 T800,450" stroke="#ffb1c4" strokeWidth="2" fill="none" />
          <path d="M100,0 Q50,100 150,200 T50,300" stroke="#fbdae1" strokeWidth="2" fill="none" />
          <path d="M600,0 Q700,150 650,300 T750,600" stroke="#ffb1c4" strokeWidth="2" fill="none" />
          <circle cx="150" cy="500" r="8" stroke="#ffb1c4" strokeWidth="2" fill="none" />
          <circle cx="700" cy="100" r="5" stroke="#fbdae1" strokeWidth="2" fill="none" />
          <path d="M0,40 L800,40" stroke="#ffb1c4" strokeWidth="1" strokeDasharray="10 10" opacity="0.3" />
          <path d="M0,560 L800,560" stroke="#fbdae1" strokeWidth="1" strokeDasharray="15 8" opacity="0.2" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-16 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="space-y-6">
            <Image
              src="/logo.svg"
              alt="Doodle"
              width={300}
              height={135}
              className="h-[clamp(3rem,10vw,6rem)] w-auto opacity-20 -rotate-3 select-none"
            />
            <p className="font-body text-body-md text-on-surface/70 max-w-xs">
              Stationery for the restless mind. Every sketch, every scribble — a manifesto in motion.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full border-2 border-primary/50 text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:shadow-hard-sm hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-label text-label-sm text-primary uppercase tracking-widest">Navigate</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-body-md text-on-surface/70 hover:text-primary transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-primary transition-all duration-300" />
                    {link.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-label text-label-sm text-primary uppercase tracking-widest">Stay Inked</h3>
            <p className="font-body text-body-md text-on-surface/70">
              Get fresh drops, sketch tips, and early access.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@inbox.com"
                className="flex-1 bg-surface-container border-2 border-outline-variant rounded-lg px-4 py-3 font-body text-body-md text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-primary-container text-on-primary-container px-4 py-3 rounded-lg font-body font-bold text-sm
                           shadow-hard-sm transition-all duration-300 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] flex items-center gap-2 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative mt-16 pt-8 border-t-2 border-outline-variant/30">
          <p className="font-label text-label-sm text-outline/60 text-center md:text-left">
            &copy; 2024 DOODLE. STAY KINETIC.
          </p>
        </div>
      </div>
    </footer>
  )
}
