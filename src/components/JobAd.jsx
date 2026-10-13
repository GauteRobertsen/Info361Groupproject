import { jobAd } from '../data/applications.js'

export function JobAdContent() {
  return (
    <div className="job-ad">
      <p>{jobAd.intro}</p>
      <p>{jobAd.tasks}</p>
      <p>{jobAd.requirementsIntro}</p>
      <ul>
        {jobAd.requirements.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p>{jobAd.offer}</p>
    </div>
  )
}

// Egen side før søknadene, slik at alle deltakerne har lest annonsen.
export default function JobAd({ onBack, onNext }) {
  return (
    <section>
      <p className="progress">Stillingsannonsen</p>
      <h2>{jobAd.title}</h2>
      <p className="muted">
        Søknadene du skal lese, er skrevet til denne stillingen. Annonsen er fiktiv. Du kan åpne den igjen
        mens du leser søknadene.
      </p>
      <JobAdContent />
      <div className="nav">
        <button type="button" className="secondary" onClick={onBack}>
          Tilbake
        </button>
        <button type="button" onClick={onNext}>
          Til søknadene
        </button>
      </div>
    </section>
  )
}

// Sammenleggbar versjon som vises over hver søknad.
export function JobAdDetails() {
  return (
    <details className="job-ad-details">
      <summary>Vis stillingsannonsen: {jobAd.title}</summary>
      <JobAdContent />
    </details>
  )
}
