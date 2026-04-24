# 2. Designing with AI (Claude)

> Part 2 of the [From CV to Site](../README.md) tutorial series.

Open any faculty directory at a research university and scroll. You will see a specific kind of same-ness: black headers on white, the same photo crop, a list of publications that starts confidently and trails off around 2019. This isn't because academics lack taste. It's because the default template made most of the decisions for them, and no one had a reason to override the defaults.

Building your own site is, in large part, the process of making those defaults conscious. And that is exactly where AI helps: not by picking a palette for you, but by giving you a patient thinking partner who can hold a dozen half-formed preferences at once and help you find the through-line.

This tutorial walks through how to go from a vague sense of what you want to a concrete design direction you can actually build from.

## What this is not

Before we start, a few expectations to set, because they will save you frustration later.

- **This is not "Claude designs the site for you."** If you type "make me a website" into Claude and paste whatever comes back, you will get something generic. That's not Claude's fault; it's the prompt's fault. Generic inputs produce generic outputs.
- **This is not a one-prompt process.** A good design conversation takes two to four rounds, sometimes more. That's normal. Keep going.
- **This does not replace the need for design sensibility.** You still have to recognize when something is right and when it isn't. The good news is that you already have that sensibility — you've been reading academic websites for years and forming opinions about them.

With those out of the way, the actual work.

## Before you open Claude

Spend about thirty minutes *away from the computer* — or at least away from the chat box — doing a small amount of prep. This is the single most important step in this tutorial, and the one people skip most often.

**1. Collect five to ten reference sites you admire.**

These should be real academic or lab sites. Save screenshots, or at least the URLs. They do not all need to be in your field. A theoretical physicist can admire a literary critic's site and learn from it.

**2. Collect two or three anti-examples.**

Sites that feel wrong to you. Too corporate, too cluttered, too clever, too Medium-blog — whatever your specific objection is. Knowing what you *don't* want is often more useful than knowing what you do.

**3. Write down three vibe words.**

Three adjectives that describe the feel you want. Ban yourself from using "modern," "clean," and "minimal" — these words are so overused they communicate almost nothing. Reach for more specific language:

