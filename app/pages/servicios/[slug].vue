<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

if (slug === 'libro') {
  await navigateTo('/libro', { redirectCode: 301 })
}

const { data: servicio } = await useAsyncData(`servicio-${slug}`, () =>
  queryCollection('servicios').path(`/servicios/${slug}`).first()
)

if (!servicio.value) {
  throw createError({ statusCode: 404, statusMessage: 'Servicio no encontrado' })
}

const detalle = servicio.value

useSeoMeta({
  title: detalle.seoTitulo || detalle.titulo,
  description: detalle.seoDescripcion || detalle.resumenCorto,
})
</script>

<template>
  <ServiciosDetalleServicio :servicio="detalle" />
</template>
