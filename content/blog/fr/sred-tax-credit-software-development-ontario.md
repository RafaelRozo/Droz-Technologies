---
title: "Crédits d'impôt RS&DE pour le développement logiciel : guide 2026 de l'Ontario"
slug: "sred-tax-credit-software-development-ontario"
date: "2026-04-05"
author: "Droz Technologies"
division: "software-development"
category: "Développement logiciel"
tags: ["RS&DE", "crédits d'impôt", "développement logiciel", "Ontario", "financement R-D", "CIIO", "CIRDO"]
locale: "fr"
description: "Guide 2026 sur les crédits d'impôt RS&DE pour le développement logiciel en Ontario. Nouvelle limite de 6 M$, règles d'admissibilité, documentation et comment réclamer les crédits fédéraux et provinciaux."
readingTime: 11
featured: true
image: "/images/blog/sred-tax-credit-guide.png"
---

Si votre équipe logicielle ontarienne a passé la dernière année à résoudre un problème technique difficile — pas seulement à livrer des fonctionnalités — vous laissez probablement six chiffres sur la table. La RS&DE est le plus important programme fédéral de R-D au Canada, et les mises à jour de 2026 la rendent nettement plus généreuse pour le développement logiciel en Ontario. Voici le guide que nous souhaiterions voir lu par chaque CTO et fondateur avant la fin de leur exercice financier.

Nous couvrirons ce qu'est la RS&DE, ce qui a changé en 2026, quels travaux logiciels sont réellement admissibles (et lesquels ne le sont pas), les crédits cumulables propres à l'Ontario, et comment documenter une demande qui survivra à une vérification de l'ARC.

> **Vous n'êtes pas certain que votre projet logiciel est admissible à la RS&DE?** [Parler à un ingénieur](/contact) — nous avons aidé des équipes ontariennes à déposer des demandes allant de 80 000 $ à 2,1 millions de dollars.

## Ce qu'est la RS&DE

RS&DE signifie Recherche scientifique et développement expérimental. Le programme est administré par l'Agence du revenu du Canada et constitue, par toute mesure, l'incitatif de R-D le plus précieux qu'une société logicielle canadienne puisse réclamer. Trois crédits se cumulent pour les sociétés ontariennes :

- **Crédit d'impôt fédéral à l'investissement RS&DE** : 35 % remboursable sur la première tranche des dépenses admissibles pour les sociétés privées sous contrôle canadien (SPCC). 15 % non remboursable au-delà de ce seuil ou pour les non-SPCC.
- **Crédit d'impôt de l'Ontario pour l'innovation (CIIO)** : 8 % remboursable sur les dépenses admissibles de RS&DE.
- **Crédit d'impôt de l'Ontario pour la recherche et le développement (CIRDO)** : 3,5 % non remboursable, utilisé contre l'impôt ontarien des sociétés à payer.

Pour une SPCC admissible en Ontario dépensant dans la limite de dépense, le bénéfice effectif peut atteindre **environ 64 cents par dollar** de dépense de R-D admissible une fois que les trois crédits se cumulent. Ce n'est pas un maximum théorique — nous le voyons sur de vraies demandes chaque année.

## Ce qui a changé en 2026 : les grandes mises à jour

Les mises à jour 2026 de la RS&DE sont les changements les plus importants que le programme ait connus en plus d'une décennie. Trois éléments importent pour les sociétés logicielles en Ontario :

### 1. Limite de dépense doublée à 6 millions de dollars

Le taux amélioré de 35 % remboursable commençait à disparaître lorsqu'une SPCC dépassait **3 millions de dollars** en dépenses admissibles. La limite est maintenant de **6 millions de dollars**, ce qui signifie que les sociétés logicielles ontariennes de taille moyenne qui atteignaient auparavant le plafond obtiennent maintenant 3 millions supplémentaires de dépenses au taux amélioré. Pour une société entièrement dans ce palier, le crédit fédéral supplémentaire à lui seul vaut jusqu'à **600 000 $ par année**.

### 2. Les dépenses en immobilisations sont de nouveau admissibles

De 2014 à 2025, les dépenses en immobilisations (serveurs, GPU, équipement spécialisé) étaient exclues de la RS&DE. Elles sont de retour en 2026. Pour les équipes d'IA et d'apprentissage automatique exploitant des grappes GPU sur place — un scénario très réel à travers l'Ontario — il s'agit d'un crédit direct sur du matériel auparavant non financé.

### 3. Seuils d'élimination progressive relevés

La fenêtre d'élimination progressive du capital imposable, qui réduit le taux amélioré à mesure qu'une SPCC grandit, a été relevée. Plus d'entreprises en expansion ontariennes se qualifieront pour le crédit remboursable complet en 2026 qu'au cours de toute autre année depuis 2012.

> **Avez-vous déposé une demande RS&DE 2025 et vous demandez si les nouvelles règles s'appliquent rétroactivement?** [Parler à un ingénieur](/contact) — la réponse dépend de la fin de votre exercice financier et nous pouvons vous guider.

