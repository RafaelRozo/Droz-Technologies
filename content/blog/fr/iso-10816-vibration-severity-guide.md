---
title: "Sévérité vibratoire ISO 10816 : guide pratique pour les usines ontariennes"
slug: "iso-10816-vibration-severity-guide"
date: "2026-04-05"
author: "Droz Technologies"
division: "predictive-maintenance"
category: "Maintenance prédictive"
tags: ["ISO 10816", "analyse vibratoire", "ISO 20816", "maintenance prédictive", "fabrication Ontario"]
locale: "fr"
description: "Comprenez les zones de sévérité vibratoire de l'ISO 10816, la mise à jour ISO 20816 de 2022 et comment interpréter les lectures sur les équipements des usines ontariennes. Guide pratique des ingénieurs Droz."
readingTime: 8
featured: false
image: "/images/blog/iso-10816-chart.png"
---

La plupart des équipes de maintenance en Ontario possèdent un vibromètre. Beaucoup moins savent ce que signifie réellement le chiffre affiché à l'écran. Une lecture de 4,5 mm/s RMS sur une pompe de 200 kW n'est pas le même problème que 4,5 mm/s sur un ventilateur de 30 kW, et la norme ISO 10816 de sévérité vibratoire est la raison pour laquelle nous pouvons faire la différence. Ce guide est la version en langage clair que nous aurions souhaité que chaque technicien en fiabilité de l'Ontario ait sur son établi.

Nous allons parcourir ce que la norme couvre réellement, les quatre zones de sévérité, ce que la mise à jour ISO 20816 de 2022 a changé, et ce que nous constatons sur de vrais moteurs, pompes, ventilateurs et compresseurs dans les usines d'Hamilton, de Burlington et du Grand Toronto.

> **Besoin d'une seconde opinion sur vos données vibratoires?** [Parler à un ingénieur](/contact) — nous examinons les lectures par rapport aux normes ISO 10816 et ISO 20816 pour les sites ontariens chaque semaine.

## Ce que couvre réellement l'ISO 10816-3

L'ISO 10816-3 est la partie de la famille ISO 10816 qui s'applique aux machines industrielles d'une puissance nominale supérieure à 15 kW et d'une vitesse d'exploitation entre 120 et 15 000 tr/min. Cela couvre la vaste majorité des équipements tournants d'une usine ontarienne : moteurs électriques, pompes centrifuges, ventilateurs industriels, compresseurs, génératrices et réducteurs.

La norme mesure la **vitesse vibratoire large bande en mm/s RMS**, prise sur le palier, dans trois directions (horizontale, verticale, axiale). Ce n'est pas une analyse spectrale. C'est un chiffre unique qui vous indique, d'un coup d'œil, si votre machine est en bonne santé, tolérable ou en fin de vie.

L'ISO 10816-3 divise les machines en deux groupes et deux catégories de support :

- **Groupe 1** : grosses machines au-dessus de 300 kW, ou machines électriques avec une hauteur d'arbre supérieure à 315 mm
- **Groupe 2** : machines moyennes de 15 à 300 kW, ou machines électriques avec une hauteur d'arbre entre 160 et 315 mm
- **Supports rigides** vs **supports flexibles** — cela change les valeurs seuils

Les seuils sont plus stricts pour les petites machines sur des fondations rigides, et plus permissifs pour les grosses machines sur des isolateurs flexibles. C'est la première chose que la plupart des techniciens oublient.

## Les quatre zones de sévérité expliquées

L'ISO 10816-3 définit quatre zones. Mémorisez-les. Elles déterminent chaque conversation sur la décision d'exploiter, surveiller, planifier ou arrêter.

### Zone A — Bon (mise en service neuve)

C'est la plage dans laquelle une machine nouvellement mise en service devrait se situer. Pour un moteur de 75 kW sur base rigide, cela correspond typiquement à **moins de 1,4 mm/s RMS**. Si votre machine fonctionne ici, vous ne lisez pas le mauvais capteur — vous faites quelque chose correctement. Laissez-la tranquille.

