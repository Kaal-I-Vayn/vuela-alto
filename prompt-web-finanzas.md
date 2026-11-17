# Prompt: "Vuela Alto" — mi web de finanzas personales

Copia todo lo que está debajo de la línea y pégalo en tu herramienta de IA (Claude, v0, Lovable, etc.). Adjunta también tus imágenes (tu foto en el muelle y tus fondos favoritos).

---

## Rol y objetivo

Actúa como diseñador de producto y desarrollador frontend senior. Construye una **aplicación web de finanzas personales en un solo archivo HTML** (HTML + CSS + JavaScript, sin backend), que funcione abriéndola en el navegador y en el celular.

No es solo un registro de gastos: es mi **seguimiento personal y mi motivador**. Me mudé a Chile empezando desde cero y, con resiliencia, estoy logrando cosas poco a poco. La app debe reflejar esa historia: cada peso ahorrado es un salto más alto.

## Contexto del usuario

- Vivo en Chile. Moneda principal: **peso chileno (CLP)**, formato `$1.234.567` (punto como separador de miles, sin decimales). Opción secundaria para ver equivalencias en USD o en la moneda de mi país de origen, con tasa que yo ingreso a mano.
- Fechas en formato `dd/mm/aaaa`, semana empieza el lunes, todo el texto en español.
- Ingresos variables (puede haber trabajo principal, trabajos extra, ventas).

## Identidad visual (inspiración, no copia)

Me inspiran el anime deportivo de superación y la estética de tinta japonesa. Crea un estilo **original** con esta atmósfera, sin usar personajes, logos ni arte con derechos de autor:

- **Estilo sumi-e / tinta**: fondo color papel washi (`#F5F0E8`), manchas y salpicaduras de tinta negra como decoración sutil, pinceladas en los bordes de las tarjetas.
- **Paleta**: negro tinta `#1A1A1A`, naranja fuego `#F26B1D` (acento principal, energía), ámbar `#F5A623`, gris niebla `#9A948C`, blanco cálido. Verde suave `#4CAF7A` para ingresos, rojo apagado `#D2453B` para gastos.
- **Motivos**: plumas y aves negras en vuelo (SVG simples hechos por ti), líneas de movimiento curvas como estela, un horizonte de mar al atardecer (en honor a la costa chilena donde empecé).
- **Tipografía**: títulos con una fuente con carácter de pincel (por ejemplo "Yuji Syuku" o "Zen Antique" de Google Fonts) para palabras clave como 飛べ ("vuela"); el resto en una sans limpia (por ejemplo "Inter" o "Noto Sans JP").
- **Modo oscuro** opcional: fondo tinta, textos papel, el naranja brilla más.
- Animaciones suaves: barras que "despegan", una pluma que cae al registrar un logro. Respetar `prefers-reduced-motion`.

## Secciones (navegación por pestañas o barra lateral; en móvil, barra inferior)

### 1. Inicio / Panel
- Saludo con mi nombre y mi foto de perfil (subible desde la app, guardada localmente).
- **Saldo actual** grande y visible.
- Resumen del mes: ingresos, gastos, ahorro, % del presupuesto usado.
- **Frase motivadora del día** (rotativa, en español, propias y originales sobre resiliencia, empezar de cero, volar más alto). Posibilidad de que yo agregue mis propias frases.
- Tarjeta "**Mi camino en Chile**": días desde que llegué (fecha configurable), total ahorrado desde entonces, metas cumplidas.

### 2. Movimientos
- Registrar **ingresos** y **gastos**: monto, fecha, categoría, descripción, método de pago (efectivo, débito, crédito, transferencia), y si es recurrente (mensual).
- Categorías por defecto pensadas para Chile: Arriendo, Supermercado, Transporte (Bip!/micro/metro), Servicios básicos, Celular/Internet, Salud, Comida fuera, Envío de dinero a la familia, Trámites/visa, Educación, Ocio, Ropa, Otros. Editables y con color e ícono.
- Lista filtrable por mes, categoría y tipo; búsqueda por texto; editar y eliminar (con confirmación).

