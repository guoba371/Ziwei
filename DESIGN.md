---
name: "星系角色图鉴"
description: "A light-paper, cobalt-blue observation handbook for an original entertainment questionnaire."
colors:
  paper: "#f6f7f2"
  surface: "#fff"
  ink: "#202b45"
  muted: "#59677d"
  blue: "#304fc5"
  blue-dark: "#233b9b"
  blue-pale: "#eaf0ff"
  line: "#dbe0e9"
  dark-card: "#22356b"
  answer-surface: "#ffffff80"
  disabled-ink: "#526178"
  disabled-surface: "#d7ddeb"
typography:
  display:
    fontFamily: '"Noto Serif SC Variable", "Songti SC", serif'
    fontSize: "clamp(34px, 4.2vw, 60px)"
    fontWeight: 600
    lineHeight: 1.42
    letterSpacing: "-.045em"
  headline:
    fontFamily: '"Noto Serif SC Variable", "Songti SC", serif'
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.7
  title:
    fontFamily: '"Noto Serif SC Variable", "Songti SC", serif'
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.6
  body:
    fontFamily: '"Microsoft YaHei", "PingFang SC", sans-serif'
    lineHeight: 1.85
  action:
    fontFamily: '"Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "15px"
    fontWeight: 500
  option:
    fontFamily: '"Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "15px"
    lineHeight: 1.8
  label:
    fontFamily: '"Microsoft YaHei", "PingFang SC", sans-serif'
    fontSize: "12px"
rounded:
  card: "16px"
  choice: "12px"
  pill: "999px"
  status: "8px"
  circle: "50%"
spacing:
  compact: "8px"
  control: "12px"
  related: "16px"
  group: "24px"
  section-gap: "32px"
  section-offset: "48px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.surface}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "14px 27px"
  button-primary-hover:
    backgroundColor: "{colors.blue-dark}"
  button-primary-disabled:
    backgroundColor: "{colors.disabled-surface}"
    textColor: "{colors.disabled-ink}"
  button-text:
    textColor: "{colors.muted}"
    padding: "8px 0"
  button-text-hover:
    textColor: "{colors.blue}"
  answer-option:
    backgroundColor: "{colors.answer-surface}"
    textColor: "{colors.ink}"
    typography: "{typography.option}"
    rounded: "{rounded.choice}"
    padding: "17px 20px"
  answer-option-chosen:
    backgroundColor: "{colors.blue-pale}"
    textColor: "{colors.blue-dark}"
  page-navigation:
    textColor: "{colors.ink}"
  trait-chip:
    textColor: "{colors.blue}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  collectible-card:
    textColor: "{colors.blue}"
    rounded: "{rounded.card}"
    padding: "22px 25px 18px"
    width: "min(310px, calc(100% - 48px))"
  result-portrait:
    textColor: "{colors.blue}"
    rounded: "{rounded.card}"
    padding: "28px 32px 24px"
  catalog-item:
    textColor: "{colors.muted}"
    rounded: "{rounded.choice}"
    padding: "12px 6px 16px"
  catalog-item-selected:
    backgroundColor: "{colors.blue-pale}"
    textColor: "{colors.blue}"
  question-progress:
    backgroundColor: "{colors.line}"
    textColor: "{colors.blue}"
    height: "3px"
    width: "100%"
  unlock-status:
    backgroundColor: "{colors.blue-pale}"
    textColor: "{colors.blue}"
    rounded: "{rounded.status}"
    padding: "13px"
---

# Design System: 星系角色图鉴

## Overview

**Creative North Star: "蓝色观测手册"**

The blue observation handbook uses light paper, cobalt notation and Chinese serif headings to make everyday self-observation feel calm, concrete and non-judgmental. Preserve the existing direction: geometric star marks are an original visual language, not astronomical observations, birth charts or predictions.

Reading and answering remain quieter than the collectible artwork. The homepage pairs a two-line title with a compact tilted sample card; the questionnaire gives each question a clear reading column; the result pairs a role portrait with explanatory text. The role catalog has its own adjacent live preview so selection never requires scrolling back to the hero.

**Key Characteristics:**
- Light-paper ground with cobalt actions and geometric star notation.
- Chinese serif headings paired with practical system-sans reading text.
- Flat reading surfaces, fine dividers and one lifted collectible sample card.
- Native answer controls, visible focus and a reduced-motion override.

