import { useState } from 'react'

export default function Intro({ onStart }) {
  const [consent, setConsent] = useState(false)

  return (
    <section>
      <h1>Kan du se om en jobbsøknad er skrevet av KI?</h1>
      <p>
        Dette er en studie i emnet INFO361 ved Universitetet i Bergen. Vi undersøker om folk klarer å skille
        mellom jobbsøknader som er skrevet av mennesker, generert av kunstig intelligens (KI), eller generert av
        KI og deretter redigert av et menneske, og hva folk legger vekt på når de vurderer dette.
      </p>

      <h2>Hva skal du gjøre?</h2>
      <p>
        Du får lese noen korte, fiktive jobbsøknader. For hver søknad markerer du tekst du tror er skrevet av KI,
        velger hva du tror om søknaden, og skriver en kort begrunnelse. Det tar omtrent 10–15 minutter.
      </p>

      <h2>Personvern</h2>
      <ul>
        <li>Studien er anonym. Vi spør bare om kjønn og aldersgruppe.</li>
        <li>Vi lagrer ikke navn, e-postadresse eller IP-adresse, og bruker ikke informasjonskapsler (cookies).</li>
        <li>Søknadene er fiktive og handler ikke om virkelige personer.</li>
        <li>
          Svarene lagres hos Supabase i EU og flyttes etter datainnsamlingen til UiB, der de slettes fra Supabase.
          Bare studentgruppa og veilederen har tilgang.
        </li>
        <li>
          Deltakelse er frivillig, og du kan avbryte når som helst ved å lukke siden. Ingenting lagres før du
          sender inn svarene til slutt. Fordi svarene er anonyme, kan vi ikke slette dem etter at du har sendt
          dem inn.
        </li>
      </ul>

      <label className="checkbox">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        Jeg har lest informasjonen over, er 18 år eller eldre og vil delta i studien.
      </label>

      <div className="nav">
        <span />
        <button type="button" disabled={!consent} onClick={onStart}>
          Start
        </button>
      </div>
    </section>
  )
}
