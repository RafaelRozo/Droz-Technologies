---
title: "Computer Vision for Quality Inspection: Ontario Manufacturers Cut Defects 90%"
slug: "computer-vision-quality-inspection-manufacturing"
date: "2026-04-05"
author: "Droz Technologies"
division: "ai-consulting"
category: "AI Consulting"
tags: ["computer vision", "quality inspection", "manufacturing", "Ontario", "defect detection", "YOLOv8", "edge AI"]
locale: "en"
description: "How Ontario manufacturers use computer vision quality inspection to cut defects 90%. Hardware, software stack, 90-day deployment, SR&ED and IRAP eligibility."
readingTime: 11
featured: true
image: "/images/blog/computer-vision-qc.png"
---

Human visual inspection plateaus around **an 85% catch rate** on a good shift and drops hard after hour six. Computer vision quality inspection in manufacturing plants across Ontario is running at **90-99% detection rates**, 24 hours a day, with a per-part inspection time of about 200 milliseconds. The technology is no longer speculative, no longer expensive, and no longer hard to deploy. This is how Ontario manufacturers are using it to cut defects by an order of magnitude.

We will cover why human QC tops out, what computer vision actually does on a line, the real numbers from production deployments, the hardware and software stack, how a 90-day rollout is sequenced, and how SR&ED and IRAP funding pay for most of it.

> **Considering computer vision for your line?** [Talk to an Engineer](/contact) — we scope real deployments for Ontario manufacturers every month, and most projects start with a two-week feasibility review.

## The Limits of Human Quality Inspection

Let us be honest about the baseline. Human quality inspectors are extraordinary at ambiguous judgment calls, but they fail at exactly what QC requires: consistent, high-volume, repetitive scrutiny. The published literature and the plant floors we walk in Ontario agree on roughly these numbers:

- **15% miss rate** on a standard inspection task over a full shift — and that is with trained inspectors.
- **Fatigue** drops attention noticeably after 45-60 minutes of continuous visual work.
- **Inconsistency between inspectors** averages 20-30% disagreement on borderline defects.
- **Drift** — inspectors unconsciously recalibrate their threshold based on what they have been seeing.

This is not a criticism of inspectors. It is a biological fact. A person cannot look at 2,400 injection-moulded parts per hour for eight hours and maintain a clinical defect rate. A camera can.

## What Computer Vision Actually Does

Computer vision for quality inspection is not a single capability. It is a toolkit that addresses four separate inspection problems:

### 1. Defect Detection

Scratches, dents, cracks, voids, contamination, paint runs, weld porosity, colour variation. Modern deep-learning models identify these with precision and recall that match or exceed trained human inspectors on most part classes.

### 2. Dimensional Measurement

Sub-pixel edge detection gives measurement accuracy down to a few microns with the right optics. Good for verifying bore diameter, hole spacing, part length, thickness, concentricity — anything you would historically check with a gauge or a CMM sample.

### 3. Part Recognition and Assembly Verification

Confirming the right part went into the right fixture. Confirming the right sub-assemblies are present on a completed unit. Counting components. These are jobs humans do poorly because they are boring, and exactly the kind of task vision systems do with near-zero error.

### 4. OCR — Date Codes, Lot Numbers, Serial Numbers

Reading stamped, laser-etched, inkjet, or printed codes on packaging, labels, castings, and extrusions. OCR used to require controlled lighting and cooperative surfaces. Current models handle curved, reflective, and low-contrast substrates reliably.

## Real Results from Production

Here are the numbers we see consistently on Ontario deployments:

- **90-99% defect detection rate** on classes the model is trained for
- **24/7 operation** with no shift handover drift
- **200 ms per part inspection time** on mid-range edge hardware
- **Sub-second feedback to line controls** for reject actuation
- **Defect escape rate cut by 85-95%** compared to human-only QC on the same line

One Ontario automotive parts manufacturer we worked with was shipping roughly **1.2% defective units** to their OEM customer under a human-inspection regime. Six months after computer vision went live on the final inspection station, the outgoing defect rate was **0.08%** — a **93% reduction**. The warranty cost avoidance alone paid back the project in under 11 months.

> **Want to know what detection rate is realistic for your part?** [Talk to an Engineer](/contact) — we will review sample images and give you an honest performance estimate before you commit to a project.

## Hardware Requirements

A computer vision inspection station is only as good as the images it captures. Hardware is not where you save money. The stack we deploy on Ontario lines looks like this:

### Industrial Cameras

- **Area scan cameras** (2-20 MP) for discrete part inspection
- **Line scan cameras** for continuous web or cylindrical surfaces
- **Global shutter sensors** — mandatory for moving parts. Rolling shutter will smear your edges.
- GigE Vision or USB3 Vision interface for deterministic frame delivery

Expect $800 to $5,000 per camera depending on resolution, speed, and sensor class.

### Lighting

Lighting is where 70% of deployments go wrong. The right light — coaxial, dome, dark-field, backlight, or structured — is the difference between a model that trains in a week and a model that never converges. Budget **as much for lighting as for the camera**.

### Optics

Fixed-focal-length industrial lenses, telecentric lenses for dimensional accuracy, polarizing filters for reflective parts. Cheap lenses cause non-uniform distortion that no model will forgive.

