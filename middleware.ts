import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Fecha de activación del middleware
const ACTIVATION_DATE = new Date('2025-10-13T00:00:00Z'); // Ayer
const BLOCK_AFTER_DAYS = 366;

export function middleware(_request: NextRequest) {
  const now = new Date();
  const diffTime = now.getTime() - ACTIVATION_DATE.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  // Solo bloquear si han pasado más de 7 días desde la ACTIVATION_DATE
  if (diffDays <= BLOCK_AFTER_DAYS) {
    return NextResponse.next();
  }

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>🔒 Sitio no disponible</title>
      <style>
        :root {
          --bg: #0f172a;
          --text: #f1f5f9;
          --accent: #22d3ee;
        }
        body {
          margin: 0;
          background-color: var(--bg);
          color: var(--text);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-family: 'Segoe UI', sans-serif;
          text-align: center;
          padding: 1rem;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1rem;
          color: var(--accent);
        }
        a {
          color: var(--accent);
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>🚧 Este sitio está temporalmente inactivo</h1>
      <p>Para reactivarlo, comunícate con:</p>
      <p><strong>Team 3 Design & Development</strong></p>
      <p>
        📞 
        <a href="https://api.whatsapp.com/send?phone=525621443228&text=Oye%20visité%20la%20página%20del%20DR.%20Gil%20pero%20no%20me%20deja%20verla." target="_blank">
          +52 5621 443228
        </a>
      </p>
    </body>
    </html>
  `;

  return new Response(html, {
    status: 503,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
