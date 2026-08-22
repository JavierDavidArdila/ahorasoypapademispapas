<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-listado', () =>
  queryCollection('blog').order('fecha', 'DESC').all()
)

function slugDe(post: { path: string }) {
  return post.path.replace('/blog/', '')
}

useSeoMeta({
  title: 'Blog — Fernando Roca Correa',
  description: 'Reflexiones sobre cuidado familiar, envejecimiento responsable y bienestar de los cuidadores.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
    <h1 class="text-4xl md:text-5xl font-bold text-[var(--color-azul)] mb-8">Blog</h1>
    <p class="max-w-3xl text-[var(--color-tinta-suave)] leading-relaxed mb-2">
      Bienvenidos a estas lecturas cortas y prácticas sobre el Ecosistema que reúne la Nueva
      Longevidad, la Economía del Cuidado y la Economía Plateada, desde nuestro objetivo de dar
      el mejor cuidado a las personas mayores y sus cuidadores.
    </p>
    <p class="max-w-3xl text-[var(--color-tinta-suave)] leading-relaxed mb-12">
      Esperamos sean de tu interés y, si te aportan, bienvenidos son los comentarios y si deseas
      compártelas.
    </p>

    <h2 class="text-2xl font-bold text-[var(--color-azul)] mb-6">Todos los posteos</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="flex flex-col rounded-[var(--radius-editorial)] border border-[var(--color-linea)] overflow-hidden opacity-90">
        <NuxtImg
          src="/images/servicios/programa-trabajador-cuidador.jpg"
          alt="Próximo blog: el fenómeno del trabajador-cuidador"
          class="aspect-video w-full object-cover"
          loading="lazy"
          width="480"
          height="270"
        />
        <div class="flex flex-col gap-2 p-5">
          <p class="text-lg font-bold text-[var(--color-azul)]">
            PRÓXIMO BLOG: El fenómeno del Trabajador-Cuidador. Desactivemos en las empresas una
            bomba sicosocial.
          </p>
        </div>
      </div>

      <BlogTarjetaBlog
        v-for="post in posts"
        :key="post.path"
        :titulo="post.titulo"
        :fecha="post.fecha"
        :resumen="post.resumen"
        :imagen="post.imagenPortada"
        :to="`/blog/${slugDe(post)}`"
      />
    </div>
  </div>
</template>
