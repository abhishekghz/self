import { useEffect, useRef, useState, useCallback } from 'react'

// Reveal-on-scroll wrapper using a single shared IntersectionObserver.
export function Reveal({ children, className = '', delay = 0, as = 'div', ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.unobserve(el) } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const Tag = as
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Count-up number that animates the first time it scrolls into view.
export function CountUp({ to, suffix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.unobserve(el)
      const dur = 1100, start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(eased * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{val}{suffix}</span>
}

// Accessible image lightbox with keyboard navigation.
export function Lightbox({ items, index, onClose, onNav }) {
  const open = index !== null && index >= 0
  const onKey = useCallback((e) => {
    if (!open) return
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowRight') onNav(1)
    if (e.key === 'ArrowLeft') onNav(-1)
  }, [open, onClose, onNav])

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onKey])

  if (!open) return null
  const item = items[index]
  const src = typeof item === 'string' ? item : item.src
  const caption = typeof item === 'string' ? '' : item.title
  const sub = typeof item === 'string' ? '' : item.org

  return (
    <div className="lb" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lb-close" aria-label="Close" onClick={onClose}>×</button>
      <button className="lb-arrow left" aria-label="Previous" onClick={(e) => { e.stopPropagation(); onNav(-1) }}>‹</button>
      <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={caption || 'certificate'} />
        {caption && (
          <figcaption>
            <strong>{caption}</strong>
            {sub && <span>{sub}</span>}
          </figcaption>
        )}
      </figure>
      <button className="lb-arrow right" aria-label="Next" onClick={(e) => { e.stopPropagation(); onNav(1) }}>›</button>
    </div>
  )
}
