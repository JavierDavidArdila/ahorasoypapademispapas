<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('blog').path(`/blog/${slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado' })
}

const articulo = post.value

function formatearFecha(fecha: string | Date) {
  return new Date(fecha).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

useSeoMeta({
  title: articulo.seoTitulo || articulo.titulo,
  description: articulo.seoDescripcion || articulo.resumen,
})
</script>

<template>
  <article class="mx-auto max-w-3xl px-6 py-20 md:py-28">
    <NuxtLink to="/blog" class="kicker text-[var(--color-tinta-suave)] hover:text-[var(--color-terracota)]">
      ← Blog
    </NuxtLink>
    <p class="kicker text-[var(--color-tinta-suave)] mt-8 mb-3">
      {{ formatearFecha(articulo.fecha) }} · {{ articulo.autor }}
    </p>
    <h1 class="text-4xl md:text-5xl font-bold text-[var(--color-azul-alto)] mb-8">{{ articulo.titulo }}</h1>
    <NuxtImg
      v-if="articulo.imagenPortada"
      :src="articulo.imagenPortada"
      :alt="articulo.titulo"
      class="w-full rounded-[var(--radius-editorial)] object-cover mb-10"
      loading="lazy"
      width="960"
      height="540"
    />
    <ContentRenderer :value="articulo" class="prose-editorial flex flex-col gap-6 text-lg leading-relaxed" />
  </article>
</template>
