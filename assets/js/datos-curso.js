/* ==========================================================================
   Tú al Volante · Datos del curso
   --------------------------------------------------------------------------
   Contenido transversal de la Sesión 1: glosario, familias de tareas,
   biblioteca de prompts, ejercicios, casos del semáforo, cuestionario de
   repaso, demostración de predicción y material del facilitador.

   Todos los ejemplos son ficticios y del sector transporte.
   ========================================================================== */

/* ============================== EL CURSO ============================== */
const CURSO = {
  programa:'Tú al Volante',
  bajada:'IA aplicada al día a día de Servitravel',
  sesion:1,
  total:3,
  titulo:'Encendido',
  pregunta:'¿Qué es esto y qué puede hacer por mí?',
  facilitador:'Diego · Analista de transporte',
  fecha:'16 de septiembre de 2026',
  duracion:'60 minutos',
  llevas:'Tu primer resultado real, hecho por ti'
};

/* ====================== GLOSARIO / CONCEPTOS CLAVE ===================== */
/* nivel: basico | medio | avanzado
   d = definición en una frase · a = analogía · f = nota para el facilitador */
const CONCEPTOS = [
{id:'ia', t:'Inteligencia Artificial', nivel:'basico',
 d:'Software que aprende patrones a partir de ejemplos, en lugar de seguir reglas que una persona escribió una por una.',
 a:'El filtro de correo basura: nadie le escribió la lista de todos los correos basura del mundo. Aprendió a reconocerlos viendo millones.',
 f:'Esta es la única definición que hay que dejar clara en la sesión 1. Si alguien pide más, lleva la conversación a un ejemplo, no a la teoría.'},

{id:'ia-generativa', t:'IA generativa', nivel:'basico',
 d:'La que además de reconocer y clasificar, crea contenido nuevo: escribe, resume, ordena, redacta, traduce.',
 a:'Generativa porque genera. No tiene más misterio que eso.',
 f:'Aquí está el cambio de los últimos años. Antes clasificaba; ahora produce. De eso trata toda la capacitación.'},

{id:'prompt', t:'Prompt · el pedido', nivel:'basico',
 d:'La instrucción que tú le escribes, en español y con tus palabras. Es lo único que controlas y es lo que determina la calidad del resultado.',
 a:'La dirección que le das a un conductor. Si dices "hacia el norte", llegas a cualquier parte.',
 f:'Usa siempre "pedido" al hablar y "prompt" entre paréntesis. La palabra en inglés asusta a la mitad de la sala.'},

{id:'modelo', t:'Modelo', nivel:'basico',
 d:'El programa ya entrenado: la cosa que efectivamente responde. Gemini y Claude son modelos con una pantalla encima para escribirles.',
 a:'El motor. Tú manejas el carro, no el motor.',
 f:'Sirve para separar "herramienta" (lo que abres) de "modelo" (lo que responde) cuando alguien pregunta por qué dos herramientas contestan distinto.'},

{id:'llm', t:'LLM · modelo grande de lenguaje', nivel:'medio',
 d:'Un programa que leyó una cantidad enorme de texto y de ahí aprendió a predecir cuál es la palabra que sigue. Eso es literalmente todo lo que hace, encadenado miles de veces.',
 a:'El teclado del celular que propone la siguiente palabra, llevado al extremo.',
 f:'Si alguien pregunta "¿y con eso basta para escribir un correo?", la respuesta es: sí, y sorprende. Luego pasa al puente hacia las alucinaciones.'},

{id:'entrenamiento', t:'Entrenamiento', nivel:'medio',
 d:'La etapa en la que el programa leyó todo ese texto y extrajo los patrones. Ya terminó: no está aprendiendo mientras tú hablas con él.',
 a:'La formación del conductor: ocurrió antes, no mientras maneja.',
 f:'Este concepto desarma el miedo de "le estoy enseñando con mis datos". Lo que sí puede pasar con la información es otro tema: eso va en el semáforo.'},

{id:'alucinacion', t:'Alucinación', nivel:'basico',
 d:'Cuando la herramienta inventa un dato falso y lo presenta con total seguridad, sin ninguna señal de duda.',
 a:'El niño que ve un lobo por primera vez y dice "¡perro!", convencidísimo.',
 f:'No uses la palabra "mentira": mentir implica intención. Aquí no hay intención, hay relleno de un hueco.'},

{id:'frase-bisagra', t:'La frase bisagra', nivel:'basico',
 d:'"La IA optimiza plausibilidad, no veracidad." Su trabajo es que la frase suene bien, no que sea cierta.',
 a:'Es la respuesta corta a casi cualquier pregunta sobre por qué se equivoca.',
 f:'Dila literal y escríbela en el tablero si hay. Es la base de todo el módulo de seguridad de la sesión 3.'},

{id:'fecha-corte', t:'Fecha de corte', nivel:'medio',
 d:'El conocimiento del modelo llega hasta cierta fecha. Lo que pasó después no lo sabe, a menos que la herramienta busque en internet en ese momento.',
 a:'Un empleado que se fue de vacaciones hace meses y volvió hoy: sabe mucho, pero no lo de esta semana.',
 f:'No afirmes la fecha de corte de ninguna herramienta de memoria. Verifícala en la documentación oficial antes de la sesión.'},

{id:'ventana', t:'Ventana de contexto', nivel:'medio',
 d:'Cuánto texto puede tener presente al mismo tiempo dentro de una conversación. Si le pegas algo larguísimo, puede perder el principio.',
 a:'La memoria de trabajo de la conversación, no la memoria de la empresa.',
 f:'Explica por qué conviene dividir un documento largo en partes en vez de pegarlo completo.'},

{id:'token', t:'Token', nivel:'avanzado',
 d:'La IA no lee letras ni palabras completas: lee fragmentos de palabra llamados tokens. Por eso a veces se equivoca contando letras o haciendo cuentas.',
 a:'Leer por sílabas sueltas en lugar de leer palabras.',
 f:'Solo sácalo si alguien pregunta. No aporta nada al trabajo diario y desvía la sesión diez minutos.'},

{id:'algoritmo', t:'Algoritmo', nivel:'basico',
 d:'Una receta de pasos que sigue un programa para hacer algo. La palabra asusta más de lo que significa.',
 a:'Una ruta escrita: primero esto, después aquello, y si llueve, esto otro.',
 f:'Si alguien usa la palabra en la sala, aterrízala de inmediato con esta frase y sigue.'},

{id:'machine-learning', t:'Machine learning · aprendizaje automático', nivel:'medio',
 d:'El nombre técnico de enseñarle a un programa con ejemplos en vez de con reglas.',
 a:'Es exactamente lo mismo que ya explicaste con el niño y el perro.',
 f:'No abras el tema por iniciativa propia en el ciclo corto. Está en la sesión 2 del ciclo extendido.'},

{id:'deep-learning', t:'Redes neuronales · deep learning', nivel:'avanzado',
 d:'Una forma de aprendizaje automático organizada en capas, inspirada muy de lejos en cómo funciona el cerebro.',
 a:'Es lo que hay dentro de las herramientas que vamos a usar. No hace falta saber más que eso para manejarlas.',
 f:'Máximo dos frases. Si insisten, ofrece el ciclo extendido de siete sesiones.'},

{id:'semaforo', t:'Semáforo de la información', nivel:'basico',
 d:'La regla de decisión de Servitravel: verde, información libre que se puede escribir; amarillo, hay que anonimizar antes; rojo, no se escribe nunca.',
 a:'Un semáforo de verdad: no se discute con él, se obedece.',
 f:'En la sesión 1 se menciona; en la sesión 3 se dicta completo con casos de las tres líneas de negocio.'},

{id:'regla-oro', t:'Regla de oro', nivel:'basico',
 d:'"Si no lo enviarías por correo a un proveedor externo sin firmar un acuerdo de confidencialidad, no lo escribas en una IA."',
 a:'Es una prueba de treinta segundos que funciona sin saber nada de tecnología.',
 f:'Es lo único de seguridad que se dicta en la sesión 1, y se dice literal, sin reformular.'},

{id:'human-in-the-loop', t:'Human in the loop · la persona en el circuito', nivel:'medio',
 d:'La persona siempre revisa antes de usar el resultado. Tres niveles: confía (borradores), verifica (datos y cifras), no la uses (decisiones sobre personas e información confidencial).',
 a:'La IA hace el borrador; la persona firma. El que firma responde.',
 f:'Este concepto cierra la sesión 3 y es el que más tranquiliza a quien llega con miedo al reemplazo.'},

{id:'anonimizar', t:'Anonimizar', nivel:'basico',
 d:'Quitar de un texto todo lo que permita identificar a una persona o a un cliente, y reemplazarlo por marcadores como [Cliente A] o [Vehículo 1].',
 a:'Tachar con marcador negro antes de fotocopiar.',
 f:'Muéstralo en vivo una vez: pega un mensaje, tacha y vuelve a pegar. Vale más que explicarlo.'},

{id:'iterar', t:'Iterar', nivel:'basico',
 d:'Pedir un ajuste sobre la respuesta anterior en lugar de empezar de nuevo: "más corto", "en tabla", "tono más formal".',
 a:'Corregir un plano con el arquitecto en vez de mandar a construir la primera versión.',
 f:'La mayoría de la sala no sabe que se puede responder al resultado. Esta es la revelación de la práctica guiada.'},

{id:'rol', t:'Rol', nivel:'basico',
 d:'Decirle desde qué oficio debe responder: "eres analista de operaciones de una empresa de transporte". Cambia el vocabulario y el enfoque de la respuesta.',
 a:'No es lo mismo pedirle una opinión a un contador que a un abogado.',
 f:'Es la parte del prompt con mejor relación esfuerzo/resultado. Una línea, y la respuesta cambia por completo.'},

{id:'sesgo', t:'Sesgo', nivel:'medio',
 d:'La herramienta aprendió de textos escritos por personas, con sus prejuicios incluidos, y los reproduce sin darse cuenta.',
 a:'Si todos los ejemplos que leyó decían que quien despacha es hombre, eso va a asumir.',
 f:'Aterrízalo con el caso de Recursos Humanos: por eso la IA no evalúa candidatos.'},

{id:'agente', t:'Agente', nivel:'avanzado',
 d:'Una IA que no solo responde, sino que ejecuta pasos por su cuenta: busca, abre, escribe, envía.',
 a:'Un asistente al que le encargas el trámite completo, no una pregunta.',
 f:'No aplica a este ciclo. Si preguntan, dilo así y sigue.'},

{id:'api', t:'API', nivel:'avanzado',
 d:'La forma de conectar la herramienta con otros sistemas de la empresa mediante programación, sin que nadie escriba en un chat.',
 a:'La toma de corriente entre dos sistemas.',
 f:'Es tema de Sistemas. No lo desarrolles en sesión: se lleva la conversación para otro lado.'},

{id:'fine-tuning', t:'Fine-tuning · ajuste fino', nivel:'avanzado',
 d:'Reentrenar un modelo con información propia de la empresa. No es lo que hacemos aquí, y no es lo mismo que pegarle un documento en el chat.',
 a:'Enviar al conductor a un curso, en vez de darle una indicación por radio.',
 f:'Úsalo solo para aclarar la confusión frecuente: pegar un documento NO es entrenar a la herramienta.'}
];