### 3. Deudas y préstamos
- Dos listas: **Lo que me deben** y **Lo que debo**.
- Cada registro: persona, monto, fecha, fecha límite, notas, abonos parciales con historial.
- Botón "Marcar como pagado" y alerta visual si la fecha límite pasó.

### 4. Presupuesto mensual
- Definir un presupuesto por categoría para cada mes (con botón "copiar presupuesto del mes anterior").
- Barra de progreso por categoría: verde (<70 %), ámbar (70–100 %), rojo (>100 %).
- Aviso cuando una categoría supera el 80 %.

### 5. Metas
- Crear metas: nombre, monto objetivo, fecha objetivo, imagen opcional (ej.: "Fondo de emergencia", "Viaje a casa", "Notebook").
- Aportes a la meta, % de avance con una barra en forma de **ave/pluma que sube**.
- Cálculo automático: "Necesitas ahorrar $X por mes para llegar a tiempo".
- Al completar una meta: celebración (plumas cayendo, mensaje "¡Volaste más alto!") y la meta pasa a un **muro de logros**.

### 6. Proyección
- Proyección de saldo a 3, 6 y 12 meses según promedio de ingresos/gastos de los últimos meses y gastos recurrentes.
- Simulador "¿Y si…?": si reduzco X categoría en un %, o si ahorro $Y extra al mes, ¿cuándo llego a mis metas?

### 7. Gráficas (Chart.js desde CDN)
- Dona: gastos por categoría del mes (¿en qué gasto más?).
- Barras: ingresos vs. gastos por mes (últimos 6–12 meses).
- Línea: evolución del saldo y del ahorro acumulado.
- Ranking top 5 categorías con mayor gasto y comparación con el mes anterior (↑/↓ %).
- Colores de las gráficas con la paleta de la app, legibles en modo claro y oscuro.

## Botones estratégicos (acciones rápidas siempre visibles)

- **＋ Gasto rápido** y **＋ Ingreso rápido** (botón flotante; formulario corto de 3 campos).
- **"Págate primero"**: al registrar un ingreso, sugiere apartar un % (configurable, ej. 10–20 %) a una meta.
- **Regla 50/30/20**: botón que analiza mi mes y muestra cómo estoy frente a necesidades/deseos/ahorro.
- **Modo "Antes de comprar"**: ingreso un monto y me dice cuántos días de trabajo representa y cómo afecta mi presupuesto y metas.
- **Reto de ahorro**: activar retos (ej. "semana sin comida fuera", "52 semanas") con racha de días.
- **Cierre de mes**: resumen con logros, dónde gasté de más y un mensaje motivador; opción de descargarlo como imagen o PDF.
- **Exportar / Importar** datos (JSON y CSV) para respaldo.

## Motivación y gamificación

- Rachas de días registrando movimientos.
- Insignias originales: "Primer peso ahorrado", "Fondo de emergencia de 1 mes", "Deuda saldada", "3 meses dentro del presupuesto", "Un año en Chile".
- Línea de tiempo "Mi historia": hitos que yo agrego (ej.: "Llegué a Chile", "Primer trabajo", "Primer arriendo propio") con fecha y foto opcional.
- Mensajes con tono cercano y de compañero de equipo ("Hoy no fue tu mejor salto, mañana saltas de nuevo"), nunca culpabilizadores.

## Requisitos técnicos

- Un solo archivo `index.html`, sin build. Librerías solo por CDN con versión fija (Chart.js).
- Persistencia en `localStorage` (con manejo de errores) + exportar/importar JSON para no perder datos.
- Responsive (prioridad móvil, 360 px en adelante), accesible (contraste AA, etiquetas en formularios, navegable con teclado).
- Validación de formularios: montos > 0, fechas válidas, campos obligatorios.
- Código ordenado y comentado en español, con datos de ejemplo cargables con un botón ("Cargar demo") y un botón para borrarlos.
- Instalable como PWA (manifest + service worker simple) para usarla como app en el celular, si cabe en un solo archivo; si no, indicarlo.

## Entregable

1. El archivo `index.html` completo y funcional.
2. Breve explicación de cómo usarlo y cómo hacer respaldo de mis datos.
3. Sugerencias de mejoras futuras (sincronizar en la nube, conectar con el banco, etc.) sin implementarlas.
