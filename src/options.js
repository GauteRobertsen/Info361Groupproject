// Verdiene (`value`) må stemme med check-reglene i supabase/schema.sql.

export const GENDER_OPTIONS = [
  { value: 'kvinne', label: 'Kvinne' },
  { value: 'mann', label: 'Mann' },
  { value: 'annet', label: 'Annet' },
  { value: 'vil_ikke_oppgi', label: 'Vil ikke oppgi' },
]

export const AGE_OPTIONS = [
  { value: '18-24', label: '18–24 år' },
  { value: '25-34', label: '25–34 år' },
  { value: '35-44', label: '35–44 år' },
  { value: '45-54', label: '45–54 år' },
  { value: '55-64', label: '55–64 år' },
  { value: '65+', label: '65 år eller eldre' },
  { value: 'vil_ikke_oppgi', label: 'Vil ikke oppgi' },
]

export const JUDGEMENT_OPTIONS = [
  { value: 'menneske', label: 'Skrevet av et menneske' },
  { value: 'ki', label: 'Generert av KI' },
  { value: 'ki_redigert', label: 'Generert av KI og deretter redigert av et menneske' },
]