/* ====================== LAS SEIS FAMILIAS DE TAREAS ==================== */
const FAMILIAS = [
{icono:'✍️', t:'Escribir y comunicar',
 d:'Correos, circulares, comunicados, respuestas a quejas, propuestas. Todo lo que sea producir un texto desde cero o mejorar uno existente.',
 ej:'Una circular a acudientes por cambio de horario de [Ruta 7].'},
{icono:'📝', t:'Resumir y sintetizar',
 d:'Textos largos convertidos en lo esencial: un contrato, un pliego, un informe, una cadena de correos de veinte mensajes.',
 ej:'Las condiciones de un contrato de alquiler, en una página.'},
{icono:'🔍', t:'Analizar y encontrar el patrón',
 d:'Agrupar, clasificar y ordenar información suelta para ver lo que se repite, no el caso aislado.',
 ej:'Las demoras de la semana, agrupadas por causa probable.'},
{icono:'📐', t:'Ordenar y estructurar',
 d:'Convertir texto desordenado en tablas, listas y formatos comparables.',
 ej:'Las fechas y obligaciones de un contrato, en una tabla de cuatro columnas.'},
{icono:'🔁', t:'Automatizar lo repetitivo',
 d:'Las tareas que se hacen igual todas las semanas: plantillas, respuestas frecuentes, reportes con la misma estructura.',
 ej:'El reporte de novedades del turno, siempre con el mismo formato.'},
{icono:'🎓', t:'Aprender, traducir y explicar',
 d:'Que te expliquen algo que no entiendes, en tu propio lenguaje, o traducir a otro idioma.',
 ej:'"Explícame qué es una nota crédito como si nunca hubiera trabajado en contabilidad."'}
];

