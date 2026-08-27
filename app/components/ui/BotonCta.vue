<script setup lang="ts">
withDefaults(
  defineProps<{
    to: string
    variante?: 'primario' | 'secundario'
    externo?: boolean
  }>(),
  { variante: 'primario', externo: false }
)
</script>

<template>
  <NuxtLink
    :to="to"
    :target="externo ? '_blank' : undefined"
    :rel="externo ? 'noopener noreferrer' : undefined"
    class="inline-flex items-center gap-2 rounded-[var(--radius-editorial)] px-6 py-3 font-medium transition-colors duration-150"
    :class="
      variante === 'primario'
        ? 'bg-[var(--color-azul)] text-white hover:bg-[var(--color-azul-alto)]'
        : 'border-2 border-[var(--color-azul)] text-[var(--color-azul-alto)] hover:bg-[var(--color-azul)] hover:text-white'
    "
  >
    <slot />
  </NuxtLink>
</template>
