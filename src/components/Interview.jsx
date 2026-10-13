import { useState } from 'react'
import { JobAdDetails } from './JobAd.jsx'

// Siste steg før innsending: hvem av søkerne ville deltakeren kalt inn til
// intervju? Deltakeren kan krysse av for flere, eller for ingen.
// `value` er { ids: [...], none: true/false }.
export default function Interview({ order, value, onChange, onBack, onSubmit, submitting }) {
  const [showErrors, setShowErrors] = useState(false)
  const { ids, none } = value
  const answered = ids.length > 0 || none

  function toggle(id) {
    onChange({ ids: ids.includes(id) ? ids.filter((s) => s !== id) : [...ids, id], none: false })
  }

  function toggleNone() {
    onChange({ ids: [], none: !none })
  }

  function handleSubmit() {
    if (!answered) {
      setShowErrors(true)
      return
    }
    onSubmit()
  }

  return (
    <section>
      <p className="progress">Siste spørsmål</p>
      <h2>Hvem ville du kalt inn til intervju?</h2>
      <JobAdDetails />

      <fieldset className={showErrors && !answered ? 'invalid' : undefined}>
        <legend>Kryss av for søkerne du ville kalt inn. Du kan velge flere.</legend>
        {order.map((app) => (
          <label key={app.id} className="checkbox">
            <input type="checkbox" checked={ids.includes(app.id)} onChange={() => toggle(app.id)} />
            {app.applicant}
          </label>
        ))}
        <label className="checkbox">
          <input type="checkbox" checked={none} onChange={toggleNone} />
          Ingen av dem
        </label>
        {showErrors && !answered && <p className="error">Kryss av for minst én søker, eller «Ingen av dem».</p>}
      </fieldset>

      <div className="nav">
        <button type="button" className="secondary" onClick={onBack}>
          Tilbake
        </button>
        <button type="button" onClick={handleSubmit} disabled={submitting}>
          Send inn svarene
        </button>
      </div>
    </section>
  )
}