/* ====================== LOS CINCO PEDIDOS UNIVERSALES ================== */
const UNIVERSALES = [
{v:'Reescribir', p:'Reescribe esto en tono [formal y cordial], máximo [80] palabras: [texto]',
 c:'Cuando el contenido ya está, pero el tono no.'},
{v:'Resumir', p:'Resume esto en [5] puntos, para alguien que no conoce el tema: [texto]',
 c:'Cuando hay que leer algo largo y decidir hoy.'},
{v:'Tabular', p:'Convierte esto en una tabla con las columnas [A], [B] y [C]: [texto]',
 c:'Cuando la información está suelta y hay que compararla.'},
{v:'Explicar', p:'Explícame [término] como si nunca hubiera trabajado en esto, con un ejemplo del sector transporte',
 c:'Cuando algo se entiende a medias y da pena preguntar.'},
{v:'Revisar', p:'Revisa este texto y dime qué falta, qué está ambiguo y qué entendería mal un cliente: [texto]',
 c:'Antes de enviar cualquier cosa importante.'}
];

/* ========================= BIBLIOTECA DE PROMPTS ======================= */
/* Los prompts de área se agregan solos desde datos-areas.js.
   Aquí van únicamente los transversales. */
const PROMPTS_BASE = [
{id:'universal', titulo:'Plantilla universal C.L.A.R.O.', area:'Todas', linea:'todas',
 uso:'El punto de partida de cualquier pedido. Si dudas, empieza por aquí.',
 texto:`Eres asistente de una empresa de transporte terrestre en Colombia.
Trabajo en la línea [Empresarial / Escolar / Alquiler], en el área de [tu área].

Necesito que [escribas / resumas / ordenes / revises] lo siguiente:

[pega aquí tu texto, con datos ficticios o entre corchetes]

Devuélvemelo en [correo breve / tabla / lista de puntos], en español,
máximo [120] palabras, tono [formal y cordial].
Si falta información para hacerlo bien, dímelo en vez de inventarla.`,
 cuidado:'Nunca pegues datos reales de clientes, pasajeros, estudiantes, conductores, placas o tarifas.'},

{id:'verificar', titulo:'Pedirle que revise su propia respuesta', area:'Todas', linea:'todas',
 uso:'La segunda vuelta. Sirve para cazar lo que se inventó en la primera.',
 texto:`Revisa la respuesta que acabas de darme y dime:

1. Qué afirmaciones de esa respuesta NO salen de la información que yo te di.
2. Qué datos tendría yo que verificar antes de usar esto.
3. Qué información falta para que la respuesta sea confiable.

No vuelvas a redactar el texto: solo señala.`,
 cuidado:'Que la herramienta revise su propio trabajo ayuda, pero no reemplaza tu verificación. Es un filtro más, no el último.'},

{id:'traducir-jerga', titulo:'Traducir jerga técnica a lenguaje de la operación', area:'Todas', linea:'todas',
 uso:'Cuando hay que explicarle algo a otra área sin perderla en el segundo párrafo.',
 texto:`Explícame [término o procedimiento] como si yo trabajara en [recepción /
operaciones / contabilidad] de una empresa de transporte y nunca hubiera
visto el tema.

Usa un ejemplo del sector transporte.
No uses ninguna palabra técnica sin explicarla en la misma frase.
Máximo [120] palabras.`,
 cuidado:'Si lo que vas a explicar es un procedimiento interno de Servitravel, describe el tipo de proceso, no los datos del proceso.'},

{id:'correo-dificil', titulo:'Correo difícil: reclamo, disculpa o negativa', area:'Todas', linea:'todas',
 uso:'El correo que uno reescribe cinco veces y termina enviando mal.',
 texto:`Eres asistente de una empresa de transporte terrestre corporativo.

Necesito un correo para [Cliente A] sobre esta situación:

[describe los hechos, sin nombres reales]

Condiciones:
- Reconoce el hecho sin aceptar responsabilidades que no he confirmado.
- Di qué vamos a hacer y para cuándo.
- Tono [formal y cordial], máximo [120] palabras.
- No prometas compensaciones, descuentos ni plazos que yo no te haya dado.

Dame dos versiones: una más breve y una más explicativa.`,
 cuidado:'La última línea es la importante: sin ella, la herramienta ofrece descuentos que nadie autorizó.'}
];

