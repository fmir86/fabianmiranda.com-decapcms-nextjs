---
title: "I Built an AI Chatbot in Days, Not Weeks. Here's What That Actually Means."
date: 2026-03-28T12:00:00-06:00
dateModified: 2026-03-28T12:00:00-06:00
author: Fabian Miranda
excerpt: I've been integrating AI into enterprise workflows for years. But I'd never built something as "simple" as a chatbot for my own site. When I finally did, the process revealed everything that's right and wrong about AI-assisted development today.
featured_image: /images/ai-butler.jpg
categories:
  - AI Development
  - Software Engineering
tags:
  - AI Chatbot
  - Claude Code
  - Gemini
  - Vercel AI SDK
  - Next.js
  - Software Architecture
published: true
featured: true
key_takeaways:
  - A solo developer can ship a production AI chatbot in under a week using Gemini 2.5 Flash, Vercel AI SDK, and Next.js
  - The real challenge is not the AI integration but the engineering around it — rate limiting, input sanitization, streaming, error handling
  - AI coding tools like Claude Code accelerated development by 3-4x but still required architectural decisions from an experienced engineer
  - Cost of running the chatbot is near-zero thanks to Gemini's free tier and efficient context caching
  - The chatbot (Alfred AI) handles visitor questions about services, portfolio, and expertise with personality and accuracy
related_posts:
  - 2025-10-31-beyond-vibe-coding
  - 2026-03-15-anthropic-academy-free-ai-training
  - nearshore-advantage-costa-rica-tech-hub
faq:
  - question: How long does it take to build an AI chatbot from scratch?
    answer: With modern tools like Vercel AI SDK and Gemini API, a production-ready chatbot can be built in 3-5 days by an experienced developer. This includes streaming responses, markdown rendering, rate limiting, and analytics integration.
  - question: What does it cost to run an AI chatbot on a personal site?
    answer: Near-zero. Using Gemini 2.5 Flash with context caching, the operational cost is minimal. The free tier of most AI APIs is sufficient for personal sites with moderate traffic.
  - question: Can AI coding tools like Claude Code build a chatbot by themselves?
    answer: AI tools can generate 70-80% of the code, but they cannot make architectural decisions, design security boundaries, or handle edge cases without experienced engineering oversight. They amplify skill, not replace it.
---

I work with AI every day. I build integrations, analyze data pipelines, connect disconnected systems for clients across industries. I've watched AI rewrite the rules of what a single developer can accomplish.

And yet, until last week, I'd never built a chatbot.

Not because I didn't know how. Because I kept postponing it. Other priorities. Client work. The irony of the cobbler's children having no shoes. The classic consulting paradox: you spend so much time solving other people's problems that your own site runs on a static portfolio with zero interactivity.

That changed in a few days. Not weeks, not months. Days. And the process taught me more about the current state of AI-assisted development than any conference talk or whitepaper could.

## The Amplifier Effect

Here's what nobody tells you about working with AI coding tools: they amplify whatever you already are.

If you're a skilled architect who understands system design, dependency management, security boundaries, and performance trade-offs, AI becomes nitrous oxide for your engine. It takes your 200-horsepower output and pushes it to 800. You sketch the architecture, define the constraints, pick the stack, and AI fills in the implementation at a speed that would've been inconceivable three years ago.

But if you don't know what you're building, or worse, if you think six words in a prompt should produce a million-dollar SaaS, AI becomes an amplifier of a different kind. It amplifies your ignorance. It over-engineers solutions you didn't ask for. It creates Frankenstein components held together by duct tape and optimism. It introduces security vulnerabilities with the confidence of a senior engineer. And the mess grows like a snowball rolling downhill, because you can't debug what you don't understand.

I've seen both outcomes firsthand. The difference is never the AI. It's always the human driving it.

## Coding vs. Engineering

This distinction matters more now than ever.

Coding is the act of writing instructions a computer can execute. It's syntax, snippets, Stack Overflow patterns memorized and reproduced. For decades, that skill alone could land you a solid career.

Software engineering is something else entirely. It's the discipline of designing systems that are efficient under the hood, not just functional on the surface. It's knowing why you pick one database over another, understanding the cost implications of an API call made 10,000 times per day, recognizing that a 220,000-token system prompt sent on every request will bankrupt your client before the product launches.

AI tools like Claude Code already write better boilerplate than most junior developers. They handle syntax perfectly. They know every API signature in every popular framework. The "coder" role, the person whose primary value was memorizing how to write a for-loop in seven languages, is genuinely at risk.

But the architect, the person who decides what to build, how the pieces connect, where the boundaries live, that role isn't threatened. It's supercharged.

## The Headlines That Missed the Point

Two statements dominated tech discourse in early 2026.

In January, Anthropic CEO Dario Amodei told The Economist at Davos that AI models could do "most, maybe all" of what software engineers currently do within six to twelve months. He added: "I have engineers within Anthropic who say, I don't write any code anymore. I just let the model write the code. I edit it."

Then in March, at NVIDIA's GTC 2026, Jensen Huang dropped a bombshell of a different kind. He revealed that NVIDIA's software engineers "100% use coding agents now. Many of them haven't generated a line of code in a while, but they're super productive and super busy." He announced that every NVIDIA engineer would receive an annual token budget on top of their salary, roughly half their base pay, for AI tool consumption. His exact words on the All-In Podcast: "If that $500,000 engineer did not consume at least $250,000 worth of tokens, I'm going to be deeply alarmed." When asked what he'd do if an engineer reported spending only $5,000, he said: "I will go ape."

