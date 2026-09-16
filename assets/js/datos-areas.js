/* ==========================================================================
   Tú al Volante · Módulos por área
   --------------------------------------------------------------------------
   Cada área tiene la misma estructura, que es la que se dicta en sesión:

   A. Cinco casos de uso + la advertencia de seguridad propia del área
   B. El prompt completo, listo para copiar, con los campos entre [corchetes]
   C. La demostración en tres paneles:
      lo que le doy → lo que devuelve → lo que reviso antes de usarlo

   Para agregar un área nueva: copia un objeto completo, cambia el id y llena
   los mismos campos. No hay que tocar nada más: la página se arma sola.

   REGLA INNEGOCIABLE: todos los datos de este archivo son ficticios.
   Ni un nombre real de cliente, pasajero, estudiante, conductor, placa o tarifa.
   ========================================================================== */

const AREAS = [

/* ---------------------------------------------------------------- RECEPCIÓN */
{
  id:'recepcion',
  nombre:'Recepción y servicio al cliente',
  icono:'📞',
  linea:'emp',
  ciclo:'corto',
  resumen:'Es el área donde más se repite el mismo texto con otras palabras. Cada solicitud que llega desordenada por WhatsApp o por teléfono hay que convertirla en una confirmación clara, y cada cliente molesto necesita una respuesta que no empeore las cosas. Las dos son tareas de escritura, y escribir borradores es exactamente lo que mejor hace la herramienta.',
  casos:[
    {t:'Solicitud desordenada → confirmación formal',
     d:'Un mensaje de WhatsApp con la información suelta se convierte en un correo de confirmación ordenado, con lo que falta marcado entre corchetes.'},
    {t:'Lista de datos que faltó pedir',
     d:'Antes de pasar el servicio a operaciones, la herramienta te dice qué información quedó faltando para poder programarlo.'},
    {t:'Respuesta a una queja, en tono correcto',
     d:'Tú das los hechos; ella redacta un borrador que reconoce el problema sin aceptar responsabilidades que no te corresponde aceptar.'},
    {t:'Respuestas frecuentes con un mismo tono',
     d:'Las diez preguntas que más llegan, respondidas siempre igual, para que no dependa de quién contestó ese día.'},
    {t:'Correo en otro idioma',
     d:'Traducción de una confirmación al inglés para un pasajero corporativo extranjero, manteniendo el tono formal.'}
  ],
  alerta:'El nombre del cliente, su teléfono y su correo no se escriben. Reemplázalos por [Cliente A] y [contacto] antes de pegar el mensaje. La tarifa nunca se le pregunta a la IA: se consulta en el sistema.',
  prompt:{
    titulo:'De solicitud desordenada a confirmación completa',
    texto:`Eres asistente de una empresa de transporte terrestre corporativo en Colombia.

Este es un mensaje que nos llegó de un cliente, tal como llegó:

"[pega aquí el mensaje, cambiando el nombre por [Cliente A]]"

Haz dos cosas:

1. Redacta un correo de confirmación breve y cordial, en español,
   con los datos organizados en una lista. Lo que no esté en el mensaje
   déjalo entre corchetes, no lo inventes.

2. Debajo del correo, lista las preguntas que tengo que hacerle al cliente
   para poder programar el servicio.

Máximo 150 palabras el correo. Tono formal y cordial, sin exageraciones.`,
    consejo:'La instrucción "no lo inventes, déjalo entre corchetes" es la que evita que la herramienta se invente una hora de recogida que nadie dijo.'
  },
  demo:{
    entrada:`WhatsApp recibido 7:42 a. m.

"Buenos días necesito un transporte para el
miercoles, somos como 12 personas del equipo
de [Cliente A], salimos temprano del hotel
hacia la planta y volvemos en la tarde.
Nos confirman por favor. Gracias"`,
    salida:[
      {h:'> Correo de confirmación',
       txt:'Estimado [Cliente A]: confirmamos la recepción de su solicitud de servicio. Registramos los siguientes datos: fecha [miércoles, por confirmar]; pasajeros [12, por confirmar]; origen [hotel, dirección por confirmar]; destino [planta, dirección por confirmar]; hora de salida [por confirmar]; hora de regreso [por confirmar]. Quedamos atentos a los datos pendientes para programar el vehículo y enviarle la confirmación definitiva.'},
      {h:'> Datos que faltó pedir',
       txt:'1. Fecha exacta del miércoles. 2. Dirección de recogida y de destino. 3. Hora de salida y hora aproximada de regreso. 4. Número final de pasajeros. 5. Nombre y celular del contacto en sitio. 6. Si requiere equipaje o silla especial.'}
    ],
    revision:[
      'Que la fecha del "miércoles" sea la que el cliente quiso decir: eso lo confirmas tú, no la herramienta.',
      'Que no haya quedado ninguna tarifa, hora o dirección inventada donde debía ir un corchete.',
      'La disponibilidad real del vehículo y del conductor, en el sistema de programación.',
      'Que el tono corresponda al cliente: no todos los clientes corporativos reciben el mismo saludo.'
    ]
  }
},

/* --------------------------------------------------------------- OPERACIONES */
{
  id:'operaciones',
  nombre:'Operaciones y despacho',
  icono:'🚐',
  linea:'todas',
  ciclo:'corto',
  resumen:'Operaciones produce muchísima información suelta: novedades del turno, observaciones del despachador, demoras, cambios de última hora. El valor de la IA aquí no es decidir nada, es ordenar ese montón de texto para que tú veas el patrón que se repite y no solo el caso de ayer.',
  casos:[
    {t:'Agrupar las demoras por causa probable',
     d:'Una lista de observaciones escritas a las carreras se convierte en grupos ordenados de mayor a menor frecuencia.'},
    {t:'Circular a acudientes por cambio de ruta',
     d:'La comunicación de la Línea Escolar que hay que reescribir cada vez, redactada en un lenguaje que se entienda leyendo por celular.'},
    {t:'Notas del turno → reporte de novedades',
     d:'Lo que quedó escrito a mano durante el turno, ordenado en un reporte con la misma estructura todos los días.'},
    {t:'Checklist de alistamiento antes de la ruta',
     d:'Una lista de verificación que no dependa de la memoria de quien despacha esa mañana.'},
    {t:'Instrucciones claras para el conductor',
     d:'Convertir una indicación complicada en pasos cortos y sin ambigüedad, en el orden en que se ejecutan.'}
  ],
  alerta:'Sin placas, sin nombres de conductores y sin nombres de estudiantes. Usa [Vehículo 1], [Conductor A], [Ruta 7]. En la Línea Escolar la regla no tiene versión intermedia: un nombre más un colegio más una hora de recogida identifica a un menor.',
  prompt:{
    titulo:'Agrupar las demoras de la semana por causa probable',
    texto:`Eres analista de operaciones de una empresa de transporte terrestre.

Te paso una lista de servicios que se demoraron esta semana, con la
observación que escribió el despachador. Son datos ficticios.

Haz lo siguiente:

1. Agrúpalos por causa probable.
2. Ordena los grupos de mayor a menor frecuencia.
3. Para cada grupo, propón una pregunta que yo debería investigar.

No inventes causas que no estén sugeridas en las observaciones.
Si algo no se puede clasificar, ponlo en "sin información suficiente".

Lista:
[pega aquí, usando [Servicio 1], [Servicio 2]...
 sin placas, sin nombres de conductores ni de clientes]`,
    consejo:'La línea "no inventes causas que no estén sugeridas" convierte la respuesta en un ordenamiento de lo que tú ya sabes, no en una especulación.'
  },
  demo:{
    entrada:`[Servicio 1] 12 min tarde - trancón via principal
[Servicio 2] 20 min tarde - pasajero no bajo a tiempo
[Servicio 3] 15 min tarde - cierre vial obra
[Servicio 4]  8 min tarde - cambio de vehiculo ultima hora
[Servicio 5] 25 min tarde - trancón, accidente en la via
[Servicio 6] 10 min tarde - direccion mal registrada
[Servicio 7] 18 min tarde - espera de pasajero en porteria`,
    salida:[
      {h:'> Grupo 1 · Vía y tráfico (3 de 7)',
       txt:'Servicios 1, 3 y 5. Pregunta a investigar: ¿los tres salieron por el mismo corredor y a la misma franja horaria? Si es así, el ajuste es de hora de salida, no de conductor.'},
      {h:'> Grupo 2 · Espera del pasajero (2 de 7)',
       txt:'Servicios 2 y 7. Pregunta a investigar: ¿el cliente sabe cuántos minutos espera el vehículo antes de reportar ausencia? Puede ser un tema de comunicación previa, no de operación.'},
      {h:'> Grupo 3 · Información de la solicitud (1 de 7)',
       txt:'Servicio 6. Pregunta a investigar: ¿la dirección la confirmamos con el cliente antes de programar? Se conecta con el checklist de recepción.'},
      {h:'> Grupo 4 · Recursos (1 de 7)',
       txt:'Servicio 4. Pregunta a investigar: ¿por qué se cambió el vehículo a última hora y con cuánta anticipación se supo?'}
    ],
    revision:[
      'Que ningún servicio haya quedado clasificado en un grupo que su observación no dice.',
      'Que la conclusión coincida con lo que tú ya viste en la semana: si no coincide, el dato que manda es el tuyo.',
      'Que las cifras del conteo estén bien sumadas. Verificar cuentas es obligatorio.',
      'Que ninguna pregunta propuesta señale a una persona: se investigan causas, no personas.'
    ]
  }
},

/* ------------------------------------------------------------- CONTABILIDAD */
{
  id:'contabilidad',
  nombre:'Contabilidad y finanzas',
  icono:'📊',
  linea:'todas',
  ciclo:'corto',
  resumen:'Aquí hay que tener el criterio más fino de toda la empresa, por una razón: la herramienta escribe muy bien y calcula muy mal. Sirve para redactar el comentario que explica una cifra, para ordenar información y para explicarle a otra área un concepto financiero. No sirve para sacar la cuenta.',
  casos:[
    {t:'Comentario que explica la variación del mes',
     d:'Las cifras las pones tú; ella redacta el párrafo del informe, separando el dato de la interpretación.'},
    {t:'Correo de cobro cordial pero firme',
     d:'El mismo recordatorio de cartera, en un tono que no dañe la relación comercial.'},
    {t:'Explicar un concepto financiero a otra área',
     d:'Traducir "provisión", "causación" o "nota crédito" a un lenguaje que entienda operaciones o recepción.'},
    {t:'Ordenar información dispersa en una tabla',
     d:'Un listado pegado a mano se convierte en una tabla con las columnas que tú definas.'},
    {t:'Borrador de respuesta a una objeción de factura',
     d:'La estructura de la respuesta, con los puntos que hay que sustentar marcados para que tú los llenes.'}
  ],
  alerta:'Las cifras reales de la empresa no se pegan en una IA: trabaja con variaciones en porcentaje o con datos de ejemplo. Y una regla adicional que solo aplica aquí: toda operación aritmética que devuelva se verifica en la hoja de cálculo. La herramienta predice texto, no calcula.',
  prompt:{
    titulo:'Comentario que explica una variación del mes',
    texto:`Eres analista financiero de una empresa de transporte terrestre con tres
líneas de negocio: Empresarial, Escolar y Alquiler.

Con estas cifras ficticias, redacta el comentario que explica la variación
del mes para un comité de gerencia. Máximo 150 palabras, tono formal.

Cifras:
[pega aquí las variaciones en porcentaje, ficticias o entre corchetes]

Reglas:
- No inventes causas que yo no te haya dado.
- Separa el dato de la interpretación: primero qué pasó, después qué creemos.
- Si falta información para explicar algo, dilo explícitamente en el texto.
- No hagas ningún cálculo nuevo: usa solo los números que te di.`,
    consejo:'"No hagas ningún cálculo nuevo" es la línea más importante del prompt de contabilidad. Sin ella, la herramienta suma y se equivoca con total seguridad.'
  },
  demo:{
    entrada:`Variación mes contra mes (datos ficticios)

Linea Empresarial:  +8 %  ingresos
Linea Escolar:      -12 % ingresos
Linea Alquiler:     +3 %  ingresos
Costo combustible:  +6 %
Contexto conocido: en la Linea Escolar hubo
receso academico de dos semanas.`,
      salida:[
      {h:'> Dato',
       txt:'Los ingresos consolidados del mes presentan comportamientos distintos por línea de negocio: Empresarial creció 8 %, Alquiler 3 % y Escolar se contrajo 12 %. El costo de combustible aumentó 6 % frente al mes anterior.'},
      {h:'> Interpretación',
       txt:'La caída de la Línea Escolar es consistente con el receso académico de dos semanas reportado en el período, es decir, obedece a una menor operación programada y no a pérdida de contratos. El crecimiento de la Línea Empresarial compensa parcialmente esa contracción.'},
      {h:'> Información faltante',
       txt:'No se dispone del detalle de kilómetros recorridos por línea, por lo que no es posible establecer si el aumento del costo de combustible corresponde a mayor operación o a variación de precio. Se recomienda incorporar ese dato antes del comité.'}
    ],
    revision:[
      'Que los porcentajes del texto sean exactamente los que tú entregaste, sin ninguno agregado.',
      'Que no haya aparecido ninguna cifra absoluta en pesos: tú no la diste.',
      'Que la causa mencionada sea la que tú informaste y no una explicación plausible inventada.',
      'Que la frase de "información faltante" siga estando: es la que le da credibilidad al informe.'
    ]
  }
},

/* ---------------------------------------------------------- ÁREA DOCUMENTAL */
{
  id:'documental',
  nombre:'Área documental',
  icono:'📄',
  linea:'alq',
  ciclo:'corto',
  resumen:'El trabajo documental consiste en que nada importante quede enterrado en la página nueve. Extraer, comparar y resumir texto largo es de las cosas en las que la herramienta es más fuerte, siempre con la misma condición: el documento que se pega no puede tener datos de personas identificables.',
  casos:[
    {t:'Extraer fechas y obligaciones en una tabla',
     d:'De un contrato largo salen, en una sola tabla, los vencimientos, a quién obligan y en qué cláusula están.'},
    {t:'Resumen de un contrato en lenguaje sencillo',
     d:'Las condiciones legales explicadas en una página, para que el cliente entienda sin un abogado al lado.'},
    {t:'Comparar dos versiones de un documento',
     d:'Qué cambió entre la versión anterior y la nueva, en una lista de diferencias, no en prosa.'},
    {t:'Checklist de documentos por vencer',
     d:'Un control mensual armado a partir de las fechas que ya extrajiste.'},
    {t:'Acta a partir de notas sueltas',
     d:'Las notas de una reunión, convertidas en acta con decisiones, responsables y fechas separados.'}
  ],
  alerta:'Un documento con nombres, cédulas, datos de menores o condiciones comerciales negociadas no se pega. Si al quitarle esos datos el documento pierde sentido, entonces este no es el prompt: es un caso de revisión manual.',
  prompt:{
    titulo:'Extraer fechas y obligaciones de un documento largo',
    texto:`Eres asistente del área documental de una empresa de transporte.

Del siguiente texto, extrae una tabla con estas columnas:

| Fecha o plazo | Qué vence u obliga | A quién obliga | Cláusula |

Reglas:
- No resumas el documento: solo extrae lo que esté escrito.
- Si una fecha es ambigua, escríbela igual y márcala como "ambigua".
- Si algo no aparece en el texto, escribe "no indicado". No lo deduzcas.
- Al final, lista aparte los puntos que a tu juicio requieren revisión humana.

Texto:
[pega aquí el documento, con nombres y cifras reemplazados por corchetes]`,
    consejo:'"No resumas: solo extrae" evita que la herramienta interprete una cláusula. Interpretar es tu trabajo; ubicar es el suyo.'
  },
  demo:{
    entrada:`CONTRATO DE ALQUILER (extracto ficticio)

Clausula 4. El arrendatario debera devolver el
vehiculo el dia 30 del mes en curso antes de las
6:00 p. m.
Clausula 7. El pago se realizara dentro de los
cinco (5) dias habiles siguientes a la factura.
Clausula 9. Cualquier multa de transito generada
durante la vigencia sera asumida por el
arrendatario.
Clausula 12. La poliza debera renovarse
anualmente.`,
    salida:[
      {h:'> Tabla extraída',
       txt:'Día 30 del mes, 6:00 p. m. · devolución del vehículo · arrendatario · cláusula 4. — 5 días hábiles tras la factura · pago · arrendatario · cláusula 7. — Durante la vigencia · asumir multas de tránsito · arrendatario · cláusula 9. — Anual (ambigua) · renovación de póliza · no indicado · cláusula 12.'},
      {h:'> Puntos que requieren revisión humana',
       txt:'1. Cláusula 12: dice "anualmente" pero no indica desde qué fecha se cuenta el año ni quién debe renovar. 2. Cláusula 4: no indica qué ocurre si la devolución se hace después de las 6:00 p. m. 3. Cláusula 7: no define si los 5 días hábiles cuentan desde la emisión o desde la radicación de la factura.'}
    ],
    revision:[
      'Que cada fila corresponda a una cláusula que realmente existe en el documento.',
      'Que ninguna fecha "ambigua" se haya convertido en una fecha concreta.',
      'Que no falte ninguna cláusula con fecha: relee el documento buscando solo números.',
      'La interpretación legal de los puntos marcados. Eso no lo resuelve la herramienta.'
    ]
  }
},

/* ------------------------------------------------------------------ GERENCIA */
{
  id:'gerencia',
  nombre:'Gerencia',
  icono:'🧭',
  linea:'todas',
  ciclo:'corto',
  resumen:'El uso más valioso en gerencia no es que la IA escriba el informe: es que prepare la conversación. Convertir tres documentos largos en los tres puntos que hay que tratar, y sobre todo, en las preguntas que hay que hacer, ahorra la parte más cara del día.',
  casos:[
    {t:'Preparar un comité en cinco minutos',
     d:'De tus notas salen los puntos en orden de importancia, la pregunta de cada punto y un riesgo que nadie va a mencionar.'},
    {t:'Informe largo → cinco puntos',
     d:'Lo esencial de un documento de veinte páginas, con la advertencia de qué quedó por fuera.'},
    {t:'Comunicado interno',
     d:'Un mensaje a toda la empresa, en un tono que informe sin alarmar, revisado antes de enviarse.'},
    {t:'Preguntas para una reunión con proveedor',
     d:'Las preguntas incómodas que conviene tener listas antes de sentarse a negociar.'},
    {t:'Contraargumentos a una decisión propia',
     d:'Pedirle que discuta tu decisión: qué diría alguien en contra y qué evidencia pediría.'}
  ],
  alerta:'Nada de márgenes, tarifas negociadas, información de clientes identificables ni temas de personal. Y una advertencia propia del cargo: la herramienta es excelente produciendo argumentos convincentes para cualquier posición, incluida la equivocada. Úsala para preparar la discusión, no para cerrarla.',
  prompt:{
    titulo:'Preparar los puntos de un comité',
    texto:`Eres asistente de gerencia de una empresa de transporte terrestre.

Con la siguiente información, prepárame para un comité de [45] minutos:

1. Los tres puntos que debo tratar, en orden de importancia, con una
   frase de justificación cada uno.
2. Para cada punto, la pregunta concreta que debo hacer en la sala.
3. Un riesgo que probablemente nadie va a mencionar.
4. Qué información me falta para decidir bien.

Información:
[pega aquí tus notas, con datos ficticios o entre corchetes]

No propongas decisiones: propón preguntas.`,
    consejo:'"No propongas decisiones: propón preguntas" cambia por completo la utilidad de la respuesta. La decisión sigue siendo tuya, con tu información, que es más que la que le diste.'
  },
  demo:{
    entrada:`Notas sueltas para el comité (ficticias)

- Linea Escolar cayo 12 % por receso
- Dos quejas de puntualidad en Empresarial
- Combustible subio 6 %
- Falta renovar 3 polizas este trimestre
- Un cliente grande pidio propuesta nueva`,
    salida:[
      {h:'> Punto 1 · Puntualidad en Línea Empresarial',
       txt:'Va primero porque es el único que afecta directamente la relación con un cliente activo. Pregunta para la sala: ¿las dos quejas corresponden al mismo corredor y a la misma franja horaria, o son casos aislados?'},
      {h:'> Punto 2 · Propuesta al cliente grande',
       txt:'Tiene fecha límite externa, a diferencia de los demás. Pregunta: ¿qué nos están pidiendo que hoy no operamos, y cuánto costaría operarlo?'},
      {h:'> Punto 3 · Renovación de tres pólizas',
       txt:'Es administrativo pero tiene consecuencia legal si se vence. Pregunta: ¿quién es el responsable nombrado de cada una y en qué fecha exacta vence?'},
      {h:'> Riesgo que nadie va a mencionar',
       txt:'La caída del 12 % en Escolar se va a explicar sola por el receso, y por eso nadie va a revisar si además se perdió algún contrato dentro de ese período. La explicación cómoda tapa la pregunta.'},
      {h:'> Información faltante',
       txt:'No hay datos de kilómetros recorridos ni de costo por servicio, así que no se puede saber si el alza del 6 % en combustible afectó el margen o solo el gasto total.'}
    ],
    revision:[
      'Que el orden de importancia coincida con tu criterio: tú tienes contexto que la herramienta no tiene.',
      'Que ninguna cifra del texto sea distinta de la que entregaste.',
      'Que el "riesgo que nadie va a mencionar" sea real y no una frase elegante sin sustento.',
      'Que ningún punto cite un compromiso o una fecha que tú no escribiste.'
    ]
  }
},

/* ------------------------------------------------------------------ COMERCIAL */
{
  id:'comercial',
  nombre:'Comercial y ventas',
  icono:'🤝',
  linea:'emp',
  ciclo:'extendido',
  resumen:'Comercial lee documentos largos con plazos cortos. Un pliego de condiciones de cuarenta páginas hay que entenderlo hoy para decidir mañana si se presenta o no. Ahí la herramienta ahorra horas, siempre que lo que se pegue sea un documento público y no la estrategia de la casa.',
  casos:[
    {t:'Resumir un pliego antes de decidir',
     d:'Requisitos, plazos y causales de rechazo, extraídos en una lista antes de invertir tiempo en la propuesta.'},
    {t:'Comparar lo que piden contra lo que ofrecemos',
     d:'Una tabla de requisito por requisito, marcando dónde cumplimos y dónde no.'},
    {t:'Correo de seguimiento a un prospecto',
     d:'El tercer correo de seguimiento, que es el que a nadie le gusta escribir, sin sonar insistente.'},
    {t:'Preguntas de calificación de un prospecto',
     d:'Qué hay que preguntar en la primera llamada para no cotizar lo que no se va a cerrar.'},
    {t:'Estructura de una propuesta',
     d:'El esqueleto de la propuesta con los títulos y lo que va en cada sección, para que tú llenes el contenido.'}
  ],
  alerta:'Un pliego público se puede pegar. Un borrador interno de propuesta, una tarifa negociada, un margen o una condición comercial acordada con un cliente, no. Esa información es exactamente la que un competidor querría tener.',
  prompt:{
    titulo:'Resumir un pliego en criterios de decisión',
    texto:`Eres analista comercial de una empresa de transporte terrestre corporativo.

Te paso el texto de unos términos de referencia públicos. Devuélveme:

1. Objeto del contrato, en una frase.
2. Requisitos habilitantes, en lista.
3. Fechas y plazos clave, en tabla.
4. Causales de rechazo de la propuesta.
5. Los tres puntos donde veo más riesgo de no cumplir.

No opines si debemos presentarnos. Solo extrae y organiza.
Si algo no está en el texto, escribe "no indicado".

Texto:
[pega aquí el pliego público, sin anotaciones internas]`,
    consejo:'Ponle el filtro "no opines si debemos presentarnos": la decisión comercial depende de capacidad operativa que la herramienta no conoce.'
  },
  demo:{
    entrada:`Terminos de referencia (extracto ficticio)

Objeto: transporte de personal para sede
[Ciudad A], turnos diurno y nocturno.
Experiencia minima: 3 anos en contratos similares.
Flota minima requerida: 8 vehiculos modelo
2018 o superior.
Cierre de propuestas: [fecha], 4:00 p. m.
Causal de rechazo: entrega extemporanea o
falta de poliza vigente.`,
    salida:[
      {h:'> Objeto',
       txt:'Transporte de personal para la sede de [Ciudad A], en turnos diurno y nocturno.'},
      {h:'> Requisitos habilitantes',
       txt:'1. Experiencia mínima de 3 años en contratos similares. 2. Flota mínima de 8 vehículos modelo 2018 o superior. 3. Póliza vigente al momento de la entrega.'},
      {h:'> Fechas clave',
       txt:'Cierre de propuestas: [fecha], 4:00 p. m. Otras fechas del cronograma: no indicado.'},
      {h:'> Causales de rechazo',
       txt:'Entrega extemporánea de la propuesta. Falta de póliza vigente.'},
      {h:'> Puntos de riesgo',
       txt:'1. La exigencia de turno nocturno puede implicar disponibilidad de conductores adicional a la actual. 2. El requisito de modelo 2018 o superior restringe parte de la flota. 3. El documento no indica duración del contrato, lo que impide proyectar la inversión.'}
    ],
    revision:[
      'Que cada requisito citado exista textualmente en el pliego: aquí un error se paga con el rechazo de la propuesta.',
      'Que las fechas coincidan exactamente con el documento original, incluida la hora.',
      'Que ningún "no indicado" corresponda en realidad a algo que sí está, más adelante en el texto.',
      'Si cumplimos o no cada requisito. Eso se verifica contra la flota y los contratos reales, no contra la respuesta.'
    ]
  }
},

/* ------------------------------------------------------------------ RRHH */
{
  id:'rrhh',
  nombre:'Recursos Humanos',
  icono:'👥',
  linea:'todas',
  ciclo:'extendido',
  resumen:'Recursos Humanos es el área con más potencial de ahorro de escritura y con la línea roja más clara de toda la empresa: la IA puede ayudar a preparar, redactar y organizar, pero no participa en ninguna decisión sobre una persona.',
  casos:[
    {t:'Descripción de un cargo',
     d:'Funciones, requisitos y competencias a partir de una descripción informal del puesto.'},
    {t:'Guion de entrevista por competencias',
     d:'Preguntas de entrevista derivadas del cargo, con qué se busca escuchar en cada respuesta.'},
    {t:'Plan de inducción de una semana',
     d:'Un cronograma de inducción con temas por día, que después tú ajustas al área.'},
    {t:'Política interna en lenguaje claro',
     d:'Reescribir un reglamento en un lenguaje que la gente lea completo sin abandonarlo en el tercer párrafo.'},
    {t:'Resumen de resultados de una encuesta',
     d:'Agrupar comentarios abiertos y anónimos por tema, para ver qué se repite.'}
  ],
  alerta:'Nunca hojas de vida, cédulas, salarios, evaluaciones de desempeño ni información de salud. Y la regla que manda sobre todas: la IA no evalúa, no compara y no descarta candidatos. Una decisión sobre una persona la toma una persona.',
  prompt:{
    titulo:'De la descripción del cargo al guion de entrevista',
    texto:`Eres analista de Recursos Humanos de una empresa de transporte terrestre.

Con esta descripción de cargo ficticia, arma un guion de entrevista:

[pega aquí la descripción del cargo, sin datos de ningún candidato]

Estructura que necesito:
1. Cinco preguntas sobre experiencia concreta, no sobre opiniones.
2. Tres preguntas de situación ("cuénteme una vez que...").
3. Para cada pregunta, qué indica una buena respuesta y qué es una señal
   de alerta.
4. Dos preguntas que NO debo hacer por ser discriminatorias o ilegales
   en Colombia, con la explicación de por qué.

No evalúes a nadie ni propongas criterios de descarte automático.`,
    consejo:'El punto 4 convierte el prompt en una revisión de sesgos, que es uno de los usos más útiles y menos obvios de la herramienta.'
  },
  demo:{
    entrada:`Cargo (ficticio): Auxiliar de despacho

Recibe solicitudes, asigna vehiculos, comunica
novedades a los conductores y reporta demoras.
Turnos rotativos. Requiere manejo basico de
hoja de calculo y buena comunicacion escrita.`,
    salida:[
      {h:'> Preguntas de experiencia',
       txt:'1. ¿Cuántos servicios coordinaba en un turno normal en su trabajo anterior? 2. ¿Qué herramienta usaba para registrar las novedades? 3. ¿Cómo priorizaba cuando dos servicios necesitaban el mismo vehículo? 4. ¿Qué tipo de reportes entregaba al final del turno? 5. ¿Qué parte del proceso considera que se le daba mejor y cuál le costaba?'},
      {h:'> Preguntas de situación',
       txt:'1. Cuénteme una vez que un conductor no se presentó y usted tuvo que resolverlo. 2. Cuénteme una vez que se equivocó en una asignación: qué pasó y qué hizo. 3. Cuénteme cómo le comunicó a un cliente una demora que no dependía de usted.'},
      {h:'> Qué escuchar y qué es señal de alerta',
       txt:'Buena respuesta: cifras concretas, pasos en orden y mención del cliente afectado. Señal de alerta: respuestas en condicional ("yo haría"), ninguna cifra, o culpar a un tercero en las tres preguntas de situación.'},
      {h:'> Preguntas que NO debe hacer',
       txt:'1. "¿Tiene hijos o piensa tenerlos?" — indaga sobre la vida familiar y se usa para discriminar por maternidad; además no predice desempeño. 2. "¿De qué barrio viene?" — funciona como filtro socioeconómico encubierto. Si lo que importa es el desplazamiento en turnos rotativos, la pregunta correcta es sobre disponibilidad horaria.'}
    ],
    revision:[
      'Que ninguna pregunta toque estado civil, religión, salud, embarazo, origen o edad.',
      'Que las preguntas correspondan a lo que el cargo realmente hace en Servitravel.',
      'Que las "señales de alerta" sean observables y no juicios de personalidad.',
      'Que la entrevista la evalúe una persona. Nunca se le pide a la herramienta que puntúe a un candidato.'
    ]
  }
},

/* ------------------------------------------------------------- MANTENIMIENTO */
{
  id:'mantenimiento',
  nombre:'Mantenimiento y flota',
  icono:'🔧',
  linea:'todas',
  ciclo:'extendido',
  resumen:'En mantenimiento la información llega en el peor formato posible: reportes escritos a mano en el taller, observaciones del conductor, correos del proveedor de repuestos. Ordenar eso y priorizar es donde la herramienta aporta. El criterio técnico no se delega nunca.',
  casos:[
    {t:'Priorizar la flota con datos simples',
     d:'Una lista de kilometraje y última revisión se ordena por urgencia, con el criterio explícito a la vista.'},
    {t:'Reportes de taller → tabla',
     d:'Observaciones escritas de forma distinta cada vez, organizadas en columnas comparables.'},
    {t:'Explicar una falla en lenguaje del conductor',
     d:'Traducir el diagnóstico técnico a una instrucción clara de qué debe hacer y qué no debe hacer.'},
    {t:'Borrador de orden de trabajo',
     d:'La estructura de la orden con los campos que no se pueden olvidar.'},
    {t:'Preguntas para cotizar un repuesto',
     d:'Qué hay que preguntarle al proveedor para comparar dos cotizaciones que no son comparables.'}
  ],
  alerta:'Sin placas ni números de identificación de vehículos: usa [Vehículo 1]. Y la advertencia técnica del área: una recomendación de seguridad que salga de una IA no se ejecuta. La valida el jefe de mantenimiento contra la ficha del fabricante, que es la única fuente.',
  prompt:{
    titulo:'Priorizar mantenimientos con datos simples',
    texto:`Eres analista de flota de una empresa de transporte terrestre.

Te paso una lista ficticia de vehículos con su kilometraje actual y el
kilometraje de su última revisión.

1. Ordénalos por urgencia de revisión, del más urgente al menos urgente.
2. Explica en una frase el criterio que usaste para ordenar.
3. Marca cuáles no se pueden clasificar por falta de información.

No inventes intervalos de mantenimiento del fabricante: si no te doy el
intervalo, dilo y pídemelo.

Lista:
[pega aquí, usando [Vehículo 1], [Vehículo 2]... sin placas]`,
    consejo:'"No inventes intervalos del fabricante" es la línea clave: sin ella, la herramienta rellena con un número plausible que puede no corresponder a la ficha técnica real.'
  },
  demo:{
    entrada:`Vehiculo | Km actual | Km ultima revision
[Vehiculo 1] | 142.000 | 132.000
[Vehiculo 2] |  98.500 |  88.000
[Vehiculo 3] | 210.300 | 205.000
[Vehiculo 4] |  56.000 | no registrado
Intervalo del fabricante: 10.000 km`,
    salida:[
      {h:'> Orden por urgencia',
       txt:'1. [Vehículo 1]: 10.000 km desde la última revisión, justo en el límite del intervalo. 2. [Vehículo 2]: 10.500 km recorridos, sobrepasa el intervalo en 500 km. 3. [Vehículo 3]: 5.300 km, va a la mitad del intervalo.'},
      {h:'> Criterio usado',
       txt:'Se ordenó por kilómetros recorridos desde la última revisión comparados contra el intervalo de 10.000 km que usted entregó. No se consideró antigüedad ni tipo de operación porque no fueron suministrados.'},
      {h:'> No clasificables',
       txt:'[Vehículo 4]: no tiene registrado el kilometraje de la última revisión, por lo que no es posible calcular cuánto lleva recorrido. Requiere consulta en la hoja de vida del vehículo antes de priorizarlo.'}
    ],
    revision:[
      'Las restas. Verifícalas una por una: aquí la herramienta se equivoca con frecuencia y con total seguridad.',
      'Que el orden tenga sentido con lo que tú sabes del uso real de cada vehículo.',
      'Que el intervalo aplicado sea el de la ficha del fabricante y no uno inventado.',
      'Que ningún vehículo sin datos haya sido ubicado en el orden como si los tuviera.'
    ]
  }
},

/* ------------------------------------------------------------------ SISTEMAS */
{
  id:'sistemas',
  nombre:'Sistemas y tecnología',
  icono:'💻',
  linea:'todas',
  ciclo:'extendido',
  resumen:'Es el área que más rápido adopta la herramienta y la que más riesgo concentra, porque maneja las llaves de todo lo demás. El uso correcto es entender, documentar y explicar. El uso incorrecto es pegar cualquier cosa que tenga una credencial adentro.',
  casos:[
    {t:'Entender y documentar una consulta',
     d:'Explicar en español qué hace una consulta heredada que nadie documentó, antes de modificarla.'},
    {t:'Instructivo para usuarios no técnicos',
     d:'Convertir un procedimiento técnico en pasos que pueda seguir cualquier área.'},
    {t:'Explicar un error a un área no técnica',
     d:'Traducir el mensaje de error a qué pasó, a quién afecta y qué se está haciendo.'},
    {t:'Borrador de respuesta a un ticket',
     d:'La respuesta al usuario, con el mismo tono y estructura siempre.'},
    {t:'Lista de casos de prueba',
     d:'Qué habría que probar antes de subir un cambio, incluidos los casos que uno no pensó.'}
  ],
  alerta:'No se pegan credenciales, cadenas de conexión, claves de API, datos de producción ni información de clientes, aunque sea "solo para probar". Y el código que devuelva la herramienta se revisa línea por línea antes de ejecutarse: funciona no es lo mismo que está bien.',
  prompt:{
    titulo:'Explicar y revisar una consulta SQL heredada',
    texto:`Eres ingeniero de datos. Te paso una consulta SQL que existe en un
sistema de una empresa de transporte y que nadie documentó.

1. Explica en español, en cinco líneas, qué devuelve.
2. Lista los supuestos que hace sobre los datos.
3. Señala qué podría fallar o devolver un resultado incorrecto.
4. Propón una versión mejorada, explicando cada cambio.

No cambies la lógica de negocio sin advertirlo explícitamente.

Consulta:
[pega aquí la consulta, con nombres de tablas genéricos y sin datos]`,
    consejo:'Pide siempre los supuestos (punto 2). Es donde aparecen los errores que la consulta lleva años cometiendo en silencio.'
  },
  demo:{
    entrada:`SELECT cliente_id, COUNT(*) AS servicios
FROM servicios
WHERE fecha >= '2026-01-01'
GROUP BY cliente_id
ORDER BY servicios DESC;`,
    salida:[
      {h:'> Qué devuelve',
       txt:'Cuenta cuántos registros hay en la tabla de servicios por cada cliente, desde el 1 de enero de 2026 en adelante, y los ordena de mayor a menor cantidad.'},
      {h:'> Supuestos que hace',
       txt:'1. Que todo registro en la tabla es un servicio válido, incluidos los cancelados. 2. Que la columna fecha nunca es nula. 3. Que cliente_id nunca es nulo. 4. Que no hay registros duplicados por reprogramación.'},
      {h:'> Qué podría fallar',
       txt:'Si la tabla guarda también servicios cancelados o reprogramados, el conteo sobreestima la actividad de los clientes que más cambios piden, que es justamente el dato que se quiere analizar.'},
      {h:'> Versión mejorada',
       txt:'Se sugiere agregar un filtro por estado del servicio y excluir registros con cliente nulo. Cambia el resultado respecto de la consulta original: se advierte explícitamente, porque es una modificación de la lógica de negocio y debe confirmarse con quien usa el reporte.'}
    ],
    revision:[
      'Que los nombres de tablas y columnas correspondan al esquema real antes de ejecutar nada.',
      'Que la consulta propuesta se pruebe en un ambiente de pruebas, nunca directo en producción.',
      'Que el cambio de lógica esté aprobado por quien consume el reporte.',
      'Que no haya quedado ningún dato real pegado en el historial de la conversación.'
    ]
  }
}

];

