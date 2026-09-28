export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO
  readingMinutes: number;
  sections: BlogSection[];
}

// Contenido en español únicamente -- son artículos dirigidos a dueños de
// financieras/prestamistas en República Dominicana y la región, no texto de
// producto que deba seguir el toggle ES/EN del panel. Traducirlos duplicaría
// el esfuerzo de redacción sin un público angloparlante real para este tipo
// de contenido de nicho.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'digitalizar-cobranza-puerta-a-puerta',
    title: 'Cómo digitalizar la cobranza puerta a puerta sin perder el trato personal',
    description: 'La cobranza en ruta funciona por la relación de confianza con el cliente. Digitalizarla no significa perder eso — significa dejar de perder recibos, cuadres y tiempo.',
    publishedAt: '2026-09-20',
    readingMinutes: 6,
    sections: [
      {
        paragraphs: [
          'Si tu financiera presta puerta a puerta, el negocio no vive en una hoja de cálculo — vive en la relación que el cobrador construye con cada cliente, visita tras visita. Por eso muchos dueños de financieras desconfían de "digitalizar" la cobranza: temen que un sistema frío reemplace ese trato cercano que es, en realidad, la ventaja competitiva del modelo.',
          'La buena noticia es que digitalizar no es eso. Es quitarle al cobrador y al dueño el trabajo que no aporta nada a esa relación — anotar en libreta, recordar de memoria quién pagó, cuadrar caja a mano al final del día — para que ambos puedan dedicar más tiempo a lo que sí importa: la visita, el cliente, la cobranza real.',
        ],
      },
      {
        heading: 'El costo invisible de la libreta y el WhatsApp',
        paragraphs: [
          'La mayoría de las financieras pequeñas y medianas en la región operan con una combinación de libreta física, notas de voz de WhatsApp y memoria del cobrador. Funciona… hasta que no funciona: un cobrador se enferma y nadie más sabe qué clientes le tocaban hoy, una libreta se moja o se pierde, o simplemente el dueño no tiene forma de saber, en tiempo real, cuánto se ha cobrado hoy sin llamar uno por uno a cada cobrador.',
          'Ese costo no aparece en ningún estado financiero, pero es real: horas de cuadre manual cada noche, discrepancias de caja que nadie puede explicar, clientes que "juran que ya pagaron" sin forma de verificarlo, y un dueño que solo puede confiar en lo que le reportan de palabra.',
        ],
      },
      {
        heading: 'Qué significa digitalizar bien (y qué no)',
        paragraphs: [
          'Digitalizar bien la cobranza en ruta no significa que el cliente ahora tenga que usar una app, ni que el cobrador deje de visitar en persona. Significa que cuando el cobrador llega a la casa del cliente, registra el cobro con un toque desde su celular — incluso sin señal, porque la app guarda el cobro localmente y lo sincroniza apenas hay internet — y ese cobro queda inmediatamente reflejado en el cuadre del día, sin que nadie tenga que sumar nada a mano al cerrar.',
          'El cliente sigue viendo la misma cara de siempre, el mismo trato. Lo único que cambia es que ahora existe un registro exacto de cada visita, cada cobro y cada excusa — y ese registro está disponible para el dueño del negocio en tiempo real, no al final del mes cuando ya es tarde para corregir nada.',
        ],
      },
      {
        heading: 'Por dónde empezar',
        paragraphs: [
          'No hace falta migrar toda la cartera de un día para otro. Lo más práctico es empezar con una sola ruta o un solo cobrador, correr en paralelo con el método actual una o dos semanas, y comparar los cuadres. La mayoría de los dueños de financieras que hacen esta prueba encuentran, ya en la primera semana, alguna diferencia entre lo que "se sabía" que se había cobrado y lo que realmente se cobró — y esa diferencia sola suele justificar el cambio.',
          'OCA Ruta está diseñado exactamente para este modelo de negocio: app móvil offline para el cobrador, panel web para el dueño con el cuadre de caja en tiempo real, y todo conectado sin que nadie tenga que aprender a usar una hoja de cálculo.',
        ],
      },
    ],
  },
  {
    slug: 'que-es-buro-de-credito-propio',
    title: 'Qué es un buró de crédito propio y por qué tu financiera debería tener uno',
    description: 'Los burós de crédito tradicionales son caros y lentos para una financiera pequeña. Un buró de crédito propio, compartido entre financieras similares, resuelve el mismo problema sin ese costo.',
    publishedAt: '2026-09-13',
    readingMinutes: 5,
    sections: [
      {
        paragraphs: [
          'Uno de los mayores riesgos de prestar dinero puerta a puerta es prestarle, sin saberlo, a alguien que ya le debe a otra financiera del barrio y no tiene ninguna intención de pagarle a ninguna de las dos. Los burós de crédito tradicionales existen justamente para esto — pero integrarse a uno cuesta dinero, papeleo, y generalmente está pensado para bancos grandes, no para una financiera de un cobrador o veinte.',
        ],
      },
      {
        heading: 'El problema del cliente moroso "invisible"',
        paragraphs: [
          'Sin un historial compartido, cada financiera solo ve su propia cartera. Un cliente que dejó de pagarle a la financiera de la esquina hace tres meses puede caminar dos cuadras y pedir un préstamo nuevo en la tuya, y no hay forma de saberlo — a menos que alguien lo reconozca de vista, lo cual no escala más allá de un puñado de clientes.',
          'Esto no es un problema teórico: es una de las causas más comunes de mora "sorpresa" en el sector — clientes que ya venían de una mala experiencia de pago en otro lado, y que la financiera nueva no tenía forma de anticipar.',
        ],
      },
      {
        heading: 'Cómo funciona un buró de crédito propio',
        paragraphs: [
          'La idea es simple: cuando varias financieras usan el mismo sistema, pueden compartir — de forma controlada y solo entre ellas, nunca públicamente — el historial de pago de sus clientes. Si tú reportas a un cliente como moroso, cualquier otra financiera en la plataforma que consulte esa cédula antes de aprobar un préstamo nuevo va a ver ese reporte.',
          'Esto no reemplaza tu criterio como prestamista — la decisión de prestar o no sigue siendo tuya — pero te da información que antes simplemente no existía: un historial real, cruzado entre negocios, en el momento exacto en que estás decidiendo si aprobar o no.',
        ],
      },
      {
        heading: 'Lo que hace bien a un buró de crédito propio para financieras pequeñas',
        paragraphs: [
          'A diferencia de un buró tradicional, uno integrado directamente al sistema que ya usas para prestar y cobrar no requiere ninguna integración adicional, ningún costo por consulta, ni ningún papeleo de incorporación. Se consulta la cédula del cliente en el mismo momento de aprobar el préstamo, y el reporte de un cliente moroso queda automático — no depende de que alguien se acuerde de reportarlo a mano un mes después.',
          'En OCA Ruta esto ya viene incluido en todos los planes: cada préstamo que marcas como vencido genera automáticamente un reporte visible para el resto de la red, y cada solicitud nueva te deja consultar el historial del cliente antes de aprobar — sin costo adicional ni configuración extra.',
        ],
      },
    ],
  },
  {
    slug: 'reducir-mora-prestamos-en-ruta',
    title: '5 formas de reducir la mora en préstamos de cobranza en ruta',
    description: 'La mora en préstamos de ruta rara vez es un solo problema — es la suma de varios pequeños fallos operativos. Estas cinco prácticas atacan las causas más comunes, no solo el síntoma.',
    publishedAt: '2026-09-06',
    readingMinutes: 7,
    sections: [
      {
        paragraphs: [
          'La mora nunca tiene una sola causa. Es la suma de decisiones de aprobación, seguimiento de cobro y visibilidad del dueño sobre lo que realmente está pasando en la calle. Estas cinco prácticas son las que más impacto real tienen en financieras que operan con el modelo de cobranza puerta a puerta.',
        ],
      },
      {
        heading: '1. Consulta el historial antes de aprobar, no después',
        paragraphs: [
          'La forma más barata de reducir la mora es no generarla — es decir, no aprobar préstamos a clientes con historial de impago conocido. Esto suena obvio, pero sin un buró de crédito compartido entre financieras (ver el artículo anterior de este blog), simplemente no hay forma de saberlo hasta que ya es tarde.',
        ],
      },
      {
        heading: '2. Cuotas ajustadas a la modalidad real de ingreso del cliente',
        paragraphs: [
          'Un cliente que vende en la calle todos los días tiene un flujo de caja diario, no mensual — y una cuota mensual grande le va a costar mucho más cumplir que catorce cuotas diarias pequeñas del mismo monto total. Ajustar la modalidad de cobro (diaria, semanal, quincenal) al ritmo real de ingresos del cliente, y no solo a lo que es más cómodo administrar, reduce directamente el atraso.',
        ],
      },
      {
        heading: '3. Visibilidad del dueño sobre la mora en tiempo real, no a fin de mes',
        paragraphs: [
          'Cuando el dueño del negocio solo ve el estado de la mora una vez al mes (o cuando algo ya se salió de control), no hay tiempo de reaccionar. Un reporte de mora que se actualiza cada día que un cobrador registra sus visitas permite intervenir a los 3-5 días de atraso, no a los 30 — y la diferencia entre esos dos momentos suele ser la diferencia entre cobrar y no cobrar.',
        ],
      },
      {
        heading: '4. Evidencia de cada visita, no solo del cobro',
        paragraphs: [
          'Cuando un cliente no paga, es útil que quede registrado no solo "no pagó" sino también que el cobrador sí fue a visitarlo — con hora y ubicación GPS del cobro (o del intento). Esto protege al negocio de dos problemas distintos: cobradores que no visitan y reportan clientes como "no encontrados" sin ir de verdad, y clientes que niegan que alguien pasó a cobrarles.',
        ],
      },
      {
        heading: '5. Cierre de caja diario que obliga a cuadrar, no a confiar',
        paragraphs: [
          'Un cierre de caja donde el cobrador simplemente reporta de palabra cuánto cobró (sin que el sistema ya sepa, por cada cobro individual registrado durante el día, cuánto debería haber) deja toda la responsabilidad de la honestidad en una sola persona. Un cierre "ciego" — donde el cobrador declara su monto sin ver antes lo que el sistema calculó, y luego se compara — detecta discrepancias el mismo día, no semanas después cuando ya es imposible reconstruir qué pasó.',
        ],
      },
      {
        heading: 'El patrón común',
        paragraphs: [
          'Ninguna de estas cinco prácticas depende de cobrar más agresivo o de endurecer las condiciones del préstamo. Todas dependen de tener mejor información, más rápido, en el momento en que todavía se puede actuar — que es exactamente lo que un sistema como OCA Ruta existe para darte: buró de crédito compartido, cobro por GPS, reportes de mora en tiempo real y cierre de caja con cuadre automático, todo conectado desde el mismo lugar.',
        ],
      },
    ],
  },
];

export function obtenerPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