/* ============================= EJERCICIOS ============================== */
const EJERCICIOS = [
{s:1, t:'Ejercicio 1 · Caza la alucinación', min:'6 minutos', momento:'Minuto 30',
 enunciado:'Vas a recibir una respuesta de IA sobre un tema de transporte que parece impecable. Léela y marca las tres afirmaciones que no se pueden verificar con la información que se le entregó. Después escribe cómo lo comprobarías.',
 clave:['Las tres afirmaciones inventadas son siempre las más específicas: una cifra exacta, una norma con número y una fecha.',
        'La pregunta que hay que dejar sembrada: ¿cómo te diste cuenta? Respuesta: no te diste cuenta por el contenido, sino porque era demasiado preciso para lo que le diste.',
        'Cierra con la frase bisagra: optimiza plausibilidad, no veracidad.'],
 alerta:'No uses una alucinación real de una herramienta en vivo: puede no repetirse. Lleva el texto preparado.'},

{s:1, t:'Ejercicio 2 · Tu primer pedido, ahora mismo', min:'12 minutos', momento:'Minuto 40 a 52',
 enunciado:'Abre la herramienta con tu cuenta corporativa. Copia la plantilla universal, llénala con una tarea real de tu área pero con datos ficticios o entre corchetes, y envíala. Lee el resultado y pídele una sola corrección: más corto, otro tono o en tabla.',
 clave:['Los primeros 2 minutos son de accesos y contraseñas. Están contemplados dentro de los 12.',
        'Camina por la sala uno por uno. Prioriza a quien no levantó la mano al inicio.',
        'A los 3 minutos pide la segunda vuelta en voz alta: "no borren, pidan un cambio".',
        'Si alguien se bloquea, préstale una tarea: "resume estas cinco líneas para un cliente".',
        'Cierra con dos o tres lecturas en voz alta. Empieza por alguien que nunca la había usado.',
        'Si el resultado salió malo, la respuesta es: "es el pedido, no la herramienta. Eso es la sesión 2".'],
 alerta:'Regla dicha en voz alta antes de arrancar: hoy nadie escribe datos reales.'},

{s:1, t:'Ejercicio 3 · Semáforo en la práctica', min:'5 minutos', momento:'Minuto 52',
 enunciado:'Vas a ver cinco situaciones reales del día a día de Servitravel. Para cada una decide en voz alta: verde, amarillo o rojo. Si es amarillo, di exactamente qué habría que quitar antes de escribirlo.',
 clave:['El caso de la Línea Escolar siempre genera discusión. Déjala correr treinta segundos y cierra: un nombre más un colegio más una hora identifica a un menor.',
        'Si la sala duda entre amarillo y rojo, la respuesta correcta es la más conservadora.',
        'Esta versión es el adelanto. El módulo completo va en la sesión 3.'],
 alerta:'No uses casos reales recientes de la empresa: la sala los reconoce y la discusión se vuelve sobre el caso, no sobre el criterio.'},

{s:1, t:'Tarea de la semana · Tres preguntas', min:'10 minutos', momento:'Se deja en el minuto 58',
 enunciado:'Antes de la próxima sesión, abre la herramienta y hazle tres preguntas sobre lo que quieras: cocina, fútbol, un trámite. No tiene que ser de trabajo.',
 clave:['El objetivo no es aprender nada: es perder el miedo a la pantalla en blanco.',
        'Al abrir la sesión 2, pregunta quién la hizo y qué preguntó. Eso mide adherencia real.',
        'Si muy pocos la hicieron, acorta la teoría de la sesión 2 y alarga la práctica.'],
 alerta:'Aunque sea uso personal, recuérdales no escribir datos de la empresa.'}
];

