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

## Connect your RSVP form later

The page intentionally does not collect emails or claim to register anyone. Until a form exists, all RSVP buttons open a dialog explaining that sign-ups are not open, with a link to the real **#actuate** channel.

Once you have a form, add this public environment variable to your Vercel project and redeploy:

```dotenv
VITE_RSVP_URL=https://your-real-form-url
```

Only HTTPS URLs activate the redirect. Do not put secrets in `VITE_` variables; they are included in the public browser bundle. For local testing, copy `.env.example` to `.env.local`, set the value, and restart the dev server. All three RSVP buttons use the same handler.

## Edit

- `src/App.tsx`: copy, FAQ, project concepts, original SVG illustrations, and Slack link.
- `src/styles.css`: layout, color palette, responsive breakpoints, and animations.
- `public/favicon.svg`: Actuate mark.
- `index.html`: page title, search/social text metadata.

Fonts are bundled with the site. No external image requests, tracking scripts, API keys, or paid services are required. All board and project illustrations were drawn specifically for this site. The hero terminal is playful illustrative pseudocode, not a hardware tutorial or a connection to a real board.

Motion includes board float and pointer tilt, circuit signals, user-selectable Blink/Connect/Move demos, gentle entrance reveals, and a moving type strip. OS reduced-motion preferences and the footer's Pause motion button are supported. The RSVP dialog uses the native modal dialog for focus management and Escape dismissal; FAQs use native details/summary controls.

## Content and research

Reviewed on September 20, 2026:

- [Actuate's September 3 draft](https://hackclub.slack.com/archives/C0B9KCZU13N/p1788488045279709): ESP32 robotics, sensors, actuators, hardware support, beginner guides, and a template robot arm.
- [Actuate Slack channel](https://hackclub.slack.com/archives/C0C421M2MU0): verified channel destination.
- Other posts in `#ysws-drafts`, including Anti-Code and Servo, informed the clear YS/WS pitch and separate community/RSVP actions. Their copy and artwork were not reused.
- [Breadboard](https://breadboard.hackclub.com/): interactive hardware-led hero, a short exchange explanation, and beginner reassurance.
- [Static](https://static.hackclub.com/): tangible project framing, step-based learning, and practical FAQs.
- [Hack Club YSWS directory](https://ysws.hackclub.com/): the YSWS format and visible draft/program status.

The site's scope follows the owner's newer brief: a broader beginner-friendly ESP32 program, including networking and software-heavy projects. The older Slack draft was narrower and robotics-focused. The $30–50 BOM target comes from the owner's brief, not an approved funding announcement. Dates, funding, eligibility, and final rules remain unconfirmed and are not invented here.

## Validate

```sh
npm run build
npm run preview
```

Before launch, update the FAQ and proposed-program wording once details are approved, connect the real RSVP form, and verify that form's privacy notice and submission flow.
