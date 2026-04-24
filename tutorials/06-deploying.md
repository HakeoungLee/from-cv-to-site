---
title: "6. Deploying"
layout: default
parent: Tutorials
nav_order: 6
---

# 6. Deploying

> Part 6 of the [From CV to Site](../README.md) tutorial series.

## Prerequisites

- Completed [Tutorials 4](04-building-pages.md) and [5](05-cv-automation.md)
- Site runs locally without errors via `pnpm dev`
- Git repository initialized and committed

## What this tutorial produces

A production site deployed to Vercel and, optionally, mapped to a custom domain over HTTPS.

## Deployment stack

| Component | Provider | Cost |
|---|---|---|
| Hosting, build, CDN | Vercel | Free (Hobby tier) |
| Domain registration | Namecheap, Cloudflare, Google Domains, etc. | 10 to 20 USD / year |
| DNS | Vercel, Cloudflare, or your registrar | Free |
| SSL certificate | Vercel (automatic) | Free |

## Pushing the project to GitHub

Create a repository on GitHub, then push the local project.

```bash
# at the project root
git remote add origin git@github.com:YOUR_USERNAME/my-site.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `my-site` with your GitHub username and repository name.

## Creating a Vercel account

1. Visit [vercel.com/signup](https://vercel.com/signup)
2. Sign up using your GitHub account
3. Accept the terms for the Hobby tier

## Connecting GitHub to Vercel

1. From the Vercel dashboard, click **Add New** > **Project**
2. Select **Import Git Repository**
3. Authorize Vercel to access your GitHub account if prompted
4. Select the repository you pushed above
5. Click **Import**

## First deployment

Vercel auto-detects Next.js. Leave the defaults and click **Deploy**.

- Build command: `pnpm build` (auto-detected)
- Output directory: `.next` (auto-detected)
- Install command: `pnpm install` (auto-detected)

The first build typically completes in two to four minutes. Vercel provides a live URL at `your-project.vercel.app` when the build finishes.

## Verifying the deployment

Open the Vercel-provided URL. Check:

- The home page loads
- Navigation links work (`/research`, `/projects`, etc.)
- Fonts and styles render correctly
- Images load

If any page 404s or shows an error, check the **Deployments** tab in Vercel for build logs.

## Continuous deployment

Vercel redeploys automatically whenever you push to `main`. For feature work, push to a branch and Vercel will provide a preview URL for that branch without affecting production.

```bash
git checkout -b update-publications
# make changes
git commit -am "Update publications"
git push -u origin update-publications
# preview URL appears in the Vercel dashboard
```

## Acquiring a custom domain

Register a domain at any registrar. Common choices:

- [Namecheap](https://www.namecheap.com)
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)
- [Porkbun](https://porkbun.com)

Expected annual cost: 10 to 20 USD for common TLDs (`.com`, `.org`, `.net`). Some academic TLDs (`.edu.xx`, `.ac.xx`) are restricted.

## Connecting the custom domain

1. In Vercel, open your project > **Settings** > **Domains**
2. Enter your domain (e.g., `yourlab.com`) and click **Add**
3. Vercel displays the required DNS records

You will typically see two options:

- **Recommended:** change nameservers at your registrar to Vercel's nameservers
- **Alternative:** keep your registrar's nameservers and add `A` and `CNAME` records manually

For most users, adding DNS records at the registrar is sufficient. Vercel typically instructs you to add:

- An `A` record for `@` pointing to `76.76.21.21`
- A `CNAME` record for `www` pointing to `cname.vercel-dns.com`

Exact values are provided by Vercel; follow the values displayed in the dashboard, not the examples above.

## Verifying DNS

DNS propagation usually completes within a few minutes. Vercel's Domains tab displays a green check when records are detected.

Verify from the command line:

```bash
dig yourlab.com +short
# Expected: 76.76.21.21 (or Vercel's current IP)
```

## SSL certificate

Vercel provisions and renews SSL certificates automatically once DNS resolves. No configuration is required. HTTPS should be available within minutes of DNS propagation.

## Setting up redirects

Decide on a canonical version of your URL (`www` or non-`www`) and redirect the other to it.

In `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.yourlab.com" }],
        destination: "https://yourlab.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

Commit and push. Vercel rebuilds and applies the redirect.

## Environment variables

Environment variables are set per project in Vercel under **Settings** > **Environment Variables**. Add them separately for Production, Preview, and Development environments.

Common variables for academic sites:

- `NEXT_PUBLIC_SITE_URL`: canonical domain (e.g., `https://yourlab.com`)
- `CONTACT_EMAIL`: address used in contact forms, if applicable

Access variables in your code:

```ts
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
```

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Others remain server-only.

