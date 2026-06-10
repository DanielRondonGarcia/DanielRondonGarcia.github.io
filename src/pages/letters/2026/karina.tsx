import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Hidden love letter for Karina.
 * Route: /letters/2026/karina/
 *
 * Flow:
 *  1. Idle — gentle ambient particles + "Abrir" button
 *  2. Click button → particles converge into a beating heart (canvas)
 *  3. Envelope appears below the heart
 *  4. Click envelope → flap opens, letter slides out
 *
 * Aesthetic: soft magenta/pink Galaxy Love.
 * Fully self-contained: no Tailwind, no global theme.
 * Respects prefers-reduced-motion.
 */

type State = 'idle' | 'forming' | 'beating' | 'opening' | 'opened'

type Particle = {
  hx: number
  hy: number
  x: number
  y: number
  size: number
  hue: number
  twinkle: number
}

type BokehDot = {
  x: number
  y: number
  r: number
  hue: number
  alpha: number
  speed: number
  phase: number
}

export default function KarinaLetter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [state, setState] = useState<State>('idle')
  const [reduced, setReduced] = useState(false)
  const formRef = useRef(0) // 0→1 heart formation
  const animStartRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = () => setReduced(mq.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  const startAnimation = useCallback(() => {
    animStartRef.current = performance.now()
    setState('forming')
  }, [])

  const openEnvelope = useCallback(() => {
    setState('opening')
    setTimeout(() => setState('opened'), 900)
  }, [])

  // Canvas loop — ambient, then formation, then beating.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let particles: Particle[] = []
    let bokeh: BokehDot[] = []
    let raf = 0

    const heartPoint = (a: number) => {
      const x = 16 * Math.pow(Math.sin(a), 3)
      const y = 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)
      return { x: x / 17, y: -y / 17 }
    }

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(200, Math.floor((w * h) / 10000))
      particles = []
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + Math.random() * 0.08
        const hp = heartPoint(a)
        const inset = 0.55 + Math.random() * 0.45
        particles.push({
          hx: hp.x * inset,
          hy: hp.y * inset,
          x: (Math.random() - 0.5) * 2.8,
          y: (Math.random() - 0.5) * 2.8,
          size: 1.2 + Math.random() * 2.4,
          hue: 320 + Math.random() * 30,
          twinkle: Math.random() * Math.PI * 2,
        })
      }

      const bcount = Math.min(24, Math.floor((w * h) / 70000))
      bokeh = []
      for (let i = 0; i < bcount; i++) {
        bokeh.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 30 + Math.random() * 100,
          hue: 320 + Math.random() * 30,
          alpha: 0.04 + Math.random() * 0.1,
          speed: 0.08 + Math.random() * 0.25,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const draw = (now: number) => {
      // Compute form value based on state
      let form = 0
      let beat = 1
      const fRef = formRef

      if (state === 'forming') {
        const elapsed = (now - animStartRef.current) / 1000
        form = reduced ? 1 : Math.min(elapsed / 2.8, 1)
        fRef.current = form
        if (form >= 1 && !reduced) {
          // Switch to beating once formed
          setTimeout(() => {
            if (formRef.current >= 1) setState('beating')
          }, 0)
        }
      } else if (state === 'beating' || state === 'opening' || state === 'opened') {
        form = 1
      }

      if (reduced && state !== 'idle') {
        form = 1
      }

      beat = reduced ? 1 : 1 + Math.sin(now * 0.0012) * 0.045 * form

      // Background
      const bg = ctx.createRadialGradient(w / 2, h * 0.44, 0, w / 2, h * 0.44, Math.max(w, h) * 0.78)
      bg.addColorStop(0, '#2a0a2e')
      bg.addColorStop(0.5, '#140418')
      bg.addColorStop(1, '#060108')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // Bokeh
      ctx.globalCompositeOperation = 'lighter'
      for (const b of bokeh) {
        b.y -= b.speed
        b.x += Math.sin((now * 0.0006 + b.phase * 50) * 0.4) * 0.15
        if (b.y + b.r < 0) b.y = h + b.r
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        const fade = 0.55 + 0.45 * Math.sin(now * 0.0004 + b.phase)
        g.addColorStop(0, `hsla(${b.hue}, 90%, 72%, ${b.alpha * fade})`)
        g.addColorStop(1, 'hsla(320, 90%, 60%, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // Particles
      const cx = w / 2
      const cy = h * 0.38
      const scale = Math.min(w, h) * 0.28 * beat

      for (const pt of particles) {
        pt.x += (pt.hx * form - pt.x) * 0.05
        pt.y += (pt.hy * form - pt.y) * 0.05

        const wob = form * 0.01 * (reduced ? 0 : 1)
        const dx = Math.sin(now * 0.001 + pt.twinkle) * wob
        const dy = Math.cos(now * 0.001 + pt.twinkle) * wob

        const px = cx + (pt.x + dx) * scale
        const py = cy + (pt.y + dy) * scale
        const tw = reduced ? 1 : 0.55 + 0.45 * Math.sin(now * 0.003 + pt.twinkle)
        const r = pt.size * (0.8 + form * 0.5)

        const g = ctx.createRadialGradient(px, py, 0, px, py, r * 4)
        g.addColorStop(0, `hsla(${pt.hue}, 100%, 82%, ${0.88 * tw})`)
        g.addColorStop(0.4, `hsla(${pt.hue}, 100%, 64%, ${0.55 * tw})`)
        g.addColorStop(1, `hsla(${pt.hue}, 100%, 60%, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, r * 4, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(draw)
    }

    build()
    window.addEventListener('resize', build)
    raf = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', build)
      cancelAnimationFrame(raf)
    }
  }, [state, reduced])

  return (
    <>
      <Head>
        <title>Para Karina</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <main className="kl-root">
        <canvas ref={canvasRef} className="kl-canvas" aria-hidden />

        {/* IDLE: show button */}
        {state === 'idle' && (
          <div className="kl-overlay idle">
            <button className="kl-btn" onClick={startAnimation}>
              <span className="kl-btn-text">Para ti, Karina</span>
              <span className="kl-btn-sub">abrir</span>
            </button>
          </div>
        )}

        {/* FORMING: show pulse while forming */}
        {state === 'forming' && (
          <div className="kl-overlay forming">
            <span className="kl-forming-hint" />
          </div>
        )}

        {/* READY: envelope visible */}
        {(state === 'beating' || state === 'opening' || state === 'opened') && (
          <div className={`kl-envelope-stage ${state === 'opened' ? 'opened' : ''}`}>
            <button
              className="kl-envelope"
              onClick={state === 'beating' ? openEnvelope : undefined}
              disabled={state !== 'beating'}
            >
              <div className="kl-env-body">
                <div className="kl-env-flap" />
                <div className="kl-env-front" />
                <span className="kl-env-seal">♡</span>
              </div>
            </button>

            <div className={`kl-letter-card ${state === 'opened' ? 'visible' : ''}`}>
              <div className="kl-letter-inner">
                <p className="kl-greet">Karina,</p>
                <p>
                  Gracias por tu <em>compañía</em>, por tu <em>paciencia</em>,
                  por tu <em>amor</em> y por cada uno de tus <em>ánimos</em>.
                </p>
                <p>
                  Gracias por ser calma cuando el día pesa
                  y alegría cuando menos la espero.
                </p>
                <p>
                  Quiero estar contigo en las buenas y en las malas,
                  y escribir a tu lado la historia más bonita,
                  esa que no tiene punto final.
                </p>
                <p className="kl-closing">Con todo mi corazón,</p>
                <p className="kl-sign">∞</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          background: #060108;
        }
      `}</style>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,500&family=Dancing+Script:wght@500;600;700&family=Great+Vibes&display=swap');

        .kl-root {
          position: relative;
          min-height: 100vh;
          color: #ffe6f6;
          font-family: 'Cormorant Garamond', Georgia, serif;
          background: #060108;
        }

        .kl-canvas {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
        }

        .kl-overlay {
          position: fixed;
          inset: 0;
          z-index: 10;
          display: grid;
          place-items: center;
        }

        /* Button */
        .kl-btn {
          background: none;
          border: 2px solid rgba(255, 180, 220, 0.45);
          border-radius: 60px;
          padding: 1.3rem 3.2rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          transition: all 0.35s ease;
          box-shadow: 0 0 30px rgba(255, 100, 180, 0.2);
          backdrop-filter: blur(2px);
        }
        .kl-btn:hover {
          border-color: rgba(255, 140, 200, 0.8);
          box-shadow: 0 0 50px rgba(255, 100, 180, 0.4);
          transform: scale(1.04);
        }
        .kl-btn-text {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(2rem, 5.5vw, 3.4rem);
          color: #ffe0f2;
          text-shadow: 0 0 20px rgba(255, 110, 196, 0.7);
        }
        .kl-btn-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05rem;
          letter-spacing: 0.1em;
          color: rgba(255, 200, 230, 0.8);
        }

        .kl-forming-hint {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255, 140, 200, 0.6);
          box-shadow: 0 0 18px rgba(255, 100, 180, 0.5);
          animation: kl-form-pulse 0.7s ease-in-out infinite;
        }

        /* Envelope stage */
        .kl-envelope-stage {
          position: fixed;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          padding: 2rem;
          pointer-events: none;
        }

        .kl-envelope {
          background: none;
          border: none;
          cursor: pointer;
          pointer-events: all;
          transition: transform 0.25s ease;
        }
        .kl-envelope:hover {
          transform: translateY(-4px);
        }
        .kl-envelope:disabled {
          cursor: default;
          transform: none;
        }
        .kl-env-body {
          position: relative;
          width: clamp(160px, 30vw, 200px);
          height: clamp(110px, 20vw, 140px);
        }
        .kl-env-front {
          position: absolute;
          inset: 0;
          background: linear-gradient(165deg, #f9c0dc 0%, #e89ac0 40%, #d072a4 100%);
          border-radius: 8px 8px 2px 2px;
          box-shadow: 0 0 30px rgba(255, 100, 180, 0.45);
        }
        .kl-env-flap {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 55%;
          background: linear-gradient(165deg, #fdd4e8 0%, #eeaad0 60%, #e28ab8 100%);
          border-radius: 8px 8px 0 0;
          clip-path: polygon(0 0, 50% 65%, 100% 0);
          z-index: 2;
          transform-origin: top center;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .opened .kl-env-flap {
          transform: rotateX(180deg);
        }
        .kl-env-seal {
          position: absolute;
          top: 46%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.8rem;
          color: #e8578a;
          text-shadow: 0 0 10px rgba(255, 80, 140, 0.6);
          z-index: 3;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        /* Letter card */
        .kl-letter-card {
          max-width: min(600px, 88vw);
          width: 100%;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s 0.4s ease, transform 0.5s 0.4s ease;
          pointer-events: all;
        }
        .kl-letter-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .kl-letter-inner {
          padding: clamp(2rem, 5vw, 3rem);
          border-radius: 16px;
          background: rgba(20, 5, 20, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 150, 210, 0.2);
          box-shadow: 0 0 50px rgba(255, 60, 150, 0.15);
          text-align: center;
          line-height: 1.75;
          font-size: clamp(1.15rem, 2.5vw, 1.45rem);
        }
        .kl-letter-inner p {
          margin: 0.65rem 0;
        }
        .kl-letter-inner em {
          font-style: italic;
          color: #ff8fcf;
          text-shadow: 0 0 10px rgba(255, 100, 180, 0.5);
        }
        .kl-greet {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(2.4rem, 6vw, 3.2rem) !important;
          color: #ffccf0;
          text-shadow: 0 0 16px rgba(255, 110, 196, 0.6);
          margin-bottom: 0.5rem !important;
        }
        .kl-closing {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(1.6rem, 4vw, 2.1rem) !important;
          color: #ffccf0;
          text-shadow: 0 0 14px rgba(255, 110, 196, 0.55);
          margin-top: 1.2rem !important;
        }
        .kl-sign {
          font-size: 2.4rem;
          color: #ff6ec4;
          text-shadow: 0 0 18px #ff3c96, 0 0 36px #ff3c96;
          animation: kl-glow 3s ease-in-out infinite;
          margin-top: 0.2rem !important;
        }

        @keyframes kl-form-pulse {
          0%, 100% { transform: scale(0.7); opacity: 0.4; }
          50% { transform: scale(1.35); opacity: 1; }
        }
        @keyframes kl-glow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .kl-btn:hover {
            transform: none;
          }
          .kl-envelope:hover {
            transform: none;
          }
          .kl-sign {
            animation: none;
          }
          .kl-letter-card {
            transition: none;
          }
        }
      `}</style>
    </>
  )
}
