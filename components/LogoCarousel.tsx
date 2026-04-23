// components/LogoCarousel.tsx
// Pure CSS infinite logo carousel — no JavaScript animations

import Image from "next/image";

// ─── Configura aquí tus logos ────────────────────────────────────────────────
const LOGOS = [
  { src: "/logos/axa.png",       alt: "Axa" },
  { src: "/logos/gnp.png",       alt: "GNP" },
  { src: "/logos/qualitas.webp", alt: "Quálitas" },
  { src: "/logos/mapfre.png",    alt: "Mapfre" },
  { src: "/logos/allianz.png",   alt: "Allianz" },
  { src: "/logos/hdi.png",       alt: "HDI" },
  { src: "/logos/tona.png",      alt: "Tona" },
  { src: "/logos/bbva.png",      alt: "BBVA" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function LogoCarousel() {
  const track = [...LOGOS, ...LOGOS];

  return (
    <section className="logo-carousel-wrapper">

      {/* ── Título ─────────────────────────────────────────────────────────── */}
      <div className="logo-carousel-header">
        <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2 my-10" 
            style={{ color: "var(--medical-secondary)" }}>
                Nuestras alianzas</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-3 mb-4 mb:md-8" 
            style={{ color: "var(--medical-primary)" }}>
          Trabajamos con las mejores aseguradoras
        </h2>
      </div>

      {/* ── Fade masks ─────────────────────────────────────────────────────── */}
      <div className="logo-carousel-fade-left"  aria-hidden="true" />
      <div className="logo-carousel-fade-right" aria-hidden="true" />

      {/* ── Track ──────────────────────────────────────────────────────────── */}
      <div className="logo-carousel-viewport" aria-label="Aseguradoras con las que trabajamos">
        <ul className="logo-carousel-track" aria-hidden="true">
          {track.map(({ src, alt }, i) => (
            <li key={`${alt}-${i}`} className="logo-carousel-item">
              <Image
                src={src}
                alt={alt}
                width={200}
                height={80}
                className="logo-carousel-img"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* ── Estilos (pure CSS, sin JS) ─────────────────────────────────────── */}
      <style>{`
        .logo-carousel-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding-bottom: 2.5rem;
          background: transparent;
        }

        /* ── Header ── */
        .logo-carousel-header {
          text-align: center;
          margin-bottom: 2.5rem;
          padding: 0 1rem;
        }

        /* ── Viewport ── */
        .logo-carousel-viewport {
          overflow: hidden;
          width: 100%;
        }

        /* ── Track ── */
        .logo-carousel-track {
          display: flex;
          align-items: center;
          gap: 3.5rem;
          width: max-content;
          padding: 0;
          margin: 0;
          list-style: none;
          animation: logo-scroll 30s linear infinite;
        }

        .logo-carousel-wrapper:hover .logo-carousel-track {
          animation-play-state: paused;
        }

        @keyframes logo-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Ítem ── */
        .logo-carousel-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.25rem;
        }

        /* ── Imagen: color medical-secondary (#0891b2 / Cyan 600)
           Técnica CSS: grayscale → sepia → saturate → hue-rotate
           Calibrado para aproximar Cyan 600 exacto. ── */
        .logo-carousel-img {
          object-fit: contain;
          filter:
            grayscale(1)
            sepia(1)
            saturate(4)
            hue-rotate(163deg)
            brightness(0.72);
          transition: filter 0.25s ease, opacity 0.25s ease;
          user-select: none;
          pointer-events: none;
          opacity: 0.85;
        }

        .logo-carousel-item:hover .logo-carousel-img {
          opacity: 1;
          filter:
            grayscale(1)
            sepia(1)
            saturate(5)
            hue-rotate(163deg)
            brightness(0.8);
        }

        /* ── Fade laterales ── */
        .logo-carousel-fade-left,
        .logo-carousel-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 10rem;
          z-index: 10;
          pointer-events: none;
        }

        .logo-carousel-fade-left {
          left: 0;
          background: linear-gradient(to right, var(--carousel-bg, transparent) 0%, transparent 100%);
        }

        .logo-carousel-fade-right {
          right: 0;
          background: linear-gradient(to left, var(--carousel-bg, transparent) 0%, transparent 100%);
        }

        /* ── Accesibilidad: movimiento reducido ── */
        @media (prefers-reduced-motion: reduce) {
          .logo-carousel-track {
            animation: none;
          }
          .logo-carousel-viewport {
            overflow-x: auto;
            scrollbar-width: thin;
          }
        }
      `}</style>
    </section>
  );
}