## Ce qui est admissible : les trois critères

L'ARC applique trois critères à chaque demande RS&DE. Les trois doivent être satisfaits. C'est là que la plupart des demandes logicielles rejetées échouent.

### Critère 1 : Incertitude scientifique ou technologique

Vous devez avoir fait face à un problème où la solution n'était pas évidente pour un professionnel compétent dans le domaine, compte tenu de l'état actuel des connaissances publiques. Ce n'est pas « nous ne l'avions pas fait auparavant ». C'est « personne dans le domaine ne pouvait nous dire, à l'avance, si cette approche fonctionnerait ».

Pour le logiciel, une vraie incertitude ressemble à :

- Pouvons-nous atteindre une inférence en moins de 100 ms sur ce modèle sur du matériel edge?
- Cet algorithme de consensus distribué tiendra-t-il sous une partition que nous n'avons pas vue documentée?
- Pouvons-nous compresser ce flux de données de 40 % sans perdre la fidélité pour le modèle ML en aval?

### Critère 2 : Investigation systématique

Vous devez avoir abordé le problème systématiquement — hypothèses, expériences, résultats, itération. L'ARC veut voir la méthode scientifique, même si votre équipe l'appelle « sprints » et « spikes ». L'historique git, les documents de conception, les journaux d'expérimentation et les branches abandonnées sont tous des preuves.

### Critère 3 : Avancement des connaissances scientifiques ou technologiques

Les travaux doivent avoir fait progresser la base technologique sous-jacente, même seulement de façon incrémentale. L'avancement n'a pas besoin d'être brevetable ou publiable — mais il doit exister. « Nous avons construit un tableau de bord » n'est pas un avancement. « Nous avons développé une nouvelle heuristique de planification de requêtes qui a réduit la latence du 95e centile de 40 % sur notre charge de travail » l'est.

## Ce qui N'EST PAS admissible

C'est là que nous épargnons le plus de douleur aux équipes logicielles ontariennes. Les travaux suivants ne sont presque jamais admissibles :

- **Codage de routine** : applications CRUD, formulaires Web standards, intégrations simples avec des API documentées.
- **Fonctionnalités axées sur le marché** : construire une fonctionnalité parce qu'un client l'a demandée, où la « partie difficile » est la portée produit, pas la technique.
- **Corrections de bogues et maintenance** : sauf si le bogue lui-même révélait une incertitude sous-jacente.
- **Tests A/B de style commercial** : expérimenter les prix, le texte ou l'interface est une expérience d'affaires, pas technologique.
- **Travaux effectués entièrement avec des outils du commerce** d'une manière documentée.
- **Style, animation et finition UX front-end** — aussi astucieux soient-ils.

La position de l'ARC est explicite : *les résultats commerciaux et les résultats technologiques sont des questions différentes*. De nombreuses équipes logicielles ontariennes déposent des demandes qui décrivent brillamment la valeur commerciale et faiblement l'incertitude technique. Celles-là sont refusées.

## Activités logicielles admissibles (ce qui EST admissible en 2026)

Sur la base des demandes que nous avons vues approuvées pour des sociétés ontariennes au cours des trois dernières années, ces catégories sont constamment admissibles :

### IA et apprentissage automatique

- Entraînement de nouveaux modèles où la performance n'était pas prévisible à l'avance
- Développement de fonctions de perte personnalisées, d'architectures ou de régimes d'entraînement
- Résolution de l'incertitude de déploiement (latence d'inférence, quantification, contraintes edge)
- Adaptation de domaine où les techniques publiées ne se transféraient pas proprement

### Algorithmes nouveaux

- Problèmes d'optimisation où les approches standard échouent à l'échelle de vos données
- Algorithmes de graphes sur des topologies non standard
- Protocoles personnalisés de compression, d'encodage ou de diffusion

### Plateformes SaaS avec problèmes d'échelle difficiles

- Architectures multi-locataires résolvant de vrais problèmes d'isolement ou de voisin bruyant
- Systèmes en temps réel atteignant des budgets de latence nécessitant des approches nouvelles
- Systèmes distribués résolvant des défis réels de cohérence ou de partition

### Cybersécurité

- Méthodes de détection nouvelles
- Calcul à divulgation nulle ou préservant la vie privée
- Travaux sur la robustesse adversariale

Pour un aperçu connexe sur la mise en production de ces projets, consultez notre article sur [la preuve de concept IA à la production en 90 jours](/blog/ai-proof-of-concept-production-90-days).

## Exigences de documentation (à l'épreuve d'une vérification de l'ARC)

Une demande RS&DE ne vaut que sa documentation. L'ARC s'est déplacée progressivement vers des exigences plus strictes de documentation contemporaine, et 2026 n'est pas l'année pour couper les coins ronds. Au minimum, vous avez besoin de :

