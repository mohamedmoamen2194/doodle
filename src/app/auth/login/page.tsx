"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Sparkles, Star, Pen, ArrowRight } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.ok) {
      router.push("/account")
    } else {
      setError(result.error || "Login failed")
    }
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center py-16 md:py-24">
      <div className="absolute inset-0 corkboard-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none select-none">
        <span className="doodle-bg-text top-10 -left-12 rotate-12">LOGIN</span>
        <span className="doodle-bg-text bottom-10 -right-12 -rotate-12">WELCOME</span>
      </div>

      <div className="relative w-full max-w-md mx-4">
        <div className="absolute -top-4 -right-4 w-10 h-10 bg-primary-container rounded-full flex items-center justify-center rotate-12 animate-float shadow-hard-sm z-10">
          <Pen className="w-5 h-5 text-on-primary-container" />
        </div>
        <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center -rotate-6 animate-float shadow-hard-sm z-10" style={{ animationDelay: "1.5s" }}>
          <Star className="w-4 h-4 text-on-secondary" />
        </div>

        <div className="bg-surface-container rounded-2xl border-2 border-primary/30 p-8 md:p-10 shadow-hard space-y-8 relative">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-label text-label-sm text-primary tracking-[0.2em] uppercase">Member Access</span>
            </div>
            <h1 className="font-display text-headline-lg leading-tight">
              <span className="doodle-underline">WELCOME BACK</span>
            </h1>
          </div>

          {error && (
            <div className="bg-primary-container/10 border border-primary-container/30 rounded-xl p-3 text-center">
              <p className="font-body text-body-sm text-primary-container">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label text-label-sm text-on-surface/70 mb-1.5 tracking-wider uppercase">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@inbox.com"
                required
                className="w-full bg-transparent border-b-2 border-outline-variant pb-2.5 font-body text-body-md text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary-container transition-colors duration-300"
              />
            </div>

            <div>
              <label className="block font-label text-label-sm text-on-surface/70 mb-1.5 tracking-wider uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                  required
                  className="w-full bg-transparent border-b-2 border-outline-variant pb-2.5 font-body text-body-md text-on-surface placeholder:text-outline/40 focus:outline-none focus:border-primary-container transition-colors duration-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2.5 text-outline hover:text-primary transition-colors font-label text-label-sm uppercase tracking-wider"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-container text-on-primary-container font-body font-bold text-body-md px-8 py-4 rounded-xl shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="text-center">
            <p className="font-body text-body-md text-on-surface/60">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary underline decoration-primary/30 hover:decoration-primary font-bold transition-colors"
              >
                Register
              </Link>
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-8 opacity-20 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 200 30" preserveAspectRatio="none">
              <path d="M0,15 Q50,0 100,15 T200,15" stroke="#ffb1c4" strokeWidth="2" fill="none" strokeDasharray="4 4" />
              <circle cx="30" cy="15" r="2" fill="#ffb1c4" />
              <circle cx="170" cy="15" r="2" fill="#fbdae1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
