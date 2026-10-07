import { useEffect, useState } from 'react'
import Intro from './components/Intro.jsx'
import Demographics from './components/Demographics.jsx'
import ApplicationTask from './components/ApplicationTask.jsx'
import { applications, APPLICATIONS_PER_PARTICIPANT } from './data/applications.js'
import { isConfigured, supabase } from './supabaseClient.js'

function shuffle(list) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const emptyAnswer = () => ({ highlights: [], judgement: '', reasoning: '' })

// Bygger én rad per søknad. Bare feltene i supabase/schema.sql sendes.
function buildRows(demographics, order, answers) {
  const participantId = crypto.randomUUID()
  return order.map((app, i) => {
    const answer = answers[app.id]
    return {
      participant_id: participantId,
      gender: demographics.gender,
      age_group: demographics.ageGroup,
      application_id: app.id,
      display_order: i + 1,
      judgement: answer.judgement,
      highlights: answer.highlights.map(({ start, end, text, comment }) => ({
        start,
        end,
        text,
        comment: comment.trim(),
      })),
      reasoning: answer.reasoning.trim(),
    }
  })
}

export default function App() {
  // Steg: 'intro' -> 'demographics' -> 0..n-1 (søknader) -> 'done'
  const [step, setStep] = useState('intro')
  const [order] = useState(() => shuffle(applications).slice(0, APPLICATIONS_PER_PARTICIPANT))
  const [demographics, setDemographics] = useState({ gender: '', ageGroup: '' })
  const [answers, setAnswers] = useState(() => Object.fromEntries(order.map((a) => [a.id, emptyAnswer()])))
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const inProgress = step !== 'intro' && step !== 'done'

  // Advarer før deltakeren lukker fanen midt i studien, siden ingenting er lagret ennå.
  useEffect(() => {
    if (!inProgress) return
    const warn = (e) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [inProgress])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  async function submit() {
    setSubmitting(true)
    setSubmitError(null)
    try {
      if (!isConfigured) throw new Error('Supabase er ikke konfigurert (mangler VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).')
      // Ingen .select() etter insert: anon har ikke lesetilgang.
      const { error } = await supabase.from('responses').insert(buildRows(demographics, order, answers))
      if (error) throw error
      setStep('done')
    } catch (err) {
      console.error(err)
      setSubmitError('Noe gikk galt da svarene skulle sendes. Sjekk internettforbindelsen og prøv igjen.')
    } finally {
      setSubmitting(false)
    }
  }

  let content
  if (step === 'intro') {
    content = <Intro onStart={() => setStep('demographics')} />
  } else if (step === 'demographics') {
    content = (
      <Demographics
        value={demographics}
        onChange={setDemographics}
        onBack={() => setStep('intro')}
        onNext={() => setStep(0)}
      />
    )
  } else if (step === 'done') {
    content = (
      <section>
        <h1>Takk for at du deltok!</h1>
        <p>Svarene dine er sendt inn. Du kan nå lukke denne siden.</p>
      </section>
    )
  } else {
    const app = order[step]
    const isLast = step === order.length - 1
    content = (
      <>
        <ApplicationTask
          key={app.id}
          application={app}
          answer={answers[app.id]}
          onChange={(answer) => setAnswers((prev) => ({ ...prev, [app.id]: answer }))}
          position={step + 1}
          total={order.length}
          isLast={isLast}
          onBack={() => setStep(step === 0 ? 'demographics' : step - 1)}
          onNext={() => (isLast ? submit() : setStep(step + 1))}
        />
        {submitting && <p className="muted">Sender inn …</p>}
        {submitError && <p className="error">{submitError}</p>}
      </>
    )
  }

  return <main className={submitting ? 'busy' : undefined}>{content}</main>
}
