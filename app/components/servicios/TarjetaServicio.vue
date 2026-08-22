<script setup lang="ts">
withDefaults(
  defineProps<{
    titulo: string
    resumenCorto: string
    icono: string
    to: string
    acento?: 'terracota' | 'salvia'
    disponible?: boolean
  }>(),
  { acento: 'terracota', disponible: true }
)
</script>

<template>
  <NuxtLink
    v-if="disponible"
    :to="to"
    class="group flex flex-col gap-4 border border-[var(--color-linea)] rounded-[var(--radius-editorial)] p-8 transition-colors duration-150 hover:border-[var(--color-tinta)]"
  >
    <Icon
      :name="icono"
      class="size-9"
      :class="acento === 'terracota' ? 'text-[var(--color-terracota)]' : 'text-[var(--color-salvia)]'"
    />
    <h3 class="text-xl">{{ titulo }}</h3>
    <p class="text-[var(--color-tinta-suave)] leading-relaxed">{{ resumenCorto }}</p>
    <span class="kicker text-[var(--color-terracota)] group-hover:underline">Leer más →</span>
  </NuxtLink>
  <div
    v-else
    class="flex flex-col gap-4 border border-[var(--color-linea)] rounded-[var(--radius-editorial)] p-8 opacity-70"
  >
    <Icon
      :name="icono"
      class="size-9"
      :class="acento === 'terracota' ? 'text-[var(--color-terracota)]' : 'text-[var(--color-salvia)]'"
    />
    <h3 class="text-xl">{{ titulo }}</h3>
    <p class="text-[var(--color-tinta-suave)] leading-relaxed">{{ resumenCorto }}</p>
    <span class="kicker text-[var(--color-tinta-suave)]">Próximamente</span>
  </div>
</template>