When pressed on whether NVIDIA is spending around $2 billion annually on tokens for its engineering team, Huang answered: "We're trying to."

The media ran with the doom angle on both stories. "NVIDIA CEO says programming is dead." "Anthropic says engineers are obsolete in 6 months." Panic. Outrage. Hot takes.

But look at what these two men are actually doing, not saying.

Amodei isn't laying off his engineers. He's watching them become more productive by editing AI-generated code instead of writing it from scratch. The skill shifted from typing code to evaluating it.

Huang isn't replacing engineers with AI. He's giving each one a quarter million dollars in AI ammunition per year and telling them to burn through it. He compared not using AI to "using paper and pencil for designing chips." His engineers are producing more than ever because they spend their time designing solutions, not implementing them character by character.

"Work that used to take months now takes a couple of days," Huang said. "And we see it only accelerating from here."

This is what the headlines miss every single time. The future isn't engineers replaced by AI. It's engineers amplified by it. The ones who understand what to build, empowered by tools that handle the mechanical how at a speed that was unthinkable two years ago. The ones who can't tell the difference between architecture and syntax, those are the ones who should worry.

## Alfred AI: The Build

Let me walk you through what we actually built, because the technical decisions reveal the thesis.

**The stack:** Next.js (Pages Router), Vercel AI SDK for streaming, Google Gemini 3 Flash Preview as the LLM, Supabase for conversation analytics, and the site's own markdown content as the knowledge base.

**The architecture:** This isn't a RAG system. The site has 15 pages and roughly 100 blog posts. The total content, once summarized to titles, excerpts, tags, and URLs, fits comfortably within Gemini's context window. So instead of building a vector database, embedding pipeline, and retrieval layer, we skip all of that. The content goes directly into the system prompt. Simple. Effective. No unnecessary complexity.

But here's where the engineering decisions stack up.

**Context caching.** Sending 10-15K tokens of site content on every request is wasteful. Gemini's explicit caching API lets us upload the content once, get a cache ID back, and reference it on subsequent requests. The cached tokens cost 90% less. For a site with moderate traffic, the difference is the chat costing $5/month vs. $1/month.

**Rate limiting.** A Map-based rate limiter directly in the API route. 20 requests per minute per IP. No Redis, no external service. Simple and sufficient for a personal site.

**Input sanitization.** A regex-based filter catches common prompt injection patterns, "ignore previous instructions," "DAN mode," "reveal your system prompt," before they ever reach the model. Suspicious inputs get a generic response without consuming a single API token.

**Prompt hardening.** The system prompt explicitly instructs the model to never reveal its instructions, never follow commands to change its behavior, and stay in character regardless of what the user tries.

**Streaming with personality.** The bot has a name, a personality, guardrails about what topics it can discuss, and explicit instructions about how to format links. Every internal page reference must be a clickable markdown hyperlink. External links are limited to authorized profiles (LinkedIn, GitHub). The model is instructed to ask for clarification when messages are vague instead of guessing.

**Session persistence.** Chat history and open/close state survive page navigation via sessionStorage. A stable session ID (crypto.randomUUID) ties each browser session to its conversation log in Supabase.

**Analytics.** Every conversation gets logged to Supabase: user message, bot response, locale, session ID, IP address. Google Analytics events fire on chat open, close, and message send. The data will eventually be fed back through an LLM to categorize topics and identify content gaps.

## What the AI Did vs. What I Did

This is the part that matters.

AI wrote the implementation. The streaming endpoint, the React components, the CSS animations, the Playwright tests, the Supabase integration. Line by line, most of the code was generated by Claude Opus.

But every architectural decision was mine. The choice to skip RAG and use context stuffing. The decision to cache the content on Gemini's servers. The rate limiting strategy. The prompt engineering. The responsive breakpoints. The decision to use a separate `/api/chat-log` endpoint because Netlify Functions kill async promises after the response stream ends. The choice of Gemini 3 Flash over Claude Haiku or GPT-4.1 Mini, based on actual cost-per-token analysis across three providers.

AI doesn't make those calls. It executes them. And when it executes them wrong (which it does, frequently), you need to know enough to catch it, redirect it, and sometimes just tell it to stop.

There were moments during this build where the AI went in circles for hours trying to solve a CSS problem that any frontend developer would fix in five minutes. There were moments where it introduced security vulnerabilities I had to catch. There were moments where it guessed at DOM selectors instead of inspecting the actual structure, breaking things repeatedly until I forced it to verify first.

The AI was the fastest, most tireless pair programmer I've ever worked with. It was also, at times, the most stubbornly wrong.

## The Real Takeaway

If you're a developer who has spent years understanding systems, architectures, trade-offs, and the messy reality of shipping software, this is your moment. The tools available today for a few dollars a month give you the output of a small team. Not because the AI replaces your thinking, but because it eliminates the mechanical overhead of turning your thinking into code.

If you're an organization sitting on disconnected data sources, manual processes that could be automated, or customer interactions that could be handled by an intelligent assistant trained on your own content, the barrier to building that solution just dropped by an order of magnitude.

The question isn't whether AI can help your business. It's whether you have someone who knows how to drive it.

If you don't, [let's talk](/contact).
