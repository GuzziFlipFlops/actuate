# Actuate

A custom ESP32 YSWS landing page built with React, TypeScript, and Vite. Ready to import into Vercel.

## Run locally

Requires Node.js 22.12+ (tested with Node 24).

```sh
npm ci
npm run dev
```

## Deploy on Vercel

1. Commit and push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, then import `GuzziFlipFlops/actuate`.
3. Keep the repository root as the root directory. The included `vercel.json` selects Vite, `npm run build`, and `dist` automatically.
4. Deploy. No environment variables or database are needed for the current pre-launch page.

## RSVP destination

All three RSVP calls to action open the live [Actuate RSVP form](https://rsvp.hackclub.community/actuate) in a new tab. The page itself does not collect personal information. All community links point to the verified #actuate Slack channel.

To change the destination later, set the optional public environment variable in Vercel and redeploy:

```dotenv
VITE_RSVP_URL=https://your-new-form-url
```

The built-in Actuate URL is used when the variable is empty or is not HTTPS. Do not put secrets in VITE_ variables; they are included in the browser bundle. For local overrides, use .env.local and restart the dev server.

## Edit

- `src/App.tsx`: copy, FAQ, project concepts, original SVG illustrations, and Slack link.
- `src/styles.css`: layout, color palette, responsive breakpoints, and animations.
- `public/favicon.svg`: Actuate mark.
- `index.html`: page title, search/social text metadata.

Fonts are bundled with the site. No external image requests, tracking scripts, API keys, or paid services are required. The board and project illustrations were drawn for this site. The Hack Club flag is the official asset from https://hackclub.com/brand, served locally from public/hackclub-flag.svg. The hero terminal shows illustrative code snippets; it is not connected to real hardware.

Motion includes board float and pointer tilt, circuit signals, user-selectable Blink/Connect/Move demos, gentle entrance reveals, and a moving type strip. OS reduced-motion preferences and the footer's Pause motion button are supported. The tutorial popup uses the native modal dialog for focus management and Escape dismissal; FAQs use native details/summary controls.

## Content and research

Reviewed on September 20, 2026:

- [Actuate's September 3 draft](https://hackclub.slack.com/archives/C0B9KCZU13N/p1788488045279709): ESP32 robotics, sensors, actuators, hardware support, beginner guides, and a template robot arm.
- [Actuate Slack channel](https://hackclub.slack.com/archives/C0C421M2MU0): verified channel destination.
- Other posts in `#ysws-drafts`, including Anti-Code and Servo, informed the clear YS/WS pitch and separate community/RSVP actions. Their copy and artwork were not reused.
- [Breadboard](https://breadboard.hackclub.com/): interactive hardware-led hero, a short exchange explanation, and beginner reassurance.
- [Static](https://static.hackclub.com/): tangible project framing, step-based learning, and practical FAQs.
- [Hack Club YSWS directory](https://ysws.hackclub.com/): the YSWS format and visible draft/program status.

The site's scope follows the owner's newer brief: a broader beginner-friendly ESP32 program, including networking and software-heavy projects. The older Slack draft was narrower and robotics-focused. The $30–50 BOM target comes from the owner's brief, not an approved funding announcement. Dates, funding, eligibility, and final rules remain unconfirmed and are not invented here.

The $30–50 target applies only to hardware-heavy projects; software-heavy projects have no universal spending requirement. The FAQ explains that the ESP32 must play a meaningful role in the project.

### Tutorial placeholders

The six project examples and four guide buttons open a “Tutorial not made yet” dialog linking to #actuate. RSVP links open the live form.

## Previous version

The version before the copy and layout simplification is saved locally as the annotated Git tag `backup/before-copy-simplification-2026-09-20` (commit `bf74b75`). It includes the ESP32 picker. The tag has not been pushed.

To inspect it without changing your working files:

```sh
git show backup/before-copy-simplification-2026-09-20:src/App.tsx
```

To open a separate copy:

```sh
git worktree add ../actuate-previous backup/before-copy-simplification-2026-09-20
```

## Validate

```sh
npm run build
npm run preview
```

Before launch, update the FAQ and support details once they are confirmed, and check the external form's submission flow.