### Zone B — Acceptable (exploitation à long terme sans restriction)

Les machines en zone B sont aptes à la production continue. Pour ce même moteur de 75 kW, cela signifie environ **1,4 à 2,8 mm/s RMS**. La majorité de votre parc se trouve ici. Le travail en zone B est le suivi des tendances — le chiffre est-il stable, en hausse progressive ou en saut?

### Zone C — Insatisfaisant (exploitation à court terme uniquement)

C'est là que la conversation change. La zone C s'étend d'environ **2,8 à 4,5 mm/s RMS** pour un moteur de 75 kW monté rigide. Une machine en zone C fonctionne encore, mais vous ne devriez pas prévoir de la laisser dans cet état jusqu'au prochain arrêt. Planifiez les travaux. Commandez les pièces. Réservez l'équipe.

### Zone D — Inacceptable (dommage imminent)

Au-dessus de **4,5 mm/s RMS** pour ce même moteur, vous êtes en zone D. La poursuite de l'exploitation risque une défaillance catastrophique — roulements, joints, accouplements ou l'arbre lui-même. La norme ne dit pas « peut-être ». Elle dit que la machine est activement en train de s'endommager. Une usine alimentaire ontarienne avec laquelle nous avons travaillé a ignoré une lecture en zone D sur un compresseur à ammoniac de 110 kW pendant 11 jours. La facture de réparation s'est élevée à 187 000 $ et ils ont perdu huit quarts de production.

> **Vous voyez des lectures en zone C ou D dont vous n'êtes pas certain?** [Parler à un ingénieur](/contact) — nous vous aiderons à déterminer s'il s'agit d'un problème de capteur, de montage ou d'un vrai défaut.

## Comment interpréter vos lectures par rapport à la norme

Un chiffre isolé est presque inutile. Trois éléments déterminent si votre lecture est importante :

