---
title: "How to Select a Vibration Sensor for Your Industrial Application"
slug: select-vibration-sensor
date: 2026-04-03
description: "Choose the right vibration sensor for your industrial machinery. Accelerometers, velocity sensors, proximity probes — specs, applications, and Ontario suppliers."
author: Droz Technologies
division: industrial-manufacturing
category: Industrial Manufacturing
tags:
  - vibration sensor manufacturer Ontario
  - accelerometer
  - velocity sensor
  - proximity probe
  - predictive maintenance
image: /images/blog/select-vibration-sensor-industrial.webp
imageAlt: "Vibration sensor selection for industrial machinery — accelerometer mounted on motor bearing housing in Ontario plant"
readingTime: 6
keyword: vibration sensor manufacturer Ontario
---

## Wrong Sensor, Wrong Data, Wrong Decision

Picking the wrong vibration sensor is expensive — not because the sensor costs a lot, but because you'll spend six months collecting data that tells you nothing useful. We've walked into Ontario plants where a $2,000 accelerometer was monitoring a slow-speed conveyor bearing at 30 RPM. The sensor's low-frequency response started at 2 Hz. The bearing defect frequencies were at 0.8 Hz. Invisible. The bearing failed anyway, took the conveyor offline for three days, and cost $87,000 in lost production.

The sensor was fine. It was just the wrong sensor for the job.

This guide covers the three main vibration sensor types, when to use each one, and what specifications to match against your application. If you operate industrial equipment in Ontario or anywhere in Canada, this is the decision framework your reliability team needs.

**Need help matching sensors to your specific machinery? [Talk to one of our engineers](/contact) — we manufacture vibration sensors in Ontario and can recommend the right configuration for your application.**

## The Three Sensor Types

### Accelerometers

Accelerometers measure vibration acceleration in g-units. They're the most versatile vibration sensor type and the default choice for most industrial applications in Canada.

**Best for:**
- Rolling element bearings (ball, roller, tapered)
- Gearboxes (gear mesh frequencies are high-frequency events)
- High-speed machinery (above 1,200 RPM)
- Detecting early-stage bearing defects (high-frequency envelope analysis)

**Typical specifications:**
- Frequency range: 0.5 Hz to 15 kHz (some models extend to 30 kHz)
- Sensitivity: 100 mV/g (general purpose) or 500 mV/g (low-frequency applications)
- Dynamic range: 80-120 dB
- Mounting: stud, adhesive, or magnetic

**The specification that matters most**: frequency range. Your sensor's frequency response must extend above the highest defect frequency you need to detect. For a bearing on a 3,600 RPM motor, bearing defect frequencies can reach 2-4 kHz. For gear mesh on a 50-tooth gear at 1,800 RPM, you're looking at 1,500 Hz fundamental with harmonics up to 6 kHz. Spec the sensor accordingly.

### Velocity Sensors

Velocity sensors measure vibration in mm/s (or in/s). They were the industry standard before accelerometers became dominant, and they still hold an important niche.

**Best for:**
- Overall machine condition assessment per ISO 10816/ISO 20816
- Low-to-mid frequency monitoring (10 Hz to 1 kHz)
- Medium-speed machinery (300-3,600 RPM)
- Applications where you want a direct mm/s reading without integration from acceleration

**Typical specifications:**
- Frequency range: 2 Hz to 1.5 kHz
- Sensitivity: 4 mV/(mm/s) typical
- Self-generating (electrodynamic types) or IEPE-powered

**When to choose velocity over acceleration**: ISO 10816 alarm limits are defined in mm/s velocity. If your programme is built around ISO severity charts and you want direct readings without signal processing, a velocity sensor simplifies your workflow. Many Ontario plants running ISO-based condition monitoring programmes still use velocity sensors for this reason.

### Proximity Probes (Eddy Current)

Proximity probes measure the gap between a shaft and its bearing housing — displacement, not vibration. They're fundamentally different from accelerometers and velocity sensors.

**Best for:**
- Fluid-film (journal) bearing machines: large turbines, centrifugal compressors, generators
- Shaft orbit analysis
- Thrust position monitoring
- Slow-speed machinery (below 300 RPM) where acceleration and velocity amplitudes are too low to detect reliably

**Typical specifications:**
- Measurement range: 0-2 mm (80 mil) typical
- Frequency range: DC to 10 kHz
- Sensitivity: 8 mV/um (200 mV/mil) typical
- Requires external driver/conditioner

**Critical note**: Proximity probes require precise installation — the probe tip must be within the linear range of the target surface, and the target material must be ferromagnetic (or the probe must be calibrated for the specific target material). This is not a "stick it on and walk away" sensor. Budget for proper installation by trained technicians.

## Matching Sensor to Application