## Production checklist

Before announcing the site:

- All internal links resolve
- Meta tags are set per route (`title`, `description`)
- A favicon exists at `src/app/favicon.ico`
- The `public/` directory is free of unused files
- Publications render and link correctly
- The contact page lists accurate affiliations
- HTTPS loads without browser warnings
- The site appears correctly at mobile, tablet, and desktop widths

## Rolling back a bad deployment

From the Vercel dashboard, open **Deployments**, select a previous successful deployment, and click **Promote to Production**. This reverts the live site without code changes.

## Adding Vercel Analytics

Vercel provides built-in analytics integrated with the deployment platform. No cookies are set, so no consent banner is required.

### Installation

Run from the Next.js project directory:

```bash
pnpm add @vercel/analytics
```

### Configuration

Edit `src/app/layout.tsx`:

```tsx
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Enabling the dashboard

1. Visit [vercel.com](https://vercel.com) and select the project
2. Click the **Analytics** tab
3. Click **Enable Analytics**
4. Select the free plan

### Commit and deploy

```bash
git add .
git commit -m "Add Vercel Analytics"
git push
```

Data begins collecting on the next deployment. The Vercel dashboard populates within 24 hours.

### Free tier limits

- 2,500 events per month
- Web Vitals (Core Web Vitals) included
- No retention limit for aggregated metrics

### What Vercel Analytics tracks

- Page views
- Unique visitors
- Top pages
- Referrers
- Countries
- Device types
- Operating systems and browsers

## Adding Google Analytics (optional)

Use Google Analytics when you need more detailed analytics or integration with Google Search Console. Google Analytics uses cookies and may require a consent banner depending on visitor jurisdiction.

### Getting a Measurement ID

1. Visit [analytics.google.com](https://analytics.google.com)
2. Create an account and property
3. Set up a web data stream for the domain
4. Copy the Measurement ID (format: `G-XXXXXXXXXX`)

### Installation

```bash
pnpm add @next/third-parties
```

### Configuration

Edit `src/app/layout.tsx`:

```tsx
import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  );
}
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID. For production, store the ID in an environment variable rather than hard-coding it:

```tsx
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
```

Set `NEXT_PUBLIC_GA_ID` in the Vercel environment variables dashboard.

### Verification

After deployment, real-time reports appear immediately in the Google Analytics dashboard. Aggregate reports populate within 24 to 48 hours.

## Adding Google Search Console

Google Search Console reports how the site appears in Google search results. It is recommended for any public-facing academic site.

### Setup

1. Visit [search.google.com/search-console](https://search.google.com/search-console)
2. Add a property for the domain
3. Verify ownership via DNS TXT record (add the record in Vercel's or Cloudflare's DNS settings)
4. Submit the sitemap URL

### Generating a sitemap

Next.js generates a sitemap automatically when you define one under the App Router. Create `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

const BASE_URL = "https://yourdomain.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/research", "/projects", "/teaching", "/news", "/contact"];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
```

Replace `BASE_URL` with your canonical domain. The sitemap is served at `https://yourdomain.com/sitemap.xml`.

Submit that URL in Search Console under **Sitemaps**.

## Privacy considerations

| Service | Cookies | Consent banner | Notes |
|---|---|---|---|
| Vercel Analytics | None | Not required | GDPR/CCPA compliant by default |
| Google Analytics | Yes | Often required | GA4 anonymizes IPs by default |
| Cloudflare Web Analytics | None | Not required | Free alternative to Vercel |
| Plausible | None | Not required | Paid; hosted in the EU |

For visitors in the EU, UK, or California, consider:

- IP anonymization (enabled by default in GA4)
- A consent banner (Cookiebot, CookieYes, or a custom implementation)
- A clear privacy policy page linked in the footer

## Interpreting analytics data

### Metrics that matter for academic sites

- **Top pages**: which research themes or outputs attract readers
- **Referrers**: where visitors arrive from (Google Scholar, social media, institutional pages)
- **Countries**: the international reach of your work
- **Growth over time**: useful baseline for grant applications and annual reviews

### Data for grant applications and reporting

Analytics can supply concrete numbers for annual reports:

- Total unique visitors over the reporting period
- Page views, as a proxy for research dissemination
- Geographic distribution of readers
- Year-over-year growth percentage

Treat these as supplementary evidence of public engagement, not as the primary measure of scholarly impact.

## Next tutorial

[Tutorial 7: Maintaining & Extending](07-maintaining.md)

---

*Questions or feedback: open an issue on the [repository](https://github.com/HakeoungLee/from-cv-to-site) or email [hannahlee@virginia.edu](mailto:hannahlee@virginia.edu).*

[Back to README](../README.md)
