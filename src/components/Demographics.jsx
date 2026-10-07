import { useState } from 'react'
import { AGE_OPTIONS, GENDER_OPTIONS } from '../options.js'

export default function Demographics({ value, onChange, onBack, onNext }) {
  const [showErrors, setShowErrors] = useState(false)
  const complete = value.gender && value.ageGroup

  function handleNext() {
    if (!complete) {
      setShowErrors(true)
      return
    }
    onNext()
  }

  return (
    <section>
      <h2>Litt om deg</h2>

      <fieldset className={showErrors && !value.gender ? 'invalid' : undefined}>
        <legend>Kjønn</legend>
        {GENDER_OPTIONS.map((opt) => (
          <label key={opt.value} className="radio">
            <input
              type="radio"
              name="gender"
              value={opt.value}
              checked={value.gender === opt.value}
              onChange={() => onChange({ ...value, gender: opt.value })}
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      <fieldset className={showErrors && !value.ageGroup ? 'invalid' : undefined}>
        <legend>Aldersgruppe</legend>
        {AGE_OPTIONS.map((opt) => (
          <label key={opt.value} className="radio">
            <input
              type="radio"
              name="ageGroup"
              value={opt.value}
              checked={value.ageGroup === opt.value}
              onChange={() => onChange({ ...value, ageGroup: opt.value })}
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      {showErrors && !complete && <p className="error">Svar på begge spørsmålene (du kan velge «Vil ikke oppgi»).</p>}

      <div className="nav">
        <button type="button" className="secondary" onClick={onBack}>
          Tilbake
        </button>
        <button type="button" onClick={handleNext}>
          Fortsett
        </button>
      </div>
    </section>
  )
}
