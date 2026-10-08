export type Language = 'pl' | 'en';
export type ProjectCategory = 'story' | 'spatial' | 'product' | 'app' | 'experiment';

export interface LocalizedText {
  pl: string;
  en: string;
}

export interface Project {
  id: string;
  title: string;
  description: LocalizedText;
  /** Klucz grafiki: `public/work/<image>-{480,800,1254}.webp`. */
  image: string;
  link: string;
  tags: string[];
  category: ProjectCategory;
  featured?: boolean;
  accent: string;
  /** Żywy ekran na ścianie hero: `public/work/<image>-live-480.mp4`. */
  live?: boolean;
}

export const projects: Project[] = [
  {
    id: 'alphaforge',
    title: 'AlphaForge',
    description: {
      pl: 'Lokalny zestaw narzędzi graficznych dla Windows: usuwanie tła AI z przezroczystością, ręczne poprawki wycięć, powiększanie 2×/4× i eksport PNG, JPG, WebP oraz AVIF. Łącz operacje w zapisane zestawy i przetwarzaj całe foldery — bez wysyłania zdjęć do chmury.',
      en: 'A local image toolkit for Windows: AI background removal with transparency, manual cutout refinement, 2×/4× upscaling and PNG, JPG, WebP or AVIF export. Combine operations into saved presets and process entire folders without uploading your photos to the cloud.',
    },
    image: 'alphaforge',
    link: 'https://apkmason.dev/alphaforge-site/',
    tags: ['Tauri', 'Rust', 'ONNX Runtime'],
    category: 'app',
    accent: '#8da6ff',
  },
  {
    id: 'eclipse',
    title: 'ECLIPSE — Warcaby 3D',
    description: {
      pl: 'Warcaby 3D z autorskim wariantem Eclipse: para portali zmienia drogi pionów i przenosi się co cztery rundy. Zagraj z komputerem na trzech poziomach trudności lub z drugą osobą przy jednym urządzeniu. Obracana plansza, podpowiedzi i cofanie ruchów.',
      en: '3D checkers with the original Eclipse variant: a pair of portals changes the paths of pieces and relocates every four rounds. Play against the computer at three difficulty levels or share one device with a friend. Rotate the board, request hints and undo moves.',
    },
    image: 'eclipse',
    link: 'https://apkmason.dev/eclipse/',
    tags: ['Three.js', 'Minimax AI', 'Local multiplayer'],
    category: 'spatial',
    accent: '#d0bd86',
  },
  {
    id: 'whistletype',
    title: 'WhistleType',
    description: {
      pl: 'Lokalne dyktowanie dla Windows: przytrzymaj klawisz, mów i puść, aby wstawić tekst pod kursorem. Whistle na CPU lub Whisper z opcjonalnym przyspieszeniem NVIDIA, własny słownik i przywracanie schowka. Po pobraniu modeli działa offline, bez konta i chmurowego API mowy.',
      en: 'Local dictation for Windows: hold a key, speak and release to insert text at the cursor. Whistle on the CPU or Whisper with optional NVIDIA acceleration, custom vocabulary and clipboard restoration. Works offline after downloading models, without an account or a cloud speech API.',
    },
    image: 'whistletype',
    link: 'https://apkmason.dev/whistle-type-site/',
    tags: ['Windows', 'Rust / Win32', 'Whistle / Whisper'],
    category: 'app',
    accent: '#8bacff',
  },
  {
    id: 'tempsheet',
    title: 'TempSheet',
    description: {
      pl: 'Lekki, tymczasowy arkusz do szybkich obliczeń w przeglądarce. Formuły, formatowanie, konwersje jednostek i eksport CSV/XLSX — bez konta i automatycznego zapisu. Dane pozostają w pamięci karty, a pracę można zachować w edytowalnym pliku TempSheet.',
      en: 'A lightweight, temporary spreadsheet for quick calculations in your browser. Formulas, formatting, unit conversions and CSV/XLSX export — without an account or automatic saving. Data stays in the tab’s memory, and your work can be kept in an editable TempSheet file.',
    },
    image: 'tempsheet',
    link: 'https://apkmason.dev/tempsheet/',
    tags: ['React', 'TypeScript', 'Formula engine'],
    category: 'app',
    accent: '#88c9aa',
  },
  {
    id: 'odruch',
    title: 'ODRUCH',
    description: {
      pl: 'Platformówka 2D z 21 poziomami w trzech rozdziałach. Prowadź koralowego bohatera przez papierowy świat, w którym skok, nawrót i bezruch zmieniają reguły trasy. Precyzyjne sterowanie, szybkie powtórki i duch własnego rekordu zachęcają do jeszcze jednej próby.',
      en: 'A 2D platformer with 21 levels across three chapters. Guide a coral hero through a paper world where jumping, turning back and standing still change the rules of the route. Precise controls, quick restarts and a ghost of your personal best invite you to try just once more.',
    },
    image: 'odruch',
    link: 'https://apkmason.dev/odruch/',
    tags: ['Canvas 2D', 'Platformer', 'Web Audio'],
    category: 'app',
    accent: '#ef8769',
  },
  {
    id: 'winda',
    title: 'The Elevator',
    description: {
      pl: 'Atmosferyczna podróż 3D z perspektywy pierwszej osoby. Zjedź windą do monumentalnej hali, przemierzaj wiszące schody i odkrywaj miejsca spoza planów budynku. Wpisy konserwatora odsłaniają historię, a zapis postępu pozwala wrócić do odkrytych pięter. Gra na komputer z klawiaturą i myszą.',
      en: 'An atmospheric first-person 3D journey. Descend by elevator into a monumental hall, traverse suspended stairways and discover places absent from the building plans. A caretaker’s entries reveal the story, while saved progress lets you return to unlocked floors. Played on a computer with a keyboard and mouse.',
    },
    image: 'winda',
    link: 'https://apkmason.dev/winda/',
    tags: ['Three.js', 'First-person', 'Atmospheric exploration'],
    category: 'spatial',
    accent: '#b6c6d6',
  },
  {
    id: 'super-clipboard',
    title: 'Super Clipboard',
    description: {
      pl: 'Lokalny menedżer schowka dla Windows 11: historia tekstów i obrazów, biblioteka snippetów z szablonami oraz szybkie wklejanie pod Ctrl+Shift+V. Wyszukiwanie, transformacje tekstu i szyfrowane dane — bez konta i chmury.',
      en: 'A local clipboard manager for Windows 11: text and image history, a snippet library with templates, and quick paste via Ctrl+Shift+V. Search, text transformations and encrypted storage — without an account or cloud service.',
    },
    image: 'super_clipboard',
    link: 'https://apkmason.dev/clipboard-website/',
    tags: ['Tauri', 'React', 'Rust / SQLite'],
    category: 'app',
    accent: '#88d5c3',
  },
  {
    id: 'ball',
    title: 'Czerwona kula',
    description: {
      pl: 'Film i interaktywna gra 3D splatają się w jedną podróż. Prowadź czerwoną kulę przez podziemną katedrę, budź pięć rezonatorów światłem i dźwiękiem, a stylem gry kształtuj jedno z dwóch zakończeń.',
      en: 'Film and an interactive 3D game intertwine in a single journey. Guide a red ball through an underground cathedral, awaken five resonators with light and sound, and shape one of two endings through your style of play.',
    },
    image: 'ball',
    link: 'https://apkmason.dev/ball/',
    tags: ['Three.js', 'Blender', 'Adaptive audio'],
    category: 'spatial',
    accent: '#ef7669',
  },
  {
    id: 'mechanika-kina',
    title: 'Mechanika kina — Projektor 35 mm',
    description: {
      pl: 'Filmowe intro prowadzi do interaktywnej kabiny projekcyjnej 3D. Poznaj drogę taśmy i światła, obejrzyj mechanizm w zwolnieniu i rozłóż projektor 35 mm na części — w sześciu trybach ekspozycji.',
      en: 'A cinematic intro leads into an interactive 3D projection booth. Trace the paths of film and light, watch the mechanism in slow motion and take apart a 35 mm projector across six exhibit modes.',
    },
    image: 'mechanika_kina',
    link: 'https://apkmason.dev/mechanika-kina/',
    tags: ['Three.js', 'Blender', 'Interactive exhibit'],
    category: 'spatial',
    accent: '#e4b777',
  },
  {
    id: 'pole',
    title: 'POLE / 01 — Laboratorium ruchu',
    description: {
      pl: 'Interaktywna pracownia elektrodynamiki: rozłóż silnik prądu stałego, odkryj jego pola i przejdź siedem etapów od napięcia do ruchu. Autorski model 3D, sterowanie obwodem i bilans energii.',
      en: 'An interactive electrodynamics lab: take apart a DC motor, explore its fields and follow seven stages from voltage to motion. An original 3D model, circuit controls and an energy balance.',
    },
    image: 'pole',
    link: 'https://apkmason.dev/pole/',
    tags: ['Three.js', 'Blender', 'Interactive exhibit'],
    category: 'spatial',
    accent: '#c9b57d',
  },
  {
    id: 'zamek-tajemnic-rzeczywistosci',
    title: 'Zamek Tajemnic Rzeczywistości',
    description: {
      pl: 'Interaktywna wystawa 3D w zamku nad jeziorem: dziesięć komnat prowadzi od światła i czasu po życie i sztuczną inteligencję.',
      en: 'An interactive 3D exhibition in a lakeside castle, where ten chambers lead from light and time to life and artificial intelligence.',
    },
    image: 'zamek',
    link: 'https://apkmason.dev/zamek/',
    tags: ['Three.js', 'Interactive exhibit', 'Scientific'],
    category: 'spatial',
    featured: true,
    accent: '#d2b47a',
    live: true,
  },
  {
    id: 'maluch',
    title: 'Polski Fiat 126p — Studium małego samochodu',
    description: {
      pl: 'Cyfrowa ekspozycja Malucha z 1976 roku. Poznaj nadwozie, wnętrze, silnik i podwozie w autorskim modelu 3D — otwieraj drzwi i pokrywy, włączaj światła, zmieniaj lakier i usiądź za kierownicą.',
      en: 'A digital exhibition of the 1976 Polski Fiat 126p. Explore the body, interior, engine and chassis of an original 3D model — open doors and covers, switch on the lights, change the paint and take the driver’s seat.',
    },
    image: 'maluch',
    link: 'https://apkmason.dev/maluch/',
    tags: ['Three.js', 'Blender', 'Interactive exhibit'],
    category: 'spatial',
    featured: true,
    accent: '#ef7669',
  },
  {
    id: 'nexus-game',
    title: 'The Cipher Office — NEXUS',
    description: {
      pl: 'Pierwszoosobowa gra logiczna 3D prowadząca przez biuro, mieszkanie i dział nadzoru NEXUS, z zagadkami środowiskowymi i zapisywanym postępem.',
      en: 'A first-person 3D puzzle game spanning the NEXUS office, apartment and oversight division, with environmental puzzles and saved progress.',
    },
    image: 'nexus_game',
    link: 'https://apkmason.dev/nexus-game/',
    tags: ['Three.js', 'First-person', 'Puzzle game'],
    category: 'spatial',
    accent: '#c7aa6a',
    live: true,
  },
  {
    id: 'apkmason-watch',
    title: 'APKMASON Watch — Czas wyrzeźbiony w stali',
    description: {
      pl: 'Premiumowa prezentacja zegarka 3D: filmowe intro przechodzi w model renderowany na żywo, a scroll odsłania konstrukcję, makro bransolety, warianty tarczy i konfigurator.',
      en: 'A premium 3D watch presentation where a cinematic intro dissolves into a real-time model, while scrolling reveals its construction, bracelet details, dial variants and configurator.',
    },
    image: 'apkmason_watch',
    link: 'https://apkmason.dev/time-v2/',
    tags: ['Three.js', 'Scroll-driven', 'Configurator'],
    category: 'product',
    featured: true,
    accent: '#c9c8c3',
    live: true,
  },
  {
    id: 'spectrum',
    title: 'SPECTRUM — Archive of Light',
    description: {
      pl: 'Minutowa, sterowana scrollem wystawa o tym, jak światło, trzy receptory i piksele składają się na 16 777 216 kolorów.',
      en: 'A one-minute scroll-driven exhibit showing how light, three receptors and pixels become 16,777,216 colours.',
    },
    image: 'spectrum',
    link: 'https://apkmason.dev/spectrum/',
    tags: ['Scroll-driven', 'Interactive exhibit', 'Video scrubbing'],
    category: 'story',
    accent: '#63e6d8',
    live: true,
  },
  {
    id: 'pinball',
    title: 'Japanese Night Garden · Pinball',
    description: {
      pl: 'Autorski pinball w nocnym japońskim ogrodzie: fizyka 240 Hz, trzy kule, multiball, jackpoty oraz własna oprawa światła i dźwięku.',
      en: 'An original pinball game set in a Japanese night garden, with 240 Hz physics, three balls, multiball, jackpots and custom light and sound.',
    },
    image: 'pinball',
    link: 'https://apkmason.dev/pinball/',
    tags: ['Canvas 2D', 'Physics', 'Arcade'],
    category: 'app',
    accent: '#d9aa62',
  },
  {
    id: 'tsukimi-pinball-3d',
    title: 'TSUKIMI · RYŪJIN · INARI — 3D Pinball',
    description: {
      pl: 'Kolekcja trzech pinballowych stołów 3D: księżycowy ogród koi, pałac Smoczego Króla i złoty las lisów. Każdy ma własny układ, zasady, muzykę oraz tabelę rekordów.',
      en: 'A collection of three 3D pinball tables: a moonlit koi garden, the Dragon King’s palace and a golden fox forest. Each has its own layout, rules, music and high-score table.',
    },
    image: 'tsukimi_pinball',
    link: 'https://apkmason.dev/pinball-3d/',
    tags: ['Three.js', 'Three tables', 'Custom physics'],
    category: 'spatial',
    accent: '#e0a645',
    live: true,
  },
  {
    id: 'dual-choice',
    title: 'DUAL / CHOICE',
    description: {
      pl: 'Kinowe doświadczenie wyboru: przewiń do decydującego kadru, wskaż jeden z dwóch obiektów i zobacz, jak zmienia się w produkt.',
      en: 'A cinematic choice experience: scroll to the decisive frame, select one of two objects and watch it transform into a product.',
    },
    image: 'dual_choice',
    link: 'https://apkmason.dev/dual_choice/',
    tags: ['Choice-driven', 'Scroll-driven', 'Product story'],
    category: 'product',
    accent: '#75e8ff',
    live: true,
  },
  {
    id: 'artifact-seed',
    title: 'ARTIFACT SEED',
    description: {
      pl: 'Film i WebGL spotykają się w jednej przestrzeni: świetlisty artefakt materializuje się między dłońmi i otwiera wraz z przewijaniem.',
      en: 'Film and WebGL meet in one space as a luminous artefact materialises between the dancer\'s hands and opens through scroll.',
    },
    image: 'artifact_seed',
    link: 'https://apkmason.dev/artifact-seed/',
    tags: ['WebGL', 'Scroll-driven', 'Film compositing'],
    category: 'spatial',
    accent: '#d6b46d',
  },
  {
    id: 'apk-genesis',
    title: 'APK://GENESIS',
    description: {
      pl: 'Cyfrowy manifest APKMason.dev: sterowana scrollem opowieść o AI, obrazie i ruchu, zbudowana z wideo, typografii i dźwięku.',
      en: 'A digital manifesto for APKMason.dev: a scroll-driven story about AI, imagery and motion, built from video, typography and sound.',
    },
    image: 'genesis',
    link: 'https://apkmason.dev/apk_genesis/',
    tags: ['Scroll-driven', 'Cinematic', 'Manifesto'],
    category: 'story',
    accent: '#38bdf8',
  },
  {
    id: 'morn',
    title: 'MORN — Kawa dla pierwszego światła',
    description: {
      pl: 'Kampania fikcyjnej marki kawy premium, opowiedziana w siedmiu rozdziałach jednego poranka. Wschód słońca otwiera film sterowany scrollem, a prezentacja opakowania prowadzi do interaktywnego rytuału parzenia i konfiguratora kawy.',
      en: 'A campaign for a fictional premium coffee brand, told in seven chapters of a single morning. Sunrise opens a scroll-driven film, while the packaging showcase leads to an interactive brewing ritual and coffee configurator.',
    },
    image: 'morn',
    link: 'https://apkmason.dev/morn/',
    tags: ['Scroll-driven', 'Video scrubbing', 'Brand experience'],
    category: 'product',
    featured: true,
    accent: '#dfb276',
  },
  {
    id: 'skincare',
    title: 'Skin Elixir',
    description: {
      pl: 'Koncept luksusowej prezentacji kosmetyków z narracją sterowaną scrollem i inercyjnym ruchem.',
      en: 'A concept for a luxury skincare presentation, driven by scroll and an inertial motion system.',
    },
    image: 'skincare',
    link: 'https://apkmason.dev/skincare_demo/',
    tags: ['Scroll-driven', 'Luxury UI', 'Motion'],
    category: 'product',
    accent: '#e8bfb3',
    live: true,
  },
  {
    id: 'ostoja',
    title: 'OSTOJA — Dom nad jeziorem',
    description: {
      pl: 'Interaktywny spacer 3D po domu z drewna i kamienia nad jeziorem. Filmowe wejście prowadzi do swobodnego zwiedzania wnętrza, tarasu i otoczenia o zachodzie słońca.',
      en: 'An interactive 3D walk through a timber-and-stone lakeside house, with a cinematic entrance leading into free exploration of the interior, terrace and sunset landscape.',
    },
    image: 'ostoja',
    link: 'https://apkmason.dev/ostoja/',
    tags: ['Three.js', 'Interactive tour', 'Spatial'],
    category: 'spatial',
    featured: true,
    accent: '#d9a36a',
    live: true,
  },
  {
    id: 'aurora',
    title: 'AURORA — Dwa Nieba',
    description: {
      pl: 'Czterorozdziałowe doświadczenie o zorzy północnej i południowej, łączące pełnoekranowy film z interaktywnymi diagramami światła i magnetosfery.',
      en: 'A four-chapter experience about the northern and southern lights, combining fullscreen film with interactive diagrams of light and the magnetosphere.',
    },
    image: 'aurora',
    link: 'https://apkmason.dev/aurora/',
    tags: ['Interactive essay', 'Scientific', 'Video-led'],
    category: 'story',
    accent: '#60f2b1',
    live: true,
  },
  {
    id: 'prime',
    title: 'PRIME',
    description: {
      pl: 'Sterowana scrollem opowieść o liczbach pierwszych — od sita Eratostenesa i nieskończoności po spiralę Ulama, faktoryzację i kryptografię.',
      en: 'A scroll-driven story of prime numbers — from the sieve of Eratosthenes and infinity to the Ulam spiral, factorisation and cryptography.',
    },
    image: 'prime',
    link: 'https://apkmason.dev/prime/',
    tags: ['Scroll-driven', 'Mathematical story', 'Video scrubbing'],
    category: 'story',
    accent: '#d7b26d',
    live: true,
  },
  {
    id: 'can-form-v2',
    title: 'CAN//FORM — Matter in motion',
    description: {
      pl: 'Kinowe doświadczenie produktowe łączące film sterowany scrollem, model puszki w Three.js i studio materiałów z własną etykietą oraz eksportem packshotu.',
      en: 'A cinematic product experience combining scroll-driven film, a Three.js can model and a material studio with custom label artwork and packshot export.',
    },
    image: 'canform_v2',
    link: 'https://apkmason.dev/can_form_2/',
    tags: ['Three.js', 'Material studio', 'Scroll-driven'],
    category: 'product',
    accent: '#d6d2c9',
  },
  {
    id: 'built-by-nature',
    title: 'BUILT BY NATURE',
    description: {
      pl: 'Pełnoekranowy esej o trzech technologiach natury: odwracającym się skrzydle kolibra, skórze mątwy sterowanej neuronami i skanującym oku krewetki modliszkowej.',
      en: 'A fullscreen essay about three natural technologies: the hummingbird’s inverting wing, the cuttlefish’s neurally controlled skin and the mantis shrimp’s scanning eye.',
    },
    image: 'nature',
    link: 'https://apkmason.dev/nature/',
    tags: ['Interactive essay', 'Video-led', 'Scientific'],
    category: 'story',
    accent: '#54d7cb',
  },
  {
    id: 'ksztalt-sily',
    title: 'KSZTAŁT SIŁY',
    description: {
      pl: 'Trzy pełnoekranowe rozdziały pokazują niewidzialne siły przez materię: ferrociecz, figury Chladniego i rozgałęzione wyładowanie w gazie.',
      en: 'Three fullscreen chapters reveal invisible forces through matter: ferrofluid, Chladni patterns and a branching electrical discharge in gas.',
    },
    image: 'ksztalt_sily',
    link: 'https://apkmason.dev/ksztalt-sily/',
    tags: ['Interactive essay', 'Physics', 'Video-led'],
    category: 'story',
    accent: '#c7b8ff',
  },
  {
    id: 'the-vault',
    title: 'THE VAULT',
    description: {
      pl: 'Kinowe doświadczenie otwierania tajemniczej komory, łączące wideo sterowane scrollem, reaktywny dźwięk i finał renderowany w WebGL.',
      en: 'A cinematic containment experience combining scroll-scrubbed video, reactive sound and a WebGL-rendered finale.',
    },
    image: 'the_vault',
    link: 'https://apkmason.dev/the_vault/',
    tags: ['WebGL', 'Scroll-driven', 'Reactive audio'],
    category: 'spatial',
    accent: '#7cff45',
    live: true,
  },
  {
    id: 'aeris',
    title: 'AERIS — Ponad chmurami',
    description: {
      pl: 'Przeglądarkowa gra zręcznościowa o podniebnym kurierze, łącząca automatyczne odbicia, proceduralną trasę i pięć zmieniających się krain.',
      en: 'A browser arcade game about a sky courier, combining automatic bounces, a procedural route and five evolving realms.',
    },
    image: 'aeris',
    link: 'https://apkmason.dev/aeris/',
    tags: ['Canvas 2D', 'Procedural', 'Arcade'],
    category: 'app',
    accent: '#8cccf0',
    live: true,
  },
  {
    id: 'atelier',
    title: 'Atelier — mieszkanie z ogrodem',
    description: {
      pl: 'Interaktywna scena architektoniczna w Three.js: dziewięć kadrów, swobodny spacer po mieszkaniu i ogrodzie oraz światło przechodzące od dnia do zmierzchu.',
      en: 'An interactive Three.js architectural scene with nine directed views, free exploration of the apartment and garden, and light shifting from day to dusk.',
    },
    image: 'atelier',
    link: 'https://apkmason.dev/atelier/',
    tags: ['Three.js', 'Interactive 3D', 'Free walk'],
    category: 'spatial',
    accent: '#d4b07c',
  },
  {
    id: 'beyond-the-door',
    title: 'Beyond the Door',
    description: {
      pl: 'Interaktywna podróż przez trzy tajemnicze ścieżki, łącząca film, dźwięk i wybory użytkownika w jedno doświadczenie.',
      en: 'An interactive journey through three mysterious paths, uniting film, sound and user choice in one experience.',
    },
    image: 'btd',
    link: 'https://apkmason.dev/btd/',
    tags: ['Immersive', 'Scroll-driven', 'Sound'],
    category: 'story',
    accent: '#be6cff',
  },
  {
    id: 'edm',
    title: 'EDM Music Festival',
    description: {
      pl: 'Kinowa prezentacja fikcyjnego festiwalu EDM sterowana scrollem, łącząca dynamiczne wideo, oprawę muzyczną i interaktywny line-up.',
      en: 'A cinematic, scroll-driven presentation for a fictional EDM festival, combining dynamic video, soundtrack and an interactive lineup.',
    },
    image: 'edm',
    link: 'https://apkmason.dev/edm/',
    tags: ['Scroll-driven', 'Music Festival', 'Interactive'],
    category: 'product',
    accent: '#ff0055',
  },
  {
    id: 'void-drop',
    title: 'VOID DROP',
    description: {
      pl: 'Natywna gra zręcznościowa na Androida: swobodny spadek przez ewoluujący tunel, własny renderer OpenGL i rozgrywka sterowana jednym kciukiem.',
      en: 'A native Android arcade game: an endless descent through an evolving tunnel, powered by a custom OpenGL renderer and one-thumb controls.',
    },
    image: 'void_drop',
    link: 'https://apkmason.dev/void-drop-landing/',
    tags: ['Android', 'OpenGL ES', 'Arcade'],
    category: 'app',
    accent: '#3fe0d0',
  },
  {
    id: 'brixcore',
    title: 'BRIXCORE',
    description: {
      pl: 'Jednoekranowe doświadczenie wyboru o kinowej oprawie — wybierz rdzeń FORGE lub EVOLVE i poznaj swoją ścieżkę.',
      en: 'A one-screen, choice-driven cinematic experience — pick the FORGE or EVOLVE core to reveal your path.',
    },
    image: 'brixcore',
    link: 'https://apkmason.dev/brixcore/',
    tags: ['Choice-driven', 'Interactive', 'Cinematic'],
    category: 'story',
    accent: '#ff845d',
    live: true,
  },
  {
    id: 'veil',
    title: 'VEIL',
    description: {
      pl: 'Jednokadrowa, filmowa podróż przez głębię, przemianę i dotarcie do światła, której globalną osią czasu steruje przewijanie.',
      en: 'A single-frame cinematic passage through depth, transformation and arrival, with its global timeline controlled by scroll.',
    },
    image: 'veil',
    link: 'https://apkmason.dev/veil/',
    tags: ['Scroll-driven', 'Cinematic', 'Video scrubbing'],
    category: 'story',
    accent: '#b56cff',
    live: true,
  },
  {
    id: 'fruit-energy',
    title: 'FRUIT ENERGY',
    description: {
      pl: 'Kinowa prezentacja fikcyjnego napoju energetycznego, łącząca narrację produktową, reżyserię ruchu i sterowanie scrollem.',
      en: 'A cinematic presentation for a fictional energy drink, combining product storytelling, motion direction and scroll control.',
    },
    image: 'fruit',
    link: 'https://apkmason.dev/fruit/',
    tags: ['Scroll-driven', 'Product story', 'AI video'],
    category: 'product',
    accent: '#ff6a2f',
  },
  {
    id: 'the-guide',
    title: 'THE GUIDE',
    description: {
      pl: 'Trzydziestosekundowa, sterowana scrollem podróż przez archiwum przełomów, które nauczyły maszyny tworzyć obrazy.',
      en: 'A thirty-second scroll-driven journey through an archive of breakthroughs that taught machines to create images.',
    },
    image: 'the_guide',
    link: 'https://apkmason.dev/the-guide/',
    tags: ['Scroll-driven', 'Video scrubbing', 'AI history'],
    category: 'story',
    accent: '#9fe7ef',
  },
  {
    id: 'the-iris',
    title: 'THE IRIS',
    description: {
      pl: 'Jednokadrowe doświadczenie filmowe, w którym trzy sekwencje tworzą sterowany scrollem mechanizm optyczny.',
      en: 'A single-shot cinematic experience where three sequences form an optical mechanism controlled by scroll.',
    },
    image: 'iris',
    link: 'https://apkmason.dev/iris/',
    tags: ['Cinematic', 'Video scrubbing', 'Scroll-driven'],
    category: 'story',
    accent: '#a77bff',
  },
  {
    id: 'evolution-phone',
    title: 'Evolution of the Phone',
    description: {
      pl: 'Ewolucja mobilnych technologii od lat 90. po spekulatywną przyszłość.',
      en: 'The evolution of mobile technology from the 1990s to a speculative future.',
    },
    image: 'evo_phone',
    link: 'https://apkmason.dev/evo_phone/',
    tags: ['Timeline', 'Video scrubbing', 'Technology history'],
    category: 'story',
    accent: '#8d7cff',
  },
  {
    id: 'sfera',
    title: 'Sfera',
    description: {
      pl: 'Interaktywna sfera wiedzy, w której obrazy i ciekawostki rozmieszczono za pomocą algorytmu sfery Fibonacciego.',
      en: 'An interactive knowledge sphere arranging images and facts with a Fibonacci-sphere algorithm.',
    },
    image: 'sfera',
    link: 'https://apkmason.dev/sfera/',
    tags: ['Three.js', 'WebGL', 'Fibonacci'],
    category: 'spatial',
    accent: '#34c7ff',
  },
  {
    id: 'pcverse-v2',
    title: 'PCVerse v2 — Atlas maszyny',
    description: {
      pl: 'Interaktywny atlas komputera w 3D: poznaj siedem podzespołów, prześledź drogę danych i sprawdź ich działanie w laboratorium.',
      en: 'An interactive 3D PC atlas: explore seven components, trace the data path and test how they work in the lab.',
    },
    image: 'pcverse_v2',
    link: 'https://apkmason.dev/pcverse-v2/',
    tags: ['Three.js', 'Interactive 3D', 'Hardware'],
    category: 'spatial',
    accent: '#ff722e',
  },
  {
    id: 'inside-the-internet',
    title: 'Inside the Internet',
    description: {
      pl: 'Wizualizacja podróży pakietu danych przez cyfrową infrastrukturę — abstrakcyjna sieć staje się namacalną przestrzenią.',
      en: 'A visualization of a data packet travelling through digital infrastructure — turning an abstract network into a tangible space.',
    },
    image: 'inside_the_internet',
    link: 'https://apkmason.dev/inside-the-internet/',
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
    image: 'sand_to_silicon',
    link: 'https://apkmason.dev/sand_to_silicon/',
    tags: ['GSAP', 'Educational', 'Scroll-driven'],
    category: 'story',
    accent: '#f0b86e',
  },
  {
    id: 'pure-form',
    title: 'Pure Form',
    description: {
      pl: 'Luksusowa, sterowana scrollem prezentacja fikcyjnego zapachu APKMASON — PURE FORM.',
      en: 'A luxury scroll-driven showcase of the fictional fragrance APKMASON — PURE FORM.',
    },
    image: 'pure_form',
    link: 'https://apkmason.dev/Pure_form/',
    tags: ['Scroll-driven', 'Luxury UI', 'Motion'],
    category: 'product',
    accent: '#d4af37',
  },
  {
    id: 'ascent',
    title: 'ASCENT — The Human Journey',
    description: {
      pl: 'Symboliczna ewolucja człowieka opowiedziana obrazem, tempem i przewijaniem.',
      en: 'A symbolic evolution of humanity told through imagery, pacing and scroll.',
    },
    image: 'ascent_human_journey',
    link: 'https://apkmason.dev/ascent-human-journey/',
    tags: ['Scroll-driven', 'Cinematic', 'AI video'],
    category: 'story',
    accent: '#d1a56d',
  },
  {
    id: 'ai-model',
    title: 'AI ≠ MODEL',
    description: {
      pl: 'Interaktywna lekcja wizualna rozdzielająca model, system AI, workflow i agenta — z modułami, quizem i źródłami pokazującymi także koszt autonomii.',
      en: 'An interactive visual lesson separating the model, AI system, workflow and agent — with hands-on modules, a quiz and sources that also reveal the cost of autonomy.',
    },
    image: 'ai_model',
    link: 'https://apkmason.dev/ai-model/',
    tags: ['Interactive lesson', 'AI literacy', 'Source-led'],
    category: 'experiment',
    accent: '#72d8ee',
  },
  {
    id: 'poznaj-ai',
    title: 'Poznaj AI 2.0',
    description: {
      pl: 'Interaktywny, oparty na źródłach artykuł o drodze od promptu do odpowiedzi modelu — od tokenów i reprezentacji po generowanie i wiarygodność.',
      en: 'An interactive, source-led article tracing the path from a prompt to a model answer — from tokens and representations to generation and reliability.',
    },
    image: 'poznaj_ai',
    link: 'https://apkmason.dev/poznaj_ai/',
    tags: ['Interactive article', 'AI literacy', 'Source-led'],
    category: 'experiment',
    accent: '#5ed8e8',
  },
  {
    id: 'vibe-shift',
    title: 'VIBE//SHIFT',
    description: {
      pl: 'Interaktywny przewodnik po tworzeniu z AI: siedem decyzji prowadzi od nieuporządkowanego pomysłu do przetestowanej miniaplikacji „Dziś”.',
      en: 'An interactive guide to building with AI: seven decisions lead from an unstructured idea to the tested “Today” mini-app.',
    },
    image: 'vibeshift',
    link: 'https://apkmason.dev/vibe_shift/',
    tags: ['Interactive guide', 'AI workflow', 'Product thinking'],
    category: 'experiment',
    accent: '#7c91ff',
  },
  {
    id: 'allergen-guard',
    title: 'Allergen & Diet Guard',
    description: {
      pl: 'Prywatna aplikacja Android analizująca skład produktów względem profilu alergenów. Dane i historia pozostają offline.',
      en: 'A privacy-first Android app checking product ingredients against a personal allergen profile. Data and history stay offline.',
    },
    image: 'allergen',
    link: 'https://apkmason.dev/AllergenGuard/',
    tags: ['Android', 'Kotlin Compose', 'Offline'],
    category: 'app',
    accent: '#8ed86b',
  },
  {
    id: 'budget',
    title: 'Budżet Domowy',
    description: {
      pl: 'Błyskawiczna aplikacja desktopowa offline-first do budżetowania metodą zero-based.',
      en: 'A fast, offline-first desktop app for zero-based budgeting.',
    },
    image: 'budzet',
    link: 'https://apkmason.dev/budzet_domowy/',
    tags: ['Tauri', 'Rust', 'SQLite'],
    category: 'app',
    accent: '#55d18d',
  },
  {
    id: 'top-seven',
    title: 'Top Seven',
    description: {
      pl: 'Aplikacja edukacyjna z 147 faktami, fiszkami i interaktywnym słowniczkiem.',
      en: 'An educational app with 147 facts, flashcards and an interactive glossary.',
    },
    image: 'top_seven',
    link: 'https://apkmason.dev/topseven/',
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
    image: 'recai',
    link: 'https://apkmason.dev/recai_landing_page/',
    tags: ['Android', 'Whisper', 'GPT'],
    category: 'app',
    accent: '#e76cff',
  },
  {
    id: 'scrolldebt',
    title: 'ScrollDebt',
    description: {
      pl: 'Prywatna aplikacja Android pomagająca ograniczyć doomscrolling przez analizę czasu, bezpośredni feedback i działanie w pełni offline.',
      en: 'A privacy-first Android app that helps curb doomscrolling through time tracking, direct feedback and fully offline operation.',
    },
    image: 'scrolldebt',
    link: 'https://apkmason.dev/scrolldebt-site/',
    tags: ['Android', 'Kotlin', 'Offline'],
    category: 'app',
    accent: '#ff476f',
  },
  {
    id: 'piatunio-w-korpo',
    title: 'Piątunio w Korpo',
    description: {
      pl: 'Hyper-casualowa gra na Androida, w której przemierzasz labirynt biurek i próbujesz dotrwać do piątkowego popołudnia.',
      en: 'A hyper-casual Android game where you navigate a maze of desks and try to survive until Friday afternoon.',
    },
    image: 'piatunio',
    link: 'https://apkmason.dev/piatuniowkorpo/',
    tags: ['Android', 'Kotlin Compose', 'Pixel Art'],
    category: 'app',
    accent: '#4de7ff',
  },
];

