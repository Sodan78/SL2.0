# Four SharePoint Exercises Integration

## Goal

Add four exercises from the Agile@Scania SharePoint folder to the existing Servant Leadership toolbox. They must look and behave like the current Scania exercises, be discoverable through search and filters, expose their source documents, and be published through the existing GitHub Pages workflow.

## Scope

Add exactly these four exercises:

1. Future Story Exercise
2. Office Reset Workshop
3. From Concern to Influence
4. The Reality and Hope Check-In

The other SharePoint documents identified during discovery are out of scope for this release. Existing exercises, Liberating Structures content, layout, analytics behavior, and filter controls remain unchanged.

## Content Model

Each new exercise will use the existing Scania tool object structure in `app.js`:

- stable `id`
- user-facing `title`
- `sourceId: "scania"`
- leadership `lensId`
- duration in `time`
- concise `summary` and situational `signal`
- `unlocks`, `useWhen`, `steps`, and `facilitation` arrays
- searchable `goodFor` terms and `questions`
- a representative `quote`
- `sourceLabel` and the canonical SharePoint `sourceUrl`

The source documents remain authoritative. Editorial wording may be normalized for clarity and consistency, but the exercises' purpose, questions, sequence, examples, outputs, and timing must not change meaning.

## Exercise Mapping

### Future Story Exercise

- Lens: `empathy-intent`
- Time: `45 min`
- Purpose: Create inspiration and direction by imagining a successful future and translating it into two or three concrete behaviors for today.
- Search themes: future story, inspiration, direction, hope, behavior, change, reflection, leadership.

### Office Reset Workshop

- Lens: `psychological-safety`
- Time: `60 min`
- Purpose: Make office collaboration intentional and create an Office Collaboration Agreement.
- Search themes: office, hybrid work, collaboration, agreements, energy, focus, social connection, psychological safety.

### From Concern to Influence

- Lens: `empathy-intent`
- Time: `45-60 min`
- Purpose: Move a team from frustration and powerlessness toward influence and small concrete actions.
- Search themes: concern, influence, action, agency, change, motivation, clarity, office policy.

### The Reality and Hope Check-In

- Lens: `psychological-safety`
- Time: `30-45 min`
- Purpose: Acknowledge difficult reality, surface support needs, recognize progress, and reconnect with hope.
- Search themes: reality, hope, check-in, psychological safety, change, support, clarity, honesty, reflection.

## User Experience

The new exercises appear as ordinary Servant Leadership cards in the current Finder grid. They participate in:

- free-text search
- Collection filtering under Servant Leadership
- Leadership lens filtering
- Time available filtering
- Preparation filtering
- existing result counts

Opening a card uses the existing detail drawer and exposes the full curated guide plus an `Open Scania source` link to the original SharePoint document. No new page, component, filter, or visual treatment is introduced.

## Data Flow and Failure Behavior

The exercises are compiled into the static `app.js` catalog. The public page does not fetch protected SharePoint content at runtime. This keeps search and filtering available outside the company network and avoids authentication or CORS failures. Only the optional source link requires the reader to have SharePoint access.

If a SharePoint source link later becomes unavailable, the exercise content remains usable on the site; only the external source action is affected.

## Verification

Automated regression coverage will confirm:

- all four titles exist exactly once
- each exercise has the correct source, lens, and duration
- each source URL targets the corresponding SharePoint document
- representative searches return the intended exercise
- lens and time filters include or exclude the exercises correctly
- existing catalog and interaction tests still pass

The local browser smoke test will confirm that all four cards render, the detail drawer opens, and no browser errors are introduced. After pushing to `main`, the GitHub Pages workflow must complete successfully and the public deployment must return the updated content.

## Release

Implementation and tests will be committed together after verification. The commit will be pushed to `origin/main`, triggering the existing GitHub Pages deployment workflow. Deployment status will be checked before completion is reported.
