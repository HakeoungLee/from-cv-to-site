---
title: "1. Why Build Your Own Site?"
layout: single
permalink: /tutorials/01-why/
sidebar:
  nav: "tutorials"
toc: true
toc_label: "On this page"
toc_sticky: true
---

# 1. Why Build Your Own Site?

> Part 1 of the [From CV to Site](../README.md) tutorial series.

## What this guide produces

By the end of this series, you will have a personal academic website deployed at a custom domain, built with Next.js, hosted on Vercel, and maintained through a Word-based CV workflow. The site you will produce is equivalent in structure to [MLTI Lab](https://mltilab.com).

## Who should follow this guide

This guide assumes you are one of the following:

- Faculty, post-docs, Ph.D. students, or educators who want a personal academic website
- Readers with no prior web development experience
- Readers comfortable editing documents, copying commands into a terminal, and making design decisions

No programming background is assumed. You will install tools and run commands as instructed.

## What institutional profile pages offer

Most universities provide a faculty profile page at a URL owned by the institution. These pages typically include:

- A standardized layout shared across the department
- A short biography, managed through a CMS or HR system
- A publications list, often updated manually on request
- Institutional contact information
- Hosting and maintenance handled by the institution

## What a personal site adds

A personal academic site is hosted at a domain you control and includes content you define. Common additions over an institutional profile:

- Arbitrary page structure (research, teaching, projects, news, contact, etc.)
- Full control over typography, layout, and visual identity
- Fast, self-service updates without opening a ticket
- Portable URLs that do not break when you change institutions
- Customizable publication groupings (by theme, by method, by collaborator)
- Integration of external content (talks, media coverage, teaching materials)
- SEO and citation metadata you control

## Requirements

**Time**

- Initial build: several evenings or a long weekend, depending on familiarity with the tools
- Ongoing maintenance: editing a Word document and running an update script when your CV changes

**Cost**

- Hosting: free on Vercel's Hobby tier for personal academic sites
- Domain: approximately 10 to 20 USD per year through a domain registrar
- Tooling: free (Node.js, Git, GitHub, Claude.ai free tier or paid plan)

**Technical prerequisites**

- macOS, Linux, or Windows with WSL
- A working text editor (VS Code is recommended but optional)
- A GitHub account
- Access to [claude.ai](https://claude.ai) and optionally Claude Code

## Tradeoffs to consider

**Benefits**

- Full content and design control
- Portable across career moves
- Lower marginal cost per update after initial setup
- Version history and rollback through Git
- Deployment previews before content goes public

**Costs**

- Initial setup time
- Responsibility for your own maintenance, including dependency updates
- Upfront design decisions that an institutional template would otherwise make for you
- Minor ongoing cost for the domain

If you only need a static contact page and a publications list, an institutional profile may be sufficient. If you want any of the additions listed above, this guide is for you.

## Comparison with alternative approaches

The following table summarizes how the stack used in this series compares to other common options.

| Approach | Setup effort | Monthly cost | Control | Portability |
|---|---|---|---|---|
| Institutional profile | None | None | Low | None (tied to institution) |
| Squarespace or Wix | Low | 12 to 25 USD | Medium | Partial (content export only) |
| WordPress (self-hosted) | Medium | 5 to 10 USD | High | High |
| Hugo or Jekyll (static) | Medium | 0 to 2 USD | High | High |
| **Next.js + Vercel (this guide)** | Medium | 0 to 2 USD | High | High |

The stack used here favors direct authoring of React components, fast deployment, and automated data generation from a Word CV. Other stacks are valid choices; this guide simply documents one that is known to work end to end.

## Stack choice rationale

This series uses the following stack:

| Component | Chosen technology | Reason |
|---|---|---|
| Framework | Next.js (App Router) | Mature static generation, wide community support, good Vercel integration |
| Hosting | Vercel | Free tier adequate for academic traffic, zero-config Next.js builds |
| Styling | Tailwind CSS | Utility-first classes work well with AI-assisted generation |
| Source data | Word CV | Most academics already maintain one |
| AI assistance | Claude (chat + Claude Code) | Strong code generation and editing, file-aware in Claude Code |

Substituting any component is possible. The tutorials assume the combination above.

## What this guide does not cover

The following are out of scope:

- Content management systems (WordPress, Squarespace, Webflow, etc.)
- Static site generators other than Next.js (Hugo, Jekyll, Astro, etc.)
- Custom CMS or backend development
- Search engine optimization beyond defaults provided by Next.js and Vercel
- Analytics configuration
- Accessibility audits beyond defaults

Each of these is a reasonable path, but the series focuses on one specific stack: Next.js, Vercel, Claude, and a Word-based CV workflow.

## Next tutorial

[Tutorial 2: Designing with AI (Claude)](02-designing-with-ai.md)

---

*Questions or feedback: open an issue on the [repository](https://github.com/HakeoungLee/from-cv-to-site) or email [hannahlee@virginia.edu](mailto:hannahlee@virginia.edu).*

[Back to README](../README.md)