/* ====================== CASOS DEL SEMÁFORO (práctica) ================== */
const CASOS_SEMAFORO = [
{txt:'Pedirle que reescriba en tono formal un correo que tú mismo redactaste, sin nombres ni cifras.',
 r:'verde', por:'No hay información de nadie: es tu propio texto genérico. Este es el uso más seguro y el más frecuente.'},
{txt:'Pegar el mensaje de WhatsApp de un cliente con su nombre, su empresa y su celular para convertirlo en confirmación.',
 r:'amarillo', por:'El uso es correcto, pero primero se anonimiza: [Cliente A] y [contacto]. Con eso queda en verde.'},
{txt:'Pegar la lista de estudiantes de [Ruta 7] con nombres y direcciones de recogida para armar la circular.',
 r:'rojo', por:'Son datos de menores de edad. Un nombre más un colegio más una hora de recogida identifica a un niño. No hay versión intermedia: la circular se escribe con [Ruta 7] y sin lista.'},
{txt:'Pedirle que explique qué es una nota crédito, con un ejemplo del sector transporte.',
 r:'verde', por:'Es conocimiento general. No hay información de la empresa en el pedido.'},
{txt:'Pegar el estado de resultados del mes con las cifras reales para que redacte el comentario del comité.',
 r:'rojo', por:'Son cifras financieras reales de la empresa. Se trabaja con variaciones en porcentaje o con datos de ejemplo, nunca con el estado de resultados.'},
{txt:'Pegar un pliego de condiciones publicado por una entidad para extraer requisitos y fechas.',
 r:'verde', por:'Es un documento público: cualquiera puede descargarlo. Lo que no se pega es tu borrador de propuesta.'},
{txt:'Pegar las observaciones del despachador sobre demoras, con placas y nombres de conductores.',
 r:'amarillo', por:'La tarea es correcta y muy útil. Reemplaza placas y nombres por [Vehículo 1] y [Conductor A] y queda lista.'},
{txt:'Pegar la hoja de vida de un aspirante para que la compare con el perfil del cargo.',
 r:'rojo', por:'Doble problema: son datos personales de un tercero y es una decisión sobre una persona. La IA no evalúa candidatos.'},
{txt:'Pedirle un checklist de alistamiento de vehículo antes de la ruta, sin datos de la flota.',
 r:'verde', por:'Es un procedimiento genérico. Después tú lo ajustas con el criterio de mantenimiento.'},
{txt:'Pegar la tarifa acordada con un cliente para que redacte la renovación del contrato.',
 r:'rojo', por:'Una condición comercial negociada es justo lo que un competidor querría conocer. Se escribe [tarifa acordada] entre corchetes.'}
];

