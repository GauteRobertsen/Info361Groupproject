import { useState } from 'react'
import HighlightableText from './HighlightableText.jsx'
import { JUDGEMENT_OPTIONS } from '../options.js'

export default function ApplicationTask({ application, answer, onChange, position, total, onBack, onNext, isLast }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [showErrors, setShowErrors] = useState(false)

  const { highlights, judgement, reasoning } = answer
  const update = (patch) => onChange({ ...answer, ...patch })

  const missingJudgement = !judgement
  const missingReasoning = reasoning.trim().length === 0

  function setHighlights(next) {
    update({ highlights: next })
  }

  function updateComment(index, comment) {
    setHighlights(highlights.map((h, i) => (i === index ? { ...h, comment } : h)))
  }

  function removeHighlight(index) {
    setHighlights(highlights.filter((_, i) => i !== index))
    setActiveIndex(null)
  }

  function handleNext() {
    if (missingJudgement || missingReasoning) {
      setShowErrors(true)
      return
    }
    onNext()
  }

  return (
    <section>
      <p className="progress">
        Søknad {position} av {total}
      </p>
      <h2>{application.title}</h2>

      <ol className="instructions">
        <li>Les søknaden.</li>
        <li>Merk tekstbiter du tror er skrevet av KI, og skriv gjerne hvorfor ved hver markering.</li>
        <li>Velg hva du tror om søknaden som helhet, og begrunn svaret ditt.</li>
      </ol>

      <HighlightableText
        text={application.text}
        highlights={highlights}
        onChange={setHighlights}
        activeIndex={activeIndex}
        onActivate={setActiveIndex}
      />

      <h3>Dine markeringer ({highlights.length})</h3>
      {highlights.length === 0 ? (
        <p className="muted">Du har ikke markert noe i denne søknaden ennå.</p>
      ) : (
        <ul className="highlight-list">
          {highlights.map((h, i) => (
            <li key={`${h.start}-${h.end}`} className={i === activeIndex ? 'active' : undefined}>
              <blockquote>«{h.text}»</blockquote>
              <label>
                Hvorfor tror du dette er skrevet av KI? (valgfritt)
                <textarea
                  rows={2}
                  maxLength={1000}
                  value={h.comment}
                  onFocus={() => setActiveIndex(i)}
                  onChange={(e) => updateComment(i, e.target.value)}
                />
              </label>
              <button type="button" className="link" onClick={() => removeHighlight(i)}>
                Fjern markering
              </button>
            </li>
          ))}
        </ul>
      )}

      <fieldset className={showErrors && missingJudgement ? 'invalid' : undefined}>
        <legend>Hva tror du om denne søknaden?</legend>
        {JUDGEMENT_OPTIONS.map((opt) => (
          <label key={opt.value} className="radio">
            <input
              type="radio"
              name={`judgement-${application.id}`}
              value={opt.value}
              checked={judgement === opt.value}
              onChange={() => update({ judgement: opt.value })}
            />
            {opt.label}
          </label>
        ))}
        {showErrors && missingJudgement && <p className="error">Velg ett alternativ.</p>}
      </fieldset>

      <label className={`block ${showErrors && missingReasoning ? 'invalid' : ''}`}>
        Begrunn svaret ditt: Hva fikk deg til å tro at søknaden er eller ikke er skrevet av KI?
        <textarea
          rows={5}
          maxLength={5000}
          value={reasoning}
          onChange={(e) => update({ reasoning: e.target.value })}
        />
        {showErrors && missingReasoning && <span className="error">Skriv en kort begrunnelse.</span>}
      </label>
      <p className="muted small">Ikke skriv navn eller andre opplysninger som kan identifisere deg.</p>

      <div className="nav">
        <button type="button" className="secondary" onClick={onBack}>
          Tilbake
        </button>
        <button type="button" onClick={handleNext}>
          {isLast ? 'Send inn svarene' : 'Neste søknad'}
        </button>
      </div>
    </section>
  )
}
