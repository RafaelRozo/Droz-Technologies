---
title: "Severidad de Vibración ISO 10816: Guía Práctica para Plantas Industriales"
slug: "iso-10816-vibration-severity-guide"
date: "2026-04-05"
author: "Droz Technologies"
division: "predictive-maintenance"
category: "Mantenimiento Predictivo"
tags: ["ISO 10816", "análisis de vibraciones", "ISO 20816", "mantenimiento predictivo", "manufactura industrial"]
locale: "es"
description: "Comprenda las zonas de severidad de vibración de la norma ISO 10816, la actualización ISO 20816 de 2022 y cómo interpretar las lecturas en equipos de planta. Guía práctica de los ingenieros de Droz."
readingTime: 8
featured: false
image: "/images/blog/iso-10816-chart.png"
---

La mayoría de los equipos de mantenimiento en plantas industriales de Latinoamérica tiene un medidor de vibraciones. Muchos menos saben qué significa realmente el número que aparece en la pantalla. Una lectura de 4.5 mm/s RMS en una bomba de 200 kW no representa el mismo problema que 4.5 mm/s en un ventilador de 30 kW, y la norma de severidad de vibración ISO 10816 es la razón por la cual podemos distinguir la diferencia. Esta guía es la versión en lenguaje claro que quisiéramos que cada técnico de confiabilidad en la región tuviera en su mesa de trabajo.

Revisaremos qué cubre realmente la norma, las cuatro zonas de severidad, cómo cambió la actualización ISO 20816 de 2022 y qué observamos en motores, bombas, ventiladores y compresores reales en plantas industriales de toda la región.

> **¿Necesita una segunda opinión sobre sus datos de vibración?** [Hablar con un ingeniero](/contact) — revisamos lecturas contra ISO 10816 e ISO 20816 para plantas industriales cada semana.

## Qué cubre realmente la ISO 10816-3

ISO 10816-3 es la parte de la familia ISO 10816 que aplica a máquinas industriales con una potencia nominal superior a 15 kW y velocidades de operación entre 120 y 15,000 RPM. Eso cubre la abrumadora mayoría de los equipos rotativos en una planta industrial: motores eléctricos, bombas centrífugas, ventiladores industriales, compresores, generadores y cajas de engranajes.

La norma mide **la velocidad de vibración en banda ancha en mm/s RMS**, tomada en la carcasa del cojinete, en tres direcciones (horizontal, vertical, axial). No es un análisis espectral. Es un único número que le dice, de un vistazo, si su máquina está sana, tolerable o en camino al fallo.

ISO 10816-3 divide las máquinas en dos grupos y dos categorías de soporte:

- **Grupo 1**: Máquinas grandes por encima de 300 kW, o máquinas eléctricas con altura de eje superior a 315 mm
- **Grupo 2**: Máquinas medianas de 15 a 300 kW, o máquinas eléctricas con altura de eje entre 160 y 315 mm
- **Soportes rígidos** vs **soportes flexibles** — esto cambia los valores de umbral

Los umbrales son más estrictos para máquinas pequeñas sobre cimentaciones rígidas, y más permisivos para máquinas grandes sobre aisladores flexibles. Esa es la primera cosa que la mayoría de los técnicos pasa por alto.

## Las cuatro zonas de severidad explicadas

ISO 10816-3 define cuatro zonas. Memorícelas. Guían cada conversación sobre si operar, vigilar, planificar o detener.

### Zona A — Buena (Puesta en marcha)

Este es el rango en el que debería estar una máquina recién comisionada. Para un motor de 75 kW sobre base rígida, eso típicamente significa **por debajo de 1.4 mm/s RMS**. Si su máquina opera aquí, no está leyendo el sensor equivocado — está haciendo algo bien. Déjela así.

### Zona B — Aceptable (Operación continua sin restricciones)

Las máquinas en Zona B son aptas para producción continua. Para el mismo motor de 75 kW, eso significa aproximadamente **1.4 a 2.8 mm/s RMS**. La mayor parte de su flota vive aquí. El trabajo en Zona B es tendenciar — ¿el número está estable, subiendo lentamente o saltando?

### Zona C — Insatisfactoria (Operación solo a corto plazo)

Aquí cambia la conversación. La Zona C va de aproximadamente **2.8 a 4.5 mm/s RMS** para un motor de 75 kW montado rígidamente. Una máquina en Zona C todavía está operando, pero usted no debería planificar dejarla en este estado hasta la próxima parada programada. Programe el trabajo. Ordene los repuestos. Reserve al equipo.

### Zona D — Inaceptable (Daño inminente)

Por encima de **4.5 mm/s RMS** para ese mismo motor, usted está en Zona D. Continuar operando arriesga un fallo catastrófico — cojinetes, sellos, acoplamientos o el eje mismo. La norma no dice "quizás". Está diciendo que la máquina se está dañando activamente. Una planta alimentaria con la que trabajamos ignoró una lectura de Zona D en un compresor de amoniaco de 110 kW durante 11 días. La factura de reparación fue de $187,000 y perdieron ocho turnos de producción.

> **¿Ve lecturas en Zona C o D de las que no está seguro?** [Hablar con un ingeniero](/contact) — lo ayudamos a decidir si se trata de un problema de sensor, de montaje o de un defecto real.

## Cómo interpretar sus lecturas frente a la norma

Un número aislado es casi inútil. Tres cosas determinan si su lectura importa:

1. **¿Está por encima o por debajo del límite Zona B/C para esa clase de máquina?**
2. **¿Está creciendo a lo largo de semanas y meses?** Un valor estable de 3.0 mm/s es menos alarmante que un 1.8 que subió a 2.5 en tres semanas.
3. **¿La vibración ocurre a una frecuencia que coincide con un fallo conocido?** ISO 10816 es banda ancha — no le dice *qué* está mal, solo *qué tan mal*. Para diagnóstico, todavía necesita análisis espectral. Para más sobre esto, vea nuestra guía sobre [análisis de vibraciones para manufactura](/blog/vibration-analysis-ontario-manufacturing).

El error más común que cometen las plantas es comparar una lectura con la tabla de zona equivocada. Una bomba de 55 kW y un compresor de 400 kW se evalúan contra umbrales completamente diferentes. Siempre asigne la máquina al Grupo 1 o Grupo 2, y a soporte rígido o flexible, antes de consultar la tabla de severidad.

## Qué cambió en ISO 20816 (Actualización 2022)

ISO 20816 es el marco de reemplazo que está absorbiendo lentamente a ISO 10816. La actualización de 2022 hizo tres cosas importantes:

- **Extendió la cobertura** a mediciones de vibración de eje (desplazamiento, no solo velocidad en la carcasa del cojinete) para máquinas con cojinetes de película fluida.
- **Añadió orientación explícita** para máquinas con variadores de frecuencia (VFD), que es la mayoría de lo que los fabricantes instalan hoy en día.
- **Refinó el cálculo de umbrales** para máquinas modernas de alta velocidad, particularmente aquellas por encima de 6,000 RPM donde los números antiguos de ISO 10816 eran ligeramente conservadores.

Para la mayoría de las plantas que operan motores, bombas y ventiladores a 1,800 o 3,600 RPM, las zonas de ISO 10816-3 siguen siendo la referencia correcta. Si opera turbinas, compresores de alta velocidad o máquinas críticas con cojinetes de casquillo, ISO 20816-2 o -5 es la norma a consultar.

El [catálogo oficial de normas ISO](https://www.iso.org/standard/63180.html){:target="_blank"} lista las partes actuales de ambas familias.

## Casos prácticos

Esto es lo que las zonas parecen en plantas reales que visitamos.

### Motores eléctricos (Objetivo Zona B: <2.8 mm/s)

Un motor de inducción de 150 kW que impulsa un ventilador de molino de papel. Línea base en puesta en marcha: 1.1 mm/s. Después de 18 meses: 2.3 mm/s. Todavía en Zona B, pero la tendencia era un incremento del 100%. Tomamos un espectro, encontramos el armónico 1x subiendo — desalineación de acoplamiento. Una alineación láser de cuatro horas lo devolvió a 1.3 mm/s.

### Bombas centrífugas (Objetivo Zona B: <4.5 mm/s para Grupo 2 flexible)

Una bomba de proceso de 75 kW en una planta química. Lectura: 5.8 mm/s, firmemente en Zona C. La causa raíz fue cavitación por un filtro de succión parcialmente obstruido. Una reparación de 30 minutos evitó un reemplazo de cojinete que, según los datos históricos, habría ocurrido en seis semanas.

### Ventiladores industriales (Objetivo Zona B: <4.5 mm/s)

Un ventilador de tiro inducido en una caldera, leyendo 7.2 mm/s axial — Zona D. Acumulación en un lado del rotor causaba desbalance. Balanceo en campo lo llevó a 2.4 mm/s en dos horas.

### Compresores reciprocantes y de tornillo

Los compresores son más difíciles porque vibran por diseño. Para compresores de tornillo en el rango de 15-300 kW, típicamente tratamos cualquier valor por encima de **4.5 mm/s** como Zona C y por encima de **7.1 mm/s** como Zona D, según ISO 10816-6, que es la parte específica para máquinas reciprocantes.

## Cuándo tomar acción en cada zona

Este es el plan de acción que le damos a cada planta con la que trabajamos:

- **Zona A**: Línea base y registro. Sin acción.
- **Zona B**: Tendenciar mensualmente. Investigue cualquier aumento del 50% o más aunque siga en Zona B.
- **Zona C**: Diagnosticar dentro de la semana. Planificar la reparación en la próxima oportunidad razonable — no espere hasta la parada anual.
- **Zona D**: Tratar como un defecto activo. Diagnosticar de inmediato. No asuma que puede "vigilarla" hasta el fin de semana.

La norma ISO 10816 no es un permiso para operar el equipo hasta el fallo. Es un lenguaje que permite que mantenimiento, operaciones y gerencia acuerden qué tan urgente es un problema.

## Cómo Droz ayuda a aplicar ISO 10816

Operamos programas de vibración por rutas y monitoreo permanente que interpretan cada lectura contra la zona ISO 10816 correcta — no contra un umbral genérico único. Nuestros informes marcan máquinas en Zona C y D, muestran tendencias contra la línea base y recomiendan la siguiente acción.

Si su programa actual solo le entrega números sin contexto, está pagando por datos y recibiendo ruido. Vea nuestros [servicios de mantenimiento predictivo](/divisions/predictive-maintenance) para ver cómo estructuramos un programa alineado con ISO 10816.

> **¿Listo para dejar de adivinar qué significan sus lecturas de vibración?** [Hablar con un ingeniero](/contact) — revisaremos un informe reciente contra ISO 10816 y le diremos qué máquinas realmente necesitan atención.