/* ====================== CUESTIONARIO DE REPASO ========================= */
const QUIZ = [
{q:'La IA te devuelve un dato con una cifra exacta y una norma citada con número. Tú no le diste ninguna de las dos. ¿Qué haces?',
 ops:['Lo uso: si cita la norma es porque la consultó',
      'Lo verifico en la fuente oficial antes de usarlo',
      'Le pregunto a ella si está segura y le creo'],
 ok:1,
 por:'Cuanto más específico y verificable es un dato que tú no entregaste, más probable es que sea inventado. Preguntarle si está segura no sirve: también responde con seguridad cuando se equivoca.'},

{q:'¿Cuál de estos pedidos va a dar mejor resultado?',
 ops:['"Hazme un correo para un cliente"',
      '"Escribe un correo de confirmación de servicio, tono formal y cordial, máximo 120 palabras, dejando entre corchetes lo que no sepas"',
      '"Necesito un correo urgente, es para hoy"'],
 ok:1,
 por:'Contexto, formato y restricciones. Sin eso, la herramienta adivina, y adivina hacia el promedio de todo lo que leyó, que no se parece a Servitravel.'},

{q:'Un compañero dice: "le pegué el contrato completo y ahora la herramienta sabe cosas de la empresa". ¿Es correcto?',
 ops:['Sí, quedó entrenada con ese documento',
      'No: pegar un documento no es entrenar al modelo, pero sí es enviar información a un tercero',
      'No pasa nada, es una herramienta privada'],
 ok:1,
 por:'Son dos cosas distintas. Entrenar es otra etapa, que ya terminó. Pero la información sí salió de la empresa, y por eso existe el semáforo y la regla de oro.'},

{q:'La respuesta llegó larga, genérica y con un tono que no es el nuestro. ¿Qué haces primero?',
 ops:['Cambio de herramienta',
      'La borro y escribo el correo a mano',
      'Le pido un ajuste sobre esa misma respuesta: más corto, este tono, en tabla'],
 ok:2,
 por:'La primera respuesta casi nunca es la buena, y no hace falta empezar de cero. Iterar es la parte del trabajo donde está el resultado bueno.'},

{q:'¿En cuál de estas tareas NO debe usarse la IA?',
 ops:['Redactar el borrador de una circular',
      'Decidir cuál de dos aspirantes queda en el cargo',
      'Agrupar las demoras de la semana por causa'],
 ok:1,
 por:'Decisiones sobre personas, nunca. No por miedo a la tecnología, sino porque la herramienta reproduce los sesgos de lo que leyó y no responde ante nadie por la decisión.'},

{q:'La regla de oro dice que no escribas en una IA algo que...',
 ops:['...no le enviarías por correo a un proveedor externo sin un acuerdo de confidencialidad',
      '...no publicarías en redes sociales',
      '...no le contarías a un compañero de otra área'],
 ok:0,
 por:'Es la formulación exacta de Servitravel, y funciona porque todo el mundo sabe intuitivamente qué se le manda a un externo y qué no.'}
];

