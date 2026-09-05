# Test de Bienestar C.A.S.A. — implementación en ahorasoypapademispapas

Todo el código ya está escrito. Esto es lo que falta ejecutar/copiar. Ya hice
las partes que se podían hacer directo desde aquí (marcadas con ✅).

## ✅ Ya hecho
- Base de datos D1 creada: `casa-test-bienestar-db` (uuid `720d3530-922f-4214-9e9b-3f09aaf109a9`).
- Tabla `respuestas_test` creada dentro de esa base.

## Paso 1 — Copiar los archivos del sitio (repo `ahorasoypapademispapas`)
Copia estas carpetas/archivos dentro del repo, respetando las rutas:

```
app/data/test-bienestar.ts
app/composables/useTestBienestar.ts
app/components/TestBienestar/ProgresoBarra.vue
app/components/TestBienestar/Pregunta.vue
app/components/TestBienestar/Resultado.vue
app/components/TestBienestar/TestBienestar.vue
app/pages/servicios/test-bienestar.vue
```

Nuxt auto-registra los componentes por carpeta, así que
`app/components/TestBienestar/Pregunta.vue` queda disponible como
`<TestBienestarPregunta />` (ya usado así en `TestBienestar.vue`).

## Paso 2 — Editar `nuxt.config.ts`
Ver `PATCH-nuxt.config.ts.md` — agrega `testBienestarApiUrl` a `runtimeConfig.public`.

## Paso 3 — Desplegar el Worker de la API (independiente del sitio)
Esto vive en una carpeta/repo aparte, `worker-casa-test-bienestar-api/`, para no
tocar el despliegue del sitio principal.

```bash
cd worker-casa-test-bienestar-api
npm install
npx wrangler deploy
```

Al terminar, Wrangler te va a mostrar la URL pública, algo como:
`https://casa-test-bienestar-api.<tu-subdominio>.workers.dev`

Copia esa URL y:
1. Pégala en `NUXT_PUBLIC_TEST_BIENESTAR_API_URL` (ver Paso 2).
2. Actualiza `ALLOWED_ORIGIN` en `worker-casa-test-bienestar-api/wrangler.jsonc`
   con el dominio real donde vive tu sitio (para que el navegador no bloquee
   la petición por CORS), y vuelve a correr `npx wrangler deploy`.

## Paso 4 — Probar localmente
```bash
pnpm dev
```
Abre `http://localhost:3000/servicios/test-bienestar`.
(Para probar el guardado en D1 en local, corre también `wrangler dev` en la
carpeta del worker, y apunta `NUXT_PUBLIC_TEST_BIENESTAR_API_URL` a esa URL local.)

## Paso 5 — Deploy del sitio (como ya lo haces)
Sin cambios: `nuxt generate` + tu despliegue habitual del Worker de assets.

## Paso 6 — Revisar los datos guardados
```bash
npx wrangler d1 execute casa-test-bienestar-db --remote \
  --command "SELECT * FROM respuestas_test ORDER BY creado_en DESC LIMIT 20;"
```

---

## Decisiones y supuestos que tomé (revisar)

1. **Ruta del test:** `/servicios/test-bienestar` (nueva), no activé el
   placeholder `plataforma-virtual.md` porque ese habla de una plataforma más
   amplia, no específicamente del test. Si prefieres otra URL, es solo mover
   el archivo de página.
2. **Mapeo pregunta → pilar C.A.S.A.:** el documento no lo da explícito para
   todas las preguntas que puntúan. Propuse uno basado en las descripciones
   de la sección 5 del documento (ver comentario al inicio de
   `app/data/test-bienestar.ts`). **Confirmar con Oscar/Alejandra/David Ángel
   antes de mostrarlo en producción**, porque afecta el mensaje final que ve
   el usuario ("tu área de atención es...").
3. **Escala de la pregunta 4 (comunicación):** el documento no da valores
   numéricos para "Fluida/Funcional/Deficiente/Mala/Inexistente". Asumí
   0-4 de mejor a peor, igual que el resto del test. Confirmar.
4. **Paleta de colores:** usé el amarillo/ocre ya definido en
   `app/assets/css/main.css` (`--color-ocre`, `--color-amarillo`), tal como
   se acordó con Alejandra en el correo (en vez del azul de la muestra
   original).
5. **Video recomendado por etapa** (mencionado en el punto 7 del documento):
   no lo incluí porque no existe ese contenido todavía. La pantalla de
   resultado queda lista para agregarlo cuando exista (un link por pilar).
6. **Costo:** todo esto corre en el plan que ya tienes de Cloudflare
   (Workers + D1). El volumen de un piloto (decenas/cientos de respuestas)
   es insignificante frente a tus límites actuales.
