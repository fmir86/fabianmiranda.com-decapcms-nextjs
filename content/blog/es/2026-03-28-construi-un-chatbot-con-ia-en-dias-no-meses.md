---
title: "Construí un Chatbot con IA en Días, No Semanas. Esto es lo Que Eso Realmente Significa."
date: 2026-03-28T12:00:00-06:00
author: Fabian Miranda
excerpt: Llevo años integrando IA en flujos de trabajo empresariales. Pero nunca había construido algo tan "simple" como un chatbot para mi propio sitio. Cuando finalmente lo hice, el proceso reveló todo lo bueno y lo malo del desarrollo asistido por IA hoy.
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
slug: construi-un-chatbot-con-ia-en-dias-no-meses
---

Trabajo con IA todos los días. Construyo integraciones, analizo pipelines de datos, conecto sistemas desconectados para clientes de distintas industrias. He visto a la IA reescribir las reglas de lo que un solo desarrollador puede lograr.

Y sin embargo, hasta la semana pasada, nunca había construido un chatbot.

No porque no supiera cómo. Porque lo seguía posponiendo. Otras prioridades. Trabajo de clientes. La ironía del zapatero con los hijos descalzos. La paradoja clásica del consultor: pasás tanto tiempo resolviendo los problemas de otros que tu propio sitio funciona como un portafolio estático con cero interactividad.

Eso cambió en cuestión de días. No semanas, no meses. Días. Y el proceso me enseñó más sobre el estado actual del desarrollo asistido por IA que cualquier conferencia o whitepaper.

## El Efecto Amplificador

Esto es lo que nadie te dice sobre trabajar con herramientas de IA para programar: amplifican lo que ya sos.

Si sos un arquitecto con experiencia que entiende diseño de sistemas, gestión de dependencias, límites de seguridad y trade-offs de rendimiento, la IA se convierte en óxido nitroso para tu motor. Toma tu output de 200 caballos de fuerza y lo empuja a 800. Vos dibujás la arquitectura, definís las restricciones, elegís el stack, y la IA llena la implementación a una velocidad inconcebible hace tres años.

Pero si no sabés qué estás construyendo, o peor, si creés que seis palabras en un prompt deberían producir un SaaS de un millón de dólares, la IA se convierte en un amplificador de otro tipo. Amplifica tu ignorancia. Sobre-ingeniería soluciones que no pediste. Crea componentes Frankenstein sostenidos con cinta adhesiva y optimismo. Introduce vulnerabilidades de seguridad con la confianza de un ingeniero senior. Y el desastre crece como bola de nieve cuesta abajo, porque no podés debuggear lo que no entendés.

He visto ambos resultados de primera mano. La diferencia nunca es la IA. Siempre es el humano que la conduce.

## Codear vs. Ingeniería

Esta distinción importa más que nunca.

Codear es el acto de escribir instrucciones que una computadora puede ejecutar. Es sintaxis, snippets, patrones de Stack Overflow memorizados y reproducidos. Durante décadas, esa habilidad por sí sola podía darte una carrera sólida.

La ingeniería de software es algo completamente distinto. Es la disciplina de diseñar sistemas que son eficientes debajo del capó, no solo funcionales en la superficie. Es saber por qué elegís una base de datos sobre otra, entender las implicaciones de costo de un API call que se hace 10,000 veces por día, reconocer que un system prompt de 220,000 tokens enviado en cada request va a quebrar a tu cliente antes de que el producto salga.

Herramientas de IA como Claude Code ya escriben mejor boilerplate que la mayoría de developers junior. Manejan la sintaxis perfectamente. Conocen cada firma de API en cada framework popular. El rol del "codeador", la persona cuyo valor principal era memorizar cómo escribir un for-loop en siete lenguajes, está genuinamente en riesgo.

Pero el arquitecto, la persona que decide qué construir, cómo se conectan las piezas, dónde viven los límites, ese rol no está amenazado. Está potenciado.

## Los Titulares Que No Entendieron Nada

Dos declaraciones dominaron el discurso tech a principios de 2026.