**2026-10-24 UI refinement:** Redesign-preserve, with design variance 6, motion intensity 4 and visual density 4. Keep the brand, original artwork, navigation anchors, questionnaire and all legal/privacy copy. The approved paper/cobalt direction remains the light theme; a system-preference dark theme uses the same semantic tokens. There is no theme preference storage. Screenshots and browser/audit outputs are in `artifacts/ui-*`; verification limits are recorded in `README.md`. These checks are not accessibility certification or commercial validation.

Frontmatter holds the light-theme primitives. `src/styles.css` is authoritative for responsive values and both theme palettes. Spacing/radius names are documentation labels, not CSS variables. `.impeccable/design.json` remains the earlier static light-theme preview snapshot, not the current live component specification.

## Colors

Cool paper and blue-gray text keep cobalt purposeful in light mode. `prefers-color-scheme: dark` switches the whole interface together, including controls, gradients and feedback, rather than inverting isolated sections.

### Primary
- **Cobalt notation** (`blue`): primary actions, star marks, progress, focus outlines and selected-control details.
- **Deep cobalt** (`blue-dark`): enabled primary-action hover and selected-answer text.
- **Pale blue** (`blue-pale`): selected choices, selected catalog items, the demo-unlock status and the exported card's inner field.
- **Deep blue card back** (`--card-back`): the decorative rear card, with a distinct dark-mode value.

### Neutral
- **Light paper** (`paper`): page ground, export surround and the border around result-axis markers.
- **Surface** (`surface`): a theme-aware surface token. Primary text on filled actions uses `--button-ink`, white in light mode and deep ink in dark mode.
- **Blue-black ink** (`ink`): primary reading text; **muted blue-gray** (`muted`): descriptions, annotations and supporting labels.
- **Cool rule** (`line`): section dividers, unselected choice borders and progress tracks.
- **Answer paper** (`answer-surface`): translucent white in light mode, an opaque blue-gray surface in dark mode.
- **Disabled ink / disabled surface** (`disabled-ink`, `disabled-surface`): disabled primary actions. Text actions instead reduce opacity.

**The Cobalt Notation Rule.** Keep primary action, selection, focus and star notation on the same blue family within each theme. Dark mode uses a pale blue accent for contrast, not a new brand color.

Gradient stops, card borders, axis tracks, disabled controls and errors have semantic CSS variables. Light/dark values are defined together in `src/styles.css`. The exported PNG intentionally keeps its existing light-paper palette regardless of the browser theme.

## Typography

**Display Font:** `"Noto Serif SC Variable", "Songti SC", serif`, loaded from the local single-file subset in `public/fonts/noto-serif-sc-subset.woff2` via `src/fonts.css`. The subset covers the exact characters used by the current copy plus printable ASCII, keeps the variable weight range and is preloaded in `index.html`.

**Body Font:** `"Microsoft YaHei", "PingFang SC", sans-serif`. There is no separate mono face or externally hosted font request in that import.

**Character:** Serif headings give the handbook its printed, collectible character. Sans-serif instructions, controls and annotations keep the questionnaire practical. Preserve the complete fallback stacks rather than treating a particular installed system font as guaranteed.

### Hierarchy
- **Display** (`display`): the desktop hero title; tablet and mobile overrides are recorded in Layout.
- **Headline** (`headline`): the question heading, not a universal heading size.
- **Title** (`title`): the section-heading pattern. Result-reading titles use their own size (29px) and line height (1.6).
- **Body** (`body`): the inherited family and default paragraph leading. Hero descriptions use (16px, line height 1.95), result descriptions (15px, line height 2), and reading articles (14px, line height 2, max-width 60ch). Legal and privacy annotations remain at least 12px.
- **Action / option / label** (`action`, `option`, `label`): primary-button text, answer text and small card/trait annotations respectively; these are extracted roles, not a mathematical type scale.
- **Role names:** hero-card titles use (36px, line height 1.5); result-portrait titles use (48px). English role captions use (11px, letter spacing .12em). Question and card indices use tabular numerals.

**The Heading Pairing Rule.** Keep the serif family for handbook headings and role names; retain the sans-serif family for instructions, choices and action labels.

