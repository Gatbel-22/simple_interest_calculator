/* style.css
   Design tokens ---------------------------------------------------------
   Palette: a savings ledger — warm paper grounding a deep teal brand color
   and a sunbaked ochre accent. */
:root {
  --paper: #faf6ec;
  --paper-panel: #ffffff;
  --paper-tint: #f1e9d6;
  --ink: #202a22;
  --ink-soft: #5b6a5f;
  --teal: #0b4f45;
  --teal-deep: #073730;
  --teal-tint: #e4efec;
  --ochre: #d98a3d;
  --ochre-soft: #f0b573;
  --sage: #7c9885;
  --line: rgba(32, 42, 34, 0.14);
  --danger: #b3402f;
  --danger-tint: #fbe8e3;

  --font-display: "Spectral", Georgia, serif;
  --font-body: "IBM Plex Sans", "Segoe UI", Tahoma, Arial, sans-serif;
  --font-mono: "IBM Plex Mono", "Courier New", monospace;

  --radius-lg: 18px;
  --radius-md: 12px;
  --radius-sm: 8px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --shadow-panel: 0 20px 45px -24px rgba(15, 25, 18, 0.35);
}

body.dark {
  --paper: #101a15;
  --paper-panel: #16221b;
  --paper-tint: #1c2a21;
  --ink: #eef2ea;
  --ink-soft: #a8b6ac;
  --teal: #3fb99b;
  --teal-deep: #2c8a73;
  --teal-tint: #1c332c;
  --ochre: #e2a15c;
  --ochre-soft: #f3c489;
  --sage: #6f8a78;
  --line: rgba(238, 242, 234, 0.12);
  --danger: #e28674;
  --danger-tint: #35201c;
  --shadow-panel: 0 20px 45px -22px rgba(0, 0, 0, 0.55);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  color-scheme: light;
}
body.dark {
  color-scheme: dark;
}

body {
  position: relative;
  min-height: 100vh;
  font-family: var(--font-body);
  background: var(--paper);
  color: var(--ink);
  padding: clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 4vw, 2rem) 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.35s var(--ease), color 0.35s var(--ease);
}

/* Subtle ledger-paper texture, works in both themes ---------------------- */
.paper-texture {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image: radial-gradient(circle, var(--line) 1px, transparent 1px);
  background-size: 22px 22px;
  transition: opacity 0.35s var(--ease);
}
body.dark .paper-texture { opacity: 0.35; }

/* Theme toggle ------------------------------------------------------------ */
#themeToggle {
  position: fixed;
  top: clamp(0.85rem, 2vw, 1.4rem);
  right: clamp(0.85rem, 2vw, 1.4rem);
  z-index: 20;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--paper-panel);
  color: var(--teal);
  font-size: 1.2rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-panel);
  transition: transform 0.2s var(--ease), background 0.3s var(--ease), color 0.3s var(--ease);
}
#themeToggle:hover { transform: translateY(-2px) rotate(-8deg); }
#themeToggle:focus-visible {
  outline: 2px solid var(--ochre);
  outline-offset: 3px;
}

/* Header ------------------------------------------------------------------ */
.app-header {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  text-align: center;
  margin-bottom: clamp(1.5rem, 3vw, 2.25rem);
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--teal);
  margin-bottom: 0.5rem;
}

h1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.7rem, 4vw, 2.5rem);
  letter-spacing: -0.01em;
  color: var(--ink);
}

.subtitle {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  color: var(--ink-soft);
  margin-top: 0.4rem;
}

/* Sheet / layout ------------------------------------------------------------ */
.sheet {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5vw, 1.5rem);
}

.sheet-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 2.5vw, 1.5rem);
}

@media (min-width: 780px) {
  .sheet-grid { grid-template-columns: 1fr 1.15fr; align-items: start; }
}

.panel {
  background: var(--paper-panel);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: clamp(1.25rem, 2.5vw, 1.75rem);
  box-shadow: var(--shadow-panel);
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  transition: background 0.35s var(--ease), border-color 0.35s var(--ease);
}

.panel h2 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--teal);
  border-bottom: 1px solid var(--line);
  padding-bottom: 0.6rem;
}

/* Fields -------------------------------------------------------------------- */
.field { display: flex; flex-direction: column; gap: 0.45rem; }

.field-label-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--ink-soft);
}

select,
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--line);
  background: var(--paper-tint);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}

select { appearance: none; background-image: linear-gradient(45deg, transparent 50%, var(--ink-soft) 50%), linear-gradient(135deg, var(--ink-soft) 50%, transparent 50%); background-position: calc(100% - 20px) calc(50% - 3px), calc(100% - 15px) calc(50% - 3px); background-size: 5px 5px; background-repeat: no-repeat; padding-right: 2.2rem; cursor: pointer; }

select:focus-visible,
input:focus-visible {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px var(--teal-tint);
}