En enero, el CEO de Anthropic, Dario Amodei, le dijo a The Economist en Davos que los modelos de IA podrían hacer "la mayoría, quizás todo" de lo que los ingenieros de software hacen actualmente, en un plazo de seis a doce meses. Agregó: "Tengo ingenieros dentro de Anthropic que dicen, ya no escribo código. Solo dejo que el modelo escriba el código. Yo lo edito."

Luego en marzo, en el GTC 2026 de NVIDIA, Jensen Huang soltó una bomba de otro tipo. Reveló que los ingenieros de software de NVIDIA "100% usan agentes de codificación ahora. Muchos de ellos no han generado una línea de código en un buen rato, pero son super productivos y están super ocupados." Anunció que cada ingeniero de NVIDIA recibiría un presupuesto anual de tokens adicional a su salario, aproximadamente la mitad de su salario base, para consumo de herramientas de IA. Sus palabras exactas en el All-In Podcast: "Si ese ingeniero de $500,000 no consumió al menos $250,000 en tokens, voy a estar profundamente alarmado." Cuando le preguntaron qué haría si un ingeniero reportara gastar solo $5,000, dijo: "I will go ape."

Cuando le preguntaron si NVIDIA está gastando alrededor de $2 mil millones anuales en tokens para su equipo de ingeniería, Huang respondió: "Estamos intentándolo."

Los medios se fueron con el ángulo catastrofista en ambas historias. "El CEO de NVIDIA dice que la programación está muerta." "Anthropic dice que los ingenieros quedarán obsoletos en 6 meses." Pánico. Indignación. Opiniones calientes.

Pero mirá lo que estos dos hombres realmente están haciendo, no diciendo.

Amodei no está despidiendo a sus ingenieros. Los está viendo volverse más productivos editando código generado por IA en vez de escribirlo desde cero. La habilidad cambió de tipear código a evaluarlo.

Huang no está reemplazando ingenieros con IA. Le está dando a cada uno un cuarto de millón de dólares en munición de IA por año y diciéndoles que la quemen. Comparó no usar IA con "usar lápiz y papel para diseñar chips." Sus ingenieros están produciendo más que nunca porque dedican su tiempo a diseñar soluciones, no a implementarlas carácter por carácter.

"El trabajo que antes tomaba meses ahora toma un par de días," dijo Huang. "Y vemos que solo se acelera desde aquí."

Esto es lo que los titulares no captan. El futuro no son ingenieros reemplazados por IA. Son ingenieros amplificados por ella. Los que entienden qué construir, empoderados por herramientas que manejan el cómo mecánico a una velocidad impensable hace dos años. Los que no distinguen entre arquitectura y sintaxis, esos son los que deberían preocuparse.

## Alfred AI: La Construcción

Permítanme recorrer lo que realmente construimos, porque las decisiones técnicas revelan la tesis.

**El stack:** Next.js (Pages Router), Vercel AI SDK para streaming, Google Gemini 3 Flash Preview como el LLM, Supabase para analytics de conversaciones, y el propio contenido markdown del sitio como base de conocimiento.

**La arquitectura:** Esto no es un sistema RAG. El sitio tiene 15 páginas y aproximadamente 100 posts de blog. El contenido total, una vez resumido a títulos, excerpts, tags y URLs, cabe cómodamente en la ventana de contexto de Gemini. Entonces, en vez de construir una base de datos vectorial, un pipeline de embeddings y una capa de retrieval, nos saltamos todo eso. El contenido va directo al system prompt. Simple. Efectivo. Sin complejidad innecesaria.

Pero acá es donde se acumulan las decisiones de ingeniería.

**Context caching.** Enviar 10-15K tokens de contenido del sitio en cada request es un desperdicio. La API de caching explícito de Gemini nos permite subir el contenido una vez, obtener un cache ID de vuelta, y referenciarlo en requests subsiguientes. Los tokens cacheados cuestan 90% menos. Para un sitio con tráfico moderado, la diferencia es que el chat cueste $5/mes vs. $1/mes.

