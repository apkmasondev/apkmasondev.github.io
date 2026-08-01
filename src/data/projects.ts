export type Language = 'pl' | 'en';
export type ProjectCategory = 'story' | 'spatial' | 'app' | 'experiment';

export interface LocalizedText {
  pl: string;
  en: string;
}

export interface Project {
  id: string;
  title: string;
  description: LocalizedText;
  image: string;
  link: string;
  tags: string[];
  category: ProjectCategory;
  featured?: boolean;
  accent: string;
}

export const projects: Project[] = [
  {
    id: 'mechanika-czasu',
    title: 'Mechanika Czasu',
    description: {
      pl: 'Kinowa opowieść o mechanicznym zegarku — od surowej formy po pulsujący, precyzyjny mechanizm sterowany scrollem.',
      en: 'A cinematic mechanical-watch story — from raw form to a precise, living mechanism controlled by scroll.',
    },
    image: '/mechanika_czasu_mockup.webp',
    link: 'https://apkmasondev.github.io/time/',
    tags: ['Scroll-driven', 'AI video', 'VEO'],
    category: 'story',
    featured: true,
    accent: '#ff5a36',
  },
  {
    id: 'beyond-the-door',
    title: 'Beyond the Door',
    description: {
      pl: 'Interaktywna podróż przez trzy tajemnicze ścieżki, łącząca film, dźwięk i wybory użytkownika w jedno doświadczenie.',
      en: 'An interactive journey through three mysterious paths, uniting film, sound and user choice in one experience.',
    },
    image: '/btd_mockup.webp',
    link: 'https://apkmasondev.github.io/btd/',
    tags: ['Immersive', 'Scroll-driven', 'Sound'],
    category: 'story',
    featured: true,
    accent: '#be6cff',
  },
  {
    id: 'origin',
    title: 'ORIGIN — The Cycle of Becoming',
    description: {
      pl: 'Pełnoekranowa opowieść filmowa sterowana scrollem — od pierwotnej eksplozji materii po świetlistą formę i kosmiczny wir.',
      en: 'A cinematic fullscreen story driven by scroll — from a primal explosion of matter to a luminous form and cosmic vortex.',
    },
    image: '/origin_mockup.webp',
    link: 'https://apkmasondev.github.io/origin/',
    tags: ['Scroll-driven', 'Cinematic', 'Canvas'],
    category: 'story',
    featured: true,
    accent: '#ff6b35',
  },
  {
    id: 'spark',
    title: 'SPARK',
    description: {
      pl: 'Historia ludzkiego postępu — od pierwszego ognia po eksplorację kosmosu — złożona z czterech filmowych sekwencji.',
      en: 'The story of human progress — from the first fire to space exploration — composed from four cinematic sequences.',
    },
    image: '/spark_mockup.webp',
    link: 'https://apkmasondev.github.io/spark/',
    tags: ['Cinematic', 'Next.js', 'AI video'],
    category: 'story',
    featured: true,
    accent: '#ffb13b',
  },
  {
    id: 'pcverse',
    title: 'PCVerse',
    description: {
      pl: 'Interaktywny przewodnik 3D po podzespołach komputera z widokiem eksplodowanym.',
      en: 'An interactive 3D guide to PC components with an exploded-view experience.',
    },
    image: '/pcverse_mockup.webp',
    link: 'https://apkmasondev.github.io/pcverse/',
    tags: ['React', 'Three.js', 'R3F'],
    category: 'spatial',
    featured: true,
    accent: '#00e2b8',
  },
  {
    id: 'sfera',
    title: 'Sfera',
    description: {
      pl: 'Trójwymiarowa sfera wiedzy rozmieszczająca obrazy i ciekawostki algorytmem Fibonacciego.',
      en: 'A three-dimensional knowledge sphere distributing imagery and facts with a Fibonacci algorithm.',
    },
    image: '/sfera_mockup.webp',
    link: 'https://apkmasondev.github.io/sfera/',
    tags: ['Three.js', 'WebGL', 'Fibonacci'],
    category: 'spatial',
    featured: true,
    accent: '#34c7ff',
  },
  {
    id: 'allergen-guard',
    title: 'Allergen & Diet Guard',
    description: {
      pl: 'Prywatna aplikacja Android analizująca skład produktów względem profilu alergenów. Dane i historia pozostają offline.',
      en: 'A privacy-first Android app checking product ingredients against a personal allergen profile. Data and history stay offline.',
    },
    image: '/allergen_mockup.webp',
    link: 'https://apkmasondev.github.io/AllergenGuard/',
    tags: ['Android', 'Kotlin Compose', 'Offline'],
    category: 'app',
    featured: true,
    accent: '#8ed86b',
  },
  {
    id: 'ascent',
    title: 'ASCENT — The Human Journey',
    description: {
      pl: 'Symboliczna ewolucja człowieka opowiedziana obrazem, tempem i przewijaniem.',
      en: 'A symbolic evolution of humanity told through imagery, pacing and scroll.',
    },
    image: '/ascent_human_journey_mockup.webp',
    link: 'https://apkmasondev.github.io/ascent-human-journey/',
    tags: ['Scroll-driven', 'Cinematic'],
    category: 'story',
    accent: '#d1a56d',
  },
  {
    id: 'evolution-phone',
    title: 'Evolution of the Phone',
    description: {
      pl: 'Ewolucja mobilnych technologii od lat 90. po spekulatywną przyszłość.',
      en: 'The evolution of mobile technology from the 1990s to a speculative future.',
    },
    image: '/evo_phone_mockup.webp',
    link: 'https://apkmasondev.github.io/evo_phone/',
    tags: ['GSAP', 'Video scrubbing'],
    category: 'story',
    accent: '#8d7cff',
  },
  {
    id: 'space-scale',
    title: 'Space Scale',
    description: {
      pl: 'Interaktywna podróż przez 42 rzędy wielkości — od protonu po obserwowalny Wszechświat, z 28 modelami 3D.',
      en: 'An interactive journey across 42 orders of magnitude — from a proton to the observable Universe, with 28 3D models.',
    },
    image: '/spacescale_mockup.webp',
    link: 'https://space-scale-explorer.krzychu1988.chatgpt.site/',
    tags: ['Three.js', 'WebGL', 'PWA'],
    category: 'spatial',
    accent: '#4fa7ff',
  },
  {
    id: 'vibe-shift',
    title: 'VIBE//SHIFT',
    description: {
      pl: 'Interaktywny manifest vibe codingu zbudowany na kinetycznej typografii i płynnym ruchu.',
      en: 'An interactive vibe-coding manifesto built around kinetic typography and fluid motion.',
    },
    image: '/vibeshift_mockup.webp',
    link: 'https://apkmasondev.github.io/vibe_shift/',
    tags: ['GSAP', 'Vanilla JS'],
    category: 'experiment',
    accent: '#ff3f84',
  },
  {
    id: 'inside-the-internet',
    title: 'Inside the Internet',
    description: {
      pl: 'Wizualizacja podróży pakietu danych przez cyfrową infrastrukturę — abstrakcyjna sieć staje się namacalną przestrzenią.',
      en: 'A visualization of a data packet travelling through digital infrastructure — turning an abstract network into a tangible space.',
    },
    image: '/inside_the_internet_mockup.webp',
    link: 'https://apkmasondev.github.io/inside-the-internet/',
    tags: ['GSAP', 'Interactive', 'Data story'],
    category: 'story',
    accent: '#41e1b8',
  },
  {
    id: 'sand-to-silicon',
    title: 'From Sand to Silicon',
    description: {
      pl: 'Proces przemiany ziaren piasku w mikroprocesor przedstawiony jako sterowana scrollem podróż.',
      en: 'The transformation of sand into a microprocessor, presented as a scroll-controlled journey.',
    },
    image: '/sand_to_silicon_mockup.webp',
    link: 'https://apkmasondev.github.io/sand_to_silicon/',
    tags: ['GSAP', 'Educational', 'Scroll-driven'],
    category: 'story',
    accent: '#f0b86e',
  },
  {
    id: 'top-seven',
    title: 'Top Seven',
    description: {
      pl: 'Aplikacja edukacyjna z 147 faktami, fiszkami i interaktywnym słowniczkiem.',
      en: 'An educational app with 147 facts, flashcards and an interactive glossary.',
    },
    image: '/top_seven_mockup.webp',
    link: 'https://apkmasondev.github.io/topseven/',
    tags: ['Android', 'Material 3'],
    category: 'app',
    accent: '#f1ca4b',
  },
  {
    id: 'recai',
    title: 'RecAI',
    description: {
      pl: 'Prywatny dyktafon z transkrypcją Whisper i automatycznymi podsumowaniami.',
      en: 'A private voice recorder with Whisper transcription and automatic summaries.',
    },
    image: '/recai_mockup.webp',
    link: 'https://apkmasondev.github.io/recai_landing_page/',
    tags: ['Android', 'Whisper', 'GPT'],
    category: 'app',
    accent: '#e76cff',
  },
  {
    id: 'budget',
    title: 'Budżet Domowy',
    description: {
      pl: 'Błyskawiczna aplikacja desktopowa offline-first do budżetowania metodą zero-based.',
      en: 'A fast, offline-first desktop app for zero-based budgeting.',
    },
    image: '/budzet_mockup.webp',
    link: 'https://apkmasondev.github.io/budzet_domowy/',
    tags: ['Tauri', 'Rust', 'SQLite'],
    category: 'app',
    accent: '#55d18d',
  },
  {
    id: 'piatunio',
    title: 'Piątunio w Korpo',
    description: {
      pl: 'Hyper-casualowa gra Android w stylu cyberpunkowego biura i klasycznego Pac-Mana.',
      en: 'A hyper-casual Android game mixing a cyberpunk office with classic Pac-Man mechanics.',
    },
    image: '/piatunio_mockup.webp',
    link: 'https://apkmasondev.github.io/piatuniowkorpo/',
    tags: ['Android', 'Pixel art'],
    category: 'app',
    accent: '#f05dff',
  },
  {
    id: 'scroll-debt',
    title: 'ScrollDebt',
    description: {
      pl: 'Narzędzie pomagające odzyskać czas tracony na doomscrolling — prywatnie i w pełni offline.',
      en: 'A tool for reclaiming time lost to doomscrolling — private and fully offline.',
    },
    image: '/scrolldebt_mockup.webp',
    link: 'https://apkmasondev.github.io/scrolldebt-site/',
    tags: ['Android', 'Wellbeing'],
    category: 'app',
    accent: '#ff553d',
  },
  {
    id: 'poznaj-ai',
    title: 'Poznaj AI',
    description: {
      pl: 'Interaktywny przewodnik dla osób rozpoczynających świadomą przygodę ze sztuczną inteligencją.',
      en: 'An interactive guide for people beginning a thoughtful journey with artificial intelligence.',
    },
    image: '/poznaj_ai_mockup.webp',
    link: 'https://apkmasondev.github.io/poznaj_ai/',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'experiment',
    accent: '#7c83ff',
  },
  {
    id: 'skincare',
    title: 'SKINCARE',
    description: {
      pl: 'Luksusowy koncept e-commerce łączący kinetyczną typografię z ruchem 3D.',
      en: 'A luxury e-commerce concept combining kinetic typography with 3D motion.',
    },
    image: '/skincare_mockup.webp',
    link: 'https://apkmasondev.github.io/skincare_demo/',
    tags: ['Web design', '3D'],
    category: 'experiment',
    accent: '#e8bfb3',
  },
  {
    id: 'brixcore',
    title: 'BRIXCORE',
    description: {
      pl: 'Eksperymentalny landing page dla wyimaginowanej marki luksusowych klocków.',
      en: 'An experimental landing page for an imagined luxury brick brand.',
    },
    image: '/brixcore_mockup.webp',
    link: 'https://apkmasondev.github.io/brixcore/',
    tags: ['Art direction', 'AI'],
    category: 'experiment',
    accent: '#ff845d',
  },
  {
    id: 'suno',
    title: 'Suno AI Music',
    description: {
      pl: 'Biblioteka muzycznych eksperymentów z generatywnym brzmieniem, wokalem i nowymi gatunkami.',
      en: 'A library of music experiments with generative sound, vocals and new genres.',
    },
    image: '/suno_mockup.webp',
    link: 'https://suno.com/@kriss8812',
    tags: ['AI music', 'Suno'],
    category: 'experiment',
    accent: '#b675ff',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const archiveProjects = projects.filter((project) => !project.featured);
