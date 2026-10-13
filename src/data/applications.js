// Stillingsannonsen og søknadene deltakerne skal vurdere.
//
// VIKTIG:
// - Fasiten (hvilken kategori hver søknad tilhører) skal IKKE ligge her.
//   Alt i denne filen havner i JavaScript-koden som sendes til deltakerens
//   nettleser og kan leses der. Hold fasiten i et eget dokument på UiB
//   OneDrive og koble den til svarene via `id` under analysen.
// - `id` lagres sammen med svarene, så ikke endre en id etter at
//   datainnsamlingen har startet.

export const jobAd = {
  title: 'Prosjektkoordinator hos Viro',
  intro:
    'Vi søker en strukturert og engasjert prosjektkoordinator som ønsker å bidra til planlegging og gjennomføring av ulike prosjekter i virksomheten.',
  tasks:
    'Arbeidsoppgavene vil blant annet innebære koordinering av aktiviteter, oppfølging av oppgaver og tidsfrister, kommunikasjon med kollegaer og samarbeidspartnere og generelt administrativt arbeid.',
  requirementsIntro: 'Vi ser etter deg som:',
  requirements: [
    'Har gode kommunikasjons- og samarbeidsevner',
    'Arbeider strukturert og selvstendig',
    'Tar initiativ og er løsningsorientert',
    'Har gode digitale ferdigheter',
    'Har relevant utdanning eller erfaring',
  ],
  offer:
    'Vi tilbyr et inkluderende arbeidsmiljø, varierte arbeidsoppgaver og muligheter for faglig og personlig utvikling.',
}

export const applications = [
  {
    id: 'S01',
    applicant: 'Benjamin',
    title: 'Søknad fra Benjamin',
    text: `Hei,

Jeg heter Benjamin, er 25 år gammel og kommer fra Bergen. Etter å ha lest meg opp, ser jeg at dere har et veldig engasjerende miljø med gode muligheter til å utvikle seg videre. Jeg er ivrig og har mye erfaring med teamarbeid, og tror derfor jeg kunne passet godt inn i denne stillingen.

Jeg har en bachelor innen administrasjon og ledelse fra Høgskolen på Vestlandet. Dette startet jeg fordi jeg trives godt å jobbe med mennesker og liker å jobbe systematisk. Tidligere har jeg vært avdelingsleder på Sabrura ved siden av studiene. Denne erfaringen har gitt meg god kompetanse innen samarbeid og ledelse. Her lærte jeg å løse mindre og større oppgaver, både for ansatte og besøkende i restauranten.

Jeg er utadvendt, aktiv og liker å være engasjert i sosiale miljøer rundt meg. Dette er noen av grunnene til at jeg meldte meg som leder i fadderstyret. Her fikk jeg nyttig erfaring med å organisere faddergrupper, opprettholde kontakt med bedrifter og ha overordnet blikk på flere tråder samtidig.

Med vennlig hilsen,
Benjamin Olsen`,
  },
  {
    id: 'S02',
    applicant: 'Siri',
    title: 'Søknad fra Siri',
    text: `Hei,

Jeg heter Siri, er 24 år, fra Molde og har en bachelor i administrasjon og ledelse fra Høgskolen på Vestlandet. Stillingen som prosjektkoordinator hos Viro virker spennende fordi jeg ønsker å bruke utdanningen min i en praktisk rolle med ansvar for planlegging og oppfølging. Muligheten til å bidra i ulike prosjekter, samarbeide med andre og utvikle meg faglig gjør at denne rollen hadde kledd meg godt.

Som bemanningsansvarlig for studentbaren Kronbar, fikk jeg erfaring med koordinering og samarbeid i et aktivt studentmiljø. Rollen krevde oversikt, tydelig kommunikasjon og evne til å håndtere ulike situasjoner. Erfaringen har gitt meg et godt grunnlag for oppfølging av arbeidsoppgaver og at aktiviteter gjennomføres som planlagt.

Jeg er strukturert og trives med å arbeide både selvstendig og i team. Gjennom engasjementet i Kronbar har jeg fått erfaring med å møte ulike mennesker og bidra til et godt sosialt miljø. Jeg tar gjerne initiativ, er opptatt av å finne gode løsninger og ønsker å være en kollega andre kan stole på. Hos Viro vil jeg bidra med engasjement, godt samarbeid og vilje til å lære.

Med vennlig hilsen,
Siri Hansen`,
  },
  {
    id: 'S03',
    applicant: 'Ola',
    title: 'Søknad fra Ola',
    text: `Hei,

Jeg heter Ola, er 26 år og kommer fra Oslo. Med en bachelor i administrasjon og ledelse fra Høgskulen på Vestlandet ønsker jeg nå å bruke utdanningen min i en praktisk og variert arbeidshverdag. Stillingen som prosjektkoordinator hos Viro virker spesielt interessant fordi den kombinerer struktur, samarbeid og koordinering – områder jeg trives godt med og ønsker å utvikle meg videre innen.

Gjennom erfaring som redaktør for studentradioen har jeg fått god erfaring med å koordinere mennesker, planlegge aktiviteter og følge opp oppgaver og tidsfrister. Rollen krevde tydelig kommunikasjon og evnen til å holde oversikt over flere oppgaver samtidig. Som skiftleder hos Digg Pizza har jeg i tillegg fått erfaring med ansvar, problemløsning og koordinering i en hektisk arbeidshverdag.

Jeg er strukturert, initiativrik og liker å samarbeide med andre. Gjennom både studentradioen og arbeidslivet har jeg blitt vant til å møte ulike mennesker og bidra til et godt arbeidsmiljø. Jeg arbeider samtidig godt selvstendig og tar gjerne ansvar for å få oppgaver gjennomført.

Med vennlig hilsen,
Ola Berg`,
  },
]

// Hvor mange søknader hver deltaker skal vurdere. Søknadene vises i
// tilfeldig rekkefølge. Sett til `applications.length` for å vise alle.
export const APPLICATIONS_PER_PARTICIPANT = applications.length
