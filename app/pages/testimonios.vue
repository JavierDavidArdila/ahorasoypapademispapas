<script setup lang="ts">
const { data: testimonios } = await useAsyncData('testimonios-todos', () =>
  queryCollection('testimonios').order('orden', 'ASC').all()
)

const categorias = [
  {
    clave: 'Libro',
    titulo: 'Sobre el libro',
    descripcion: 'Lo que cuentan quienes ya leyeron ¡Ahora soy papá de mis papás!',
    imagen: '/images/servicios/libro.png',
    enlace: '/libro',
  },
  {
    clave: 'Mentorías',
    titulo: 'Mentorías de familia',
    descripcion: 'Familias acompañadas en las decisiones más difíciles del cuidado.',
    imagen: '/images/servicios/mentorias-de-familia.jpg',
    enlace: '/servicios/mentorias-de-familia',
  },
  {
    clave: 'Conferencias',
    titulo: 'Conferencias y formación',
    descripcion: 'Instituciones y empresas que llevaron la conversación del cuidado a sus equipos.',
    imagen: '/images/servicios/conferencias-y-cursos.jpeg',
    enlace: '/servicios/conferencias-y-cursos',
  },
]

const grupos = computed(() =>
  categorias
    .map(categoria => ({
      ...categoria,
      items: (testimonios.value ?? []).filter(
        testimonio => testimonio.servicioRelacionado === categoria.clave
      ),
    }))
    .filter(grupo => grupo.items.length > 0)
)

useSeoMeta({
  title: 'Testimonios — Fernando Roca Correa',
  description:
    'Lectores del libro, familias en mentoría e instituciones que han trabajado con Fernando Roca Correa comparten su experiencia sobre el cuidado de las personas mayores.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
    <h1 class="text-4xl md:text-5xl font-bold text-[var(--color-azul)] mb-4">Testimonios</h1>
    <p class="max-w-2xl text-[var(--color-tinta-suave)] leading-relaxed mb-14">
      Lectores del libro, familias acompañadas en mentoría e instituciones que han formado a sus
      equipos comparten cómo ha sido poner el cuidado de las personas mayores al centro de la
      conversación.
    </p>

    <div class="flex flex-col gap-16">
      <section v-for="grupo in grupos" :key="grupo.clave">
        <NuxtLink
          :to="grupo.enlace"
          class="group mb-8 flex items-center gap-5 overflow-hidden rounded-[var(--radius-editorial)] bg-[var(--color-azul)] p-5 md:p-7"
        >
          <div class="flex-1 text-white">
            <h2 class="text-2xl md:text-3xl font-bold">{{ grupo.titulo }}</h2>
            <p class="mt-1 text-sm md:text-base text-white/80 leading-relaxed">
              {{ grupo.descripcion }}
            </p>
            <span class="kicker mt-3 inline-flex items-center gap-1 text-[var(--color-amarillo)]">
              Conocer más
              <Icon
                name="ph:arrow-right"
                class="size-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
          <div
            class="size-20 sm:size-28 md:size-40 shrink-0 overflow-hidden rounded-[var(--radius-editorial)] border-4 border-white/15"
          >
            <NuxtImg
              :src="grupo.imagen"
              :alt="grupo.titulo"
              class="size-full object-cover"
              loading="lazy"
              width="320"
              height="320"
            />
          </div>
        </NuxtLink>

        <div class="[column-gap:1.5rem] sm:columns-2">
          <TestimoniosTarjetaTestimonio
            v-for="testimonio in grupo.items"
            :key="testimonio.id"
            :testimonio="testimonio"
          />
        </div>
      </section>
    </div>
  </div>
</template>
