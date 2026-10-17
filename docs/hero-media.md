# Hero media

The homepage hero cycles through progress, training, and nutrition. Copy and media
slots live in `src/content/journey.ts`.

## Replace the illustrative screens

1. Add approved app/dashboard screenshots to `public/assets/img/journey/`.
2. For each stage, replace `desktop: null` and `mobile: null` with objects:

   ```ts
   desktop: {
     src: '/assets/img/journey/progress-desktop.webp',
     alt: 'لوحة متابعة التقدم في PRO-FIT',
   },
   mobile: {
     src: '/assets/img/journey/progress-mobile.webp',
     alt: 'سجل متابعة التقدم في تطبيق PRO-FIT',
   },
   ```

Screenshots fill the device display using `object-fit: contain`, so their content
is not cropped. Desktop framing is approximately 1.48:1 and mobile framing is
approximately 0.44:1. Supply screenshots without an additional device frame.
Use real progress/nutrition imagery approved for public use, with customer details
removed. Missing or failed images fall back to the illustrative UI.

The public screen caption marks scenes as illustrative while screenshot slots
are empty. Check the screenshot paths before release when filling those slots.
The customer preview takes its visual styling from the supplied admin dashboard;
session counts and appointment details are illustrative, not live customer data.
Devices are separated by a grid gap on desktop and stacked on narrow screens.

## Typeface

The hero currently loads Tajawal and falls back to Cairo. The reference uses
Ping AR + LT, which was not supplied. If licensed webfont files become available,
register them as `Ping AR + LT` with the appropriate weights; the hero font stack
already prefers that family. Update the hero button/tab font shorthands too.

## Interaction

Scenes advance together every 6.5 seconds. Tabs support RTL arrow keys and
Home/End. Choosing a tab pauses autoplay; the play button restarts it. Autoplay
also pauses when the page is hidden, the hero is offscreen, or the preview is
hovered/focused. Reduced-motion preferences disable automatic changes and
decorative transitions.
