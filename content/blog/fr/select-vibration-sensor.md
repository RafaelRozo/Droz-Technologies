---
title: "Comment selectionner un capteur de vibration pour votre application industrielle"
slug: select-vibration-sensor
date: 2026-04-03
description: "Choisissez le bon capteur de vibration pour votre machinerie industrielle. Accelerometres, capteurs de velocite, sondes de proximite — specifications, applications et fournisseurs en Ontario."
author: Droz Technologies
division: industrial-manufacturing
category: Industrial Manufacturing
tags:
  - capteur de vibration
  - accelerometre
  - capteur de velocite
  - sonde de proximite
  - maintenance predictive
image: /images/blog/select-vibration-sensor-industrial.webp
imageAlt: "Selection de capteur de vibration pour machinerie industrielle — accelerometre monte sur logement de roulement de moteur dans une usine en Ontario"
readingTime: 6
keyword: vibration sensor manufacturer Ontario
locale: "fr"
---

## Mauvais capteur, mauvaises donnees, mauvaise decision

Choisir le mauvais capteur de vibration coute cher — non pas parce que le capteur coute beaucoup, mais parce que vous passerez six mois a collecter des donnees qui ne vous disent rien d'utile. Nous sommes entres dans des usines en Ontario ou un accelerometre de 2 000 $ surveillait un roulement de convoyeur a basse vitesse a 30 RPM. La reponse basse frequence du capteur commencait a 2 Hz. Les frequences de defaut du roulement etaient a 0,8 Hz. Invisibles. Le roulement a cede quand meme, a mis le convoyeur hors service pendant trois jours et a coute 87 000 $ en production perdue.

Le capteur etait correct. C'etait simplement le mauvais capteur pour le travail.

Ce guide couvre les trois principaux types de capteurs de vibration, quand utiliser chacun et quelles specifications faire correspondre a votre application. Si vous exploitez de l'equipement industriel en Ontario ou ailleurs au Canada, c'est le cadre de decision dont votre equipe de fiabilite a besoin.

**Besoin d'aide pour faire correspondre les capteurs a votre machinerie specifique? [Parlez a un de nos ingenieurs](/contact) — nous fabriquons des capteurs de vibration en Ontario et pouvons recommander la bonne configuration pour votre application.**

## Les trois types de capteurs

### Accelerometres

Les accelerometres mesurent l'acceleration vibratoire en unites g. C'est le type de capteur de vibration le plus polyvalent et le choix par defaut pour la plupart des applications industrielles au Canada.

