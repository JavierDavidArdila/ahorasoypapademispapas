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
        ? 'bg-[var(--color-terracota)] text-[var(--color-papel)] hover:bg-[var(--color-terracota-alto)]'
        : 'border border-[var(--color-tinta)] text-[var(--color-tinta)] hover:bg-[var(--color-tinta)] hover:text-[var(--color-papel)]'
    "
  >
    <slot />
  </NuxtLink>
</template>
