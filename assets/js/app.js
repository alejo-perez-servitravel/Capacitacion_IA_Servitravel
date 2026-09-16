/* ==========================================================================
   Tú al Volante · Motor de la página
   --------------------------------------------------------------------------
   No hay dependencias externas ni build: la página se abre con doble clic.
   Depende de datos-curso.js y datos-areas.js, cargados antes que este archivo.

   Bloques: 01 Utilidades · 02 Render de contenido · 03 Áreas · 04 Prompts
            05 Semáforo · 06 Cuestionario · 07 Predictor · 08 Constructor
            09 Navegación · 10 Búsqueda · 11 Modo facilitador · 12 Arranque
   ========================================================================== */
(function(){
'use strict';

/* ============================ 01 UTILIDADES =========================== */
const $  = (s,c)=> (c||document).querySelector(s);
const $$ = (s,c)=> Array.from((c||document).querySelectorAll(s));

/** Escapa HTML: todo lo que venga de los archivos de datos pasa por aquí. */
function esc(t){
  return String(t==null?'':t)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

/** Resalta los [campos variables] dentro del texto de un prompt. */
function resaltarCampos(t){
  return esc(t).replace(/\[[^\]\n]+\]/g, m => '<span class="campo">'+m+'</span>');
}

/** Quita tildes y pasa a minúscula, para buscar sin preocuparse por acentos. */
function normalizar(t){
  return String(t||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
}

let tiempoAviso;
function avisar(mensaje){
  const a = $('#aviso');
  a.textContent = mensaje;
  a.classList.add('visible');
  clearTimeout(tiempoAviso);
  tiempoAviso = setTimeout(()=>a.classList.remove('visible'), 1900);
}

/** Copiar con respaldo para cuando la página se abre como archivo local. */
function copiar(texto){
  const respaldo = ()=>{
    const ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); avisar('Copiado'); }
    catch(e){ avisar('No se pudo copiar: selecciónalo a mano'); }
    document.body.removeChild(ta);
  };
  if(navigator.clipboard && window.isSecureContext){
    navigator.clipboard.writeText(texto).then(()=>avisar('Copiado'), respaldo);
  } else { respaldo(); }
}

/** Bloque de prompt con su botón de copiar. */
function bloquePrompt(texto, id){
  return '<div class="prompt"><button class="copiar" data-copiar="'+id+'">Copiar</button>'+
         resaltarCampos(texto)+'</div>';
}

/* Registro de textos copiables, para no meter el prompt en un atributo HTML. */
const COPIABLES = {};

/* ======================== 02 RENDER DE CONTENIDO ====================== */

function pintarFamilias(){
  $('#familias-lista').innerHTML = FAMILIAS.map(f =>
    '<article class="tarjeta">'+
      '<span class="icono">'+esc(f.icono)+'</span>'+
      '<h3>'+esc(f.t)+'</h3>'+
      '<p>'+esc(f.d)+'</p>'+
      '<p class="tenue"><b>Ejemplo:</b> '+esc(f.ej)+'</p>'+
    '</article>').join('');
}

function pintarUniversales(){
  $('#universales-lista').innerHTML = UNIVERSALES.map((u,i)=>{
    const id = 'uni'+i; COPIABLES[id] = u.p;
    return '<article class="ficha-prompt">'+
      '<span class="etiqueta">'+esc(u.v)+'</span>'+
      '<p class="uso">'+esc(u.c)+'</p>'+
      bloquePrompt(u.p, id)+
    '</article>';
  }).join('');
}

function pintarGlosario(){
  const cont = $('#glosario-lista');
  cont.innerHTML = CONCEPTOS.map(c =>
    '<article class="concepto" data-nivel="'+esc(c.nivel)+'" data-busca="'+esc(normalizar(c.t+' '+c.d+' '+c.a))+'">'+
      '<h3>'+esc(c.t)+'</h3>'+
      '<p class="definicion">'+esc(c.d)+'</p>'+
      '<p class="analogia"><b>Cómo se explica:</b> '+esc(c.a)+'</p>'+
      '<div class="nota-facilitador facilitador"><div class="titulo-panel">Nota para el facilitador</div>'+
        '<p>'+esc(c.f)+'</p></div>'+
      '<div class="pie-etiquetas"><span class="etiqueta '+esc(c.nivel)+'">'+esc(c.nivel)+'</span></div>'+
    '</article>').join('');

  filtrable({
    contenedor:cont, items:'.concepto',
    busqueda:'#glosario-busqueda', filtros:'#glosario-filtros',
    campoFiltro:'nivel', vacio:'#glosario-vacio'
  });
}

function pintarEjercicios(){
  $('#ejercicios-lista').innerHTML = EJERCICIOS.map(e =>
    '<article class="ficha-ejercicio">'+
      '<span class="etiqueta">'+esc(e.min)+'</span>'+
      '<span class="etiqueta facilitador">'+esc(e.momento)+'</span>'+
      '<h3>'+esc(e.t)+'</h3>'+
      '<p class="enunciado-part">'+esc(e.enunciado)+'</p>'+
      '<div class="aviso peligro"><h4>Regla de seguridad</h4><p>'+esc(e.alerta)+'</p></div>'+
      '<div class="nota-facilitador facilitador"><div class="titulo-panel">Clave del facilitador</div><ul>'+
        e.clave.map(c=>'<li>'+esc(c)+'</li>').join('')+'</ul></div>'+
    '</article>').join('');
}

function pintarFacilitador(){
  $('#cronograma-lista').innerHTML = CRONOGRAMA.map(c =>
    '<tr><td class="clave">'+esc(c.min)+'</td><td><b>'+esc(c.bloque)+'</b><br>'+esc(c.que)+'</td></tr>').join('');

  $('#recortes-lista').innerHTML = RECORTES.map(r =>
    '<tr><td>'+esc(r[0])+'</td><td class="clave">'+esc(r[1])+'</td></tr>').join('');

  $('#no-se-recorta').textContent = NO_SE_RECORTA;

  $('#montaje-lista').innerHTML = MONTAJE.map(m => '<li>'+esc(m)+'</li>').join('');

  $('#preguntas-dificiles').innerHTML = PREGUNTAS_DIFICILES.map(p =>
    '<tr><td class="clave">'+esc(p[0])+'</td><td>'+esc(p[1])+'</td></tr>').join('');
}

/* ============================== 03 ÁREAS ============================== */
let areaActiva = 0;

function pintarAreas(){
  $('#areas-pestanas').innerHTML = AREAS.map((a,i)=>
    '<button role="tab" data-area="'+i+'" aria-selected="'+(i===0)+'">'+
      '<span class="icono">'+esc(a.icono)+'</span>'+esc(a.nombre.split(' y ')[0])+
    '</button>').join('');

  $$('#areas-pestanas button').forEach(b=>{
    b.addEventListener('click', ()=> mostrarArea(+b.dataset.area));
  });

  mostrarArea(0);
}

function mostrarArea(i){
  areaActiva = i;
  const a = AREAS[i];
  const idPrompt = 'area-'+a.id;
  COPIABLES[idPrompt] = a.prompt.texto;

  $$('#areas-pestanas button').forEach(b=>
    b.setAttribute('aria-selected', String(+b.dataset.area === i)));

  const lineas = {emp:'Línea Empresarial', esc:'Línea Escolar', alq:'Línea Alquiler', todas:'Las tres líneas'};

  $('#areas-panel').innerHTML =
    '<div class="area-cabecera">'+
      '<div class="emblema">'+esc(a.icono)+'</div>'+
      '<div>'+
        '<h3 style="font-size:26px">'+esc(a.nombre)+'</h3>'+
        '<span class="etiqueta '+esc(a.linea)+'">'+esc(lineas[a.linea])+'</span>'+
        (a.ciclo==='extendido' ? '<span class="etiqueta">Ciclo extendido</span>' : '<span class="etiqueta">Ciclo corto</span>')+
      '</div>'+
    '</div>'+
    '<p class="entrada bloque-apretado">'+esc(a.resumen)+'</p>'+

    '<h4 class="bloque">Cinco cosas que puedes hacer hoy</h4>'+
    '<div class="casos">'+ a.casos.map((c,n)=>
      '<div class="caso"><span class="n">'+(n+1)+'</span><div>'+
        '<h4>'+esc(c.t)+'</h4><p>'+esc(c.d)+'</p></div></div>').join('') +'</div>'+

    '<div class="aviso peligro"><h4>⚠ La advertencia de esta área</h4><p>'+esc(a.alerta)+'</p></div>'+

    '<h4 class="bloque">El prompt, listo para copiar</h4>'+
    '<p class="tenue" style="font-size:15.5px">'+esc(a.prompt.titulo)+'</p>'+
    bloquePrompt(a.prompt.texto, idPrompt)+
    '<p class="consejo">💡 '+esc(a.prompt.consejo)+'</p>'+

    '<h4 class="bloque">La demostración, paso a paso</h4>'+
    '<div class="demo">'+
      '<div class="panel entrada-datos">'+
        '<div class="titulo-panel">① Lo que le doy</div>'+
        '<div class="mono">'+esc(a.demo.entrada)+'</div>'+
      '</div>'+
      '<div class="panel">'+
        '<div class="titulo-panel">② Lo que devuelve</div>'+
        '<div class="salida">'+ a.demo.salida.map(s=>
          '<h5>'+esc(s.h)+'</h5><p>'+esc(s.txt)+'</p>').join('') +'</div>'+
      '</div>'+
      '<div class="panel revision">'+
        '<div class="titulo-panel">③ Lo que reviso antes de usarlo</div>'+
        '<ul>'+ a.demo.revision.map(r=>'<li>'+esc(r)+'</li>').join('') +'</ul>'+
      '</div>'+
    '</div>';
}

/* ====================== 04 BIBLIOTECA DE PROMPTS ====================== */
function pintarPrompts(){
  /* Une los transversales con los de cada área: una sola biblioteca. */
  const deAreas = AREAS.map(a=>({
    id:'bib-'+a.id, titulo:a.prompt.titulo, area:a.nombre, linea:a.linea,
    uso:a.prompt.consejo, texto:a.prompt.texto, cuidado:a.alerta
  }));
  const todos = PROMPTS_BASE.concat(deAreas);
  const lineas = {emp:'Empresarial', esc:'Escolar', alq:'Alquiler', todas:'Transversal'};

  const cont = $('#prompts-lista');
  cont.innerHTML = todos.map(p=>{
    COPIABLES[p.id] = p.texto;
    return '<article class="ficha-prompt" data-linea="'+esc(p.linea)+'" '+
      'data-busca="'+esc(normalizar(p.titulo+' '+p.area+' '+p.uso+' '+p.texto))+'">'+
      '<span class="etiqueta '+esc(p.linea)+'">'+esc(lineas[p.linea])+'</span>'+
      '<span class="etiqueta">'+esc(p.area)+'</span>'+
      '<h3>'+esc(p.titulo)+'</h3>'+
      '<p class="uso">'+esc(p.uso)+'</p>'+
      bloquePrompt(p.texto, p.id)+
      '<p class="cuidado"><b>Cuidado:</b> '+esc(p.cuidado)+'</p>'+
    '</article>';
  }).join('');

  filtrable({
    contenedor:cont, items:'.ficha-prompt',
    busqueda:'#prompts-busqueda', filtros:'#prompts-filtros',
    campoFiltro:'linea', vacio:'#prompts-vacio'
  });
}

/** Buscador + filtros reutilizable para glosario y biblioteca. */
function filtrable(cfg){
  const items = $$(cfg.items, cfg.contenedor);
  const input = $(cfg.busqueda);
  const botones = $$(cfg.filtros+' button');
  const vacio = $(cfg.vacio);
  let filtro = 'todos';

  function aplicar(){
    const q = normalizar(input ? input.value : '');
    let visibles = 0;
    items.forEach(it=>{
      const pasaFiltro = filtro==='todos' || it.dataset[cfg.campoFiltro]===filtro;
      const pasaTexto  = !q || it.dataset.busca.indexOf(q) > -1;
      const ver = pasaFiltro && pasaTexto;
      it.classList.toggle('oculto', !ver);
      if(ver) visibles++;
    });
    if(vacio) vacio.classList.toggle('oculto', visibles>0);
  }

  if(input) input.addEventListener('input', aplicar);
  botones.forEach(b=> b.addEventListener('click', ()=>{
    botones.forEach(x=> x.setAttribute('aria-pressed','false'));
    b.setAttribute('aria-pressed','true');
    filtro = b.dataset.filtro;
    aplicar();
  }));
  aplicar();
}

/* ======================= 05 SEMÁFORO INTERACTIVO ====================== */
let casoActual = 0, aciertos = 0, respondido = false;

function pintarSemaforo(){
  const c = CASOS_SEMAFORO[casoActual];
  respondido = false;
  $('#semaforo-cuenta').textContent = 'Caso '+(casoActual+1)+' de '+CASOS_SEMAFORO.length+' · '+aciertos+' correctos';
  $('#semaforo-caso').textContent = c.txt;
  $('#semaforo-retro').innerHTML = '';
  $('#semaforo-retro').className = 'oculto';
  $$('#semaforo-botones button').forEach(b=>{
    b.disabled = false; b.classList.remove('elegida');
  });
  $('#semaforo-siguiente').classList.add('oculto');
}

function responderSemaforo(valor, boton){
  if(respondido) return;
  respondido = true;
  const c = CASOS_SEMAFORO[casoActual];
  const bien = valor === c.r;
  if(bien) aciertos++;

  boton.classList.add('elegida');
  $$('#semaforo-botones button').forEach(b=> b.disabled = true);

  const nombres = {verde:'verde', amarillo:'amarillo', rojo:'rojo'};
  const retro = $('#semaforo-retro');
  retro.className = 'retro ' + (bien ? 'bien' : 'mal');
  retro.innerHTML = (bien ? '<b>Correcto.</b> ' : '<b>No.</b> Es <b>'+nombres[c.r]+'</b>. ') + esc(c.por);

  $('#semaforo-cuenta').textContent = 'Caso '+(casoActual+1)+' de '+CASOS_SEMAFORO.length+' · '+aciertos+' correctos';

  if(casoActual < CASOS_SEMAFORO.length-1){
    $('#semaforo-siguiente').classList.remove('oculto');
  } else {
    $('#semaforo-siguiente').classList.remove('oculto');
    $('#semaforo-siguiente').textContent = 'Empezar de nuevo ↻';
  }
}

function iniciarSemaforo(){
  $$('#semaforo-botones button').forEach(b=>{
    b.addEventListener('click', ()=> responderSemaforo(b.dataset.luz, b));
  });
  $('#semaforo-siguiente').addEventListener('click', ()=>{
    if(casoActual < CASOS_SEMAFORO.length-1){ casoActual++; }
    else { casoActual = 0; aciertos = 0; $('#semaforo-siguiente').textContent = 'Siguiente caso →'; }
    pintarSemaforo();
  });
  pintarSemaforo();
}

/* ========================= 06 CUESTIONARIO ============================ */
function pintarQuiz(){
  const letras = ['A','B','C','D'];
  $('#quiz-lista').innerHTML = QUIZ.map((q,i)=>
    '<article class="pregunta" data-q="'+i+'">'+
      '<p class="enunciado">'+(i+1)+'. '+esc(q.q)+'</p>'+
      q.ops.map((o,j)=>
        '<button class="opcion" data-q="'+i+'" data-o="'+j+'">'+
          '<span class="letra">'+letras[j]+'</span><span>'+esc(o)+'</span></button>').join('')+
      '<div class="retro oculto" data-retro="'+i+'"></div>'+
    '</article>').join('');

  $$('#quiz-lista .opcion').forEach(b=>{
    b.addEventListener('click', ()=>{
      const i = +b.dataset.q, j = +b.dataset.o, q = QUIZ[i];
      const opciones = $$('.opcion[data-q="'+i+'"]');
      if(opciones[0].disabled) return;
      opciones.forEach((o,k)=>{
        o.disabled = true;
        if(k === q.ok) o.classList.add('correcta');
        else if(k === j) o.classList.add('incorrecta');
      });
      const retro = $('[data-retro="'+i+'"]');
      retro.className = 'retro ' + (j===q.ok ? 'bien' : 'mal');
      retro.innerHTML = (j===q.ok ? '<b>Correcto. </b>' : '<b>La correcta es la '+letras[q.ok]+'. </b>') + esc(q.por);
    });
  });
}

/* ===================== 07 PREDICTOR (cómo funciona) =================== */
function pintarPredictor(){
  $('#predictor-frase').innerHTML = esc(PREDICCION.frase)+' <span class="hueco" id="predictor-hueco">?</span>';
  $('#predictor-opciones').innerHTML = PREDICCION.opciones.map((o,i)=>
    '<button class="token" data-t="'+i+'" aria-pressed="false">'+
      '<span>'+esc(o.palabra)+'</span>'+
      '<span class="medidor"><span style="width:'+o.p+'%"></span></span>'+
      '<span class="prob">'+o.p+'%</span>'+
    '</button>').join('');
  $('#predictor-nota').textContent = 'Elige una continuación para ver por qué la herramienta la propone.';

  $$('#predictor-opciones .token').forEach(b=>{
    b.addEventListener('click', ()=>{
      const o = PREDICCION.opciones[+b.dataset.t];
      $$('#predictor-opciones .token').forEach(x=> x.setAttribute('aria-pressed','false'));
      b.setAttribute('aria-pressed','true');
      $('#predictor-hueco').textContent = o.palabra;
      $('#predictor-nota').textContent = o.nota;
    });
  });
  $('#predictor-cierre').textContent = PREDICCION.cierre;
}

/* ==================== 08 CONSTRUCTOR C.L.A.R.O. ======================= */
const CAMPOS_CLARO = ['contexto','labor','audiencia','restricciones','output'];

/* Patrones que suelen indicar un dato que no debería salir de la empresa. */
const PATRONES_RIESGO = [
  {re:/\b[A-Z]{3}\s?-?\s?\d{3}\b/,            que:'algo con forma de placa'},
  {re:/\b\d{7,11}\b/,                          que:'un número largo (cédula, NIT o teléfono)'},
  {re:/[\w.\-]+@[\w\-]+\.[a-z]{2,}/i,          que:'un correo electrónico'},
  {re:/\$\s?\d/,                               que:'un valor en pesos'},
  {re:/\b(c[eé]dula|nit|salario|tarifa acordada|margen|contrase[nñ]a|clave)\b/i, que:'una palabra sensible'}
];

function armarPrompt(){
  const v = {};
  CAMPOS_CLARO.forEach(c => v[c] = ($('#claro-'+c).value || '').trim());

  const partes = [];
  if(v.contexto)      partes.push(v.contexto);
  if(v.labor)         partes.push('\nNecesito que ' + v.labor);
  if(v.audiencia)     partes.push('\nEs para ' + v.audiencia + '.');
  if(v.restricciones) partes.push('\nRestricciones: ' + v.restricciones);
  if(v.output)        partes.push('\nDevuélvemelo así: ' + v.output);
  partes.push('\nSi te falta información para hacerlo bien, dímelo en vez de inventarla.');

  const texto = partes.join('\n');
  COPIABLES['claro'] = texto;
  $('#claro-resultado').innerHTML =
    '<button class="copiar" data-copiar="claro">Copiar</button>' + resaltarCampos(texto);

  revisarRiesgo(CAMPOS_CLARO.map(c=>v[c]).join(' '));
}

function revisarRiesgo(texto){
  const alerta = $('#claro-alerta');
  const hallazgos = PATRONES_RIESGO.filter(p => p.re.test(texto)).map(p => p.que);
  if(hallazgos.length){
    alerta.className = 'alerta-datos';
    alerta.innerHTML = '<b>Revisa antes de enviar.</b> En lo que escribiste hay '+
      esc(hallazgos.join(', '))+'. Reemplázalo por un marcador entre corchetes, '+
      'como [Cliente A] o [Vehículo 1]. Recuerda la regla de oro.';
  } else {
    alerta.className = 'alerta-datos ok';
    alerta.innerHTML = '<b>Sin señales de datos sensibles.</b> Esta revisión automática es '+
      'una ayuda, no una autorización: el criterio final es tuyo y es el semáforo.';
  }
}

function iniciarConstructor(){
  /* El selector de ejemplos se llena con las áreas que existan en los datos. */
  $('#claro-ejemplo').innerHTML = '<option value="">— Empezar en blanco —</option>' +
    AREAS.map(a => '<option value="'+esc(a.id)+'">'+esc(a.nombre)+'</option>').join('');

  CAMPOS_CLARO.forEach(c => $('#claro-'+c).addEventListener('input', armarPrompt));

  $('#claro-ejemplo').addEventListener('change', e=>{
    const a = AREAS.find(x => x.id === e.target.value);
    if(!a) return;
    /* Si el área no tiene ejemplo propio en EJEMPLOS_CLARO, se usa uno genérico. */
    const ej = (typeof EJEMPLOS_CLARO === 'object' && EJEMPLOS_CLARO[a.id]) || {
      labor:'me ayudes con la siguiente tarea, a partir del texto que te voy a pegar',
      audiencia:'un compañero de otra área, que no conoce el detalle de mi trabajo',
      output:'un texto breve, en el formato que te indique abajo'
    };
    $('#claro-contexto').value = 'Eres asistente de una empresa de transporte terrestre en Colombia. Trabajo en el área de '+a.nombre+'.';
    $('#claro-labor').value = ej.labor;
    $('#claro-audiencia').value = ej.audiencia;
    $('#claro-restricciones').value = 'máximo 150 palabras, tono formal y cordial, y no inventes datos: lo que no sepas déjalo entre corchetes';
    $('#claro-output').value = ej.output;
    armarPrompt();
  });

  $('#claro-limpiar').addEventListener('click', ()=>{
    CAMPOS_CLARO.forEach(c => $('#claro-'+c).value = '');
    $('#claro-ejemplo').value = '';
    armarPrompt();
  });

  armarPrompt();
}

/* ========================== 09 NAVEGACIÓN ============================= */
function iniciarNavegacion(){
  const secciones = $$('main .seccion');
  const enlaces = $$('#nav a');
  const porId = {};
  enlaces.forEach(a => porId[a.getAttribute('href').slice(1)] = a);

  /* Secciones ya leídas, guardadas en el navegador. */
  let vistas = [];
  try{ vistas = JSON.parse(localStorage.getItem('tav_vistas') || '[]'); }catch(e){ vistas = []; }

  function actualizarProgreso(){
    const total = secciones.length;
    const hechas = vistas.filter(id => porId[id]).length;
    const pct = total ? Math.round(hechas/total*100) : 0;
    $('#progreso-barra').style.width = pct + '%';
    $('#progreso-cifra').textContent = pct + '%';
  }

  const observador = new IntersectionObserver(entradas=>{
    entradas.forEach(e=>{
      if(!e.isIntersecting) return;
      const id = e.target.id;
      enlaces.forEach(a => a.classList.remove('activo'));
      if(porId[id]) porId[id].classList.add('activo');
      if(vistas.indexOf(id) === -1){
        vistas.push(id);
        try{ localStorage.setItem('tav_vistas', JSON.stringify(vistas)); }catch(e2){}
        if(porId[id]) porId[id].classList.add('visitado');
        actualizarProgreso();
      }
    });
  }, {rootMargin:'-20% 0px -70% 0px', threshold:0});

  secciones.forEach(s => observador.observe(s));
  vistas.forEach(id => { if(porId[id]) porId[id].classList.add('visitado'); });
  actualizarProgreso();

  /* Menú lateral en pantallas pequeñas */
  const cerrarMenu = ()=> document.body.classList.remove('menu-abierto');
  $('#btn-menu').addEventListener('click', ()=> document.body.classList.toggle('menu-abierto'));
  $('#velo').addEventListener('click', cerrarMenu);
  enlaces.forEach(a => a.addEventListener('click', cerrarMenu));

  /* Volver arriba */
  const arriba = $('#arriba');
  window.addEventListener('scroll', ()=>{
    arriba.classList.toggle('visible', window.scrollY > 700);
  }, {passive:true});
  arriba.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  /* Reiniciar el progreso */
  $('#progreso-reiniciar').addEventListener('click', ()=>{
    vistas = [];
    try{ localStorage.removeItem('tav_vistas'); }catch(e){}
    enlaces.forEach(a => a.classList.remove('visitado'));
    actualizarProgreso();
    avisar('Progreso reiniciado');
  });
}

/* =========================== 10 BÚSQUEDA ============================== */
function iniciarBusqueda(){
  const indice = [];

  $$('main .seccion').forEach(s=>{
    const t = $('h2', s);
    if(t) indice.push({t:t.textContent.trim(), tipo:'Sección', id:s.id, busca:normalizar(s.textContent)});
  });
  CONCEPTOS.forEach(c => indice.push({t:c.t, tipo:'Concepto', id:'glosario', busca:normalizar(c.t+' '+c.d)}));
  AREAS.forEach((a,i) => indice.push({t:a.nombre, tipo:'Área', id:'areas', area:i, busca:normalizar(a.nombre+' '+a.resumen+' '+a.casos.map(c=>c.t).join(' '))}));

  const input = $('#buscador-global');
  const caja = $('#resultados-busqueda');

  function cerrar(){ caja.innerHTML = ''; caja.classList.add('oculto'); }

  input.addEventListener('input', ()=>{
    const q = normalizar(input.value);
    if(q.length < 2){ cerrar(); return; }
    const hits = indice.filter(x => x.busca.indexOf(q) > -1).slice(0,8);
    if(!hits.length){
      caja.innerHTML = '<div class="item-resultado tenue">Sin coincidencias</div>';
    } else {
      caja.innerHTML = hits.map((h,i)=>
        '<button class="item-resultado" data-i="'+indice.indexOf(h)+'">'+
          '<span class="tipo">'+esc(h.tipo)+'</span> '+esc(h.t)+'</button>').join('');
      $$('.item-resultado', caja).forEach(b=>{
        b.addEventListener('click', ()=>{
          const h = indice[+b.dataset.i];
          if(h.tipo === 'Área') mostrarArea(h.area);
          document.getElementById(h.id).scrollIntoView({behavior:'smooth'});
          input.value = ''; cerrar();
        });
      });
    }
    caja.classList.remove('oculto');
  });

  input.addEventListener('keydown', e=>{ if(e.key === 'Escape'){ input.value=''; cerrar(); input.blur(); } });
  document.addEventListener('click', e=>{ if(!e.target.closest('.buscador')) cerrar(); });

  document.addEventListener('keydown', e=>{
    const enCampo = ['INPUT','TEXTAREA','SELECT'].indexOf(e.target.tagName) > -1;
    if(e.key === '/' && !enCampo){ e.preventDefault(); input.focus(); }
    if((e.key === 'f' || e.key === 'F') && !enCampo && !e.ctrlKey && !e.metaKey){ alternarFacilitador(); }
    if(e.key === 'Escape'){ document.body.classList.remove('menu-abierto'); }
  });
}

/* ======================= 11 MODO FACILITADOR ========================== */
function alternarFacilitador(forzar){
  const activo = (typeof forzar === 'boolean')
    ? forzar
    : !document.body.classList.contains('modo-facilitador');
  document.body.classList.toggle('modo-facilitador', activo);
  $('#btn-facilitador').setAttribute('aria-pressed', String(activo));
  try{ localStorage.setItem('tav_facilitador', activo ? '1' : '0'); }catch(e){}
  if(typeof forzar !== 'boolean'){
    avisar(activo ? 'Modo facilitador activado' : 'Modo facilitador desactivado');
  }
}

function iniciarFacilitador(){
  $('#btn-facilitador').addEventListener('click', ()=> alternarFacilitador());
  let guardado = '0';
  try{ guardado = localStorage.getItem('tav_facilitador') || '0'; }catch(e){}
  alternarFacilitador(guardado === '1');
  $('#btn-imprimir').addEventListener('click', ()=> window.print());
}

/* ============================ 12 ARRANQUE ============================= */
function iniciar(){
  pintarFamilias();
  pintarUniversales();
  pintarGlosario();
  pintarAreas();
  pintarPrompts();
  pintarEjercicios();
  pintarQuiz();
  pintarPredictor();
  pintarFacilitador();
  iniciarSemaforo();
  iniciarConstructor();
  iniciarNavegacion();
  iniciarBusqueda();
  iniciarFacilitador();

  /* Un solo escucha para todos los botones de copiar de la página. */
  document.addEventListener('click', e=>{
    const b = e.target.closest('[data-copiar]');
    if(b) copiar(COPIABLES[b.dataset.copiar] || '');
  });

  /* Año del pie */
  $('#anio').textContent = new Date().getFullYear();
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
else iniciar();

})();
