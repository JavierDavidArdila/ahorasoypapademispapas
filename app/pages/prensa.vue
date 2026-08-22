<script setup lang="ts">
const { data: entradas } = await useAsyncData('prensa-listado', () =>
  queryCollection('prensa').order('fecha', 'DESC').all()
)

const ordenGrupos = [
  'Spotify',
  'Blu radio',
  'Semana',
  'El Empleo',
  'RCN',
  'Caracol Radio',
  'W Radio',
  'Colsanitas',
  'Mañanas Latinas',
]

const grupos = computed(() => {
  const lista = entradas.value ?? []
  return ordenGrupos
    .map(nombre => ({
      nombre,
      entradas: lista.filter(entrada => entrada.grupo === nombre),
    }))
    .filter(grupo => grupo.entradas.length > 0)
})

useSeoMeta({
  title: 'Prensa — Fernando Roca Correa',
  description: 'Entrevistas y apariciones en medios de Fernando Roca Correa sobre cuidado familiar y bienestar de los cuidadores.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
    <h1 class="text-4xl md:text-5xl font-bold text-[var(--color-azul)] mb-4">Prensa</h1>
    <p class="max-w-2xl text-[var(--color-tinta-suave)] leading-relaxed mb-14">
      Aquí puedes ver o escuchar las principales entrevistas de los medios a que hemos sido
      invitados desde 2021.
    </p>

    <div class="flex flex-col gap-14">
      <div v-for="grupo in grupos" :key="grupo.nombre">
        <h2 class="text-2xl font-bold text-[var(--color-azul)] mb-6">{{ grupo.nombre }}</h2>
        <div class="flex flex-wrap gap-8">
          <PrensaEntradaPrensa
            v-for="entrada in grupo.entradas"
            :key="entrada.id"
            :subtitulo="entrada.subtitulo"
            :fecha="entrada.fecha"
            :imagen="entrada.imagen"
            :titular="entrada.titular"
            :url="entrada.url"
          />
        </div>
      </div>
    </div>
  </div>
</template>
