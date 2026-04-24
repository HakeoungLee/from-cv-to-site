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

Open a new conversation at [claude.ai](https://claude.ai). The first message should set context. Adapt the template below.

> I am a [professor / Ph.D. student / educator] in [your field] at [your institution]. I am building a personal academic website to share my research, teaching, and current projects. I have no formal design training, but I have specific reactions to what I see.
>
> Reference sites I admire:
> - [Site 1 URL]: I like [specific detail]
> - [Site 2 URL]: I like [specific detail]
> - [Site 3 URL]: I like [specific detail]
>
> Anti-examples:
> - [Site 4 URL]: Too [descriptor]
> - [Site 5 URL]: Too [descriptor]
>
> Before discussing implementation, help me articulate a design direction. What is the common thread in the sites I admire?

The goal of this prompt is synthesis, not generation. Claude should describe the patterns across your references, not invent a new direction.

## Iterating on direction

Do not accept the first response. Follow up with specific questions to refine the direction. Useful follow-ups:

- "Show me three variations of this direction: one more minimal, one more expressive, one in between."
- "What would a slightly warmer version look like? Slightly more formal?"
- "What are the tradeoffs between these options?"
- "Which direction is most forgiving as content grows over time?"

Two to four rounds of iteration is typical. If you reach round six without convergence, your references or descriptors are likely inconsistent.

## Specifying typography

Once direction is settled, request typography recommendations in a separate message.

> Based on the direction we agreed on, recommend three font pairings (heading plus body). Include one serif-focused, one mono-focused, and one balanced. For each, explain when to choose it.

Evaluate the recommendations and pick one pairing. Typography is the largest single visual decision on an academic site.

## Specifying color palette

Request a palette separately from typography.

> Recommend a palette for this site: one accent color, two or three neutrals, and one link or highlight color. Keep the palette restrained. Provide hex codes and usage notes.

Restraint is appropriate for academic sites. Five or more colors typically indicates drift from the direction.

## Specifying section structure

Define the pages your site will have.

> What sections should an academic website have? Provide a minimal version for a solo researcher and an extended version for a lab with students and multiple projects. For each section, specify what content belongs there.

## Handling inaccurate responses

Claude will occasionally produce responses that require correction. Common failure modes:

- **Trend defaults.** Claude may suggest visually heavy styles (oversized hero, marketing copy tone, gradients) that do not fit academic contexts. Respond: "That is too marketing-oriented. Provide a more editorial alternative."
- **Unverified claims.** Claude may state design principles that sound authoritative but lack concrete examples. Respond: "Show me three academic sites that follow this principle."
- **Over-explanation.** Claude may return a long tradeoff essay when a recommendation was requested. Respond: "Pick one and recommend it."
- **Default to generic.** If the response feels bland, revise the prompt to be more specific. Generic inputs produce generic outputs.

In all cases, you make the final decision. Claude provides options and explanations; you evaluate them against your references.

## Capturing the design brief

When direction, typography, color, and structure are settled, request a written summary.

> Summarize the design direction as a short brief. Include: one paragraph of overall intent, typography (heading and body fonts), color palette (hex codes and usage), three to five layout principles, and three reference sites. Keep it short enough to paste at the top of future conversations.

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