**Rate limiting.** Un rate limiter basado en Map directamente en el API route. 20 requests por minuto por IP. Sin Redis, sin servicio externo. Simple y suficiente para un sitio personal.

**Sanitización de input.** Un filtro basado en regex atrapa patrones comunes de prompt injection, "ignore previous instructions," "DAN mode," "reveal your system prompt," antes de que lleguen al modelo. Los inputs sospechosos reciben una respuesta genérica sin consumir un solo token de API.

**Hardening del prompt.** El system prompt instruye explícitamente al modelo a nunca revelar sus instrucciones, nunca seguir comandos para cambiar su comportamiento, y mantenerse en personaje sin importar lo que el usuario intente.

**Streaming con personalidad.** El bot tiene un nombre, una personalidad, guardrails sobre qué temas puede discutir, e instrucciones explícitas sobre cómo formatear links. Cada referencia a una página interna debe ser un hyperlink clickeable en markdown. Los links externos están limitados a perfiles autorizados (LinkedIn, GitHub). El modelo tiene instrucción de pedir clarificación cuando los mensajes son vagos en vez de adivinar.

**Persistencia de sesión.** El historial del chat y el estado abierto/cerrado sobreviven la navegación entre páginas via sessionStorage. Un session ID estable (crypto.randomUUID) liga cada sesión del browser a su log de conversación en Supabase.

**Analytics.** Cada conversación se loguea en Supabase: mensaje del usuario, respuesta del bot, locale, session ID, dirección IP. Eventos de Google Analytics se disparan al abrir el chat, cerrarlo y enviar un mensaje. Los datos eventualmente se pasarán por un LLM para categorizar temas e identificar brechas de contenido.

## Lo Que Hizo la IA vs. Lo Que Hice Yo

Esta es la parte que importa.

La IA escribió la implementación. El endpoint de streaming, los componentes de React, las animaciones CSS, los tests de Playwright, la integración con Supabase. Línea por línea, la mayoría del código fue generado por Claude Opus.

Pero cada decisión arquitectónica fue mía. La elección de saltarse RAG y usar context stuffing. La decisión de cachear el contenido en los servidores de Gemini. La estrategia de rate limiting. El prompt engineering. Los breakpoints responsive. La decisión de usar un endpoint separado `/api/chat-log` porque las Netlify Functions matan los promises async después de que el response stream termina. La elección de Gemini 3 Flash sobre Claude Haiku o GPT-4.1 Mini, basada en un análisis real de costo-por-token entre tres proveedores.

La IA no toma esas decisiones. Las ejecuta. Y cuando las ejecuta mal (que lo hace, frecuentemente), necesitás saber lo suficiente para atraparla, redirigirla, y a veces simplemente decirle que pare.

Hubo momentos durante este build donde la IA dio vueltas en círculos por horas tratando de resolver un problema de CSS que cualquier frontend developer arreglaría en cinco minutos. Hubo momentos donde introdujo vulnerabilidades de seguridad que tuve que atrapar. Hubo momentos donde adivinó selectores del DOM en vez de inspeccionar la estructura real, rompiendo cosas repetidamente hasta que la forcé a verificar primero.

La IA fue el pair programmer más rápido e incansable con el que he trabajado. También fue, por momentos, el más tercamente equivocado.

## La Verdadera Conclusión

Si sos un desarrollador que ha pasado años entendiendo sistemas, arquitecturas, trade-offs, y la realidad desordenada de lanzar software a producción, este es tu momento. Las herramientas disponibles hoy por unos pocos dólares al mes te dan el output de un equipo pequeño. No porque la IA reemplace tu pensamiento, sino porque elimina la carga mecánica de convertir tu pensamiento en código.

Si sos una organización sentada sobre fuentes de datos desconectadas, procesos manuales que podrían automatizarse, o interacciones con clientes que podrían ser manejadas por un asistente inteligente entrenado con tu propio contenido, la barrera para construir esa solución acaba de caer en un orden de magnitud.

La pregunta no es si la IA puede ayudar a tu negocio. Es si tenés a alguien que sepa cómo conducirla.

Si no lo tenés, [hablemos](/es/contacto).