/* ==========================================================================
   Ejemplos precargados del constructor C.L.A.R.O.
   --------------------------------------------------------------------------
   Uno por área, con la misma clave que el id del área de arriba. Sirven para
   que quien abra el constructor vea un pedido bien escrito de su propio puesto
   antes de escribir el suyo.

   Si agregas un área y no le pones ejemplo aquí, el constructor usa uno
   genérico: no se rompe nada.
   ========================================================================== */
const EJEMPLOS_CLARO = {
  recepcion:{
    labor:'conviertas en un correo de confirmación el mensaje que te voy a pegar',
    audiencia:'un cliente corporativo que solicitó un servicio por WhatsApp',
    output:'un correo breve, y debajo la lista de datos que falta confirmar'},
  operaciones:{
    labor:'agrupes por causa probable las demoras de la semana que te voy a pegar',
    audiencia:'el comité de operaciones, que necesita ver el patrón y no el caso suelto',
    output:'una tabla con las columnas causa, cantidad y pregunta a investigar'},
  contabilidad:{
    labor:'redactes el comentario que explica la variación del mes con las cifras que te doy',
    audiencia:'el comité de gerencia, que no conoce el detalle contable',
    output:'un párrafo de máximo 150 palabras, con el dato y la interpretación separados'},
  documental:{
    labor:'extraigas las fechas y obligaciones del documento que te voy a pegar',
    audiencia:'el área documental, que necesita controlar vencimientos',
    output:'una tabla con fecha, qué obliga, a quién obliga y cláusula'},
  gerencia:{
    labor:'me prepares los puntos y las preguntas para un comité de 45 minutos',
    audiencia:'yo, antes de entrar a la reunión',
    output:'tres puntos en orden de importancia, con una pregunta cada uno y un riesgo que nadie va a mencionar'},
  comercial:{
    labor:'extraigas requisitos, plazos y causales de rechazo del pliego que te voy a pegar',
    audiencia:'el equipo comercial, que tiene que decidir si nos presentamos',
    output:'una lista por bloques y una tabla de fechas clave'},
  rrhh:{
    labor:'armes un guion de entrevista a partir de la descripción de cargo que te doy',
    audiencia:'quien va a entrevistar, que no es especialista en selección',
    output:'preguntas numeradas, con qué escuchar y qué es señal de alerta en cada una'},
  mantenimiento:{
    labor:'ordenes por urgencia de revisión la lista de vehículos que te voy a pegar',
    audiencia:'el jefe de mantenimiento, que va a validar el criterio técnico',
    output:'una lista ordenada, el criterio que usaste y los casos que no se pueden clasificar'},
  sistemas:{
    labor:'expliques en español qué hace la consulta que te voy a pegar y qué podría fallar',
    audiencia:'un área no técnica que usa el reporte que sale de esa consulta',
    output:'cinco líneas de explicación, los supuestos en lista y los riesgos aparte'}
};
