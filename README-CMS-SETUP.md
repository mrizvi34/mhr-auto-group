# MHR Auto Group — CMS Production Version

This version keeps the existing website design, Netlify Forms integration, and thank-you page, while adding an admin dashboard powered by Decap CMS.

## What you can edit at /admin/
- Current monthly deals (add, remove, reorder, enable/disable, feature)
- Monthly payment, due at signing, MSRP, discount, term, mileage, expiration date
- Homepage headline and CTA
- Service fee and pricing copy
- Testimonials / trust statements
- FAQs
- Contact-section text
- Footer legal language

## One-time setup: GitHub → Netlify → Admin

### 1. Create a GitHub repository
1. Create a new repository, e.g. `mhr-auto-group`.
2. Upload ALL files from this folder to the repository root.
3. Make sure the default branch is named `main`.

### 2. Connect the GitHub repo to your existing Netlify site
In Netlify, connect your current MHR Auto Group site to the Git repository and deploy from `main`.

Build settings for this site:
- Build command: leave blank
- Publish directory: `.`

After this, every GitHub commit automatically deploys to Netlify.

### 3. Enable Netlify Identity
In Netlify open your site's Identity settings and enable Netlify Identity. Set registration to **Invite only**.

### 4. Enable Git Gateway
In the Identity configuration, enable **Git Gateway**. This allows the admin dashboard to write approved edits back to your GitHub repository.

### 5. Invite yourself
Invite your email address as an Identity user. Accept the invite and set your password.

### 6. Open the admin dashboard
Visit:
`https://YOUR-DOMAIN.com/admin/`

Log in, open **Website → MHR Auto Group Website**, make your changes, and click **Publish**.

Decap commits the edited `content/site.json` file to GitHub. Netlify then automatically deploys the updated site.

## Monthly workflow
You no longer need to upload ZIP files.

For example, to update August deals:
1. Visit `/admin/`.
2. Change the deal headline and valid-through date.
3. Edit/add/remove deal cards.
4. Click Publish.
5. Netlify deploys the update automatically.

## Files you usually should NOT edit
The visual design remains in:
- `index.html`
- `styles.css`
- `script.js`
- `cms-content.js`

Routine business content lives in `content/site.json` and should be edited through `/admin/`.

## Netlify Forms
The existing `vehicle-inquiry` form remains enabled and still redirects to `thank-you.html` after successful submission.
