// Worker independiente y liviano, solo para el Test de Bienestar C.A.S.A.
// No toca el sitio principal (que sigue siendo 100% estático). Se despliega
// aparte con `wrangler deploy` desde esta misma carpeta.

export interface Env {
  DB: D1Database
  ALLOWED_ORIGIN: string
}

// Copia mínima y server-side de qué preguntas puntúan y a qué pilar pertenecen.
// Si cambian las preguntas en app/data/test-bienestar.ts, actualizar también aquí.
// (Se recalcula el puntaje en el servidor para no confiar ciegamente en el cliente.)
const PREGUNTAS_QUE_PUNTUAN: Record<number, 'COMPRENDER' | 'ACOMPANAR' | 'SOSTENER' | 'ALIVIAR'> = {
  4: 'ACOMPANAR',
  5: 'ALIVIAR',
  6: 'SOSTENER',
  7: 'SOSTENER',
  8: 'ACOMPANAR',
  9: 'SOSTENER',
  11: 'COMPRENDER',
  12: 'ALIVIAR',
  13: 'ALIVIAR',
  14: 'ALIVIAR',
  15: 'ALIVIAR',
}

function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function calcularPuntaje(respuestas: Record<string, unknown>) {
  let puntajeIecd = 0
  const puntajePorPilar: Record<string, number> = { COMPRENDER: 0, ACOMPANAR: 0, SOSTENER: 0, ALIVIAR: 0 }

  for (const [idStr, pilar] of Object.entries(PREGUNTAS_QUE_PUNTUAN)) {
    const valor = Number(respuestas[idStr])
    const puntos = Number.isFinite(valor) ? Math.min(Math.max(valor, 0), 4) : 0
    puntajeIecd += puntos
    puntajePorPilar[pilar] += puntos
  }

  const pilarPrincipal = Object.entries(puntajePorPilar).reduce((max, actual) =>
    actual[1] > max[1] ? actual : max
  )[0]

  let resultado = 'Necesito apoyo'
  if (puntajeIecd <= 10) resultado = 'Estoy en equilibrio'
  else if (puntajeIecd <= 21) resultado = 'Necesito organizar mejor mi cuidado'
  else if (puntajeIecd <= 32) resultado = 'Me siento sobrecargado'

  return { puntajeIecd, resultado, pilarPrincipal }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.ALLOWED_ORIGIN

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) })
    }

    if (request.method !== 'POST') {
      return new Response('Método no permitido', { status: 405, headers: corsHeaders(origin) })
    }

    try {
      const body = (await request.json()) as { respuestas?: Record<string, unknown> }
      const respuestas = body.respuestas ?? {}

      const { puntajeIecd, resultado, pilarPrincipal } = calcularPuntaje(respuestas)

      await env.DB.prepare(
        `INSERT INTO respuestas_test
          (anios_cuidando, mayor_aporte, interlocutores, comunicacion,
           p5, p6, p7, p8, p9, naturaleza_relacion, p11, p12, p13, p14, p15,
           puntaje_iecd, resultado, pilar_principal)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          String(respuestas['1'] ?? ''),
          String(respuestas['2'] ?? ''),
          JSON.stringify(respuestas['3'] ?? []),
          String(respuestas['4'] ?? ''),
          Number(respuestas['5']) || 0,
          Number(respuestas['6']) || 0,
          Number(respuestas['7']) || 0,
          Number(respuestas['8']) || 0,
          Number(respuestas['9']) || 0,
          String(respuestas['10'] ?? ''),
          Number(respuestas['11']) || 0,
          Number(respuestas['12']) || 0,
          Number(respuestas['13']) || 0,
          Number(respuestas['14']) || 0,
          Number(respuestas['15']) || 0,
          puntajeIecd,
          resultado,
          pilarPrincipal
        )
        .run()

      return new Response(JSON.stringify({ ok: true, puntajeIecd, resultado, pilarPrincipal }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      })
    } catch (err) {
      console.error(err)
      return new Response(JSON.stringify({ ok: false, error: 'Error guardando la respuesta' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
      })
    }
  },
}
