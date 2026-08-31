<script setup lang="ts">
import type { TestimoniosCollectionItem } from '@nuxt/content'

const props = defineProps<{
  testimonio: TestimoniosCollectionItem
}>()

const iniciales = computed(() =>
  props.testimonio.nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(parte => parte[0]?.toUpperCase() ?? '')
    .join('')
)
</script>

<template>
  <figure
    class="mb-6 flex break-inside-avoid flex-col gap-4 rounded-[var(--radius-editorial)] border border-[var(--color-linea)] bg-white p-6 shadow-sm"
  >
    <Icon
      name="ph:quotes-fill"
      class="size-7 text-[var(--color-amarillo)]"
      aria-hidden="true"
    />

    <blockquote
      class="prose-testimonio text-[var(--color-tinta)] leading-relaxed"
      style="font-family: var(--font-display)"
    >
      <ContentRenderer :value="testimonio" />
    </blockquote>

    <p
      v-if="testimonio.reconocimiento"
      class="text-xs font-medium uppercase tracking-wide text-[var(--color-tinta-suave)]"
    >
      {{ testimonio.reconocimiento }}
    </p>

    <figcaption class="mt-auto flex flex-col gap-3 border-t border-[var(--color-linea)] pt-4">
      <span
        v-if="testimonio.logoEntidad"
        class="inline-flex h-11 w-fit items-center rounded-[var(--radius-editorial)] bg-[var(--color-azul)] px-3"
      >
        <NuxtImg
          :src="testimonio.logoEntidad"
          :alt="testimonio.rolOCargo || testimonio.nombre"
          class="h-6 w-auto max-w-[160px] object-contain"
          height="24"
        />
      </span>

      <div class="flex items-center gap-3">
        <span
          v-if="!testimonio.logoEntidad"
          class="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-papel-alto)] text-sm font-bold text-[var(--color-azul-alto)]"
          aria-hidden="true"
        >
          {{ iniciales }}
        </span>

        <span class="leading-tight">
          <span class="block font-bold text-[var(--color-azul-alto)]">{{ testimonio.nombre }}</span>
          <span
            v-if="testimonio.rolOCargo"
            class="block text-sm text-[var(--color-tinta-suave)]"
          >{{ testimonio.rolOCargo }}</span>
        </span>
      </div>
    </figcaption>
  </figure>
</template>

<style scoped>
.prose-testimonio :deep(p) {
  margin-bottom: 0.75rem;
}
.prose-testimonio :deep(p:last-child) {
  margin-bottom: 0;
}
.prose-testimonio :deep(em) {
  font-style: italic;
}
</style>
