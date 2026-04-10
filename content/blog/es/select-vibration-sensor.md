---
title: "Cómo seleccionar un sensor de vibración para su aplicación industrial"
slug: select-vibration-sensor
date: 2026-04-03
description: "Elija el sensor de vibración correcto para su maquinaria industrial. Acelerómetros, sensores de velocidad, sondas de proximidad — especificaciones, aplicaciones y proveedores de Ontario."
author: Droz Technologies
division: predictive-maintenance
category: Predictive Maintenance
tags:
  - equipo de vibración
  - acelerómetro
  - sensor de velocidad
  - sonda de proximidad
  - mantenimiento predictivo
locale: "es"
image: /images/blog/select-vibration-sensor-industrial.webp
imageAlt: "Vibration sensor selection for industrial machinery — accelerometer mounted on motor bearing housing in Ontario plant"
readingTime: 6
keyword: vibration sensor manufacturer Ontario
---

## Sensor equivocado, datos equivocados, decisión equivocada

Elegir el sensor de vibración equivocado es costoso — no porque el sensor cueste mucho, sino porque pasará seis meses recolectando datos que no le dicen nada útil. Hemos entrado en plantas de Ontario donde un acelerómetro de $2,000 estaba monitoreando un rodamiento de transportador de baja velocidad a 30 RPM. La respuesta de baja frecuencia del sensor comenzaba en 2 Hz. Las frecuencias de defecto del rodamiento estaban en 0.8 Hz. Invisibles. El rodamiento falló de todos modos, sacó el transportador de línea durante tres días y costó $87,000 en producción perdida.

El sensor estaba bien. Simplemente era el sensor equivocado para el trabajo.

Esta guía cubre los tres tipos principales de sensores de vibración, cuándo usar cada uno y qué especificaciones comparar contra su aplicación. Si opera equipo industrial en Ontario o en cualquier lugar de Canadá, este es el marco de decisión que su equipo de confiabilidad necesita.

**¿Necesita ayuda para emparejar sensores con su maquinaria específica? [Hablar con uno de nuestros ingenieros](/contact) — fabricamos sensores de vibración en Ontario y podemos recomendar la configuración correcta para su aplicación.**

## Los tres tipos de sensores

### Acelerómetros

Los acelerómetros miden la aceleración de vibración en unidades g. Son el tipo de sensor de vibración más versátil y la opción predeterminada para la mayoría de las aplicaciones industriales en Canadá.

**Mejor para:**
- Rodamientos de elementos rodantes (bolas, rodillos, cónicos)
- Cajas de engranajes (las frecuencias de engranaje son eventos de alta frecuencia)
- Maquinaria de alta velocidad (por encima de 1,200 RPM)
- Detección de defectos de rodamientos en etapa temprana (análisis de envolvente de alta frecuencia)

**Especificaciones típicas:**
- Rango de frecuencia: 0.5 Hz a 15 kHz (algunos modelos extienden hasta 30 kHz)
- Sensibilidad: 100 mV/g (uso general) o 500 mV/g (aplicaciones de baja frecuencia)
- Rango dinámico: 80-120 dB
- Montaje: espárrago, adhesivo o magnético

**La especificación que más importa**: rango de frecuencia. La respuesta de frecuencia de su sensor debe extenderse por encima de la frecuencia de defecto más alta que necesita detectar. Para un rodamiento en un motor de 3,600 RPM, las frecuencias de defecto de rodamiento pueden alcanzar 2-4 kHz. Para engranaje en un engranaje de 50 dientes a 1,800 RPM, estamos hablando de 1,500 Hz fundamental con armónicos hasta 6 kHz. Especifique el sensor acordemente.

### Sensores de velocidad

Los sensores de velocidad miden vibración en mm/s (o in/s). Fueron el estándar de la industria antes de que los acelerómetros se volvieran dominantes, y todavía tienen un nicho importante.

**Mejor para:**
- Evaluación general de condición de máquina según ISO 10816/ISO 20816
- Monitoreo de baja a media frecuencia (10 Hz a 1 kHz)
- Maquinaria de velocidad media (300-3,600 RPM)
- Aplicaciones donde quiere una lectura directa en mm/s sin integración desde aceleración

