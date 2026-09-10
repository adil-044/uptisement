# Uptisement

Public brand site.

**Live:** https://uptisement.com · https://adil-044.github.io/uptisement/

Honest work only: web samples + AI Estimator GitHub. No dead product tiles.

## Tracking

Edit `track-config.js`:

```js
window.UPTI_TRACK = {
  ga4: "G-XXXXXXXXXX",
  metaPixel: "123456789012345",
  clarity: "",           // optional
  linkedinPartner: "",   // optional
  gtm: "",               // optional — if set, use GTM instead of direct GA/Meta
};
```

Events: `page_view`, `book_click`, `generate_lead`, `phone_click`, `email_click`, `site_open`, `estimator_open`, `scroll_depth`. UTMs + gclid/fbclid stick and append to Calendly. Consent banner gates pixels (Accept / Essential only).
