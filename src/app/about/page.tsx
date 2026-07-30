import { Sparkles, Star, Heart, Zap, Palette, Send, Puzzle, Pen, Users, Swords } from "lucide-react"

const milestones = [
  { year: "2020", title: "First Sketch", desc: "A single notebook, a single pen, and an idea that wouldn't quit. Founded in a tiny studio apartment.", icon: "✏️" },
  { year: "2021", title: "The Drop", desc: "First limited-edition drop sold out in 47 minutes. We knew we were onto something.", icon: "🔥" },
  { year: "2022", title: "Studio Expansion", desc: "Moved into our first real studio. Hired local artists. Built a community table.", icon: "🏗️" },
  { year: "2023", title: "Global Ink", desc: "Shipped to 34 countries. Partnered with indie bookshops worldwide.", icon: "🌍" },
  { year: "2024", title: "Kinetic Movement", desc: "Launched the Sketchbook Club, monthly drops, and the Doodle Foundation.", icon: "⚡" },
]

const values = [
  {
    icon: Palette,
    title: "Craftsmanship",
    desc: "Every tool, every page, every stitch is tested by working artists. If it can't survive a real studio session, it doesn't ship. We obsess over the details so you can forget them and create.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
  {
    icon: Users,
    title: "Community",
    desc: "We're not a brand, we're a crew. Our community shapes every drop, every color, every decision. From sketch jams to gallery shows — we build together.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/30",
  },
  {
    icon: Swords,
    title: "Chaos",
    desc: "Creativity is messy. We embrace the ink spills, the crossed-out lines, the happy accidents. Order is overrated — kinetic energy is where the magic lives.",
    color: "text-primary-container",
    bgColor: "bg-primary-container/10",
    borderColor: "border-primary-container/30",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative min-h-[85vh] flex items-center bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="doodle-bg-text top-10 -left-10 rotate-12">STORY</span>
          <span className="doodle-bg-text bottom-10 -right-10 -rotate-12">DOODLE</span>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-16 py-16 md:py-32 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="font-label text-label-sm text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/30 inline-flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  SINCE 2020
                </span>
              </div>
              <h1 className="font-display text-[clamp(2.5rem,10vw,5rem)] md:text-[clamp(3rem,6vw,5rem)] leading-[1.05] tracking-tight">
                THE STORY<br />OF{" "}
                <span className="doodle-underline text-primary">DOODLE</span>
              </h1>
              <p className="font-body text-body-lg text-on-surface/70 max-w-lg font-handwritten leading-relaxed">
                &ldquo;We believe in the power of the first stroke. That moment when pen meets paper and 
                something new comes to life — that&rsquo;s the kinetic spark we chase. Every product we make 
                is designed to honor that instant of creation.&rdquo;
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex -space-x-3">
                  {["#ffb1c4", "#ff4a8d", "#a8cec5", "#ffb1c4", "#ff4a8d"].map((color, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-surface-container overflow-hidden" style={{ zIndex: 5 - i, backgroundColor: color, opacity: 0.4 + i * 0.12 }}>
                      <div className="w-full h-full flex items-center justify-center font-label text-label-sm text-background font-bold">D</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-display text-headline-md text-primary font-bold">500+</span>
                  <span className="font-label text-label-sm text-outline uppercase tracking-wider">Artists Trust Us</span>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rotate-3 hover:rotate-0 transition-transform duration-700 group">
                <div className="absolute -inset-5 bg-primary/5 rounded-[2rem] -rotate-6 transition-transform duration-700 group-hover:rotate-0" />
                <div className="absolute -inset-3 bg-secondary/5 rounded-[2rem] rotate-3 transition-transform duration-700 group-hover:rotate-0" />
                <div className="relative w-full h-full overflow-hidden rounded-2xl border-4 border-primary shadow-hard bg-background flex items-center justify-center p-8">
                  <svg viewBox="0 0 400 400" className="w-full h-full opacity-80">
                    <circle cx="200" cy="200" r="120" fill="none" stroke="#ffb1c4" strokeWidth="2" strokeDasharray="8 6" />
                    <circle cx="200" cy="200" r="80" fill="none" stroke="#ff4a8d" strokeWidth="1.5" strokeDasharray="4 8" />
                    <circle cx="200" cy="200" r="40" fill="#ffb1c4" opacity="0.3" />
                    <path d="M80,320 Q140,260 200,300 Q260,340 320,280" fill="none" stroke="#a8cec5" strokeWidth="2.5" />
                    <path d="M120,140 Q160,100 200,140 Q240,180 280,120" fill="none" stroke="#ffb1c4" strokeWidth="2" />
                    <path d="M100,200 Q150,170 200,210 Q250,250 300,190" fill="none" stroke="#ff4a8d" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="200" y="215" textAnchor="middle" fontFamily="Gochi Hand, cursive" fontSize="52" fill="#ffb1c4" opacity="0.6">DOODLE</text>
                    {[0,1,2,3,4,5].map((_, i) => {
                      const angle = (i * 60) * Math.PI / 180
                      const r2 = 140 + Math.sin(i * 1.5) * 20
                      const cx2 = 200 + Math.cos(angle) * r2
                      const cy2 = 200 + Math.sin(angle) * r2
                      return (
                        <circle key={i} cx={cx2} cy={cy2} r="3" fill="#a8cec5" opacity="0.5" />
                      )
                    })}
                    <path d="M140,280 Q170,260 200,270" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
                    <path d="M240,130 Q260,120 280,135" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
                  </svg>
                </div>
                <div className="absolute -top-4 -right-4 w-14 h-14 bg-primary-container rounded-full flex items-center justify-center animate-float shadow-hard-sm">
                  <Pen className="w-7 h-7 text-background" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center animate-float shadow-hard-sm" style={{ animationDelay: "1.5s" }}>
                  <Star className="w-6 h-6 text-background" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-surface-container overflow-hidden">
        <div className="absolute inset-0 corkboard-bg opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-16">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="font-label text-label-sm text-secondary tracking-[0.2em] uppercase">Timeline</span>
          </div>
          <h2 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-16">
            From a sketch<br />to a{" "}
            <span className="text-primary">movement</span>.
          </h2>

          <div className="relative">
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative flex flex-col md:flex-row gap-6 md:gap-12 mb-12 md:mb-16 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="hidden md:block flex-1" />
                <div className="relative flex-shrink-0 z-10">
                  <div className="w-[36px] h-[36px] bg-primary-container rounded-full border-4 border-background shadow-hard-sm flex items-center justify-center text-lg font-display font-bold">
                    <span className="text-background text-sm">{m.icon}</span>
                  </div>
                </div>
                <div className={`flex-1 bg-background rounded-2xl border-2 border-primary/20 p-4 md:p-8 hover:shadow-hard transition-all duration-300 ${i % 2 === 0 ? "md:-rotate-1" : "md:rotate-1"} hover:rotate-0`}>
                  <span className="font-label text-label-sm text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30 inline-block mb-3">
                    {m.year}
                  </span>
                  <h3 className="font-display text-headline-md mb-2">{m.title}</h3>
                  <p className="font-body text-body-md text-on-surface/70">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-12 left-[8%] animate-float"><Star className="w-4 h-4 text-primary/20" /></div>
          <div className="absolute bottom-20 right-[12%] animate-float" style={{ animationDelay: "1s" }}><Sparkles className="w-5 h-5 text-secondary/20" /></div>
          <div className="absolute top-1/3 right-[5%] animate-float" style={{ animationDelay: "2s" }}><Heart className="w-4 h-4 text-primary-container/20" /></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-16">
          <div className="flex items-center gap-3 mb-3">
            <Puzzle className="w-5 h-5 text-secondary" />
            <span className="font-label text-label-sm text-secondary tracking-[0.2em] uppercase">Our DNA</span>
          </div>
          <h2 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight mb-4">
            What we stand for.
          </h2>
          <p className="font-body text-body-lg text-on-surface/70 max-w-xl mb-16">
            Three pillars that hold up the doodle universe.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`group bg-surface-container rounded-2xl border-2 ${v.borderColor} p-4 md:p-10 hover:shadow-hard transition-all duration-300 ${
                  i === 0 ? "-rotate-1" : i === 1 ? "rotate-0 md:rotate-1" : "rotate-1 md:-rotate-1"
                } ${i === 2 ? "col-span-2 md:col-span-1" : ""} hover:rotate-0 relative overflow-hidden`}
              >
                <div className="absolute -top-6 -right-6 w-16 md:w-24 h-16 md:h-24 opacity-[0.04] pointer-events-none">
                  <Palette className="w-full h-full" />
                </div>
                <div className="relative space-y-2 md:space-y-6">
                  <div className={`w-10 md:w-14 h-10 md:h-14 ${v.bgColor} rounded-xl md:rounded-2xl flex items-center justify-center ${v.color} group-hover:scale-110 transition-transform duration-300`}>
                    <v.icon className="w-5 md:w-7 h-5 md:h-7" />
                  </div>
                  <h3 className="font-display text-sm md:text-headline-md">{v.title}</h3>
                  <p className="font-body text-body-md text-on-surface/70">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="relative py-24 md:py-32 bg-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <span className="doodle-bg-text top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center rotate-6" style={{ fontSize: "clamp(8rem, 25vw, 20rem)" }}>JOIN</span>
        </div>
        <div className="relative max-w-3xl mx-auto px-4 md:px-16 text-center space-y-8">
          <div className="relative inline-block">
            <Heart className="w-10 h-10 text-primary-container animate-float" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping" />
          </div>
          <h2 className="font-display text-headline-lg md:text-[clamp(2.5rem,5vw,3.5rem)] leading-tight">
            Join the crew.
          </h2>
          <p className="font-body text-body-lg text-on-surface/70 max-w-lg mx-auto">
            Be part of a community that lives and breathes creativity. Early access, members-only drops, and a direct line to the studio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@inbox.com"
              className="flex-1 bg-surface-container border-2 border-outline-variant rounded-xl px-6 py-4 font-body text-body-md text-on-surface placeholder:text-outline/50 focus:outline-none focus:border-primary transition-colors duration-300"
            />
            <button
              type="submit"
              className="bg-primary-container text-background px-8 py-4 rounded-xl font-body font-bold text-body-md shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center justify-center gap-3 shrink-0"
            >
              Sign Up <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["NO SPAM", "JUST INK", "UNSUBSCRIBE ANYTIME", "WE <3 YOU"].map((tag) => (
              <span key={tag} className="font-label text-label-sm text-outline/50 border border-outline-variant/40 px-3 py-1.5 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