- *editorial* (like a well-designed magazine)
- *library-like* (restrained, orderly, typography-first)
- *warm* (human, not corporate)
- *scholarly* (doesn't try to look like a tech company)
- *restrained* (small palette, generous whitespace)
- *crafted* (looks like someone cared)

You don't need to know design terminology. You need to know your own reactions, stated precisely.

## Starting the conversation

Now open Claude at [claude.ai](https://claude.ai).

Your first message should not be "make me a website." It should set context. Think of it like the first paragraph of a methods section: careful, specific, grounded in evidence. Here is a template you can adapt. Replace the bracketed parts with your own details.

> I'm a [professor / Ph.D. student / educator] in [your field] at [your institution]. I'm building a personal academic website to share my research, teaching, and current projects. I'm not a designer, but I have strong reactions to what I see. Here are three sites I admire and why:
>
> [Site 1 URL]: I like [specific detail — e.g., the way publications are grouped by theme instead of by year]
> [Site 2 URL]: I like [specific detail — e.g., the generous whitespace and the serif body text]
> [Site 3 URL]: I like [specific detail — e.g., the single-column layout that reads like a document]
>
> Here are two sites that feel wrong to me:
> [Site 4 URL]: Too [descriptor — e.g., corporate and overly animated]
> [Site 5 URL]: Too [descriptor — e.g., cluttered, I can't tell what the person actually does]
>
> Before discussing implementation, can you help me articulate what design direction would suit me? What is the common thread in what I admire?

What this prompt is doing, in editorial terms: you are handing Claude a stack of evidence and asking for a synthesis. You are not asking it to invent; you are asking it to reflect. Claude is quite good at seeing patterns across references that you might not have consciously noticed — "you seem to prefer sites where typography does the heavy lifting and color is held in reserve," for instance.

Read the response carefully. Does it feel accurate? Does it name something you were already groping toward?

## Iterating on direction

Do not accept the first suggestion. Even if it sounds good.

The reason is simple: the first articulation is almost always close-but-not-quite, and the small gap between "sounds right" and "is right" is where your actual taste lives. Closing that gap takes a few rounds of follow-up. Useful questions:

- "Can you show me three variations of this direction — one more minimal, one more expressive, one in between?"
- "What would a slightly warmer version look like? Slightly more formal?"
- "What are the tradeoffs between these options? What do I lose if I pick the minimal one?"
- "Which of these directions is most forgiving as I add more content over time?"

Two to four rounds of this is typical. If you're on round six and still not converging, that's a signal — usually it means your references were inconsistent, or your vibe words were pulling in different directions. Go back and narrow.

## Getting specific

Once the overall direction feels right, move to concrete decisions. Do this one category at a time; trying to settle typography, color, and layout in a single prompt tends to produce hedge-bet answers.

**Typography.**

> Based on the direction we agreed on, suggest three font pairings (heading + body). Include one serif-focused, one mono-focused, and one balanced. For each, explain when you'd choose it and what it signals.

Typography is the biggest single design decision on an academic site. Most of your visitors will spend their time reading text, so this choice affects their experience more than anything else.

**Color palette.**

> Suggest a palette for this site: one primary accent, two or three neutrals, and a single color for links or highlights. Keep it restrained; I want typography to lead, not color. Give me hex codes and tell me where each should be used.

Restraint is almost always the right call for academic sites. If you find yourself reaching for a fifth color, something is off.

**Page structure.**

> What sections should an academic / lab website have? Give me a minimal version (for a solo researcher just getting started) and an extended version (for a lab with students and multiple projects). For each section, tell me what content belongs there and what doesn't.

At each step, be honest. "This is right." "This is too corporate, try again." "The accent color feels cold — can we warm it?" Claude calibrates quickly when you give it specific feedback. Vague feedback produces vague revisions.

## When Claude gets it wrong

It will get things wrong. Worth knowing the common failure modes in advance:

- **Trend default.** Claude will sometimes suggest whatever is currently fashionable on design Twitter — heavy gradients, oversized hero text, marketing-page energy — even when that's wrong for an academic context. Push back with "that's too marketing, try again with a more editorial feel."
- **Confident-but-incorrect claims.** Claude may cite a design principle ("academic sites should always lead with a big portrait") that doesn't hold up. Ask it to show you three actual academic sites that follow the principle. If it can't, the principle is imagined.
- **Over-explaining.** When asked for a choice, Claude sometimes returns a long essay on tradeoffs instead of a recommendation. If this happens, say: "just pick one and commit. I want a recommendation, not options."
- **Default-to-generic.** If your prompt is vague, the answer will be too. When a response feels bland, the fix is almost always in your prompt, not in Claude.

The mental model to hold throughout: **you are the editor. Claude is the associate designer.** The associate designer is well-read, works fast, and has no ego about revisions. You are the one with taste and final say. Your job is not to defer to Claude; your job is to use Claude to sharpen decisions that are ultimately yours.

## Capturing your decisions

Once the direction is clear, ask Claude to write it down:

> Please summarize our design direction as a short design brief. Include: one paragraph of overall intent, typography (heading + body fonts), color palette (with hex codes and usage), layout principles (three to five bullets), and three reference sites to keep in mind. Keep it short enough that I can paste it at the top of every future conversation.

Save this brief. Call it `design-brief.md` in a notes folder. You are going to paste it at the top of the next tutorial's conversations, and the one after that, and the one after that. Every time you start a new implementation session with Claude Code, this brief is what keeps the site coherent instead of drifting with each new page.

## What you should have now

By the end of this tutorial, you should be holding:

- A written design direction, in your own words, that you can articulate to a colleague over coffee
- A decision on typography (heading and body fonts)
- A decision on color palette (one accent, a few neutrals, one link color)
- A list of the sections your site will have
- A clearer sense of your own design voice than you had thirty minutes ago

None of this is final. You will revise once you see it rendered in actual HTML. But you now have a starting point that is *yours*, not the template's.

## A note on dependence

The tool is a tool. Using Claude does not outsource your design judgment to an AI. Your reactions, your taste, and your scholarly context are what drive every meaningful decision in this process. Claude is an amplifier, not a replacement.

As long as that distinction holds — as long as you treat Claude as a thinking partner rather than an oracle — AI is a remarkably useful collaborator for this kind of work. The moment you start accepting answers you don't quite believe because Claude said them confidently, you've inverted the relationship. Stay the editor.

## Next up

Tutorial 3: **Tech Setup** — GitHub, Next.js, and Claude Code, explained gently. We move from thinking about the site to actually putting files on disk.

---

*Have questions or feedback? Open an issue on the [repo](https://github.com/HakeoungLee/from-cv-to-site) or email me at [hannahlee@virginia.edu](mailto:hannahlee@virginia.edu).*

[Back to README](../README.md)
