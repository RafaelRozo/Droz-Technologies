---
title: "SR&ED Tax Credits for Software Development: 2026 Ontario Guide"
slug: "sred-tax-credit-software-development-ontario"
date: "2026-04-05"
author: "Droz Technologies"
division: "software-development"
category: "Software Development"
tags: ["SR&ED", "tax credits", "software development", "Ontario", "R&D funding", "OITC", "ORDTC"]
locale: "en"
description: "2026 guide to SR&ED tax credits for software development in Ontario. New $6M limit, eligibility rules, documentation, and how to claim federal and provincial credits."
readingTime: 11
featured: true
image: "/images/blog/sred-tax-credit-guide.png"
---

If your Ontario software team spent the last year solving a hard technical problem — not just shipping features — you are probably leaving six figures on the table. SR&ED is the largest federal R&D program in Canada, and the 2026 updates make it dramatically more generous for software development in Ontario. This is the guide we wish every CTO and founder read before their fiscal year-end.

We will cover what SR&ED is, what changed in 2026, what software work actually qualifies (and what does not), the Ontario-specific stacking credits, and how to document a claim that survives a CRA audit.

> **Not sure if your software project qualifies for SR&ED?** [Talk to an Engineer](/contact) — we have helped Ontario teams file claims ranging from $80,000 to $2.1 million.

## What SR&ED Is

SR&ED stands for Scientific Research and Experimental Development. It is administered by the Canada Revenue Agency and is, by any measure, the most valuable R&D incentive a Canadian software company can claim. Three credits stack on top of each other for Ontario corporations:

- **Federal SR&ED Investment Tax Credit**: 35% refundable on the first tranche of qualified expenditures for Canadian-Controlled Private Corporations (CCPCs). 15% non-refundable above that threshold or for non-CCPCs.
- **Ontario Innovation Tax Credit (OITC)**: 8% refundable on eligible SR&ED expenditures.
- **Ontario Research and Development Tax Credit (ORDTC)**: 3.5% non-refundable, used against Ontario corporate tax owing.

For a qualifying CCPC in Ontario spending within the expenditure limit, the effective benefit can reach **roughly 64 cents on the dollar** of eligible R&D spend once all three credits compound. That is not a theoretical maximum — we see it on real claims every year.

## What Changed in 2026: The Big Updates

The 2026 updates to SR&ED are the most significant changes the program has seen in more than a decade. Three things matter for software companies in Ontario:

### 1. Expenditure Limit Doubled to $6 Million

The enhanced 35% refundable rate used to phase out once a CCPC passed **$3 million** in qualifying expenditures. The limit is now **$6 million**, which means mid-sized Ontario software companies that previously hit the ceiling now get an extra $3 million of spend at the enhanced rate. For a company fully in that tier, the incremental federal credit alone is worth up to **$600,000 per year**.

### 2. Capital Expenditures Eligible Again

From 2014 to 2025, capital expenditures (servers, GPUs, specialized equipment) were excluded from SR&ED. They are back in 2026. For AI and machine learning teams running on-prem GPU clusters — a very real scenario across Ontario — this is a direct credit on hardware that was previously unfunded.

### 3. Phase-Out Thresholds Raised

The taxable capital phase-out window, which reduces the enhanced rate as a CCPC grows, has been raised. More Ontario scale-ups will qualify for the full refundable credit in 2026 than in any year since 2012.

> **Did you file a 2025 SR&ED claim and wonder if the new rules apply retroactively?** [Talk to an Engineer](/contact) — the answer depends on your fiscal year-end and we can walk you through it.

## What Qualifies: The Three Tests

CRA applies three tests to every SR&ED claim. All three must be met. This is where most rejected software claims go wrong.

### Test 1: Scientific or Technological Uncertainty

You must have faced a problem where the solution was not obvious to a competent professional in the field, given the current state of public knowledge. This is not "we had not done it before." It is "nobody in the field could tell us, in advance, whether this approach would work."

For software, real uncertainty looks like:

- Can we achieve sub-100ms inference on this model on edge hardware?
- Will this distributed consensus algorithm hold under a partition we have not seen documented?
- Can we compress this data stream by 40% without losing fidelity for the downstream ML model?

### Test 2: Systematic Investigation

You must have approached the problem systematically — hypotheses, experiments, results, iteration. CRA wants to see the scientific method, even if your team calls it "sprints" and "spikes." Git history, design docs, experiment logs, and failed branches are all evidence.

### Test 3: Advancement of Scientific or Technological Knowledge

The work must have advanced the underlying technology base, even if only incrementally. The advancement does not need to be patentable or publishable — but it must exist. "We built a dashboard" is not advancement. "We developed a novel query-planning heuristic that reduced 95th-percentile latency by 40% on our workload" is.

## What DOES NOT Qualify

This is where we save Ontario software teams the most pain. The following work is almost never eligible:

