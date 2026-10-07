-- INFO361 gruppeprosjekt: skjema for svar fra deltakere.
-- Kjør hele filen i Supabase -> SQL Editor (prosjekt Info361Groupproject).
--
-- Én rad per (deltaker, søknad). Alle radene til en deltaker sendes i én
-- INSERT-forespørsel, som Postgres kjører som én transaksjon: enten lagres
-- alle svarene, eller ingen.
--
-- participant_id er en tilfeldig UUID som lages i nettleseren ved innsending.
-- Den brukes bare til å koble radene til samme deltaker og kan ikke knyttes
-- til en person. Navn, e-post og IP-adresse lagres ikke.

create table if not exists public.responses (
  id               bigint generated always as identity primary key,
  participant_id   uuid        not null,
  gender           text        not null
                   check (gender in ('kvinne', 'mann', 'annet', 'vil_ikke_oppgi')),
  age_group        text        not null
                   check (age_group in ('18-24', '25-34', '35-44', '45-54', '55-64', '65+', 'vil_ikke_oppgi')),
  application_id   text        not null check (char_length(application_id) <= 50),
  display_order    smallint    not null check (display_order between 1 and 50),
  -- Deltakerens vurdering av hele søknaden.
  judgement        text        not null
                   check (judgement in ('menneske', 'ki', 'ki_redigert')),
  -- Markerte tekstbiter: [{ "start": 12, "end": 40, "text": "...", "comment": "..." }]
  highlights       jsonb       not null default '[]'::jsonb
                   check (jsonb_typeof(highlights) = 'array' and pg_column_size(highlights) < 50000),
  reasoning        text        not null default ''
                   check (char_length(reasoning) <= 5000),
  submitted_at     timestamptz not null default now(),
  unique (participant_id, application_id)
);

-- ---------------------------------------------------------------------------
-- Tilgangskontroll
-- ---------------------------------------------------------------------------

-- RLS skal allerede være på (automatisk RLS), men vi slår det på eksplisitt
-- for sikkerhets skyld.
alter table public.responses enable row level security;

-- Forsvar i dybden: fjern alle standardrettigheter fra rollene som Data API
-- bruker, og gi anon kun INSERT. Da blir SELECT/UPDATE/DELETE avvist allerede
-- før RLS vurderes.
revoke all on table public.responses from anon, authenticated;
grant insert on table public.responses to anon;

-- Eneste policy: anon kan sette inn rader. Det finnes ingen policy for
-- SELECT, UPDATE eller DELETE, så med RLS på er disse blokkert.
drop policy if exists "anon kan sette inn svar" on public.responses;
create policy "anon kan sette inn svar"
  on public.responses
  for insert
  to anon
  with check (true);

-- Gruppa leser og eksporterer data via Supabase-dashbordet (Table Editor /
-- SQL Editor), som bruker en rolle med full tilgang og ikke påvirkes av RLS.