/* ============ DEMOSTRACIÓN: CÓMO PREDICE LA SIGUIENTE PALABRA ========= */
const PREDICCION = {
  frase:'El bus de la Línea Escolar sale de la terminal a las',
  opciones:[
    {palabra:'6:00 a. m.', p:38, nota:'La más probable según los textos que leyó. Suena bien. Pero nadie le dijo a qué hora sale TU bus.'},
    {palabra:'cinco', p:24, nota:'También plausible. Sigue sin ser un dato de Servitravel.'},
    {palabra:'horas', p:19, nota:'Gramaticalmente correcto, semánticamente vacío. Así se ven muchas respuestas genéricas.'},
    {palabra:'[hora]', p:11, nota:'Esto es lo que quieres que haga, y solo lo hace si tú se lo pides: "deja entre corchetes lo que no sepas".'},
    {palabra:'terminal', p:8, nota:'Menos probable, pero no imposible. Por eso la misma pregunta puede dar respuestas distintas.'}
  ],
  cierre:'Ninguna de esas opciones sale de un dato de Servitravel: salen de cuál palabra suele seguir a esa frase en los millones de textos que leyó. Por eso la respuesta suena bien aunque sea falsa.'
};

/* ==================== PREGUNTAS DIFÍCILES DE LA SALA =================== */
const PREGUNTAS_DIFICILES = [
['¿Esto es para reemplazarnos?',
 'Si la empresa quisiera reemplazar gente, no gastaría tres semanas enseñándoles a usar la herramienta. Los estaría reemplazando y ya.'],
['¿Cuál herramienta es mejor?',
 'Ninguna. Se elige por tres cosas: qué tan sensible es la información, qué tipo de tarea es y con qué sistemas de la empresa se conecta. No declares ganadora.'],
['¿Puedo usar la que yo ya uso?',
 'Para cosas personales, la que quieras. Para trabajo de Servitravel, solo la aprobada por la empresa y con la cuenta corporativa.'],
['¿La herramienta aprende de lo que le escribo?',
 'Depende de la herramienta y del tipo de cuenta, y cambia con el tiempo. No me lo voy a inventar: lo confirmo en la documentación oficial. Mientras tanto, aplica la regla de oro.'],
['¿Es gratis? ¿Cuánto cuesta?',
 'Los accesos los gestiona la empresa. Si alguien necesita acceso y no lo tiene, me avisa al final. No cites planes ni precios.'],
['Yo estoy en escolar, ¿esto también me sirve?',
 'Sí, y mucho: comunicarle cosas a los acudientes es lo que más se repite y es lo que mejor hace. Con una condición: sin datos de los estudiantes.'],
['¿Y si le escribo solo el primer nombre del estudiante?',
 'Tampoco. Un nombre más un colegio más un horario de recogida identifica a un menor. En esa línea la regla no tiene versión intermedia.'],
['¿Y si se equivoca y yo mando el error?',
 'Responde usted, no la herramienta. La IA hace el borrador y la persona firma. Verificar es parte del trabajo.'],
['Yo no soy bueno para la tecnología.',
 'Si sabes escribir un WhatsApp, sabes usar esto. Es una conversación escrita, no un programa.'],
['¿Y si me acostumbro y dejo de pensar?',
 'Es un riesgo real y por eso la sesión 3 existe. La regla es que la herramienta hace el borrador y usted decide. El día que deje de revisar, el problema no es la herramienta.']
];