**Especificaciones típicas:**
- Rango de frecuencia: 2 Hz a 1.5 kHz
- Sensibilidad: 4 mV/(mm/s) típico
- Auto-generadores (tipos electrodinámicos) o alimentados por IEPE

**Cuándo elegir velocidad sobre aceleración**: Los límites de alarma ISO 10816 se definen en mm/s de velocidad. Si su programa está construido alrededor de las tablas de severidad ISO y quiere lecturas directas sin procesamiento de señal, un sensor de velocidad simplifica su flujo de trabajo. Muchas plantas de Ontario que operan programas de monitoreo de condición basados en ISO todavía usan sensores de velocidad por esta razón.

### Sondas de proximidad (corriente de Eddy)

Las sondas de proximidad miden la brecha entre un eje y su alojamiento de rodamiento — desplazamiento, no vibración. Son fundamentalmente diferentes de los acelerómetros y sensores de velocidad.

**Mejor para:**
- Máquinas con rodamientos de película de aceite (journal): turbinas grandes, compresores centrífugos, generadores
- Análisis de órbita del eje
- Monitoreo de posición de empuje
- Maquinaria de baja velocidad (por debajo de 300 RPM) donde las amplitudes de aceleración y velocidad son demasiado bajas para detectar de forma confiable

**Especificaciones típicas:**
- Rango de medición: 0-2 mm (80 mil) típico
- Rango de frecuencia: DC a 10 kHz
- Sensibilidad: 8 mV/um (200 mV/mil) típico
- Requiere driver/acondicionador externo

**Nota crítica**: Las sondas de proximidad requieren instalación precisa — la punta de la sonda debe estar dentro del rango lineal de la superficie objetivo, y el material objetivo debe ser ferromagnético (o la sonda debe calibrarse para el material objetivo específico). Este no es un sensor de "pegar y caminar". Presupueste la instalación adecuada por técnicos capacitados.

## Emparejando sensor con aplicación

Aquí hay una matriz de decisión rápida para equipo industrial común encontrado en plantas canadienses:

| Equipo | Rango de RPM | Sensor recomendado | Por qué |
|-----------|-----------|-------------------|-----|
| Motores eléctricos | 1,200-3,600 | Acelerómetro (100 mV/g) | Detección de defectos de rodamientos, capacidad de alta frecuencia |
| Bombas centrífugas | 1,800-3,600 | Acelerómetro (100 mV/g) | Monitoreo de rodamientos + frecuencia de paso de álabes |
| Ventiladores/sopladores | 600-1,800 | Acelerómetro (100 mV/g) o velocidad | Desbalanceo, defectos de rodamientos |
| Cajas de engranajes | Varios | Acelerómetro (100 mV/g) | Las frecuencias de engranaje requieren respuesta de alta frecuencia |
| Transportadores | 30-300 | Acelerómetro (500 mV/g) | Alta sensibilidad necesaria para detección de rodamientos a baja velocidad |
| Turbinas de vapor | 3,000-8,000 | Sondas de proximidad + acelerómetros | Los rodamientos de película de aceite necesitan desplazamiento; la carcasa necesita aceleración |
| Rodillos de máquinas de papel | 60-600 | Acelerómetro (500 mV/g) | Bajas velocidades, necesita alta sensibilidad y respuesta de baja frecuencia hasta 0.5 Hz |
| Compresores reciprocantes | 300-900 | Acelerómetro (10 mV/g, rango alto-g) | Altas amplitudes por movimiento reciprocante; necesita amplio rango dinámico |

[¿No está seguro de qué sensor se ajusta a su aplicación? Nuestro equipo de ingeniería en Ontario puede especificar el sensor correcto para su maquinaria en una llamada de 15 minutos.](/contact)

## Especificaciones que confunden a la gente

### Sensibilidad vs rango de frecuencia

