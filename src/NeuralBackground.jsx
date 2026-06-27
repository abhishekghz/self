import { useEffect, useRef } from 'react'

// Layered "research console" background that nods to Abhishek's domains:
//  • Radar sweep + range rings + targeting reticles  → DRDO / defence
//  • Neural network with synaptic data-pulses         → Neuro / AI
//  • Drifting topographic contour lines (green tint)   → agriculture / environment
// Performance-minded: counts scale with screen area, a pre-rendered glow sprite
// keeps node cost cheap, DPR capped, paused when hidden, reduced-motion aware.
export default function NeuralBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d', { alpha: true })
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w, h, dpr, nodes, pulses, reticles, glow, radar, contours, raf, running = true
    let t = 0
    const mouse = { x: -9999, y: -9999 }

    const makeGlow = () => {
      const s = 36
      const g = document.createElement('canvas')
      g.width = g.height = s
      const gc = g.getContext('2d')
      const grad = gc.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
      grad.addColorStop(0, 'rgba(120,180,255,0.42)')
      grad.addColorStop(1, 'rgba(120,180,255,0)')
      gc.fillStyle = grad
      gc.fillRect(0, 0, s, s)
      return g
    }

    const newPulse = () => {
      const a = (Math.random() * nodes.length) | 0
      let b = (Math.random() * nodes.length) | 0
      if (b === a) b = (b + 1) % nodes.length
      return { a, b, t: Math.random(), spd: 0.0025 + Math.random() * 0.004, gold: Math.random() < 0.3 }
    }

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(Math.floor((w * h) / 16000), 92)
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.24, vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.5 + 0.7, blip: 0,
      }))
      glow = makeGlow()
      pulses = Array.from({ length: Math.min(Math.round(count / 7), 13) }, newPulse)
      reticles = []

      // radar centred toward upper-right (behind hero), large and faint
      radar = { cx: w * 0.76, cy: h * 0.34, R: Math.hypot(w, h) * 0.46, ang: 0 }

      // topographic contour lines confined to the lower band (terrain feel)
      const lines = w < 640 ? 4 : 6
      contours = Array.from({ length: lines }, (_, i) => ({
        base: 0.5 + i * (0.5 / lines),     // fraction of height
        amp: 14 + i * 5,
        freq: 0.004 + Math.random() * 0.0015,
        phase: Math.random() * Math.PI * 2,
        spd: 0.0015 + Math.random() * 0.001,
      }))
    }

    const drawContours = () => {
      ctx.lineWidth = 1
      for (const c of contours) {
        const yb = h * c.base
        ctx.beginPath()
        for (let x = -20; x <= w + 20; x += 22) {
          const y = yb + Math.sin(x * c.freq + c.phase + t * c.spd * 10) * c.amp
            + Math.sin(x * c.freq * 2.3 + t * c.spd * 6) * (c.amp * 0.3)
          x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = 'rgba(78,196,150,0.07)'  // green — agriculture/environment
        ctx.stroke()
      }
    }

    const drawRadar = () => {
      const { cx, cy, R, ang } = radar
      // range rings
      ctx.lineWidth = 1
      for (let k = 1; k <= 4; k++) {
        ctx.beginPath()
        ctx.arc(cx, cy, (R / 4) * k, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(91,157,249,${0.05 - k * 0.006})`
        ctx.stroke()
      }
      // crosshair axes
      ctx.strokeStyle = 'rgba(91,157,249,0.04)'
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy)
      ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R); ctx.stroke()
      // sweep comet: trailing wedge of fading lines + bright leading edge
      for (let s = 0; s < 16; s++) {
        const a = ang - s * 0.035
        ctx.strokeStyle = `rgba(120,190,255,${0.12 * (1 - s / 16)})`
        ctx.lineWidth = 1.4
        ctx.beginPath(); ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke()
      }
    }

    const LINK = 132
    const draw = () => {
      t++
      ctx.clearRect(0, 0, w, h)

      // base layers
      ctx.globalCompositeOperation = 'source-over'
      drawContours()

      ctx.globalCompositeOperation = 'lighter'
      drawRadar()

      // advance radar sweep + detect nodes it crosses
      radar.ang += 0.01
      if (radar.ang > Math.PI * 2) radar.ang -= Math.PI * 2

      // neural links
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        const dxm = mouse.x - n.x, dym = mouse.y - n.y
        if (Math.hypot(dxm, dym) < 170) { n.x += dxm * 0.001; n.y += dym * 0.001 }

        // radar lock: if sweep beam is near this node's bearing, light it up
        const bearing = Math.atan2(n.y - radar.cy, n.x - radar.cx)
        let da = Math.abs(((bearing - radar.ang + Math.PI * 3) % (Math.PI * 2)) - Math.PI)
        if (da < 0.05) {
          n.blip = 1
          if (reticles.length < 3 && Math.random() < 0.04) reticles.push({ i, life: 1 })
        }
        if (n.blip > 0) n.blip -= 0.012

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const dx = n.x - m.x, dy = n.y - m.y
          const d = Math.hypot(dx, dy)
          if (d < LINK) {
            const a = (1 - d / LINK) * 0.32
            ctx.strokeStyle = `rgba(91,157,249,${a})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke()
          }
        }
      }

      // glowing nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 170
        const lit = near || n.blip > 0.05
        const gs = (n.r + 2.4) * (lit ? 8 : 6)
        ctx.globalAlpha = lit ? 0.85 : 0.5
        ctx.drawImage(glow, n.x - gs / 2, n.y - gs / 2, gs, gs)
        ctx.globalAlpha = 1
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = lit ? 'rgba(240,216,164,1)' : 'rgba(150,200,255,0.95)'
        ctx.fill()
      }

      // synaptic data-pulses
      for (const p of pulses) {
        p.t += p.spd
        if (p.t >= 1) Object.assign(p, newPulse(), { t: 0 })
        const a = nodes[p.a], b = nodes[p.b]
        if (!a || !b) continue
        const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t
        const col = p.gold ? '217,179,118' : '120,200,255'
        const tx = a.x + (b.x - a.x) * Math.max(0, p.t - 0.08)
        const ty = a.y + (b.y - a.y) * Math.max(0, p.t - 0.08)
        ctx.strokeStyle = `rgba(${col},0.35)`; ctx.lineWidth = 1.4
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke()
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col},0.95)`; ctx.fill()
      }

      // targeting reticles (defence HUD) — amber corner brackets
      ctx.globalCompositeOperation = 'source-over'
      for (let r = reticles.length - 1; r >= 0; r--) {
        const ret = reticles[r]
        ret.life -= 0.012
        if (ret.life <= 0) { reticles.splice(r, 1); continue }
        const n = nodes[ret.i]; if (!n) { reticles.splice(r, 1); continue }
        const s = 13, a = ret.life * 0.8
        ctx.strokeStyle = `rgba(224,178,110,${a})`; ctx.lineWidth = 1.2
        const corner = (ox, oy, sx, sy) => {
          ctx.beginPath()
          ctx.moveTo(n.x + ox, n.y + oy + sy * 5)
          ctx.lineTo(n.x + ox, n.y + oy)
          ctx.lineTo(n.x + ox + sx * 5, n.y + oy)
          ctx.stroke()
        }
        corner(-s, -s, 1, 1); corner(s, -s, -1, 1); corner(-s, s, 1, -1); corner(s, s, -1, -1)
      }

      if (running) raf = requestAnimationFrame(draw)
    }

    setup()
    if (reduce) { draw(); running = false } else { draw() }

    const onResize = () => setup()
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    const onVis = () => { running = !document.hidden && !reduce; if (running) raf = requestAnimationFrame(draw) }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className="neural-canvas" aria-hidden="true" />
}
