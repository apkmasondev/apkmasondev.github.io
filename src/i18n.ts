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
        p1: "Na co dzień pracuję w prężnie działającej korporacji w branży e-commerce, gdzie jako lider zarządzam dużym zespołem techników. Kiedy zamykam służbowego laptopa, zanurzam się w nieskończonych możliwościach sztucznej inteligencji. Nie ograniczam się tylko do kodu – projektuję zaawansowane Landing Pages, generuję multimedia przy pomocy AI i swobodnie eksploruję inne dziedziny, w których algorytmy spotykają się z kreatywnością.",
        p2: "Ogromną inspiracją stało się dla mnie ukończenie programu szkoleniowego <1>Google Umiejętności Jutra 2.0</1>. To właśnie ono napędziło mnie do eksperymentów. Dziś, łącząc możliwości AntiGravity IDE, Codex i potężnych modeli AI, hobbystycznie realizuję mnóstwo projektów w błyskawicznym tempie.",
        stackTitle: "Mój Stack / Umiejętności",
        skills: {
          android: "Środowisko Android Studio",
          prompting: "AI Prompting (Claude / ChatGPT)",
          antigravity: "Środowisko AntiGravity (IDE)",
          webdesign: "AI Web Design (Landing Pages)",
          codex: "AI Coding (ChatGPT Codex)",
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
          spacescale: {
            desc: "Interaktywna aplikacja edukacyjna pokazująca 42 rzędy wielkości — od protonu (10⁻¹⁵ m) po obserwowalny Wszechświat (≈10²⁷ m). Logarytmiczna podróż przez kosmos z obracanymi modelami 3D dla 28 obiektów, porównywarką i pełnym trybem PWA offline."
          },
          vibeshift: {
            desc: "Kolejny efekt uboczny eksperymentów z Codexem. Nowoczesny, interaktywny landing page poświęcony filozofii vibe codingu i programowaniu z udziałem sztucznej inteligencji. Zbudowany z wykorzystaniem HTML5, Vanilla JS, GSAP i Lenis dla maksymalnej płynności."
          },
          allergen: {
            desc: "Hobbystyczny projekt stworzony z AI. Aplikacja Android analizująca skład (Open Food Facts) pod kątem Twojego profilu alergenów. Dane użytkownika i historia pozostają w 100% offline."
          },
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
          pcverse: {
            desc: "Interaktywny, trójwymiarowy przewodnik edukacyjny po podzespołach komputera PC. Zbudowany w React z użyciem Three.js i React Three Fiber. Posiada dynamiczną animację rozłożenia części (Exploded View), interaktywne zbliżenia kamery i responsywny neonowy interfejs."
          },
          topseven: {
            desc: "Edukacyjna aplikacja mobilna na system Android (Kotlin & Jetpack Compose) prezentująca skondensowaną wiedzę w formie interaktywnych zestawień. Zawiera 147 faktów w 21 kategoriach tematycznych, tryb fiszek do nauki oraz wbudowany interaktywny słowniczek trudnych pojęć w stylu Glassmorphism."
          },
          sfera: {
            desc: "Interaktywna, trójwymiarowa sfera wiedzy prezentująca kolekcję obrazów i ciekawostek rozmieszczonych algorytmem Fibonacciego. Stworzona w czystym JS z lokalnym Three.js i WebGL. Projekt powstał jako efekt uboczny testowania modelu ChatGPT 5.6 SOL."
          },
          poznajai: {
            desc: "Interaktywny, nowoczesny przewodnik dla początkujących rozpoczynających naukę sztucznej inteligencji. Zbudowany z użyciem czystego HTML5, CSS3 i Vanilla JS. Oferuje dynamiczną, rysowaną w miarę scrollowania oś czasu, efekt 3D Tilt dla kart, parallax podążający za myszką oraz pełny tryb ciemny."
          },
          suno: {
            desc: "Odkryj moją bibliotekę utworów muzycznych wygenerowanych w pełni za pomocą Suno AI. Eksperymenty z brzmieniem, wokalem i nowoczesnymi gatunkami."
          },
          budzet: {
            desc: "Nowoczesna i błyskawiczna aplikacja desktopowa offline-first do zarządzania finansami (Zero-Based Budgeting). Zbudowana w oparciu o Tauri i Rust. Zapewnia 100% prywatności i niezależności."
          },
          recai: {
            desc: "Prywatny dyktafon na system Android (Kotlin & Jetpack Compose). Pozwala na nagrywanie w tle (Foreground Service) i lokalny zapis WAV, a także na transkrypcję Whisper i automatyczne podsumowania GPT-4o mini bezpośrednio z OpenAI przy użyciu własnego klucza API zapisanego w sprzętowym Keystore."
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
            desc: "Zaczynam od szerokiej perspektywy. Projektuję architekturę rozwiązania, dobieram odpowiednie modele AI i buduję solidny fundament technologiczny."
          },
          step2: {
            title: "Vibe Coding & Prompting",
            desc: "Współpracuję z flagowymi modelami (jak Claude, Gemini, czy GPT), wykorzystując zaawansowany prompting, by błyskawicznie przekuć pomysły w wysokiej jakości kod i multimedia."
          },
          step3: {
            title: "Integracja (AntiGravity & Codex)",
            desc: "Traktuję wygenerowane komponenty jak części precyzyjnego mechanizmu. Składam je w harmonijną całość, pracując płynnie w środowiskach AntiGravity IDE oraz Codex."
          },
          step4: {
            title: "Szlifowanie & Wdrożenie",
            desc: "Ostatnie 20% to cyfrowe rzemiosło. Dopieszczam UX/UI, optymalizuję detale i wdrażam bezbłędnie działający produkt na produkcję."
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
        p1: "In my daily work, I lead a large technical team at a thriving e-commerce corporation. When I close my work laptop, I immerse myself in the infinite possibilities of artificial intelligence. I don't limit myself to code – I design advanced Landing Pages, generate multimedia using AI, and freely explore other domains where algorithms meet creativity.",
        p2: "Completing the <1>Google Umiejętności Jutra 2.0</1> (Skills of Tomorrow) training program was a huge inspiration for me and fueled my initial experiments. Today, by combining the capabilities of AntiGravity IDE, Codex, and powerful AI models, I realize a multitude of hobby projects at lightning speed.",
        stackTitle: "My Stack / Skills",
        skills: {
          android: "Android Studio Environment",
          prompting: "AI Prompting (Claude / ChatGPT)",
          antigravity: "AntiGravity Environment (IDE)",
          webdesign: "AI Web Design (Landing Pages)",
          codex: "AI Coding (ChatGPT Codex)",
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
          spacescale: {
            desc: "An interactive educational app presenting 42 orders of magnitude — from a proton (10⁻¹⁵ m) to the observable Universe (≈10²⁷ m). Features a logarithmic 3D journey, an object comparator, and full PWA offline support."
          },
          vibeshift: {
            desc: "Another side effect of experiments with Codex. A modern, interactive landing page dedicated to the philosophy of vibe coding and AI-assisted programming. Built using HTML5, Vanilla JS, GSAP, and Lenis for maximum smoothness."
          },
          allergen: {
            desc: "Hobby AI project. An Android app analyzing ingredients (Open Food Facts) against your personal allergen profile. User data and scan history remain 100% offline."
          },
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
          pcverse: {
            desc: "An interactive, 3D educational guide to PC components. Built in React using Three.js and React Three Fiber. Features a dynamic Exploded View animation, interactive camera focus, and a responsive neon UI."
          },
          topseven: {
            desc: "An educational mobile app for Android (Kotlin & Jetpack Compose) that presents condensed knowledge in interactive lists. Features 147 key facts across 21 thematic categories, an interactive flashcards learning mode, and a built-in glassmorphic glossary for difficult terms."
          },
          sfera: {
            desc: "An interactive 3D sphere of knowledge displaying a collection of facts and images distributed using the Fibonacci sphere algorithm. Built in pure JS with local Three.js and WebGL. This project is a side effect of testing the ChatGPT 5.6 SOL model."
          },
          poznajai: {
            desc: "An interactive, modern guide for beginners starting their journey with artificial intelligence. Built with pure HTML5, CSS3, and Vanilla JS. Features a dynamic scroll-drawn timeline, 3D Tilt card effects, parallax tracking mouse movements, and full dark theme support."
          },
          suno: {
            desc: "Discover my library of music tracks generated entirely using Suno AI. Experiments with sound, vocals, and modern genres."
          },
          budzet: {
            desc: "A modern, lightning-fast offline-first desktop app for personal finance management (Zero-Based Budgeting). Built with Tauri and Rust. Ensures 100% privacy and independence."
          },
          recai: {
            desc: "A private voice recorder for Android (Kotlin & Jetpack Compose). Features background recording (Foreground Service) and local WAV storage, as well as Whisper transcription and automatic GPT-4o mini summaries directly from OpenAI using your own API key securely saved in hardware Keystore."
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
            desc: "I start with a broad perspective. I design the solution architecture, select appropriate AI models, and build a solid technological foundation."
          },
          step2: {
            title: "Vibe Coding & Prompting",
            desc: "I collaborate with flagship models (like Claude, Gemini, or GPT) using advanced prompting to instantly forge ideas into high-quality code and multimedia."
          },
          step3: {
            title: "Integration (AntiGravity & Codex)",
            desc: "I treat the generated components like parts of a precision mechanism. I assemble them into a harmonious whole, working seamlessly across AntiGravity IDE and Codex."
          },
          step4: {
            title: "Polishing & Deployment",
            desc: "The final 20% is digital craftsmanship. I polish the UX/UI, optimize details, and deploy a flawlessly functioning product to production."
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