## Layout

The main page width is `min(1200px, calc(100% - 96px))`, centered, with a body minimum width (320px). The header is 80px high. Base desktop grids are asymmetric: hero (1.2fr / 1fr, gap 40px), about section (.85fr / 1.15fr, gap 88px), and result (.9fr / 1.1fr, gap 70px). The questionnaire retains its illustration rail and question column. The catalog uses four columns and two rows beside a local detail panel (1.65fr / 1fr, gap 32px); full reading has two columns.

The frontmatter spacing entries are recurring measurements, not an enforced scale: text-action gaps (8px), button/answer-list gaps (12px), choice and action spacing (16px), grouped content (24px), navigation/save-section gaps (32px), and larger section offsets (48px). Keep component-specific measurements where they already exist. Container width deductions (64px and 96px) are not general spacing steps.

### Responsive Rules
- **At min-width 1440px:** hero block padding becomes (48px 40px); artwork gains a right margin (12px).
- **At max-width 1023px:** page width becomes `calc(100% - 64px)`; hero type becomes `clamp(34px, 4.2vw, 44px)`; catalog split becomes 1.5fr / 1fr. The quiz rail becomes (170px) with gap (35px); result gap becomes (35px).
- **At max-width 767px:** page width becomes `calc(100% - 40px)`; header minimum height becomes (72px); existing header navigation and quiz-rail hiding are retained. Hero, catalog split, about, result and reading layouts become one column. The catalog retains four columns with its detail directly below. Hero type becomes `clamp(32px, 10.4vw, 44px)` with line height (1.4); question type becomes (24px), portrait title (43px). Save actions stack and stretch.

Mobile keeps the hero copy and action ahead of the sample card. These are implemented layout rules, not a claim that every viewport or touch target has been verified.

## Elevation & Depth

Reading sections remain flat, separated by thin rules and tonal changes. The sample uses theme-aware gradient stops, a front-card tilt (-5deg desktop, -4deg mobile), and a rear-card tilt (9deg desktop, 7deg mobile). A masked CSS grid supplies a restrained observation-paper background. The result portrait has a theme-aware gradient and border without a shadow.

### Shadow Vocabulary
- **Collectible lift:** `6px 18px 44px var(--card-shadow)`, the only authored box shadow, applied to the front sample card.

**The Single Lift Rule.** Reserve the blue-tinted shadow for the collectible sample card; separate reading sections and controls with their existing borders and fills.

## Shapes

Cards use `rounded.card`; answer choices and catalog items use `rounded.choice`; primary actions and trait labels use `rounded.pill`. `rounded.status` belongs to the demo-unlock status message, not utility buttons. Text actions have no authored corner-radius treatment. Circles frame the brand mark and option letters; thin orbital rings and connected points define the star artwork.

Most separators and container borders are (1px). Progress has its own small radius (2px); result-axis tracks use (99px). These local details do not expand the general corner vocabulary. The SVG viewBox is (0 0 200 200), with faint orbital strokes (.7), a stronger connecting line (1.4), and one emphasized node; all follow `currentColor`.

## Components

### Buttons

Confident filled actions, quiet text utilities. Primary actions use `button-primary`, a minimum height (52px), gap (12px), and a transparent border (1px). Hover changes the fill and lifts the button (-2px); active returns it with a .98 press scale. Labels stay on one line. Disabled actions suppress movement. The hero action has separate minimum heights (56px desktop, 54px mobile).

Text actions use `button-text`, transparent/no background, no border, size (14px), minimum height (44px) and gap (8px); hover changes text to cobalt, while disabled opacity is (.45). Do not invent an outlined secondary-button variant.

Interactive elements receive the authored cobalt focus outline (2px); buttons, links and disclosure summaries have outline offset (5px). Programmatically focused headings and the main-content target explicitly suppress the outline. This records implementation, not an accessibility audit.

### Inputs / Fields

Answer rows are labels around native radio inputs inside a fieldset, not text-entry fields. `answer-option` has a minimum height (68px), a line-colored border (1px), and gap (16px). Hover changes the border to the blue token; selection uses `answer-option-chosen`, a blue border, a filled circular letter and a visible check icon. Focus within the row adds a blue outline (2px) at offset (3px).

