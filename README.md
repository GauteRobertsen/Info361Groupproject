# Info361Groupproject

Nettside for datainnsamling i INFO361-gruppeprosjektet: deltakerne leser fiktive
jobbsøknader, markerer tekst de tror er KI-generert, velger om søknaden er skrevet
av et menneske, av KI, eller av KI og redigert av et menneske, og begrunner svaret.

- Frontend: React + Vite (`src/`), kan hostes statisk på Vercel eller Netlify.
- Database: Supabase (`supabase/schema.sql`). Deltakere kan bare sette inn svar.

## Kom i gang lokalt

```bash
npm install
cp .env.example .env.local   # fyll inn URL og anon/publishable-nøkkel
npm run dev
```

## Sette opp Supabase

1. Åpne prosjektet `Info361Groupproject` -> **SQL Editor**.
2. Lim inn og kjør hele `supabase/schema.sql`.
3. Hent **Project URL** og **anon / publishable key** under *Project Settings -> API*
   og legg dem i `.env.local` (lokalt) og som miljøvariabler hos hostingen.
   Bruk aldri `service_role`/secret-nøkkelen i frontend.

Hva skjemaet gjør:

| Rolle | INSERT | SELECT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| `anon` | ja (RLS-policy) | nei | nei | nei |
| `authenticated` | nei | nei | nei | nei |

RLS er slått på, og den eneste policyen er `for insert to anon with check (true)`.
I tillegg er alle tabellrettigheter fjernet fra `anon`/`authenticated` unntatt
`INSERT` for `anon`, så lesing og endring blokkeres to steder. Check-regler i
tabellen avviser ugyldige verdier og altfor store felt.

Dette er testet mot Postgres 16: insert som `anon` lykkes, mens `SELECT`, `UPDATE`,
`DELETE` og `INSERT ... RETURNING` gir `permission denied`.

## Hva lagres

Én rad per (deltaker, søknad), sendt i én forespørsel på slutten av studien:

| Kolonne | Innhold |
|---------|---------|
| `participant_id` | Tilfeldig UUID laget ved innsending. Kobler radene til én deltaker, ikke til en person. |
| `gender`, `age_group` | Kjønn og aldersgruppe (begge har «vil ikke oppgi»). |
| `application_id`, `display_order` | Hvilken søknad deltakeren så, og i hvilken rekkefølge. |
| `highlights` | Markerte tekstbiter: `[{start, end, text, comment}]`. |
| `judgement` | `menneske`, `ki` eller `ki_redigert`. |
| `reasoning` | Skriftlig begrunnelse. |
| `submitted_at` | Tidspunkt for innsending (settes av databasen). |

Ingenting sendes før deltakeren trykker «Send inn svarene». Appen bruker ikke
cookies eller localStorage, og sender ikke referrer.

## Søknadstekstene

`src/data/applications.js` inneholder **plassholdere**. Bytt dem ut med gruppas
egne fiktive søknader. Merk:

- Fasiten (hvilken kategori hver søknad hører til) skal ikke ligge i koden, fordi
  alt i frontend kan leses i nettleseren. Hold den i et eget ark på OneDrive og
  koble den til svarene via `application_id`.
- Søknadene i kategorien «menneske» må faktisk være skrevet av et menneske.

## Publisering (Vercel / Netlify)

- Byggkommando: `npm run build`, mappe: `dist`.
- Miljøvariabler: `VITE_SUPABASE_URL` og `VITE_SUPABASE_ANON_KEY`.

## Etter datainnsamlingen

Se `supabase/export_and_delete.sql`: eksporter til CSV, lagre på UiB OneDrive,
kontroller antall rader, og slett så tabellen (eller hele prosjektet) i Supabase.

## Personvern: ting å være klar over

- **IP-adresser i logger:** Appen sender og lagrer aldri IP-adresser, men
  infrastrukturen registrerer dem automatisk i tekniske logger. Supabase har
  API-logger (med IP) med kort lagringstid, og Vercel/Netlify logger forespørsler
  til nettsiden. Det kan være lurt å nevne dette i Sikt-meldingen, og å sjekke
  hvor hostingen behandler logger (Vercel/Netlify kan behandle data utenfor EU/EØS).
- **Fritekst:** Deltakerne blir bedt om å ikke skrive identifiserende opplysninger
  i begrunnelsene. Se likevel gjennom fritekstfeltene før analyse.
