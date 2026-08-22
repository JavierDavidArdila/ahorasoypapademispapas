<script setup lang="ts">
defineProps<{
  subtitulo?: string
  fecha: string | Date
  imagen?: string
  titular: string
  url?: string
}>()

function formatearFecha(fecha: string | Date) {
  return new Date(fecha).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <div class="flex flex-col gap-3 w-56 shrink-0">
    <p class="kicker text-[var(--color-tinta-suave)]">
      <template v-if="subtitulo">{{ subtitulo }} · </template>{{ formatearFecha(fecha) }}
    </p>
    <NuxtImg
      v-if="imagen"
      :src="imagen"
      :alt="titular"
      class="aspect-[4/3] w-full rounded-[var(--radius-editorial)] border border-[var(--color-linea)] object-cover"
      loading="lazy"
      width="320"
      height="240"
    />
    <a
      v-if="url"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex w-fit items-center gap-2 rounded-[var(--radius-editorial)] border-2 border-[var(--color-amarillo)] px-4 py-2 kicker text-[var(--color-azul-alto)] hover:bg-[var(--color-amarillo)] transition-colors"
    >
      Ir a la entrevista
    </a>
  </div>
</template>
