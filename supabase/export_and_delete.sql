-- Brukes ETTER at datainnsamlingen er avsluttet.
--
-- 1) Eksport: kjør spørringen under i SQL Editor og velg "Export -> CSV",
--    eller bruk Table Editor -> responses -> "Export to CSV".
--    Lagre filen direkte på UiB OneDrive.

select
  participant_id,
  gender,
  age_group,
  application_id,
  display_order,
  judgement,
  highlights::text as highlights,
  reasoning,
  submitted_at
from public.responses
order by participant_id, display_order;

-- 2) Kontroller at CSV-filen på OneDrive er komplett (antall rader stemmer):
-- select count(*) from public.responses;

-- 3) Slett dataene fra Supabase. Kjør først når eksporten er kontrollert.
-- drop table public.responses;
-- Til slutt kan hele Supabase-prosjektet slettes under
-- Project Settings -> General -> Delete project.