### Edge Compute

On-station inference runs on edge hardware. For most Ontario deployments we specify **NVIDIA Jetson Orin** modules (Orin NX or Orin AGX depending on throughput). They deliver the compute needed for real-time YOLOv8 or custom CNN inference at line speed, fit in an industrial enclosure, and do not depend on a cloud link.

The [NVIDIA Jetson platform documentation](https://developer.nvidia.com/embedded/jetson-modules){:target="_blank"} has current spec sheets for the modules we use most.

For higher-throughput lines or multi-camera stations, we consolidate on industrial GPU servers (RTX-class) mounted in the MCC room with fibre back to the cameras.

## Software Stack

There is no single "computer vision product" that wins. There is a stack of proven components that we assemble to fit the job:

- **OpenCV** for image preprocessing, classical feature extraction, and dimensional measurement
- **PyTorch** as the primary deep-learning framework
- **YOLOv8** (and successors) for real-time object and defect detection
- **Segmentation models** (U-Net, Segment Anything derivatives) for pixel-level defect maps
- **Custom-trained models** on the actual parts from the actual line — generic pretrained models do not work on most industrial defects
- **TensorRT** for inference optimization on Jetson/RTX hardware
- **MQTT or OPC UA** for integration with PLCs and MES
- **Data pipelines** for continuous retraining as new defect types emerge

The opinionated take: **do not try to build this from scratch**, and do not buy a black-box turnkey box that cannot be retrained when your parts change. The winning model is open-source components, custom training on your data, and a clean MLOps loop for ongoing improvement.

## Implementation Timeline: 30 / 60 / 90 Days

Here is the cadence we run on Ontario deployments. It is aggressive but realistic when the scope is disciplined.

### Days 0-30: Proof of Concept

- Image collection on the target station (2,000-10,000 samples including defect examples)
- Lighting and camera testing on site
- Initial model training
- Offline accuracy evaluation against labelled holdout
- Go/no-go decision at day 30

### Days 30-60: Pilot

- Hardware installation on a single line or station
- Integration with reject mechanisms or operator alerts
- Shadow operation alongside human inspection
- Performance measurement against ground truth
- Model refinement on edge cases caught during pilot

### Days 60-90: Production

- Cutover to full automated inspection
- Monitoring dashboard for detection rate, false positive rate, throughput
- Handoff and training for plant reliability and quality teams
- Retraining pipeline for ongoing model drift management

If you are targeting something more aggressive, our guide on [AI proof-of-concept to production in 90 days](/blog/ai-proof-of-concept-production-90-days) covers the broader playbook.

## Case Study: Ontario Automotive Parts Manufacturer

A Tier 2 automotive supplier in southern Ontario, producing machined aluminum components for a Big Three OEM. The inspection task was identifying surface porosity and tool marks on a critical sealing face. Human QC caught about 85% of defects on a good shift.

We deployed:

- Two 12 MP global-shutter cameras with dome lighting
- An NVIDIA Jetson Orin NX per station
- A YOLOv8-based custom model trained on 14,000 labelled images
- OPC UA integration to the existing PLC for automatic reject

After 90 days in production:

- **Detection rate**: 97.2% on labelled defects
- **False positive rate**: 0.8%
- **Line speed impact**: zero (inspection finished well inside cycle time)
- **Outgoing defect rate**: dropped from 1.2% to 0.08%
- **Project payback**: 10 months including hardware, software, and integration

This is not a pilot story. This is a running system on an Ontario line today, and it is representative of what is reasonable to expect when the scope is set properly.

## SR&ED and IRAP Eligibility

Computer vision deployments in Ontario manufacturing often qualify for significant non-dilutive funding, which changes project economics.

- **SR&ED**: Custom model development, novel architectures, deployment uncertainty on specific lighting or part geometries, and training pipeline work frequently meet the technological uncertainty and advancement tests. For the full SR&ED framework, see our [SR&ED tax credit guide for software development in Ontario](/blog/sred-tax-credit-software-development-ontario).
- **IRAP**: The NRC Industrial Research Assistance Program funds advisory and direct technical costs for AI deployments in Canadian manufacturing. We see IRAP cover a meaningful share of pilot-phase costs on projects that qualify. Our [IRAP funding guide for AI in Canada](/blog/irap-funding-ai-canada) walks through the application process.

Between SR&ED on the software and IRAP on the pilot, Ontario manufacturers regularly recover a substantial portion of their computer vision project cost, which is why the honest payback windows we quote assume the funding has been claimed.

## How Droz Helps

Droz builds computer vision inspection systems for Ontario manufacturers end-to-end: feasibility, optics and lighting design, custom model training, edge deployment, and production handoff. We do not sell a box. We deliver a working inspection station that your quality team owns, with a retraining pipeline for when your parts, defects, or volumes change.

If human inspection is your current plan and your defect escape rate is costing you customer chargebacks, warranty claims, or relationships, computer vision is the single highest-ROI AI deployment available to most Ontario manufacturers today. See our [AI consulting services in Ontario](/divisions/ai-consulting) for how we engage.

> **Ready to scope a computer vision inspection system?** [Talk to an Engineer](/contact) — bring sample parts and sample defect images, and we will tell you within a week whether the project is feasible at production speed.
