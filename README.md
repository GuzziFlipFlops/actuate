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
- `src/BoardPicker.tsx`: six-board horizontal comparison, chip descriptions, source links, and relative cost tiers.
- `src/board-picker.css`: comparison layout and tutorial card interactions.
- `src/styles.css`: layout, color palette, responsive breakpoints, and animations.
- `public/favicon.svg`: Actuate mark.
- `index.html`: page title, search/social text metadata.

Fonts are bundled with the site. No external image requests, tracking scripts, API keys, or paid services are required. All board and project illustrations were drawn specifically for this site. The hero terminal is playful illustrative pseudocode, not a hardware tutorial or a connection to a real board.

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

### Board picker and tutorial placeholders

Six project cards, the four planned beginner lessons, and each board's Getting started button open a keyboard-accessible “Tutorial not made yet” dialog with the same verified Slack link. RSVP actions go directly to the live form and do not open the tutorial popup.

The board picker supports touch/trackpad scrolling, previous/next buttons, direct board selection, and Left/Right/Home/End keys when the slide area is focused. It does not advance automatically. Offscreen slides are inert to keep keyboard focus out of hidden content.

The `$` to `$$$$` display is a rough editorial comparison of board costs, not a quotation or a price range. Exact retail prices are deliberately not shown. Variants, sellers, memory, accessories, shipping, and taxes can change the relative cost. No board is promised as an Actuate reward.

Specs and representative board listings checked September 20, 2026:

- P4: [Espressif specs](https://www.espressif.com/en/products/socs/esp32-p4), [Waveshare P4-NANO](https://www.waveshare.com/esp32-p4-nano.htm). Up to 400 MHz refers to the chip family; verify board revision. Wireless requires a companion chip.
- C6: [Espressif specs](https://www.espressif.com/en/products/socs/esp32-c6), [Waveshare C6-Zero](https://www.waveshare.com/esp32-c6-zero.htm?sku=26976). Wi-Fi 6 is 2.4 GHz.
- C3 SuperMini: [Espressif C3 specs](https://www.espressif.com/en/products/socs/esp32-c3), [ProtoSupplies board](https://protosupplies.com/product/esp32c3-supermini/). SuperMini board implementations vary.
- S3: [Espressif specs](https://www.espressif.com/en/products/socs/esp32-s3), [Seeed XIAO ESP32S3](https://www.seeedstudio.com/XIAO-ESP32S3-p-5627.html).
- WROOM-32: [DFRobot module specs](https://www.dfrobot.com/product-1559.html), [FireBeetle development board](https://www.dfrobot.com/product-1590.html). Distinguish the bare module from a beginner-friendly development board.
- CAM: [DFRobot archived board specifications](https://www.dfrobot.com/product-1879.html), [diymore board listing](https://www.diymore.cc/products/esp32-cam-wifi-wireless-module-esp32-serial-to-wifi-esp32-cam-spi-flash-bluetooth-development-board-with-ov2640-camera-module). The DFRobot page is a specifications reference for a discontinued product, not a current purchase recommendation.

## Validate

```sh
npm run build
npm run preview
```

Before launch, update the FAQ and proposed-program wording once details are approved, and check the external form's submission flow.
