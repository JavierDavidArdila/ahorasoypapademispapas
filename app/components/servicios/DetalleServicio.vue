<script setup lang="ts">
import type { ServiciosCollectionItem } from '@nuxt/content'

const props = defineProps<{
  servicio: ServiciosCollectionItem
}>()

// des-cargate.jpg es una foto de grupo horizontal; el ancho/alto por defecto (cuadrado)
// recortaba las caras de los participantes en los bordes.
const anchoImagen = props.servicio.path === '/servicios/des-cargate' ? 720 : 800
const altoImagen = props.servicio.path === '/servicios/des-cargate' ? 540 : 800
</script>

<template>
  <div>
    <div class="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-2 gap-12 items-start">
      <div class="flex flex-col gap-6 order-2 md:order-1">
        <h1 class="text-4xl md:text-5xl font-bold text-[var(--color-azul-alto)]">{{ servicio.titulo }}</h1>
        <p v-if="servicio.subtitulo" class="text-xl font-bold text-[var(--color-azul)]">{{ servicio.subtitulo }}</p>
        <p v-if="!servicio.disponible" class="kicker text-[var(--color-tinta-suave)]">Próximamente</p>

        <ContentRenderer :value="servicio" class="prose-editorial flex flex-col gap-4 leading-relaxed" />

        <UiBotonCta
          v-if="servicio.cta"
          :to="servicio.cta.destino"
          :externo="servicio.cta.destino.startsWith('http')"
          class="w-fit"
        >
          {{ servicio.cta.texto }}
        </UiBotonCta>
      </div>

      <div v-if="servicio.imagenPortada" class="order-1 md:order-2">
        <NuxtImg
          :src="servicio.imagenPortada"
          :alt="servicio.titulo"
          class="w-full rounded-[var(--radius-editorial)] object-cover shadow-md"
          loading="lazy"
          :width="anchoImagen"
          :height="altoImagen"
        />
      </div>
    </div>

    <section
      v-if="servicio.proximoEncuentro"
      class="mx-auto max-w-6xl px-6 pb-20 md:pb-28"
    >
      <div class="rounded-[var(--radius-editorial)] bg-[var(--color-papel-alto)] border-2 border-[var(--color-amarillo)] p-8 md:p-10 flex flex-col gap-5">
        <p class="kicker text-[var(--color-tinta-suave)]">Próximo encuentro</p>
        <h2 class="text-2xl md:text-3xl font-bold text-[var(--color-azul-alto)]">{{ servicio.proximoEncuentro.titulo }}</h2>
        <dl class="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[var(--color-azul)]">
          <div><dt class="kicker">Fecha</dt><dd>{{ servicio.proximoEncuentro.fecha }}</dd></div>
          <div><dt class="kicker">Ciudad</dt><dd>{{ servicio.proximoEncuentro.ciudad }}</dd></div>
          <div><dt class="kicker">Formato</dt><dd>{{ servicio.proximoEncuentro.formato }}</dd></div>
          <div><dt class="kicker">Lugar</dt><dd>{{ servicio.proximoEncuentro.lugar }}</dd></div>
          <div class="sm:col-span-2">
            <dt class="kicker">Inscripciones en</dt>
            <dd>
              <a
                v-if="servicio.proximoEncuentro.inscripcionUrl"
                :href="servicio.proximoEncuentro.inscripcionUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-[var(--color-azul-alto)]"
              >{{ servicio.proximoEncuentro.inscripcion }}</a>
              <template v-else>{{ servicio.proximoEncuentro.inscripcion }}</template>
            </dd>
          </div>
        </dl>
        <p v-for="texto in servicio.proximoEncuentro.textos" :key="texto" class="leading-relaxed">{{ texto }}</p>
      </div>
    </section>
  </div>
</template>
