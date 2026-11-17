/**
 * Vuela Alto · respaldo continuo en Google Sheets
 *
 * 1. Cambia CLAVE por una frase secreta tuya (la misma que pondrás en la app).
 * 2. Implementar > Nueva implementación > Aplicación web
 *    Ejecutar como: Yo  ·  Quién tiene acceso: Cualquier usuario
 * 3. Copia la URL que termina en /exec y pégala en la app (Ajustes > Respaldo en Google Sheets).
 *
 * La hoja guarda una copia completa (pestaña oculta "_respaldo") y pestañas legibles:
 * Resumen, Movimientos, Metas, Deudas y Suscripciones.
 * Si algo sale mal: Archivo > Historial de versiones te deja volver atrás.
 */
const CLAVE = 'CAMBIA-ESTA-CLAVE';
const TROZO = 40000; // una celda admite máximo 50.000 caracteres
const ZONA = 'America/Santiago';

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return resp({ok: false, error: 'Petición inválida'}); }
  if (CLAVE === 'CAMBIA-ESTA-CLAVE') return resp({ok: false, error: 'Cambia la CLAVE en el Apps Script'});
  if (body.clave !== CLAVE) return resp({ok: false, error: 'Clave incorrecta'});
  if (body.accion === 'leer') return resp({ok: true, data: leer()});
  const S = body.data;
  if (!S || !Array.isArray(S.movs) || !S.perfil) return resp({ok: false, error: 'Datos inválidos'});
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { guardar(S); } finally { lock.releaseLock(); }
  return resp({ok: true});
}

function resp(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function leer() {
  const sh = SpreadsheetApp.getActive().getSheetByName('_respaldo');
  if (!sh || !sh.getLastRow()) return null;
  // cada trozo lleva un "|" delante para que Sheets nunca lo tome como fórmula o número
  const txt = sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => String(r[0]).slice(1)).join('');
  return txt ? JSON.parse(txt) : null;
}

function guardar(S) {
  const sum = (a, f) => (a || []).reduce((s, x) => s + f(x), 0);
  const aportado = m => sum(m.aportes, a => a.monto);
  const mes = Utilities.formatDate(new Date(), ZONA, 'yyyy-MM');
  const saldo = (S.perfil.saldoInicial || 0) + sum(S.movs, x => x.tipo === 'in' ? x.monto : -x.monto);

  escribir('Resumen', ['Dato', 'Valor'], [
    ['Último respaldo', new Date()],
    ['Saldo actual', saldo],
    ['Apartado en metas', sum(S.metas, aportado)],
    ['Movimientos registrados', S.movs.length],
    ['Suscripciones (total mensual)', sum(S.subs, s => s.monto)]
  ]);
  escribir('Movimientos', ['Fecha', 'Tipo', 'Categoría', 'Descripción', 'Método', 'Monto', 'Recurrente'],
    S.movs.slice().sort((a, b) => b.fecha.localeCompare(a.fecha))
      .map(x => [x.fecha, x.tipo === 'in' ? 'Ingreso' : 'Gasto', texto(x.cat), texto(x.desc), texto(x.metodo), x.tipo === 'in' ? x.monto : -x.monto, x.recurrente ? 'Sí' : '']));
  escribir('Metas', ['Meta', 'Objetivo', 'Aportado', 'Falta', 'Fecha objetivo', 'Cumplida'],
    (S.metas || []).map(m => [texto(m.nombre), m.objetivo, aportado(m), Math.max(0, m.objetivo - aportado(m)), m.fecha || '', m.done ? 'Sí' : '']));
  escribir('Deudas', ['Tipo', 'Persona', 'Monto', 'Abonado', 'Pendiente', 'Fecha', 'Límite', 'Pagada', 'Notas'],
    (S.deudas || []).map(d => { const ab = sum(d.abonos, a => a.monto);
      return [d.dir === 'meDeben' ? 'Me deben' : 'Debo', texto(d.persona), d.monto, ab, Math.max(0, d.monto - ab), d.fecha, d.limite || '', d.pagada ? 'Sí' : '', texto(d.notas)]; }));
  escribir('Suscripciones', ['Nombre', 'Monto', 'Día de cobro', 'Categoría', 'Método', 'Pagada este mes'],
    (S.subs || []).map(s => [texto(s.nombre), s.monto, s.dia, texto(s.cat), texto(s.metodo), (s.pagos || []).indexOf(mes) >= 0 ? 'Sí' : 'No']));

  const txt = JSON.stringify(S), filas = [];
  for (let i = 0; i < txt.length; i += TROZO) filas.push(['|' + txt.slice(i, i + TROZO)]);
  escribir('_respaldo', null, filas).hideSheet();
}

// Evita que un texto como "=algo" se convierta en fórmula dentro de la hoja
function texto(v) {
  v = v == null ? '' : String(v);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function escribir(nombre, cab, filas) {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(nombre) || ss.insertSheet(nombre);
  sh.clearContents();
  const todo = cab ? [cab].concat(filas) : filas;
  if (todo.length) sh.getRange(1, 1, todo.length, todo[0].length).setValues(todo);
  if (cab) { sh.getRange(1, 1, 1, cab.length).setFontWeight('bold'); sh.setFrozenRows(1); }
  return sh;
}