/* ======================= CRONOGRAMA DE LA SESIÓN ====================== */
const CRONOGRAMA = [
{min:'0–5', bloque:'Apertura en frío', que:'Sin pantalla. De dónde salió esto y la pregunta de las manos levantadas.'},
{min:'5–9', bloque:'Encuadre', que:'Lo que no es la capacitación, la promesa del día y el recorrido de las tres sesiones.'},
{min:'9–20', bloque:'Fundamentos', que:'Qué es la IA, cómo aprende, la que ya usan sin darse cuenta y qué cambió con la IA generativa.'},
{min:'20–27', bloque:'Cómo funciona y por qué se equivoca', que:'El predictor de la siguiente palabra, la frase bisagra y los cinco límites.'},
{min:'27–33', bloque:'Ejercicio 1', que:'Caza la alucinación, en parejas.'},
{min:'33–40', bloque:'Qué puede hacer por ti', que:'Las seis familias, la tarea de cada área y la demostración en vivo. Es el momento que decide la sesión.'},
{min:'40–52', bloque:'Práctica guiada', que:'Ejercicio 2. Todos escriben su primer pedido. Es el corazón de la sesión.'},
{min:'52–56', bloque:'Seguridad mínima', que:'La regla de oro y el adelanto del semáforo con cinco casos.'},
{min:'56–60', bloque:'Cierre y gancho', que:'Las tres cosas que se llevan, la tarea de la semana y qué viene en la sesión 2.'}
];

const RECORTES = [
['Las seis familias de tareas: nómbralas sin ejemplos', '2 minutos'],
['La tarea por área: que la lean en pantalla, no la narres', '2 minutos'],
['IA que ya usas: deja solo el navegador y el teclado del celular', '2 minutos'],
['Las tres palabras del glosario: resúmelas en 30 segundos', '1,5 minutos'],
['El apartado de sesgos: menciónalo y anúncialo para la sesión 3', '1 minuto']
];

const NO_SE_RECORTA = 'La demostración en vivo del minuto 36 · la práctica guiada completa · la regla de oro · el gancho del cierre. Sin esos cuatro, la sesión no cumple su objetivo, que no es que aprendan todo: es que quieran volver.';

const MONTAJE = [
'La herramienta aprobada abierta en una pestaña, con la cuenta corporativa, y la sesión de otro usuario cerrada.',
'Capturas de respaldo de la demostración guardadas localmente, por si falla la conexión.',
'Accesos confirmados para todos los asistentes. Si hay tres o más sin acceso, la práctica se hace en parejas.',
'El texto del Ejercicio 1 impreso o listo para proyectar. No improvises una alucinación en vivo.',
'Sillas que permitan caminar entre la gente durante la práctica guiada.',
'Cronómetro a la vista y el cronograma de la sesión abierto en esta página, en modo facilitador.'
];