At the mobile breakpoint, rows use minimum height (71px), padding (14px), gap (11px) and text (14px). The radio remains in the document but is visually reduced to (1px) and opacity (0). No text-field, validation-error-field or disabled-answer style exists. Export failures use the theme-aware error token.

### Navigation

The home-only header navigation has two text links, size (14px), gap (32px), and vertical padding (12px). Hover changes text to cobalt; focus uses the shared outline. There is no authored active-link treatment. Mobile hides these links; the brand button remains the return-home control. Do not infer a drawer, hamburger or route-tab system.

### Chips

Result traits are non-interactive outlined labels using `trait-chip`, the card-border token, and a wrapping, centered row with gap (9px). They are descriptions, not filter chips, and have no hover or selected state.

### Cards / Containers

The sample card uses `collectible-card`, the single lift, and the exact source gradient. It contains a role index, star mark, serif role name, English caption, quote, traits and the explicit sample-not-result note. Its default example is the source's initial Explorer preview, not an observed user result.

The result portrait uses `result-portrait`, the card-border token, centered content and a flat gradient surface. Reading details remain border-separated articles, not additional elevated cards. The blue-tinted unlock-status message is a local demo confirmation; it does not represent checkout, a purchase or a payment integration.

### Role Catalog and Progress

Catalog items are buttons with `aria-pressed` and `aria-controls="catalog-detail"`, not scored result tiles. Selection and hover use the theme's blue border and pale-blue surface. The adjacent detail updates its name, emblem, quote and traits in a polite live region without moving focus or scroll. The hero sample stays synchronized, but only the local detail is announced. Both are explicitly labeled as examples, not results; questionnaire answers are unchanged.

Question progress uses the native progress element with `question-progress` and cobalt fill; its value comes from answered questions out of twelve. Result-axis meters show the current questionnaire's raw tendency scores, not probabilities, performance metrics or validated personality measures.

### Motion

The hero copy enters once over .6s from 14px and opacity .45; the artwork enters over .8s from 20px and opacity .3. Both use `cubic-bezier(.16, 1, .3, 1)`. The local catalog detail enters over .3s on selection to communicate the state change. Primary/answer transitions use .18s and catalog transitions .2s. There is no continuous orbit, scroll hijack or simulated analysis timer.

`prefers-reduced-motion: reduce` disables animations and transitions and changes smooth scrolling to automatic scrolling. The sidecar records these values; static component previews do not reproduce screen transitions or application state management.

### Exported Result Card

`src/export-card.ts` draws a (1080 x 1440) PNG locally: light-paper surround, pale-blue inner field, cobalt border and geometric emblem, role name, English caption, quote, traits and entertainment disclaimer. It uses the same core palette but canvas-specific type sizes, including the serif role name (600, 100px). This is not a screenshot of the DOM card. Keep concrete answers, personal information and shop QR codes out of the artwork.

### Sidecar Preview Boundaries

The eight preview components cover the two button variants, a native answer row, home navigation, a trait label, the collectible sample, a catalog item and question progress. Their copy and SVG geometry come from the source. Classes are prefixed with `ds-`; custom properties retain source-valued fallbacks for an isolated panel. The radio preview maps the app's selected class styling to native checked-state selectors so it needs no React runtime. Catalog and navigation previews do not implement the app's state changes. Font loading still belongs to the host; previews retain the real fallback stacks. The sidecar itself has not been visually inspected.

## Do's and Don'ts

### Do:
- Do preserve the paper/cobalt observation-handbook direction and its coherent system dark-mode counterpart.
- Do keep serif role names and headings paired with sans-serif reading and controls.
- Do retain native radio semantics, visible control focus and reduced-motion behavior.
- Do keep sample-card labels and entertainment disclaimers visible in their existing contexts.
- Do document source values and distinguish static component previews from verified application behavior.

### Don't:
- Don't turn decorative star notation into astronomy, birth-chart or scientific-assessment claims.
- Don't spread the sample card's shadow or dark rear-card treatment across reading surfaces.
- Don't add continuous orbit animation or a fake analysis timer.
- Don't present role scores as probabilities, validated measurements or commercial performance evidence.
- Don't imply that demo unlock is a real purchase, or add personal answers or shop QR codes to result cards.
