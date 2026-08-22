<script setup lang="ts">
defineProps<{
  nombre: string
  rolOCargo?: string
  reconocimiento?: string
  foto?: string
}>()
</script>

<template>
  <figure class="flex flex-col gap-6">
    <blockquote
      class="text-2xl italic leading-snug"
      style="font-family: var(--font-display)"
    >
      <slot />
    </blockquote>
    <figcaption class="flex items-center gap-3">
      <NuxtImg
        v-if="foto"
        :src="foto"
        :alt="nombre"
        class="size-12 rounded-full object-cover border border-[var(--color-linea)]"
        width="48"
        height="48"
      />
      <div
        v-else
        class="size-12 rounded-full bg-[var(--color-papel-alto)] border border-[var(--color-linea)]"
        aria-hidden="true"
      />
      <div class="kicker text-[var(--color-tinta-suave)]">
        <p>{{ nombre }}</p>
        <p v-if="rolOCargo">{{ rolOCargo }}</p>
      </div>
    </figcaption>
    <p v-if="reconocimiento" class="text-sm text-[var(--color-tinta-suave)]">
      {{ reconocimiento }}
    </p>
  </figure>
</template>
