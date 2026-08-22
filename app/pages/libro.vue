<script setup lang="ts">
const { data: servicio } = await useAsyncData('libro', () =>
  queryCollection('servicios').path('/servicios/libro').first()
)

if (!servicio.value) {
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
}

const libro = servicio.value

useSeoMeta({
  title: libro.seoTitulo || libro.titulo,
  description: libro.seoDescripcion || libro.resumenCorto,
})

const colombia = [
  { nombre: 'Librería Nacional', logo: '/images/tienda/libreria-nacional.png' },
  { nombre: 'Panamericana', logo: '/images/tienda/panamericana.png' },
  { nombre: 'Librería Lerner', logo: '/images/tienda/libreria-lerner.png' },
]

const fueraColombia = [
  { nombre: 'LibriMundi', logo: '/images/tienda/librimundi.png' },
  { nombre: 'Librería Española', logo: '/images/tienda/libreria-espanola.png' },
  { nombre: 'Mr. Books', logo: '/images/tienda/mr-books.png' },
  { nombre: 'Buscalibre', logo: '/images/tienda/buscalibre.png' },
]

const ebook = [
  { nombre: 'Amazon', logo: '/images/tienda/amazon.png' },
  { nombre: 'Apple Books', logo: '/images/tienda/apple-books.png' },
  { nombre: 'Google', logo: '/images/tienda/google.png' },
]
</script>

<template>
  <div>
    <div class="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-2 gap-12 items-start">
      <div class="bg-[var(--color-amarillo)] rounded-[var(--radius-editorial)] p-8 flex items-center justify-center order-1">
        <NuxtImg
          src="/images/servicios/libro.png"
          :alt="libro.titulo"
          class="w-full max-w-sm object-contain"
          loading="lazy"
          width="640"
          height="360"
        />
      </div>

      <div class="flex flex-col gap-6 order-2">
        <h1 class="text-4xl md:text-5xl font-bold text-[var(--color-azul-alto)]">{{ libro.titulo }}</h1>
        <ContentRenderer :value="libro" class="prose-editorial flex flex-col gap-4 leading-relaxed" />
        <a
          href="#donde-comprar"
          class="inline-flex w-fit items-center gap-2 rounded-[var(--radius-editorial)] border-2 border-[var(--color-amarillo)] px-6 py-3 kicker text-[var(--color-azul-alto)] hover:bg-[var(--color-amarillo)] transition-colors"
        >
          Adquiérelo Aquí
        </a>
      </div>
    </div>

    <section id="donde-comprar" class="bg-[var(--color-azul)] scroll-mt-24">
      <div class="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16">
        <div class="text-center">
          <h2 class="text-xl font-bold text-white">En Colombia:</h2>
          <p class="text-sm text-white/80 mt-3 leading-relaxed">
            ¡Ahora soy papá de mis papás! está en las principales cadenas de librerías de
            Colombia, así como en los puntos Brit de los aeropuertos y en la mayoría de las
            librerías independientes desde la costa norte hasta Nariño y desde el Valle hasta
            Boyacá.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-8 mt-8">
            <img v-for="tienda in colombia" :key="tienda.nombre" :src="tienda.logo" :alt="tienda.nombre" class="h-12 object-contain">
          </div>
        </div>

        <div class="text-center">
          <h2 class="text-xl font-bold text-white">Fuera de Colombia:</h2>
          <p class="text-sm text-white/80 mt-3 leading-relaxed">
            En Ecuador está disponible en LibriMundi, Librería Española y Mr. Books, y en toda
            la región a través de Buscalibre.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-8 mt-8">
            <img v-for="tienda in fueraColombia" :key="tienda.nombre" :src="tienda.logo" :alt="tienda.nombre" class="h-12 object-contain">
          </div>
        </div>
      </div>

      <div class="border-t border-white/20 mx-6" />

      <div class="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 class="text-xl md:text-2xl font-bold text-white">
          En versión E-Book se encuentra en Amazon, Apple y Google a nivel mundial.
        </h2>
        <div class="flex flex-wrap items-center justify-center gap-12 mt-8">
          <img v-for="tienda in ebook" :key="tienda.nombre" :src="tienda.logo" :alt="tienda.nombre" class="h-12 object-contain">
        </div>
      </div>
    </section>
  </div>
</template>
