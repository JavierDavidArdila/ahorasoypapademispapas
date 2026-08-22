<script setup lang="ts">
import type { ServiciosCollectionItem } from '@nuxt/content'

defineProps<{
  servicio: ServiciosCollectionItem
}>()
</script>

<template>
  <div>
    <div class="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-2 gap-12 items-start">
      <div class="flex flex-col gap-6 order-2 md:order-1">
        <h1 class="text-4xl md:text-5xl font-bold text-[var(--color-azul-alto)]">{{ servicio.titulo }}</h1>
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
          width="800"
          height="800"
        />
      </div>
    </div>
  </div>
</template>
