"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const words = [
  { text: "art", scale: 1.3 },
  { text: "designs", scale: 1.4 },
  { text: "authenticity", scale: 1 },
  { text: "colors", scale: 1.3 },
]

const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_scroll;
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ; m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}
void main() {
    vec2 uv = v_texCoord;
    vec2 aspect_uv = uv;
    aspect_uv.x *= u_resolution.x / u_resolution.y;
    vec3 bgColor = vec3(0.12, 0.05, 0.07);
    vec3 lineColor = vec3(1.0, 0.69, 0.77);
    float scrollOffset = u_scroll * 5.0;
    float speed = u_time * 0.2 + scrollOffset;
    float doodle = 0.0;
    for(float i = 0.0; i < 3.0; i++) {
        float n = snoise(aspect_uv * 1.5 + i * 0.5 + vec2(speed * 0.5, speed * 0.3));
        float dist = abs(n);
        doodle += smoothstep(0.02, 0.0, dist);
    }
    vec3 finalColor = mix(bgColor, lineColor, clamp(doodle, 0.0, 1.0));
    float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor += grain * 0.03;
    gl_FragColor = vec4(finalColor, 1.0);
}`

export default function ChalkHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    const total = section.offsetHeight - window.innerHeight
    const scrolled = -rect.top
    setProgress(Math.max(0, Math.min(1, total > 0 ? scrolled / total : 0)))
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    const canvas = document.getElementById("hero-canvas") as HTMLCanvasElement
    if (!canvas) return
    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext)
    if (!gl) return

    function cs(type: number, src: string) {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs))
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, "a_position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(prog, "u_time")
    const uRes = gl.getUniformLocation(prog, "u_resolution")
    const uScroll = gl.getUniformLocation(prog, "u_scroll")

    function syncSize() {
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
    }

    if (typeof ResizeObserver !== "undefined") new ResizeObserver(syncSize).observe(canvas)
    syncSize()

    let animId: number
    function render(t: number) {
      syncSize()
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (uTime) gl.uniform1f(uTime, t * 0.001)
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height)
      if (uScroll) gl.uniform1f(uScroll, progress)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animId = requestAnimationFrame(render)
    }
    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [progress])

  const totalSlots = words.length + 4
  const slotLen = 1 / totalSlots

  function getWordState(index: number) {
    const start = index * slotLen
    const fadeIn = start + slotLen * 0.1
    const hold = start + slotLen * 0.5
    const fadeOut = start + slotLen * 0.75
    const end = start + slotLen

    if (progress < fadeIn) return { opacity: 0, y: 30 }
    if (progress < hold) {
      const t = (progress - fadeIn) / (hold - fadeIn)
      return { opacity: Math.min(1, t * 2.5), y: 30 - t * 30 }
    }
    if (progress < fadeOut) return { opacity: 1, y: 0 }
    if (progress < end) {
      const t = (progress - fadeOut) / (end - fadeOut)
      return { opacity: 1 - t * 1.5, y: -t * 20 }
    }
    return { opacity: 0, y: -20 }
  }

  const segLen = slotLen

  const logoSlot = words.length * segLen
  const taglineSlot = (words.length + 1) * segLen
  const descSlot = (words.length + 2) * segLen
  const ctaSlot = (words.length + 3) * segLen

  function fader(progress: number, slot: number, len: number, fadePortion = 0.4) {
    const local = (progress - slot) / len
    if (local < 0) return 0
    if (local > 1) return 1
    const p = Math.min(1, local / fadePortion)
    return p * p * (3 - 2 * p)
  }

  const logoFade = fader(progress, logoSlot, segLen, 0.4)
  const logoUp = fader(progress, taglineSlot, segLen, 0.5)
  const taglineFade = fader(progress, taglineSlot, segLen, 0.4)
  const descFade = fader(progress, descSlot, segLen, 0.4)
  const ctaFade = fader(progress, ctaSlot, segLen, 0.4)

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative bg-background"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <canvas
          id="hero-canvas"
          className="absolute inset-0 w-full h-full"
          style={{ display: "block" }}
        />

        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="chalkFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
            </filter>
          </defs>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center z-10">
          {words.map((word, i) => {
            const state = getWordState(i)
            return (
              <h1
                key={word.text}
                className="absolute font-display font-bold text-center pointer-events-none select-none"
                style={{
                  opacity: state.opacity,
                  transform: `translateY(${state.y}px) scale(${word.scale})`,
                  transition: "opacity 0.2s ease-out, transform 0.35s ease-out",
                  color: "rgba(255,255,255,0.9)",
                  filter: "url(#chalkFilter)",
                  fontSize: "clamp(2.5rem, 10vw, 6rem)",
                  letterSpacing: "0.08em",
                  textShadow: "0 0 1px rgba(255,255,255,0.3)",
                }}
              >
                {word.text.toUpperCase()}
              </h1>
            )
          })}

          <div
            className="flex flex-col items-center gap-5 pointer-events-none max-w-lg px-4"
            style={{
              opacity: logoFade > 0 || taglineFade > 0 || descFade > 0 || ctaFade > 0 ? 1 : 0,
              transform: `translateY(${logoUp * -50}px)`,
              transition: "transform 0.6s ease-out",
            }}
          >
            <Image
              src="/logo.svg"
              alt="Doodle"
              width={400}
              height={180}
              className="h-[clamp(3rem,15vw,8rem)] w-auto opacity-90"
              priority
              style={{ opacity: logoFade, transition: "opacity 0.5s ease-out" }}
            />
            <h2
              className="font-display font-bold text-center"
              style={{
                opacity: taglineFade,
                transition: "opacity 0.5s ease-out",
                color: "rgba(255,255,255,0.9)",
                filter: "url(#chalkFilter)",
                fontSize: "clamp(1.5rem, 5vw, 3rem)",
                letterSpacing: "0.05em",
              }}
            >
              YOUR MIND IS UNFINISHED
            </h2>
            <p
              className="font-body text-body-md text-white/50 text-center"
              style={{
                opacity: descFade,
                transition: "opacity 0.5s ease-out",
              }}
            >
              Stationery that feeds the kinetic impulse. Sketch, scribble, and stain the page with intent.
            </p>
            <div
              style={{
                opacity: ctaFade,
                transition: "opacity 0.5s ease-out",
                pointerEvents: ctaFade > 0.5 ? "auto" : "none",
              }}
            >
              <Link
                href="/store"
                className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-body font-bold text-body-md px-6 py-3 rounded-xl shadow-hard transition-all duration-300 hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                SHOP NOW
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
