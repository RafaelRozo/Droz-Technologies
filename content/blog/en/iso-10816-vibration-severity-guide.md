---
title: "ISO 10816 Vibration Severity: A Practical Guide for Ontario Plants"
slug: "iso-10816-vibration-severity-guide"
date: "2026-04-05"
author: "Droz Technologies"
division: "predictive-maintenance"
category: "Predictive Maintenance"
tags: ["ISO 10816", "vibration analysis", "ISO 20816", "predictive maintenance", "Ontario manufacturing"]
locale: "en"
description: "Understand ISO 10816 vibration severity zones, the 2022 ISO 20816 update, and how to interpret readings on Ontario plant equipment. Practical guide from Droz engineers."
readingTime: 8
featured: false
image: "/images/blog/iso-10816-chart.png"
---

Most Ontario maintenance teams have a vibration meter. Far fewer know what the number on the screen actually means. A reading of 4.5 mm/s RMS on a 200 kW pump is not the same problem as 4.5 mm/s on a 30 kW fan, and the ISO 10816 vibration severity standard is the reason we can tell the difference. This guide is the plain-language version we wish every reliability tech in Ontario had on their bench.

We will walk through what the standard actually covers, the four severity zones, how the 2022 ISO 20816 update changed things, and what we see on real motors, pumps, fans, and compressors across plants in Hamilton, Burlington, and the GTA.

> **Need a second opinion on your vibration data?** [Talk to an Engineer](/contact) — we review readings against ISO 10816 and ISO 20816 for Ontario sites every week.

## What ISO 10816-3 Actually Covers

ISO 10816-3 is the part of the ISO 10816 family that applies to industrial machines with a rated power above 15 kW and operating speeds between 120 and 15,000 RPM. That covers the overwhelming majority of rotating equipment in an Ontario plant: electric motors, centrifugal pumps, industrial fans, compressors, generators, and gearboxes.

The standard measures **broadband vibration velocity in mm/s RMS**, taken on the bearing housing, in three directions (horizontal, vertical, axial). It is not a spectrum analysis. It is a single number that tells you, in one glance, whether your machine is healthy, tolerable, or on its way out.

ISO 10816-3 splits machines into two groups and two support categories:

- **Group 1**: Large machines above 300 kW, or electric machines with shaft height above 315 mm
- **Group 2**: Medium machines from 15 to 300 kW, or electric machines with shaft height between 160 and 315 mm
- **Rigid supports** vs **flexible supports** — this changes the threshold values

The thresholds are stricter for smaller machines on rigid foundations, and more forgiving for large machines on flexible isolators. That is the first thing most techs miss.

## The Four Severity Zones Explained

ISO 10816-3 defines four zones. Memorize them. They drive every conversation about whether to run, watch, plan, or stop.

### Zone A — Good (New Commissioning)

This is the range a newly commissioned machine should fall into. For a 75 kW motor on a rigid base, that is typically **below 1.4 mm/s RMS**. If your machine runs here, you are not reading the wrong sensor — you are doing something right. Leave it alone.

### Zone B — Acceptable (Unrestricted Long-Term Operation)

Machines in Zone B are fit for continuous production. For the same 75 kW motor, that means roughly **1.4 to 2.8 mm/s RMS**. Most of your fleet lives here. The job in Zone B is trending — is the number stable, creeping up, or jumping?

### Zone C — Unsatisfactory (Short-Term Operation Only)

This is where the conversation changes. Zone C runs from about **2.8 to 4.5 mm/s RMS** for a 75 kW rigid-mounted motor. A machine in Zone C is still running, but you should not be planning to leave it in this state until the next shutdown. Schedule the work. Order parts. Book the crew.

### Zone D — Unacceptable (Damage Imminent)

Above **4.5 mm/s RMS** for that same motor, you are in Zone D. Continued operation risks catastrophic failure — bearings, seals, couplings, or the shaft itself. The standard is not saying "maybe." It is saying the machine is actively damaging itself. One Ontario food plant we worked with ignored a Zone D reading on a 110 kW ammonia compressor for 11 days. The repair bill was $187,000 and they lost eight production shifts.

> **Seeing Zone C or D readings you are not sure about?** [Talk to an Engineer](/contact) — we will help you decide whether it is a sensor issue, a mounting issue, or a real defect.

## How to Interpret Your Readings vs the Standard

A number in isolation is almost useless. Three things determine whether your reading matters:

