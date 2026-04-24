---
title: "2. Designing with AI (Claude)"
layout: default
parent: Tutorials
nav_order: 2
---

# 2. Designing with AI (Claude)

> Part 2 of the [From CV to Site](../README.md) tutorial series.

## Prerequisites

- Completed [Tutorial 1](01-why.md)
- A free or paid account at [claude.ai](https://claude.ai)

## What this tutorial produces

A written design brief, in your own words, that defines typography, color palette, layout principles, and section structure. The brief will be reused as context in later tutorials when generating code.

## Scope

This tutorial covers design direction only: the decisions you make before any code is written. Implementation is covered in Tutorial 4.

## Why use Claude for this step

Design decisions for academic sites tend to default to the template's built-in choices. Using Claude as a thinking partner forces those choices to become explicit. Claude does not design the site for you; it helps you articulate and compare options quickly.

## Preparation

Complete the following before opening Claude. Allow approximately 30 minutes.

**Step 1. Collect reference sites.**

Gather 5 to 10 URLs of academic or lab sites you admire. Save screenshots if useful. References do not need to be in your field.

**Step 2. Collect anti-examples.**

Identify 2 to 3 sites that feel wrong to you. Note what specifically is wrong (too corporate, too cluttered, too marketing-oriented, etc.).

**Step 3. Write three descriptors.**

Choose three adjectives that describe the feel you want. Avoid generic terms such as *modern*, *clean*, or *minimal*. Use more specific language. Examples:

- *editorial* (magazine-like composition)
- *library-like* (typography-first, restrained)
- *scholarly* (does not resemble a tech product)
- *warm* (human, not corporate)
- *restrained* (small palette, generous whitespace)
- *crafted* (evidence of care in detail)

## Initial prompt

Open a new conversation at [claude.ai](https://claude.ai). The first message should set context. Adapt the template below. The XML-like tags are not mandatory, but they help Claude keep references, anti-examples, and descriptors distinct.

> I am a [professor / Ph.D. student / educator] in [your field] at [your institution]. I am building a personal academic website to share my research, teaching, and current projects. I have no formal design training, but I have specific reactions to what I see.
>
> \<references\>
> - [Site 1 URL]: I like [specific detail]
> - [Site 2 URL]: I like [specific detail]
> - [Site 3 URL]: I like [specific detail]
> \</references\>
>
> \<anti_examples\>
> - [Site 4 URL]: Too [descriptor]
> - [Site 5 URL]: Too [descriptor]
> \</anti_examples\>
>
> \<descriptors\>
> [word 1], [word 2], [word 3]
> \</descriptors\>
>
> Before discussing implementation, help me articulate a design direction. Output exactly:
>
> 1. A three-to-five-sentence description of the common thread across the references.
> 2. A one-sentence summary that I could quote as the design direction.
> 3. Any tension you notice between my references, anti-examples, and descriptors.
>
> Do not recommend specific fonts, colors, or layouts yet.

The goal of this prompt is synthesis, not generation. Claude should describe the patterns across your references, not invent a new direction. Constraining the output to exactly three items reduces the risk of Claude returning a long essay.

## Iterating on direction

Do not accept the first response. Follow up with specific questions to refine the direction. Useful follow-ups:

- "Show me three variations of this direction: one more minimal, one more expressive, one in between."
- "What would a slightly warmer version look like? Slightly more formal?"
- "What are the tradeoffs between these options?"
- "Which direction is most forgiving as content grows over time?"

Two to four rounds of iteration is typical. If you reach round six without convergence, your references or descriptors are likely inconsistent.

## Specifying typography

Once direction is settled, request typography recommendations in a separate message.

> Based on the design direction we agreed on, recommend three font pairings (heading font plus body font). For each pairing:
>
> - Name the heading font and the body font.
> - State whether both are available on Google Fonts (required).
> - Describe in one sentence when to choose this pairing.
>
> Include one serif-led pairing, one mono-led pairing, and one balanced pairing. Keep each pairing description to three lines or fewer.

Evaluate the recommendations and pick one pairing. Typography is the largest single visual decision on an academic site.

## Specifying color palette

Request a palette separately from typography.

> Given the design direction, recommend a color palette with exactly:
>
> - 1 accent color (used sparingly, for links or emphasis)
> - 2 or 3 neutrals (backgrounds, borders, body text)
> - 1 link color (can match the accent)
>
> For each color, provide a hex code and a one-sentence usage note. Restraint is a priority; the site should read as typography-led, not color-led.

Restraint is appropriate for academic sites. Five or more colors typically indicates drift from the direction.

## Specifying section structure

Define the pages your site will have.

> Recommend a section structure for an academic website aligned with the design direction above. Provide:
>
> 1. A minimal version (4 to 5 sections) for a solo researcher.
> 2. An extended version (6 to 8 sections) for a lab with students and multiple projects.
>
> For each section, list the section name and one sentence on what content belongs there. Omit any section where the content would overlap with another.

## Handling inaccurate responses

Claude will occasionally produce responses that require correction. Common failure modes:

- **Trend defaults.** Claude may suggest visually heavy styles (oversized hero, marketing copy tone, gradients) that do not fit academic contexts. Respond: "That is too marketing-oriented. Provide a more editorial alternative."
- **Unverified claims.** Claude may state design principles that sound authoritative but lack concrete examples. Respond: "Show me three academic sites that follow this principle."
- **Over-explanation.** Claude may return a long tradeoff essay when a recommendation was requested. Respond: "Pick one and recommend it."
- **Default to generic.** If the response feels bland, revise the prompt to be more specific. Generic inputs produce generic outputs.

In all cases, you make the final decision. Claude provides options and explanations; you evaluate them against your references.

## Capturing the design brief

When direction, typography, color, and structure are settled, request a written summary.

> Summarize everything we agreed on as a design brief. Use this exact structure, in plain Markdown:
>
> ```
> # Design brief
>
> **Intent.** [One paragraph, 3-5 sentences.]
>
> **Typography.**
> - Headings: [font name]
> - Body: [font name]
>
> **Colors.**
> - Accent: [#hex] — [usage]
> - Neutrals: [#hex], [#hex] — [usage]
> - Link: [#hex]
>
> **Layout principles.**
> 1. [principle]
> 2. [principle]
> 3. [principle]
>
> **Sections.** [comma-separated list]
>
> **References.**
> - [URL]
> - [URL]
> - [URL]
> ```
>
> Keep the brief under 400 words so it fits cleanly at the top of future conversations.

Save the response as `design-brief.md` in a notes folder. You will paste this brief into later Claude Code sessions to keep implementation consistent.

## Deliverables checklist

At the end of this tutorial, you should have:

- A written design brief file
- Specified heading and body fonts
- A color palette with hex codes
- A list of pages and their content
- References you can return to during implementation

## Next tutorial

[Tutorial 3: Tech Setup](03-tech-setup.md)

---

*Questions or feedback: open an issue on the [repository](https://github.com/HakeoungLee/from-cv-to-site) or email [hannahlee@virginia.edu](mailto:hannahlee@virginia.edu).*

[Back to README](../README.md)