1. **Descriptions de projet** qui expliquent l'incertitude technologique en langage d'ingénierie, pas en langage marketing.
2. **Registres d'hypothèses et d'expériences** — documents de conception, RFC, archives de décisions architecturales, résultats de spikes.
3. **Suivi du temps par projet et activité**, idéalement au niveau des tâches. Les estimations rétroactives sont un drapeau rouge.
4. **Historique git et journaux de commit** associés au travail réclamé.
5. **Documentation des approches infructueuses**. L'ARC veut voir ce qui n'a pas fonctionné — c'est la preuve la plus solide d'une vraie incertitude.
6. **Preuve de qui a fait le travail et de ses qualifications.**

Les équipes qui suivent cela au fur et à mesure déposent leurs demandes en quelques jours. Les équipes qui le reconstruisent à la fin de l'année passent des semaines et obtiennent quand même des demandes plus faibles.

## Comment réclamer : T661, dépenses admissibles, échéances

La mécanique :

- **Le formulaire T661** est le formulaire fédéral principal de demande RS&DE. Il capte la description technique et les calculs de dépenses.
- **L'annexe 31** déclare le crédit d'impôt à l'investissement fédéral.
- **Les annexes 566 et 508** sont les formulaires du CIIO et du CIRDO de l'Ontario.
- **Les dépenses admissibles** incluent les salaires des employés directement engagés dans la RS&DE, les coûts de sous-traitance (à 80 % selon les règles de substitution actuelles), les matériaux consommés et — nouveauté en 2026 — les dépenses en immobilisations admissibles.
- **Délai de dépôt** : les demandes RS&DE doivent être déposées dans les **18 mois** suivant la fin de l'exercice financier. Manquez-le et la demande est perdue. Aucune prolongation possible.

La plupart des SPCC ontariennes déposent leur demande RS&DE avec leur déclaration T2 des sociétés. Les crédits remboursables sont payés en espèces, généralement dans les 60 jours suivant la cotisation pour les premiers déclarants et 180 jours si la demande est sélectionnée pour examen.

La [page du programme RS&DE de l'ARC](https://www.canada.ca/fr/agence-revenu/services/recherche-scientifique-developpement-experimental-programme-encouragements-fiscaux.html){:target="_blank"} contient les formulaires et documents de politique actuels.

## Particularité ontarienne : cumul CIIO + CIRDO

C'est la partie que de nombreux guides axés sur le fédéral ratent. Les sociétés ontariennes obtiennent deux crédits supplémentaires en plus de la RS&DE fédérale :

- **CIIO (8 % remboursable)** : pour les SPCC dont le revenu imposable est inférieur au seuil. Remboursable signifie que vous recevez l'argent même si vous ne devez aucun impôt.
- **CIRDO (3,5 % non remboursable)** : disponible pour toutes les sociétés ontariennes. Non remboursable signifie qu'il réduit l'impôt ontarien à payer mais n'est pas versé si vous n'avez aucun impôt à payer.

Sur une dépense RS&DE admissible de 1 million de dollars pour une SPCC ontarienne en 2026 :

- CII fédéral (35 % remboursable) : 350 000 $
- CIIO (8 % remboursable) : 80 000 $
- CIRDO (3,5 % non remboursable) : 35 000 $
- **Valeur totale du crédit : 465 000 $** — dont 430 000 $ sont remboursables en espèces.

C'est pourquoi la RS&DE est le plus important instrument de financement de la R-D pour les sociétés logicielles ontariennes. Si vous examinez également le financement fédéral à l'innovation, notre guide sur le [financement PARI pour l'IA au Canada](/blog/irap-funding-ai-canada) couvre les programmes complémentaires.

## Comment Droz aide les équipes logicielles ontariennes avec la RS&DE

Nous ne déposons pas les demandes RS&DE — c'est le travail de votre comptable ou d'un cabinet spécialisé. Ce que nous faisons, c'est bâtir le *dossier technique*. Nous aidons les équipes logicielles et d'IA ontariennes à identifier quels travaux sont admissibles, à documenter l'incertitude correctement au fur et à mesure et à structurer leur processus d'ingénierie pour que la demande soit défendable lors d'une vérification.

Si votre équipe bâtit quelque chose de véritablement difficile et que vous n'êtes pas certain que la description technique tiendra, c'est précisément là que nous aidons. Consultez nos [services de développement logiciel en Ontario](/divisions/software-development) pour voir comment nous travaillons.

Pour les équipes ontariennes travaillant sur des logiciels liés au gouvernement, notre [guide sur les contrats logiciels gouvernementaux en Ontario](/blog/government-software-contracts-ontario) s'agence bien avec la RS&DE — les deux voies de financement se cumulent souvent.

> **Prêt à vous assurer que votre demande RS&DE 2026 est défendable?** [Parler à un ingénieur](/contact) — nous examinerons vos documents de projet actuels et vous dirons où se trouvent les lacunes.
