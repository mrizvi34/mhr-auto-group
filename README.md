# MHR Auto Group — Production Website

## Included
- Responsive premium one-page site
- Integrated July 2026 Toyota deals section
- Claim Deal buttons that prefill the inquiry form
- Netlify-compatible lead form
- Mobile and desktop layouts

## Deploy to Netlify
1. Extract this ZIP.
2. Drag the `mhr-auto-group` folder into Netlify Deploys.
3. After deployment, open Netlify > Forms and confirm `vehicle-inquiry` appears.
4. Configure form notification emails in Netlify.
5. Connect your custom domain in Domain Management.

## Deploy elsewhere
Upload `index.html`, `styles.css`, and `script.js` to the public/root directory. The website will display normally, but the inquiry form requires a form backend. Netlify Forms is already configured; on another host, connect the form to Formspree, HubSpot, or your preferred CRM.

## Before going live
- Add a business email and phone number.
- Confirm all deal numbers and eligibility requirements with the selling dealer.
- Replace or expand the legal disclosure if counsel or the dealer requires specific advertising language.
- Update or remove expired deals after July 31, 2026.

FORM SUBMISSION FIX
- The inquiry form submits to Netlify Forms and redirects to /thank-you.html.
- Keep thank-you.html, _redirects, and netlify.toml in the same root directory as index.html.
- When uploading manually to Netlify, upload this ZIP as provided; its website files are at the ZIP root.
- In Netlify, open Forms and confirm that "vehicle-inquiry" appears after deployment.