.amount-field {
  display: flex;
  align-items: stretch;
  border-radius: var(--radius-md);
  border: 1px solid var(--line);
  background: var(--paper-tint);
  overflow: hidden;
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
.amount-field:focus-within {
  border-color: var(--teal);
  box-shadow: 0 0 0 3px var(--teal-tint);
}
.currency-code {
  display: grid;
  place-items: center;
  padding: 0 0.85rem;
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--teal);
  background: var(--teal-tint);
  border-right: 1px solid var(--line);
}
.amount-field input {
  border: none;
  background: transparent;
  flex: 1;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 1.1rem;
}
.amount-field input:focus-visible { outline: none; box-shadow: none; }

output#rate_val {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--ochre);
  font-size: 0.95rem;
}

.rate-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.rate-controls input[type="number"] {
  width: 6.5rem;
  flex-shrink: 0;
  font-family: var(--font-mono);
}
.rate-controls input[type="range"] {
  flex: 1;
  appearance: none;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--teal) 0%, var(--teal) var(--fill, 2%), var(--line) var(--fill, 2%), var(--line) 100%);
}
.rate-controls input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--ochre);
  border: 3px solid var(--paper-panel);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}
.rate-controls input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--ochre);
  border: 3px solid var(--paper-panel);
  cursor: pointer;
}

/* Bank preview --------------------------------------------------------------- */
.bank-preview {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.85rem;
  border-radius: var(--radius-md);
  background: var(--teal-tint);
  border: 1px solid var(--line);
}
.bank-logo-frame {
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  background: var(--paper-panel);
  display: grid;
  place-items: center;
  overflow: hidden;
  border: 1px solid var(--line);
}
.bank-logo-frame img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }
.bank-initial {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--teal);
}
.bank-name { font-weight: 600; font-size: 0.95rem; }
.bank-rate { font-family: var(--font-mono); font-size: 0.85rem; color: var(--ink-soft); }
.bank-rate span { color: var(--ochre); font-weight: 600; }

/* Error message --------------------------------------------------------------- */
.field-error {
  font-size: 0.85rem;
  color: var(--danger);
  background: var(--danger-tint);
  border: 1px solid var(--danger);
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.75rem;
  animation: shake 0.4s var(--ease);
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* Buttons ----------------------------------------------------------------------- */
.actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}
.btn {
  flex: 1 1 160px;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-md);
  border: none;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.15s var(--ease), background 0.2s var(--ease), box-shadow 0.2s var(--ease), opacity 0.2s var(--ease);
}
.btn:hover { transform: translateY(-1px); }
.btn:active { transform: translateY(0); }
.btn:focus-visible { outline: 2px solid var(--ochre); outline-offset: 2px; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.btn-primary {
  background: var(--teal);
  color: var(--paper);
  box-shadow: 0 10px 24px -12px rgba(11, 79, 69, 0.55);
}
.btn-primary:hover:not(:disabled) { background: var(--teal-deep); }

.btn-secondary {
  background: transparent;
  color: var(--ochre);
  border: 1.5px solid var(--ochre);
}
.btn-secondary:hover:not(:disabled) { background: var(--ochre); color: var(--paper-panel); }

/* Passbook result -------------------------------------------------------------- */
.passbook {
  position: relative;
  background: var(--paper-panel);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-panel);
  overflow: hidden;
}

.passbook-perforation {
  height: 16px;
  background:
    radial-gradient(circle at 12px 0, transparent 8px, var(--paper-panel) 8.5px) top / 24px 16px repeat-x,
    var(--teal);
}

.passbook-body {
  padding: clamp(1.25rem, 3vw, 2rem);
}

.passbook-empty {
  color: var(--ink-soft);
  font-family: var(--font-display);
  font-style: italic;
  text-align: center;
  padding: 0.5rem 0;
}

.passbook-result {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
  animation: rise-in 0.4s var(--ease);
}
@media (min-width: 620px) {
  .passbook-result { grid-template-columns: repeat(2, 1fr); }
}

@keyframes rise-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.passbook-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.65rem 0.85rem;
  border-radius: var(--radius-sm);
  background: var(--paper-tint);
  border: 1px dashed var(--line);
}
.passbook-row .label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-soft);
}
.passbook-row .value {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 1rem;
}
.passbook-row.total {
  grid-column: 1 / -1;
  background: var(--teal-tint);
  border: 1px solid var(--teal);
}
.passbook-row.total .value {
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  color: var(--teal);
}
body.dark .passbook-row.total .value { color: var(--teal); }

/* Footer -------------------------------------------------------------------------- */
.app-footer {
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
  font-size: 0.78rem;
  color: var(--ink-soft);
}

/* Reduced motion ---------------------------------------------------------------------- */
@media (prefers-reduced-motion: reduce) {
  .field-error { animation: none; }
  .passbook-result { animation: none; }
  #themeToggle:hover { transform: none; }
  .btn:hover { transform: none; }
}

/* Small screens ------------------------------------------------------------------------- */
@media (max-width: 480px) {
  .actions { flex-direction: column; }
  .btn { flex: 1 1 auto; }
  .bank-preview { flex-wrap: wrap; }
}
