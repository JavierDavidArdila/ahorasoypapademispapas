<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: 'terracota' | 'ocre' | 'salvia'
  }>(),
  { color: 'terracota' }
)

const colorMap: Record<string, string> = {
  terracota: 'var(--color-terracota)',
  ocre: 'var(--color-ocre)',
  salvia: 'var(--color-salvia)',
}
</script>

<template>
  <span class="relative inline-block">
    <span class="relative z-10"><slot /></span>
    <svg
      class="absolute -bottom-1 left-0 w-full"
      height="10"
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2,6 C40,2 70,9 100,5 C130,1 160,8 198,4"
        fill="none"
        :stroke="colorMap[color]"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
  </span>
</template>
