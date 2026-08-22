<script setup lang="ts">
defineProps<{
  titulo: string
  fecha: string | Date
  resumen: string
  to: string
  imagen?: string
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
  <div class="flex flex-col rounded-[var(--radius-editorial)] border border-[var(--color-linea)] overflow-hidden">
    <NuxtImg
      v-if="imagen"
      :src="imagen"
      :alt="titulo"
      class="aspect-video w-full object-cover"
      loading="lazy"
      width="480"
      height="270"
    />
    <div class="flex flex-col gap-2 p-5">
      <span class="kicker text-[var(--color-tinta-suave)]">{{ formatearFecha(fecha) }}</span>
      <NuxtLink :to="to" class="group">
        <h3 class="text-lg font-bold text-[var(--color-azul)] group-hover:underline">{{ titulo }}</h3>
      </NuxtLink>
      <p class="text-sm text-[var(--color-tinta-suave)] leading-relaxed">{{ resumen }}</p>
    </div>
  </div>
</template>