- **Routine coding**: CRUD apps, standard web forms, straightforward integrations with documented APIs.
- **Market-driven features**: Building a feature because a customer asked for it, where the "hard part" is product scope, not technical.
- **Bug fixes and maintenance**: Unless the bug itself revealed an underlying uncertainty.
- **Commercial-style A/B testing**: Experimenting with pricing, copy, or UI is a business experiment, not a technological one.
- **Work done entirely with off-the-shelf tools** in a documented way.
- **Front-end styling, animation, and UX polish** — no matter how clever.

The CRA's own position is explicit: *commercial outcomes and technological outcomes are different questions.* Many Ontario software teams file claims that describe business value brilliantly and technical uncertainty weakly. Those get denied.

## Eligible Software Activities (What DOES Qualify in 2026)

Based on the claims we have seen approved for Ontario companies in the last three years, these categories consistently qualify:

### AI and Machine Learning

- Training novel models where performance was not predictable in advance
- Developing custom loss functions, architectures, or training regimes
- Solving deployment uncertainty (inference latency, quantization, edge constraints)
- Domain adaptation where published techniques did not transfer cleanly

### Novel Algorithms

- Optimization problems where standard approaches fail on your data scale
- Graph algorithms on non-standard topologies
- Custom compression, encoding, or streaming protocols

### SaaS Platforms with Hard Scaling Problems

- Multi-tenancy architectures solving real isolation or noisy-neighbour problems
- Real-time systems hitting latency budgets that required novel approaches
- Distributed systems solving actual consistency or partition challenges

### Cybersecurity

- Novel detection methods
- Zero-knowledge or privacy-preserving computation
- Adversarial robustness work

For a related take on how these projects reach production, see our post on [AI proof-of-concept to production in 90 days](/blog/ai-proof-of-concept-production-90-days).

## Documentation Requirements (CRA Audit-Proof)

A SR&ED claim is only as strong as its documentation. The CRA has moved steadily toward stricter contemporaneous documentation requirements, and 2026 is not a year to cut corners. At minimum, you need:

1. **Project descriptions** that explain the technological uncertainty in engineering language, not marketing language.
2. **Hypothesis and experiment records** — design docs, RFCs, architectural decision records, spike outputs.
3. **Time tracking by project and activity**, ideally at the task level. Retroactive estimates are a red flag.
4. **Git history and commit logs** mapped to the claimed work.
5. **Failed approach documentation**. CRA wants to see what did not work — it is the strongest evidence of real uncertainty.
6. **Evidence of who did the work and their qualifications.**

Teams that track this as they go file claims in days. Teams that reconstruct it at year-end spend weeks and still get weaker claims.

## How to Claim: T661, Eligible Expenses, Timelines

The mechanics:

- **Form T661** is the core federal SR&ED claim form. It captures the technical narrative and the expenditure calculations.
- **Schedule 31** reports the federal Investment Tax Credit.
- **Schedules 566 and 508** are the Ontario OITC and ORDTC forms.
- **Eligible expenses** include salaries and wages of employees directly engaged in SR&ED, subcontractor costs (at 80% under the current proxy rules), materials consumed, and — new in 2026 — eligible capital expenditures.
- **Filing deadline**: SR&ED claims must be filed within **18 months** of the fiscal year-end. Miss it and the claim is gone. There is no extension.

Most Ontario CCPCs file their SR&ED claim alongside their T2 corporate return. Refundable credits are paid as cash, typically within 60 days of assessment for first-time filers and 180 days if the claim is selected for review.

The [CRA SR&ED program page](https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html){:target="_blank"} has the current forms and policy documents.

## Ontario-Specific: OITC + ORDTC Stacking

This is the part many federal-focused guides miss. Ontario corporations get two additional credits on top of federal SR&ED:

- **OITC (8% refundable)**: For CCPCs with taxable income under the threshold. Refundable means you get the cash even if you owe no tax.
- **ORDTC (3.5% non-refundable)**: Available to all Ontario corporations. Non-refundable means it reduces Ontario tax owing but is not paid out if you have no tax owing.

On a $1 million eligible SR&ED spend for an Ontario CCPC in 2026:

- Federal ITC (35% refundable): $350,000
- OITC (8% refundable): $80,000
- ORDTC (3.5% non-refundable): $35,000
- **Total credit value: $465,000** — of which $430,000 is cash-refundable.

That is why SR&ED is the single most important R&D funding instrument for Ontario software companies. If you are also looking at federal innovation funding, our guide to [IRAP funding for AI in Canada](/blog/irap-funding-ai-canada) covers the complementary programs.

## How Droz Helps Ontario Software Teams with SR&ED

We do not file SR&ED claims — that is what your accountant or specialist firm is for. What we do is build the *technical case*. We help Ontario software and AI teams identify which work qualifies, document the uncertainty properly as it happens, and structure their engineering process so the claim is defensible in an audit.

If your team is building something genuinely hard and you are not sure whether the technical narrative will hold up, that is exactly where we help. See our [software development services in Ontario](/divisions/software-development) for how we engage.

For Ontario teams working on government-adjacent software, our [guide to government software contracts in Ontario](/blog/government-software-contracts-ontario) pairs well with SR&ED — the two funding paths often stack.

> **Ready to make sure your 2026 SR&ED claim is defensible?** [Talk to an Engineer](/contact) — we will review your current project docs and tell you where the gaps are.