**Ideaux pour :**
- Roulements a elements roulants (a billes, a rouleaux, coniques)
- Reducteurs (les frequences d'engrenement sont des evenements haute frequence)
- Machinerie haute vitesse (au-dessus de 1 200 RPM)
- Detection des defauts precoces de roulements (analyse d'enveloppe haute frequence)

**Specifications typiques :**
- Plage de frequence : 0,5 Hz a 15 kHz (certains modeles s'etendent jusqu'a 30 kHz)
- Sensibilite : 100 mV/g (usage general) ou 500 mV/g (applications basse frequence)
- Plage dynamique : 80-120 dB
- Montage : goujon, adhesif ou magnetique

**La specification qui compte le plus** : la plage de frequence. La reponse en frequence de votre capteur doit s'etendre au-dessus de la frequence de defaut la plus elevee que vous devez detecter. Pour un roulement sur un moteur de 3 600 RPM, les frequences de defaut de roulement peuvent atteindre 2-4 kHz. Pour l'engrenement d'un engrenage a 50 dents a 1 800 RPM, vous avez 1 500 Hz en fondamentale avec des harmoniques jusqu'a 6 kHz. Specifiez le capteur en consequence.

### Capteurs de velocite

Les capteurs de velocite mesurent les vibrations en mm/s (ou po/s). Ils etaient la norme industrielle avant que les accelerometres ne deviennent dominants, et ils occupent toujours un creneau important.

**Ideaux pour :**
- Evaluation globale de l'etat des machines selon ISO 10816/ISO 20816
- Surveillance basse a moyenne frequence (10 Hz a 1 kHz)
- Machinerie a vitesse moyenne (300-3 600 RPM)
- Applications ou vous voulez une lecture directe en mm/s sans integration a partir de l'acceleration

**Specifications typiques :**
- Plage de frequence : 2 Hz a 1,5 kHz
- Sensibilite : 4 mV/(mm/s) typique
- Auto-generateurs (types electrodynamiques) ou alimentes IEPE

**Quand choisir la velocite plutot que l'acceleration** : les limites d'alarme ISO 10816 sont definies en velocite mm/s. Si votre programme est bati autour des chartes de severite ISO et que vous voulez des lectures directes sans traitement du signal, un capteur de velocite simplifie votre flux de travail. De nombreuses usines ontariennes fonctionnant avec des programmes de surveillance conditionnelle bases sur ISO utilisent encore des capteurs de velocite pour cette raison.

### Sondes de proximite (courant de Foucault)

Les sondes de proximite mesurent l'ecart entre un arbre et son logement de palier — du deplacement, pas de la vibration. Elles sont fondamentalement differentes des accelerometres et des capteurs de velocite.

**Ideales pour :**
- Machines a paliers hydrodynamiques : grandes turbines, compresseurs centrifuges, generatrices
- Analyse des orbites d'arbre
- Surveillance de la position axiale
- Machinerie a basse vitesse (sous 300 RPM) ou les amplitudes d'acceleration et de velocite sont trop faibles pour une detection fiable

**Specifications typiques :**
- Plage de mesure : 0-2 mm (80 mil) typique
- Plage de frequence : CC a 10 kHz
- Sensibilite : 8 mV/um (200 mV/mil) typique
- Necessite un pilote/conditionneur externe

**Note critique** : Les sondes de proximite necessitent une installation precise — l'extremite de la sonde doit etre dans la plage lineaire de la surface cible, et le materiau cible doit etre ferromagnetique (ou la sonde doit etre calibree pour le materiau cible specifique). Ce n'est pas un capteur qu'on colle et qu'on oublie. Prevoyez une installation correcte par des techniciens formes.

## Faire correspondre le capteur a l'application

Voici une matrice de decision rapide pour l'equipement industriel courant dans les usines canadiennes :

| Equipement | Plage RPM | Capteur recommande | Pourquoi |
|-----------|-----------|-------------------|-----|
| Moteurs electriques | 1 200-3 600 | Accelerometre (100 mV/g) | Detection de defaut de roulement, capacite haute frequence |
| Pompes centrifuges | 1 800-3 600 | Accelerometre (100 mV/g) | Surveillance roulement + frequence de passage des aubes |
| Ventilateurs/soufflantes | 600-1 800 | Accelerometre (100 mV/g) ou velocite | Desequilibre, defauts de roulements |
| Reducteurs | Varies | Accelerometre (100 mV/g) | Les frequences d'engrenement necessitent une reponse haute frequence |
| Convoyeurs | 30-300 | Accelerometre (500 mV/g) | Haute sensibilite requise pour la detection de roulements a basse vitesse |
| Turbines a vapeur | 3 000-8 000 | Sondes de proximite + accelerometres | Les paliers hydrodynamiques necessitent du deplacement; le carter necessite de l'acceleration |
| Rouleaux de machine a papier | 60-600 | Accelerometre (500 mV/g) | Basses vitesses, besoin de haute sensibilite et reponse basse frequence jusqu'a 0,5 Hz |
| Compresseurs alternatifs | 300-900 | Accelerometre (10 mV/g, plage haute g) | Amplitudes elevees du mouvement alternatif; besoin d'une large plage dynamique |

[Vous ne savez pas quel capteur convient a votre application? Notre equipe d'ingenierie basee en Ontario peut specifier le bon capteur pour votre machinerie en un appel de 15 minutes.](/contact)

## Les specifications qui piegeent les gens

### Sensibilite vs plage de frequence

Les capteurs a haute sensibilite (500 mV/g) detectent des niveaux de vibration plus faibles — ideal pour la machinerie a basse vitesse. Mais la haute sensibilite comporte un compromis : une amplitude maximale mesurable reduite. Un capteur de 500 mV/g avec une plage de sortie de ±5V plafonne a 10g. C'est correct pour un rouleau de papier a 60 RPM. Ce n'est pas correct pour un compresseur alternatif qui voit des pics a 50g.

Faites correspondre la sensibilite a la fois au niveau de signal que vous essayez de detecter ET a l'amplitude maximale que le capteur rencontrera.

### Methode de montage

C'est le facteur le plus sous-estime dans la precision des mesures vibratoires.

- **Montage par goujon** : Reponse en frequence plate jusqu'a la pleine plage nominale du capteur. L'etalon de reference. Necessite un trou perce et taraude dans la surface de la machine.
- **Montage adhesif** : Bonne reponse jusqu'a environ 80 % de la plage nominale du capteur. Installation permanente sans percage. Acceptable pour la plupart des applications de surveillance.
- **Montage magnetique** : La reponse chute significativement au-dessus de 2-3 kHz en raison de la resonance de la fixation magnetique. Correct pour la collecte de donnees par routes. Non acceptable pour la surveillance permanente en ligne des defauts haute frequence.

Si votre usine en Ontario utilise des montages magnetiques sur un systeme de surveillance permanente en ligne, vous manquez des donnees haute frequence. Point final.

### Indice de protection environnementale

Le Canada exige IP67 minimum pour tout capteur installe dans un environnement industriel. Les usines ontariennes font face a des hivers a -30 °C (meme a l'interieur dans certaines installations), une humidite elevee, des zones de lavage et de la poussiere. Un capteur IP65 cote a -20 °C est une defaillance en attente dans un hiver canadien.

Verifiez ces specifications par rapport a votre environnement d'exploitation reel :
- Plage de temperature de fonctionnement : -40 °C a +125 °C pour les installations canadiennes
- Indice IP : IP67 minimum, IP68 pour les zones de lavage ou exterieur
- Immunite EMI/RFI : Critique pres des VFD (variateurs de frequence), qui sont omnipresents dans les usines ontariennes modernes

### Certification CSA

Si votre capteur sera installe dans une zone dangereuse classifiee (Classe I/II, Division 1 ou 2) au Canada, il doit porter la certification CSA. La certification FM (Factory Mutual) des Etats-Unis n'est pas legalement equivalente dans les juridictions canadiennes. C'est une lacune de conformite courante dans les usines ontariennes qui achetent de l'equipement de surveillance vibratoire importe — l'equipement arrive avec des marquages FM mais sans certification CSA, et l'usine soit l'installe en violation du Code de securite electrique de l'Ontario, soit le retourne et attend 12 semaines supplementaires.

Achetez aupres d'un fabricant de capteurs de vibration en Ontario qui certifie selon les normes CSA des le depart.

## En resume

La selection de capteurs n'est pas compliquee, mais elle est consequente. Le mauvais capteur ne vous donne pas seulement de mauvaises donnees — il vous donne une fausse confiance. Vous pensez que vous surveillez un roulement, mais vous manquez en realite completement les frequences de defaut.

Trois regles :

1. **Faites correspondre la plage de frequence aux frequences de defaut**, pas a la vitesse de la machine
2. **Faites correspondre la sensibilite a l'amplitude du signal** — tant le minimum que vous devez detecter que le maximum que vous rencontrerez
3. **Ne compromettez jamais l'indice de protection environnementale** pour les installations canadiennes

**[Parlez a un ingenieur de vos besoins en capteurs de vibration.](/contact)** Nous concevons et fabriquons des capteurs de vibration en Ontario, et nous vous aiderons a faire correspondre le bon capteur a chaque point de mesure de votre usine — sans frais pour la consultation.

Pour un apercu plus large des systemes de surveillance vibratoire fabriques au Canada et des comparaisons de cout total de possession, consultez notre [guide d'achat d'equipement de vibration canadien](/blog/canadian-vibration-equipment-buyers-guide).

En savoir plus sur notre [division de fabrication industrielle](/divisions/industrial-manufacturing) et la technologie de capteurs que nous fabriquons pour l'industrie canadienne.
