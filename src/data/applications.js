// Søknadene deltakerne skal vurdere.
//
// VIKTIG:
// - Tekstene under er PLASSHOLDERE. Bytt dem ut med gruppas egne fiktive
//   søknader før studien starter.
// - Søknader i kategorien "skrevet av menneske" må faktisk være skrevet av et
//   menneske, ellers blir resultatene ugyldige.
// - Fasiten (hvilken kategori hver søknad tilhører) skal IKKE ligge her.
//   Alt i denne filen havner i JavaScript-koden som sendes til deltakerens
//   nettleser og kan leses der. Hold fasiten i et eget dokument på UiB
//   OneDrive og koble den til svarene via `id` under analysen.
// - `id` lagres sammen med svarene, så ikke endre en id etter at
//   datainnsamlingen har startet.

export const applications = [
  {
    id: 'S01',
    title: 'Søknad på stilling som butikkmedarbeider',
    text: `Hei!

Jeg søker på stillingen som butikkmedarbeider som jeg så på Finn. Jeg har jobbet to somre på en matbutikk hjemme i Førde, og der lærte jeg mye om å ha kontakt med kunder og å holde orden på varer og hyller.

Jeg er en person som liker å ha mye å gjøre, og jeg trives best når det er travelt. Ved siden av studiene har jeg god tid på kvelder og i helger.

Håper å høre fra dere!

Hilsen
[Fiktiv søker A]`,
  },
  {
    id: 'S02',
    title: 'Søknad på stilling som junior utvikler',
    text: `Kjære rekrutteringsansvarlig,

Med stor entusiasme søker jeg herved stillingen som junior utvikler i deres innovative team. Gjennom min bachelorgrad i informatikk har jeg utviklet et solid fundament innen programmering, problemløsning og samarbeid i tverrfaglige prosjekter.

Jeg er en løsningsorientert og lærevillig person som trives i dynamiske miljøer. Jeg er overbevist om at min kombinasjon av teknisk kompetanse og gode samarbeidsevner vil gjøre meg til en verdifull ressurs for deres virksomhet.

Jeg ser frem til muligheten for å utdype hvordan jeg kan bidra.

Med vennlig hilsen
[Fiktiv søker B]`,
  },
  {
    id: 'S03',
    title: 'Søknad på stilling som barnehageassistent',
    text: `Hei,

Jeg vil gjerne søke på jobben som barnehageassistent. Jeg har tre års erfaring som assistent i en barnehage, der jeg har hatt ansvar for planlegging av aktiviteter og samarbeid med foreldre.

Det jeg liker best med jobben er å se barna utvikle seg fra dag til dag. Jeg er tålmodig, strukturert og opptatt av at alle barn skal bli sett.

Jeg tror jeg kan bidra positivt i deres barnehage, og ser frem til å høre fra dere.

Vennlig hilsen
[Fiktiv søker C]`,
  },
]

// Hvor mange søknader hver deltaker skal vurdere. Søknadene trekkes i
// tilfeldig rekkefølge. Sett til `applications.length` for å vise alle.
export const APPLICATIONS_PER_PARTICIPANT = applications.length