Here's a quick decision matrix for common industrial equipment found in Canadian plants:

| Equipment | RPM Range | Recommended Sensor | Why |
|-----------|-----------|-------------------|-----|
| Electric motors | 1,200-3,600 | Accelerometer (100 mV/g) | Bearing defect detection, high-frequency capability |
| Centrifugal pumps | 1,800-3,600 | Accelerometer (100 mV/g) | Bearing + vane pass frequency monitoring |
| Fans/blowers | 600-1,800 | Accelerometer (100 mV/g) or velocity | Imbalance, bearing defects |
| Gearboxes | Various | Accelerometer (100 mV/g) | Gear mesh frequencies require high-frequency response |
| Conveyors | 30-300 | Accelerometer (500 mV/g) | High sensitivity needed for low-speed bearing detection |
| Steam turbines | 3,000-8,000 | Proximity probes + accelerometers | Fluid-film bearings need displacement; casing needs acceleration |
| Paper machine rolls | 60-600 | Accelerometer (500 mV/g) | Low speeds, need high sensitivity and low-frequency response to 0.5 Hz |
| Reciprocating compressors | 300-900 | Accelerometer (10 mV/g, high-g range) | High amplitudes from reciprocating motion; need wide dynamic range |

[Not sure which sensor fits your application? Our Ontario-based engineering team can spec the right sensor for your machinery in a 15-minute call.](/contact)

## Specifications That Trips People Up

### Sensitivity vs Frequency Range

Higher sensitivity sensors (500 mV/g) detect smaller vibration levels — great for slow-speed machinery. But high sensitivity comes with a trade-off: reduced maximum measurable amplitude. A 500 mV/g sensor with a ±5V output range maxes out at 10g. That's fine for a 60 RPM paper roll. It's not fine for a reciprocating compressor that sees 50g peaks.

Match the sensitivity to both the signal level you're trying to detect AND the maximum amplitude the sensor will experience.

### Mounting Method

This is the most underestimated factor in vibration measurement accuracy.

- **Stud mount**: Flat frequency response to the sensor's full rated range. The gold standard. Requires a drilled and tapped hole in the machine surface.
- **Adhesive mount**: Good response to about 80% of the sensor's rated range. Permanent installation without drilling. Acceptable for most monitoring applications.
- **Magnetic mount**: Response drops off significantly above 2-3 kHz due to magnetic attachment resonance. Fine for route-based data collection. Not acceptable for permanent online monitoring of high-frequency defects.

If your Ontario plant is using magnetic mounts on a permanent online monitoring system, you're missing high-frequency data. Full stop.

### Environmental Rating

Canada demands IP67 minimum for any sensor installed in an industrial environment. Ontario plants deal with -30°C winters (even indoors in some facilities), high humidity, washdown areas, and dust. An IP65 sensor rated to -20°C is a failure waiting to happen in a Canadian winter.

Check these specifications against your actual operating environment:
- Operating temperature range: -40°C to +125°C for Canadian installations
- IP rating: IP67 minimum, IP68 for washdown or outdoor
- EMI/RFI immunity: Critical near VFDs (variable frequency drives), which are ubiquitous in modern Ontario plants

### CSA Certification

If your sensor will be installed in a classified hazardous area (Class I/II, Division 1 or 2) in Canada, it must carry CSA certification. FM (Factory Mutual) certification from the U.S. is not legally equivalent in Canadian jurisdictions. This is a common compliance gap in Ontario plants that purchase imported vibration monitoring equipment — the equipment arrives with FM markings but no CSA certification, and the plant either installs it in violation of the Ontario Electrical Safety Code or sends it back and waits another 12 weeks.

Buy from a vibration sensor manufacturer in Ontario that certifies to CSA standards from the start.

## The Bottom Line

Sensor selection isn't complicated, but it's consequential. The wrong sensor doesn't just give you bad data — it gives you false confidence. You think you're monitoring a bearing, but you're actually missing the defect frequencies entirely.

Three rules:

1. **Match frequency range to defect frequencies**, not to machine speed
2. **Match sensitivity to signal amplitude** — both the minimum you need to detect and the maximum you'll encounter
3. **Never compromise on environmental rating** for Canadian installations

**[Talk to an engineer about your vibration sensor requirements.](/contact)** We design and manufacture vibration sensors in Ontario, and we'll help you match the right sensor to every measurement point in your plant — no charge for the consultation.

For a broader look at Canadian-made vibration monitoring systems and total cost of ownership comparisons, read our [Canadian vibration equipment buyer's guide](/blog/canadian-vibration-equipment-buyers-guide).

Learn more about our [industrial manufacturing division](/divisions/industrial-manufacturing) and the sensor technology we build for Canadian industry.
