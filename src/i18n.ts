import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pl: {
    translation: {
      navbar: {
        about: "O mnie",
        projects: "Projekty",
        workflow: "Warsztat AI",
        skip: "Przejdź do głównej treści",
        ariaHome: "Strona główna",
        ariaMenuOpen: "Otwórz menu",
        ariaMenuClose: "Zamknij menu"
      },
      hero: {
        hello: "Hello World_",
        hi: "Cześć,",
        iam: "jestem",
        name: "Krzysztof",
        roles: ["Android Developer.", "Web Designer.", "AI Creator.", "ApkMason."],
        description: "Projektuję zjawiskowe strony, buduję aplikacje i generuję multimedia. Wykorzystuję potęgę sztucznej inteligencji, by błyskawicznie przekuwać odważne wizje w gotowe produkty cyfrowe.",
        btnProjects: "Zobacz portfolio",
        btnWorkflow: "Mój Workflow z AI"
      },
      about: {
        title: "O Mnie",
        subtitle: "Lider na co dzień, <1>kreator AI</1> po godzinach.",
        p1: "Na co dzień pracuję w prężnie działającej korporacji w branży e-commerce, gdzie jako lider zarządzam dużym zespołem techników. Kiedy zamykam służbowego laptopa, zanurzam się w nieskończonych możliwościach sztucznej inteligencji. Nie ograniczam się tylko do kodu – projektuję zaawansowane Landing Pages, generuję utwory muzyczne przy pomocy Suno AI i swobodnie eksploruję inne dziedziny, w których algorytmy spotykają się z kreatywnością.",
        p2: "Ogromną inspiracją stało się dla mnie ukończenie programu szkoleniowego <1>Google Umiejętności Jutra 2.0</1>. To właśnie ono napędziło mnie do eksperymentów. Dziś, dzięki wsparciu potężnych modeli językowych, płynnie poruszam się w środowisku AntiGravity IDE i błyskawicznie dowożę gotowe projekty.",
        stackTitle: "Mój Stack / Umiejętności",
        skills: {
          android: "Środowisko Android Studio",
          prompting: "AI Prompting (Claude / ChatGPT)",
          antigravity: "Środowisko AntiGravity (IDE)",
          webdesign: "AI Web Design (Landing Pages)",
          music: "Generowanie muzyki (Suno AI)",
          copilot: "Microsoft Copilot Studio",
          excel: "MS Excel – analityka z AI",
          google: "Google Umiejętności Jutra 2.0"
        }
      },
      projects: {
        title: "Projekty & Aplikacje",
        btnApp: "Strona Aplikacji",
        btnDetails: "Zobacz szczegóły",
        btnSoon: "Wkrótce...",
        items: {
          scrolldebt: {
            desc: "Aplikacja zamieniająca bezmyślne doomscrolling w brutalne przebudzenie. Śledzi zmarnowany czas, wytyka wady za pomocą \"Brutal Truth\" i pomaga odzyskać kontrolę nad życiem. Zero zbierania danych, 100% offline."
          },
          brixcore: {
            desc: "Ekskluzywny projekt Landing Page wygenerowany przy pomocy AI dla luksusowej marki klocków. Wykorzystuje nowoczesny Glassmorphism i potężne animacje CSS."
          },
          skincare: {
            desc: "Luksusowy Landing Page dla marki kosmetycznej. Zaprojektowany w standardzie Premium z wykorzystaniem trendów na 2026 rok, w tym kinetycznej typografii i trójwymiarowej animacji scroll-driven 3D."
          },
          piatunio: {
            desc: "Zabawna gra Hyper-Casual w stylu Cyberpunk-Korpo na systemy Android. Przetrwaj w labiryncie biurek do piątkowego popołudnia. Posiada mechanikę klasycznego Pac-Mana, sterowanie gestami oraz pixel-artową oprawę retro z udźwiękowieniem 8-bit."
          },
          suno: {
            desc: "Odkryj moją bibliotekę utworów muzycznych wygenerowanych w pełni za pomocą Suno AI. Eksperymenty z brzmieniem, wokalem i nowoczesnymi gatunkami."
          },
          budzet: {
            desc: "Nowoczesna i błyskawiczna aplikacja desktopowa offline-first do zarządzania finansami (Zero-Based Budgeting). Zbudowana w oparciu o Tauri i Rust. Zapewnia 100% prywatności i niezależności."
          },
          recai: {
            desc: "Prywatny dyktafon na system Android (Kotlin & Jetpack Compose). Pozwala na nagrywanie w tle (Foreground Service) i lokalny zapis WAV, a także na transkrypcję Whisper i automatyczne podsumowania GPT-4o mini bezpośrednio z OpenAI przy użyciu własnego klucza API zapisanego w sprzętowym Keystore."
          },
          soon: {
            title: "Coming Soon",
            desc: "Kolejna innowacyjna aplikacja rozwijana przy pomocy sztucznej inteligencji. Więcej szczegółów wkrótce..."
          }
        }
      },
      workflow: {
        title: "Jak tworzę z AI?",
        desc: "Od oprogramowania, przez nowoczesne witryny, aż po eksperymenty muzyczne. Mój wszechstronny workflow z AI pozwala mi budować mądrzej, szybciej i bez ograniczeń.",
        samplePrompt: "Przykładowy prompt",
        steps: {
          step1: {
            title: "Koncept & Architektura",
            desc: "Wszystko zaczyna się od wizji. Rozpisuję cel i zamieniam go w solidny fundament pod aplikację, stronę lub utwór."
          },
          step2: {
            title: "Prompting & Generowanie",
            desc: "Zatrudniam czołowe modele (Claude, ChatGPT, Suno AI), by błyskawicznie przetopić koncepcję na kod, tekst lub dźwięk."
          },
          step3: {
            title: "AntiGravity & Integracja",
            desc: "Traktuję wygenerowane elementy jak puzzle. Składam je w dopracowaną całość za pomocą środowiska AntiGravity IDE."
          },
          step4: {
            title: "Szlifowanie & Publikacja",
            desc: "Ostatnie 20% to rzemiosło. Dopieszczam UX/UI, optymalizuję detale i wypuszczam gotowy produkt w świat."
          }
        },
        prompts: [
          "Wygeneruj interaktywny Landing Page w React z płynnymi animacjami oraz efektem Glassmorphism.",
          "Napisz w Kotlin przejrzysty ekran logowania z walidacją e-mail.",
          "Napisz makro VBA, które tworzy tabele przestawne i wylicza zapotrzebowanie FTE."
        ]
      },
      footer: {
        subtitle: "Tworzę aplikacje szybciej, mądrzej i z wykorzystaniem AI.",
        contact: "Kontakt",
        builtWith: "Zbudowane przy użyciu Vite & React.",
        rights: "Wszelkie prawa zastrzeżone.",
        googlePlay: "Wkrótce w Google Play"
      }
    }
  },
  en: {
    translation: {
      navbar: {
        about: "About me",
        projects: "Projects",
        workflow: "AI Workflow",
        skip: "Skip to main content",
        ariaHome: "Home",
        ariaMenuOpen: "Open menu",
        ariaMenuClose: "Close menu"
      },
      hero: {
        hello: "Hello World_",
        hi: "Hi,",
        iam: "I'm",
        name: "Krzysztof",
        roles: ["Android Developer.", "Web Designer.", "AI Creator.", "ApkMason."],
        description: "I design stunning websites, build applications, and generate multimedia. I leverage the power of artificial intelligence to instantly forge bold visions into polished digital products.",
        btnProjects: "View portfolio",
        btnWorkflow: "My AI Workflow"
      },
      about: {
        title: "About Me",
        subtitle: "Leader by day, <1>AI Creator</1> by night.",
        p1: "In my daily work, I lead a large technical team at a thriving e-commerce corporation. When I close my work laptop, I immerse myself in the infinite possibilities of artificial intelligence. I don't limit myself to code – I design advanced Landing Pages, generate music tracks using Suno AI, and freely explore other domains where algorithms meet creativity.",
        p2: "Completing the <1>Google Umiejętności Jutra 2.0</1> (Skills of Tomorrow) training program was a huge inspiration for me and fueled my initial experiments. Today, empowered by powerful language models, I seamlessly navigate the AntiGravity IDE and rapidly deliver polished projects.",
        stackTitle: "My Stack / Skills",
        skills: {
          android: "Android Studio Environment",
          prompting: "AI Prompting (Claude / ChatGPT)",
          antigravity: "AntiGravity Environment (IDE)",
          webdesign: "AI Web Design (Landing Pages)",
          music: "Music Generation (Suno AI)",
          copilot: "Microsoft Copilot Studio",
          excel: "MS Excel – AI Analytics",
          google: "Google Skills of Tomorrow 2.0"
        }
      },
      projects: {
        title: "Projects & Apps",
        btnApp: "Live App",
        btnDetails: "View Details",
        btnSoon: "Coming Soon...",
        items: {
          scrolldebt: {
            desc: "An app that turns mindless doomscrolling into a brutal awakening. It tracks wasted time, points out flaws using 'Brutal Truth', and helps you regain control over your life. Zero data collection, 100% offline."
          },
          brixcore: {
            desc: "An exclusive Landing Page project generated with AI for a luxury brick brand. Features modern Glassmorphism and powerful CSS animations."
          },
          skincare: {
            desc: "A luxury skincare brand Landing Page. Designed in Premium standard following 2026 trends, featuring kinetic typography and scroll-driven 3D animations."
          },
          piatunio: {
            desc: "A fun Hyper-Casual Cyberpunk-Corporate game for Android. Survive the desk maze until Friday afternoon. Features classic Pac-Man mechanics, gesture controls, and pixel-art retro graphics with 8-bit sound."
          },
          suno: {
            desc: "Discover my library of music tracks generated entirely using Suno AI. Experiments with sound, vocals, and modern genres."
          },
          budzet: {
            desc: "A modern, lightning-fast offline-first desktop app for personal finance management (Zero-Based Budgeting). Built with Tauri and Rust. Ensures 100% privacy and independence."
          },
          recai: {
            desc: "A private voice recorder for Android (Kotlin & Jetpack Compose). Features background recording (Foreground Service) and local WAV storage, as well as Whisper transcription and automatic GPT-4o mini summaries directly from OpenAI using your own API key securely saved in hardware Keystore."
          },
          soon: {
            title: "Coming Soon",
            desc: "Another innovative application developed using artificial intelligence. More details soon..."
          }
        }
      },
      workflow: {
        title: "How do I create with AI?",
        desc: "From software and modern websites to musical experiments. My versatile AI workflow allows me to build smarter, faster, and without limits.",
        samplePrompt: "Sample prompt",
        steps: {
          step1: {
            title: "Concept & Architecture",
            desc: "Everything starts with a vision. I outline the goal and turn it into a solid foundation for an app, website, or track."
          },
          step2: {
            title: "Prompting & Generation",
            desc: "I employ top models (Claude, ChatGPT, Suno AI) to instantly forge the concept into code, text, or sound."
          },
          step3: {
            title: "AntiGravity & Integration",
            desc: "I treat the generated elements like puzzle pieces. I assemble them into a refined whole using the AntiGravity IDE."
          },
          step4: {
            title: "Polishing & Publication",
            desc: "The final 20% is craftsmanship. I polish the UX/UI, optimize details, and release the finished product to the world."
          }
        },
        prompts: [
          "Generate an interactive React Landing Page with smooth animations and a Glassmorphism effect.",
          "Write a clean login screen in Kotlin with email validation.",
          "Write a VBA macro that creates pivot tables and calculates FTE demand."
        ]
      },
      footer: {
        subtitle: "Building apps faster, smarter, and with AI.",
        contact: "Contact",
        builtWith: "Built with Vite & React.",
        rights: "All rights reserved.",
        googlePlay: "Coming soon to Google Play"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
