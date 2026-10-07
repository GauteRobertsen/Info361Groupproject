import { useEffect, useRef, useState } from 'react'

// Regner ut tegnposisjonen (start/slutt) til markeringen i `container`.
// Fungerer fordi containeren bare inneholder søknadsteksten (pluss <mark>-
// elementer rundt deler av den), så tekstinnholdet er lik `text`.
function selectionOffsets(container) {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null

  const range = selection.getRangeAt(0)
  if (!container.contains(range.startContainer) || !container.contains(range.endContainer)) {
    return null
  }

  const before = document.createRange()
  before.selectNodeContents(container)
  before.setEnd(range.startContainer, range.startOffset)

  const start = before.toString().length
  const end = start + range.toString().length
  return { start, end }
}

// Fjerner mellomrom/linjeskift i kantene av markeringen.
function trimRange(text, start, end) {
  while (start < end && /\s/.test(text[start])) start++
  while (end > start && /\s/.test(text[end - 1])) end--
  return start < end ? { start, end } : null
}

// Legger til en ny markering. Overlapper den eksisterende markeringer, slås
// de sammen til én.
export function addHighlight(text, highlights, start, end) {
  const overlapping = highlights.filter((h) => h.start < end && start < h.end)
  const rest = highlights.filter((h) => !(h.start < end && start < h.end))

  const mergedStart = Math.min(start, ...overlapping.map((h) => h.start))
  const mergedEnd = Math.max(end, ...overlapping.map((h) => h.end))
  const comment = overlapping
    .map((h) => h.comment)
    .filter(Boolean)
    .join(' ')

  const merged = {
    start: mergedStart,
    end: mergedEnd,
    text: text.slice(mergedStart, mergedEnd),
    comment,
  }
  return [...rest, merged].sort((a, b) => a.start - b.start)
}

function truncate(s, max = 60) {
  return s.length > max ? `${s.slice(0, max)}…` : s
}

function segments(text, highlights) {
  const result = []
  let pos = 0
  highlights.forEach((h, index) => {
    if (h.start > pos) result.push({ text: text.slice(pos, h.start) })
    result.push({ text: text.slice(h.start, h.end), index })
    pos = h.end
  })
  if (pos < text.length) result.push({ text: text.slice(pos) })
  return result
}

export default function HighlightableText({ text, highlights, onChange, activeIndex, onActivate }) {
  const containerRef = useRef(null)
  // Markeringen huskes her, slik at den ikke går tapt når deltakeren trykker
  // på knappen (på mobil kan trykket fjerne markeringen i nettleseren).
  const [pending, setPending] = useState(null)

  useEffect(() => {
    function handleSelectionChange() {
      const container = containerRef.current
      if (!container) return
      const offsets = selectionOffsets(container)
      const trimmed = offsets && trimRange(text, offsets.start, offsets.end)
      // En tom markering nullstiller ikke `pending`; det skjer først når
      // deltakeren begynner en ny markering i teksten (onPointerDown under).
      if (trimmed) setPending(trimmed)
    }
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [text])

  function handleMark() {
    if (!pending) return
    const next = addHighlight(text, highlights, pending.start, pending.end)
    onChange(next)
    onActivate(next.findIndex((h) => h.start <= pending.start && pending.end <= h.end))
    setPending(null)
    window.getSelection()?.removeAllRanges()
  }

  return (
    <div className="highlightable">
      <div className="toolbar">
        <button
          type="button"
          onPointerDown={(e) => e.preventDefault()}
          onClick={handleMark}
          disabled={!pending}
        >
          Marker valgt tekst som KI-generert
        </button>
        <span className="hint">
          {pending
            ? `Valgt: «${truncate(text.slice(pending.start, pending.end))}»`
            : 'Merk tekst med musen eller fingeren, og trykk på knappen.'}
        </span>
      </div>

      <div
        ref={containerRef}
        className="application-text"
        onPointerDown={() => setPending(null)}
      >
        {segments(text, highlights).map((seg, i) =>
          seg.index === undefined ? (
            <span key={i}>{seg.text}</span>
          ) : (
            <mark
              key={i}
              className={seg.index === activeIndex ? 'active' : undefined}
              onClick={() => onActivate(seg.index)}
            >
              {seg.text}
            </mark>
          ),
        )}
      </div>
    </div>
  )
}