1. **Is it above or below the Zone B/C boundary for that machine class?**
2. **Is it trending up over weeks and months?** A stable 3.0 mm/s is less alarming than a 1.8 that climbed to 2.5 in three weeks.
3. **Is the vibration happening at a frequency that matches a known fault?** ISO 10816 is broadband — it does not tell you *what* is wrong, only *how bad*. For diagnosis, you still need spectrum analysis. For more on that, see our guide on [vibration analysis for Ontario manufacturing](/blog/vibration-analysis-ontario-manufacturing).

The most common mistake Ontario plants make is comparing a reading to the wrong zone table. A 55 kW pump and a 400 kW compressor are judged against completely different thresholds. Always match the machine to Group 1 or Group 2, and rigid or flexible support, before you pull the severity table.

## What Changed in ISO 20816 (2022 Update)

ISO 20816 is the replacement framework that is slowly absorbing ISO 10816. The 2022 update did three important things:

- **Extended the coverage** to shaft vibration measurements (displacement, not just velocity on the bearing housing) for machines with fluid-film bearings.
- **Added explicit guidance** for machines with variable frequency drives (VFDs), which is most of what Ontario manufacturers install today.
- **Refined the threshold math** for modern high-speed machines, particularly those above 6,000 RPM where old ISO 10816 numbers were slightly conservative.

For most Ontario plants running motors, pumps, and fans at 1,800 or 3,600 RPM, the ISO 10816-3 zones are still the right reference. If you operate turbines, high-speed compressors, or critical machines with sleeve bearings, ISO 20816-2 or -5 is the one to pull.

The [official ISO standards catalogue](https://www.iso.org/standard/63180.html){:target="_blank"} lists the current parts of both families.

## Practical Ontario Cases

Here is what the zones look like in real plants we visit across Ontario.

### Electric Motors (Zone B target: <2.8 mm/s)

A 150 kW induction motor driving a paper mill fan in northern Ontario. Baseline at commissioning: 1.1 mm/s. After 18 months: 2.3 mm/s. Still Zone B, but the trend was a 100% increase. We pulled a spectrum, found the 1x harmonic rising — coupling misalignment. A four-hour laser alignment brought it back to 1.3 mm/s.

### Centrifugal Pumps (Zone B target: <4.5 mm/s for Group 2 flexible)

A 75 kW process pump at a Burlington chemical plant. Reading: 5.8 mm/s, firmly in Zone C. Root cause was cavitation from a partially blocked suction strainer. A 30-minute fix avoided a bearing replacement that historical data said would have followed within six weeks.

### Industrial Fans (Zone B target: <4.5 mm/s)

An induced-draft fan on a boiler, reading 7.2 mm/s axial — Zone D. Buildup on one side of the rotor was causing imbalance. Field balancing brought it to 2.4 mm/s in two hours.

### Reciprocating and Screw Compressors

Compressors are harder because they vibrate by design. For screw compressors in the 15-300 kW range, we typically treat anything above **4.5 mm/s** as Zone C and above **7.1 mm/s** as Zone D, per ISO 10816-6, which is the specific part for reciprocating machines.

## When to Take Action at Each Zone

Here is the playbook we give every Ontario plant we work with:

- **Zone A**: Baseline and log. No action.
- **Zone B**: Trend monthly. Investigate any 50%+ increase even if still in Zone B.
- **Zone C**: Diagnose within the week. Plan repair at the next reasonable opportunity — do not wait for the annual shutdown.
- **Zone D**: Treat as an active defect. Diagnose immediately. Do not assume you can "watch it" until the weekend.

The ISO 10816 vibration severity standard is not a permission slip to run equipment to failure. It is a language that lets maintenance, operations, and management agree on how urgent a problem is.

## How Droz Helps Ontario Plants Apply ISO 10816

We run route-based and permanently monitored vibration programs across Ontario that interpret every reading against the correct ISO 10816 zone — not a single generic threshold. Our reports flag Zone C and D machines, show trends against baseline, and recommend the next action.

If your current program just hands you numbers without context, you are paying for data and getting noise. See our [predictive maintenance services in Ontario](/divisions/predictive-maintenance) for how we structure a proper ISO 10816-aligned program.

> **Ready to stop guessing what your vibration readings mean?** [Talk to an Engineer](/contact) — we will review a recent report against ISO 10816 and tell you which machines actually need attention.