export type Platform = 'web' | 'android' | 'desktop';

export const CATEGORIES: ProjectCategory[] = ['story', 'spatial', 'product', 'app', 'experiment'];

export const IMAGE_WIDTHS = [480, 800, 1254] as const;

export function imageSrc(project: Project, width: (typeof IMAGE_WIDTHS)[number] = 800) {
  return `/work/${project.image}-${width}.webp`;
}

export function liveSrc(project: Project) {
  return project.live ? `/work/${project.image}-live-480.mp4` : null;
}

export function imageSrcSet(project: Project) {
  return IMAGE_WIDTHS.map((width) => `${imageSrc(project, width)} ${width}w`).join(', ');
}

export function platformOf(project: Project): Platform {
  if (project.tags.includes('Android')) return 'android';
  if (project.tags.includes('Tauri') || project.tags.includes('Windows')) return 'desktop';
  return 'web';
}

export function hostOf(project: Project) {
  const url = new URL(project.link);
  return (url.host + url.pathname).replace(/\/$/, '');
}

export const featuredProjects = projects.filter((project) => project.featured);

export const stats = {
  total: projects.length,
  // Liczone z kategorii — tak jak filtry archiwum, żeby liczby w „O mnie” dało się sprawdzić filtrem.
  stories: projects.filter((project) => project.category === 'story').length,
  spatial: projects.filter((project) => project.category === 'spatial').length,
  apps: projects.filter((project) => project.category === 'app').length,
};
