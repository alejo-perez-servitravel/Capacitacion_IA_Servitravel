# Tú al Volante · plataforma de la capacitación

Material de la capacitación interna de Servitravel en Inteligencia Artificial.
**Sesión 1 · Encendido**, publicada como sitio web navegable.

## Abrir la capacitación

| | |
|---|---|
| **[Material de la Sesión 1](https://alejo-perez-servitravel.github.io/Capacitacion_IA_Servitravel/)** | La sesión completa, para recorrer o consultar |
| **[Guía rápida](https://alejo-perez-servitravel.github.io/Capacitacion_IA_Servitravel/guia-rapida.html)** | Material de apoyo del participante: lo esencial y los prompts listos para copiar |
| [Guion del facilitador](https://alejo-perez-servitravel.github.io/Capacitacion_IA_Servitravel/guion.html) | El texto palabra por palabra de los 60 minutos |

Funciona en el navegador, en computador o en celular. No hay que instalar nada
ni tener cuenta de GitHub.

**Para enviarle a los participantes**, el enlace es el de la guía rápida.

### Para tenerlo sin internet

Botón verde **Code** ▸ **Download ZIP**, se descomprime y se hace doble clic en
`index.html`. Funciona igual, sin conexión.

## Cómo se usa

| Quién | Cómo |
|---|---|
| **Participante** | Para el día a día, la **guía rápida**: lo esencial en una página, con los prompts listos para copiar. Si quiere el detalle, recorre el material completo o entra por el índice de la izquierda. |
| **Facilitador** | Abre `guion.html` para el texto palabra por palabra de los 60 minutos. En el material, activa **Modo facilitador** en la barra superior (o tecla <kbd>F</kbd>): aparecen el guion, las claves de los ejercicios, el cronograma minuto a minuto, el plan de recortes y las respuestas a las preguntas difíciles. |
| **Quien imprime** | Botón 🖨 de la barra. Los estilos de impresión ya están hechos e incluyen siempre el material del facilitador. |

Atajos: <kbd>/</kbd> buscar · <kbd>F</kbd> modo facilitador · <kbd>Esc</kbd> cerrar.

## Qué hay en la página

1. Portada y encuadre de la sesión
2. Fundamentos: qué es la IA, cómo aprende, la que ya usas, qué cambió
3. Cómo funciona por dentro — con un **predictor interactivo** de la siguiente palabra
4. Los cinco límites reales y por qué se equivoca
5. Glosario de 24 conceptos, con buscador y filtro por nivel
6. Las seis familias de tareas
7. **Nueve módulos por área**: 5 casos de uso + advertencia + prompt + demostración en tres paneles
8. La fórmula C.L.A.R.O. con un **constructor de prompts** que además avisa si escribiste datos sensibles
9. Los cinco pedidos universales y la biblioteca completa de prompts, filtrable
10. Regla de oro, **semáforo interactivo** de 10 casos y criterio de verificación
11. Ejercicios de la sesión y **repaso de 6 preguntas**
12. Cierre, tarea de la semana y material del facilitador

## Estructura

```
index.html                   Sesión 1 · estructura y contenido narrativo
guia-rapida.html             Material de apoyo del participante (autónomo)
guion.html                   Guion del presentador, palabra por palabra
assets/css/estilos.css       Sistema visual: tokens, componentes, responsive, impresión
assets/css/guion.css         Estilos del guion (letra grande, dice/hace, impresión)
assets/js/datos-curso.js     Glosario, familias, ejercicios, semáforo, quiz, guion, tiempos
assets/js/datos-areas.js     Los 9 módulos por área
assets/js/app.js             Motor: navegación, filtros, búsqueda, módulos interactivos
.nojekyll                    Le dice a GitHub Pages que publique los archivos tal cual
```

Los documentos internos de trabajo —el contexto maestro del proyecto, el system
prompt del asistente co-diseñador y la versión anterior en diapositivas— no se
publican aquí: viven en el equipo del facilitador y están excluidos en
`.gitignore`.

## Cómo se edita

- **Contenido narrativo** (explicaciones, tarjetas, tablas): directo en `index.html`.
- **Datos repetitivos** (conceptos, áreas, prompts, ejercicios, casos, preguntas):
  en los dos archivos `datos-*.js`. La página se arma sola a partir de ellos.
- **Un área nueva**: copia un objeto completo de `AREAS` en `datos-areas.js` y
  cambia el `id`. La pestaña, el panel, la entrada en la biblioteca de prompts y
  el ejemplo del constructor C.L.A.R.O. aparecen solos.
- **Colores y tipografía**: bloque `01 TOKENS` al inicio de `estilos.css`.

El detalle completo del esquema de datos y de las reglas de contenido está en el
contexto maestro del proyecto, secciones 4 a 7 — documento interno, pídelo al
facilitador.

## Regla que no se rompe

Todos los datos de esta página son ficticios. Ni un nombre real de cliente,
pasajero, estudiante, conductor, placa ni tarifa — ni en los ejemplos, ni en las
demostraciones, ni en las capturas que se proyecten.

Este repositorio es público: cualquier cosa que se suba aquí queda visible en
internet. Antes de cada `push`, la misma regla — si no lo enviarías a un
proveedor externo, no lo subas.

## Cómo se publican los cambios

La página en línea se actualiza sola con cada cambio que llegue a la rama
`main`:

```bash
git add .
git commit -m "Describe el cambio"
git push
```

GitHub Pages tarda entre uno y dos minutos en reflejarlo.

---

© Servitravel. Material de capacitación interna, publicado para consulta del
personal. Todos los derechos reservados.