1. **Est-elle au-dessus ou en dessous de la limite zone B/C pour cette classe de machine?**
2. **Est-elle en tendance haussière sur des semaines ou des mois?** Un 3,0 mm/s stable est moins alarmant qu'un 1,8 qui est monté à 2,5 en trois semaines.
3. **La vibration se produit-elle à une fréquence correspondant à un défaut connu?** L'ISO 10816 est large bande — elle ne vous dit pas *ce qui* cloche, seulement *à quel point*. Pour le diagnostic, vous avez encore besoin de l'analyse spectrale. Pour en savoir plus, consultez notre guide sur [l'analyse vibratoire pour la fabrication en Ontario](/blog/vibration-analysis-ontario-manufacturing).

L'erreur la plus fréquente des usines ontariennes est de comparer une lecture au mauvais tableau de zones. Une pompe de 55 kW et un compresseur de 400 kW sont jugés selon des seuils complètement différents. Associez toujours la machine au groupe 1 ou au groupe 2, et au support rigide ou flexible, avant de consulter le tableau de sévérité.

## Ce qui a changé dans l'ISO 20816 (mise à jour 2022)

L'ISO 20816 est le cadre de remplacement qui absorbe lentement l'ISO 10816. La mise à jour de 2022 a fait trois choses importantes :

- **Couverture étendue** aux mesures de vibration d'arbre (déplacement, pas seulement vitesse sur le palier) pour les machines à paliers lisses.
- **Orientation explicite ajoutée** pour les machines avec variateurs de fréquence (VFD), soit la majorité de ce que les manufacturiers ontariens installent aujourd'hui.
- **Mathématiques des seuils affinées** pour les machines modernes à haute vitesse, particulièrement au-dessus de 6 000 tr/min où les anciens chiffres de l'ISO 10816 étaient légèrement conservateurs.

Pour la plupart des usines ontariennes faisant tourner moteurs, pompes et ventilateurs à 1 800 ou 3 600 tr/min, les zones de l'ISO 10816-3 demeurent la bonne référence. Si vous exploitez des turbines, des compresseurs haute vitesse ou des machines critiques à paliers lisses, c'est l'ISO 20816-2 ou -5 qu'il faut consulter.

Le [catalogue officiel des normes ISO](https://www.iso.org/standard/63180.html){:target="_blank"} répertorie les parties actuelles des deux familles.

## Cas pratiques en Ontario

Voici à quoi ressemblent les zones dans de vraies usines que nous visitons à travers l'Ontario.

### Moteurs électriques (cible zone B : <2,8 mm/s)

Un moteur à induction de 150 kW entraînant un ventilateur de papeterie dans le nord de l'Ontario. Référence à la mise en service : 1,1 mm/s. Après 18 mois : 2,3 mm/s. Toujours en zone B, mais la tendance était une augmentation de 100 %. Nous avons fait un spectre, trouvé que l'harmonique 1x augmentait — désalignement d'accouplement. Un alignement laser de quatre heures l'a ramenée à 1,3 mm/s.

### Pompes centrifuges (cible zone B : <4,5 mm/s pour groupe 2 flexible)

Une pompe de procédé de 75 kW dans une usine chimique de Burlington. Lecture : 5,8 mm/s, fermement en zone C. La cause première était la cavitation due à une crépine d'aspiration partiellement bloquée. Une correction de 30 minutes a évité un remplacement de roulement que les données historiques indiquaient aurait suivi dans les six semaines.

### Ventilateurs industriels (cible zone B : <4,5 mm/s)

Un ventilateur à tirage induit sur une chaudière, lecture de 7,2 mm/s axial — zone D. Une accumulation d'un côté du rotor causait un balourd. L'équilibrage sur place l'a ramené à 2,4 mm/s en deux heures.

### Compresseurs alternatifs et à vis

Les compresseurs sont plus difficiles car ils vibrent par conception. Pour les compresseurs à vis dans la plage de 15 à 300 kW, nous traitons typiquement tout ce qui dépasse **4,5 mm/s** comme zone C et tout ce qui dépasse **7,1 mm/s** comme zone D, selon l'ISO 10816-6, qui est la partie spécifique aux machines alternatives.

## Quand agir à chaque zone

Voici le guide que nous donnons à chaque usine ontarienne avec laquelle nous travaillons :

- **Zone A** : établir la référence et consigner. Aucune action.
- **Zone B** : tendance mensuelle. Enquêter sur toute augmentation de 50 % et plus, même en zone B.
- **Zone C** : diagnostiquer dans la semaine. Planifier la réparation à la prochaine opportunité raisonnable — ne pas attendre l'arrêt annuel.
- **Zone D** : traiter comme un défaut actif. Diagnostiquer immédiatement. Ne présumez pas que vous pouvez « surveiller » jusqu'à la fin de semaine.

La norme de sévérité vibratoire ISO 10816 n'est pas un permis d'exploiter l'équipement jusqu'à la défaillance. C'est un langage qui permet à la maintenance, aux opérations et à la direction de s'entendre sur l'urgence d'un problème.

## Comment Droz aide les usines ontariennes à appliquer l'ISO 10816

Nous exécutons des programmes de vibration par itinéraire et sous surveillance permanente à travers l'Ontario qui interprètent chaque lecture selon la bonne zone ISO 10816 — pas un seuil générique unique. Nos rapports signalent les machines en zone C et D, montrent les tendances par rapport à la référence et recommandent la prochaine action.

Si votre programme actuel vous remet simplement des chiffres sans contexte, vous payez pour des données et vous obtenez du bruit. Consultez nos [services de maintenance prédictive en Ontario](/divisions/predictive-maintenance) pour voir comment nous structurons un programme aligné sur l'ISO 10816.

> **Prêt à arrêter de deviner ce que signifient vos lectures vibratoires?** [Parler à un ingénieur](/contact) — nous examinerons un rapport récent par rapport à l'ISO 10816 et vous dirons quelles machines nécessitent réellement une attention.