Los sensores de mayor sensibilidad (500 mV/g) detectan niveles de vibración más pequeños — excelente para maquinaria de baja velocidad. Pero la alta sensibilidad viene con una compensación: amplitud máxima medible reducida. Un sensor de 500 mV/g con un rango de salida de ±5V se satura a 10g. Eso está bien para un rodillo de papel a 60 RPM. No está bien para un compresor reciprocante que ve picos de 50g.

Empareje la sensibilidad tanto con el nivel de señal que intenta detectar COMO con la amplitud máxima que el sensor experimentará.

### Método de montaje

Este es el factor más subestimado en la precisión de medición de vibración.

- **Montaje con espárrago**: Respuesta de frecuencia plana hasta el rango completo nominal del sensor. El estándar de oro. Requiere un agujero taladrado y roscado en la superficie de la máquina.
- **Montaje adhesivo**: Buena respuesta hasta aproximadamente el 80% del rango nominal del sensor. Instalación permanente sin taladrar. Aceptable para la mayoría de aplicaciones de monitoreo.
- **Montaje magnético**: La respuesta cae significativamente por encima de 2-3 kHz debido a la resonancia del acoplamiento magnético. Bien para recolección de datos por ruta. No aceptable para monitoreo permanente en línea de defectos de alta frecuencia.

Si su planta de Ontario usa montajes magnéticos en un sistema de monitoreo permanente en línea, está perdiendo datos de alta frecuencia. Punto.

### Clasificación ambiental

Canadá exige IP67 como mínimo para cualquier sensor instalado en un ambiente industrial. Las plantas de Ontario enfrentan inviernos de -30°C (incluso en interiores en algunas instalaciones), alta humedad, áreas de lavado y polvo. Un sensor IP65 clasificado hasta -20°C es una falla esperando suceder en un invierno canadiense.

Verifique estas especificaciones contra su ambiente operativo real:
- Rango de temperatura de operación: -40°C a +125°C para instalaciones canadienses
- Clasificación IP: IP67 mínimo, IP68 para lavado o exteriores
- Inmunidad EMI/RFI: Crítica cerca de VFDs (variadores de frecuencia), que son ubicuos en plantas modernas de Ontario

### Certificación CSA

Si su sensor se instalará en un área peligrosa clasificada (Clase I/II, División 1 o 2) en Canadá, debe llevar certificación CSA. La certificación FM (Factory Mutual) de EE.UU. no es legalmente equivalente en jurisdicciones canadienses. Este es un incumplimiento común en plantas de Ontario que compran equipo de monitoreo de vibración importado — el equipo llega con marcas FM pero sin certificación CSA, y la planta lo instala violando el Código de Seguridad Eléctrica de Ontario o lo devuelve y espera otras 12 semanas.

Compre de un fabricante de sensores de vibración en Ontario que certifique según estándares CSA desde el inicio.

## La línea final

La selección de sensores no es complicada, pero sí tiene consecuencias. El sensor equivocado no solo le da datos malos — le da falsa confianza. Usted cree que está monitoreando un rodamiento, pero en realidad está perdiendo las frecuencias de defecto por completo.

Tres reglas:

1. **Empareje el rango de frecuencia con las frecuencias de defecto**, no con la velocidad de la máquina
2. **Empareje la sensibilidad con la amplitud de la señal** — tanto el mínimo que necesita detectar como el máximo que encontrará
3. **Nunca comprometa la clasificación ambiental** para instalaciones canadienses

**[Hablar con un ingeniero sobre sus requisitos de sensores de vibración.](/contact)** Diseñamos y fabricamos sensores de vibración en Ontario, y le ayudaremos a emparejar el sensor correcto con cada punto de medición en su planta — sin costo por la consulta.

Para una mirada más amplia a los sistemas de monitoreo de vibración fabricados en Canadá y comparaciones de costo total de propiedad, lea nuestra [guía de compra de equipo de vibración canadiense](/blog/canadian-vibration-equipment-buyers-guide).

Conozca más sobre nuestra [división de manufactura industrial](/divisions/predictive-maintenance) y la tecnología de sensores que fabricamos para la industria canadiense.
