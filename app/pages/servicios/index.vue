<script setup lang="ts">
const { data: servicios } = await useAsyncData('servicios-listado', () =>
  queryCollection('servicios').order('orden', 'ASC').all()
)

function rutaServicio(servicio: { path: string }) {
  return servicio.path === '/servicios/libro' ? '/libro' : servicio.path
}

useSeoMeta({
  title: 'Servicios — Fernando Roca Correa',
  description:
    'Libro, conferencias, mentorías y programas empresariales para el cuidado de personas mayores y el bienestar de los cuidadores.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-20 md:py-28">
    <p class="kicker text-[var(--color-terracota)] mb-4">Servicios</p>
    <h1 class="text-4xl md:text-5xl mb-12 max-w-2xl">
      Acompañamiento para cada momento del cuidado
    </h1>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ServiciosTarjetaServicio
        v-for="servicio in servicios"
        :key="servicio.path"
        :titulo="servicio.titulo"
        :resumen-corto="servicio.resumenCorto"
        :icono="servicio.icono"
        :to="rutaServicio(servicio)"
        :acento="servicio.acento"
        :disponible="servicio.disponible"
      />
    </div>
  </div>
</template>
