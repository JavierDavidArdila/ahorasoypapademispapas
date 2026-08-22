<script setup lang="ts">
const { data: servicios } = await useAsyncData('home-servicios', () =>
  queryCollection('servicios').order('orden', 'ASC').all()
)

const { data: testimonios } = await useAsyncData('home-testimonios', () =>
  queryCollection('testimonios').where('destacadoEnHome', '=', true).order('orden', 'ASC').all()
)

function rutaServicio(servicio: { path: string }) {
  return servicio.path === '/servicios/libro' ? '/libro' : servicio.path
}

function textoCta(servicio: { path: string, disponible?: boolean }) {
  if (!servicio.disponible) return 'Próximamente'
  if (servicio.path === '/servicios/libro') return 'Adquiérelo Aquí'
  return 'Leer Más'
}

const apoyo = [
  { nombre: 'Universidad de los Andes', logo: '/images/apoyo/uniandes.png' },
  { nombre: 'El Tiempo', logo: '/images/apoyo/el-tiempo.png' },
  { nombre: 'Gobernación de Cundinamarca', logo: '/images/apoyo/cundinamarca.png' },
  { nombre: 'Comfama', logo: '/images/apoyo/comfama.png' },
  { nombre: 'Fedecajas', logo: '/images/apoyo/fedecajas.png' },
  { nombre: 'Bancolombia', logo: '/images/apoyo/bancolombia.png' },
  { nombre: 'Banco de Bogotá', logo: '/images/apoyo/banco-bogota.png' },
  { nombre: 'Cámara de Comercio de Bogotá', logo: '/images/apoyo/camara-comercio-bogota.png' },
  { nombre: 'Cámara de Comercio de Medellín', logo: '/images/apoyo/camara-comercio-medellin.png' },
  { nombre: 'II Congreso Empresarial de Economía Plateada', logo: '/images/apoyo/economia-plateada.png' },
  { nombre: 'Reloj de Arena', logo: '/images/apoyo/reloj-de-arena.png' },
  { nombre: 'TENA', logo: '/images/apoyo/tena.png' },
  { nombre: 'Trustomorrow Insurance', logo: '/images/apoyo/trusttomorrow.png' },
  { nombre: 'SAEJ 50', logo: '/images/apoyo/saej.png' },
  { nombre: 'Club Lectores', logo: '/images/apoyo/club-lectores.png' },
  { nombre: 'Plaza Central', logo: '/images/apoyo/plaza-central.png' },
  { nombre: 'Alcaldía de Paipa', logo: '/images/apoyo/alcaldia-paipa.png' },
  { nombre: 'Alcaldía Municipal de Anapoima', logo: '/images/apoyo/alcaldia-anapoima.png' },
  { nombre: 'Fundación Acción Familiar Alzheimer Colombia', logo: '/images/apoyo/afacol.png' },
  { nombre: 'iConversación — Instituto de la Conversación', logo: '/images/apoyo/iconversacion.png' },
]

const carruselApoyo = ref<HTMLElement | null>(null)

function desplazarApoyo(direccion: 1 | -1) {
  carruselApoyo.value?.scrollBy({ left: direccion * 320, behavior: 'smooth' })
}

const prensaDestacada = [
  {
    medio: 'RCN TV',
    detalle: 'Colombia',
    imagen: '/images/prensa/rcn-tv.png',
  },
  {
    medio: 'Univision',
    detalle: 'Al punto con Jorge Ramos — USA',
    imagen: '/images/prensa/univision-jorge-ramos.png',
  },
  {
    medio: 'Blu Radio',
    detalle: 'Píldora del cuidado — En Blu Jeans',
    imagen: '/images/prensa/blu-radio.jpg',
  },
]

useSeoMeta({
  title: 'Ahora soy papá de mis papás — Fernando Roca Correa',
  description:
    'Cuidador, conferencista y mentor de familia. Recursos, formación y acompañamiento para el cuidado de personas mayores y el bienestar de quienes cuidan.',
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-white">
      <div class="mx-auto max-w-6xl px-6 pt-16 pb-14 md:pt-20 md:pb-16 text-center">
        <h1 class="text-4xl md:text-6xl font-bold leading-tight text-[var(--color-azul)]">
          Educamos para cuidarnos mejor
        </h1>
      </div>
    </section>

    <!-- Prensa destacada -->
    <section class="bg-white pb-20 md:pb-28">
      <div class="mx-auto max-w-6xl px-6 grid sm:grid-cols-3 gap-6">
        <NuxtLink
          v-for="entrada in prensaDestacada"
          :key="entrada.medio"
          to="/prensa"
          class="group flex flex-col gap-3 rounded-[var(--radius-editorial)] border border-[var(--color-linea)] overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="aspect-video overflow-hidden bg-[var(--color-papel-alto)]">
            <NuxtImg
              :src="entrada.imagen"
              :alt="`${entrada.medio} — ${entrada.detalle}`"
              class="size-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              width="640"
              height="360"
            />
          </div>
          <div class="px-4 pb-4 text-center">
            <p class="text-lg font-semibold text-[var(--color-azul-alto)]">{{ entrada.medio }}</p>
            <p class="kicker text-[var(--color-tinta-suave)] mt-1">{{ entrada.detalle }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Servicios -->
    <section class="bg-[var(--color-azul)]">
      <div class="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2 class="text-3xl md:text-4xl text-white text-center mb-12">Nuestros servicios</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="servicio in servicios"
            :key="servicio.path"
            class="relative flex flex-col rounded-[var(--radius-editorial)] bg-white overflow-hidden transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl hover:z-10"
          >
            <div class="aspect-[4/3] overflow-hidden bg-[var(--color-papel-alto)]">
              <NuxtImg
                v-if="servicio.imagenPortada"
                :src="servicio.imagenPortada"
                :alt="servicio.titulo"
                class="size-full object-cover"
                loading="lazy"
                width="480"
                height="360"
              />
            </div>
            <div class="flex flex-col gap-3 p-6 flex-1">
              <h3 class="text-xl text-[var(--color-azul-alto)]">{{ servicio.titulo }}</h3>
              <p class="text-sm text-[var(--color-tinta-suave)] leading-relaxed flex-1">
                {{ servicio.resumenCorto }}
              </p>
              <NuxtLink
                v-if="servicio.disponible"
                :to="rutaServicio(servicio)"
                class="mt-2 inline-flex w-fit items-center gap-2 rounded-[var(--radius-editorial)] border-2 px-4 py-2 kicker transition-colors border-[var(--color-amarillo)] text-[var(--color-azul-alto)] hover:bg-[var(--color-amarillo)]"
              >
                {{ textoCta(servicio) }}
              </NuxtLink>
              <span
                v-else
                class="mt-2 inline-flex w-fit items-center gap-2 rounded-[var(--radius-editorial)] border-2 px-4 py-2 kicker transition-colors border-[var(--color-linea)] text-[var(--color-tinta-suave)] cursor-not-allowed"
              >
                {{ textoCta(servicio) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bio + Testimonios -->
    <section class="bg-white">
      <div class="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16">
        <div class="flex flex-col gap-6">
          <p class="kicker text-[var(--color-azul)]">Bio</p>
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--color-azul-alto)]">Fernando Roca Correa</h2>
          <NuxtImg
            src="/images/bio/home-bio.png"
            alt="Fernando Roca Correa"
            class="w-48 rounded-[var(--radius-editorial)] object-cover"
            loading="lazy"
            width="480"
            height="600"
          />
          <p class="text-[var(--color-tinta-suave)] leading-relaxed">
            Fundador de <strong>Ahora soy papá de mis papás / Cuidar es 360 SAS</strong>, es
            Diplomado en Nueva Longevidad y abanderado del cuidado…
          </p>
          <UiBotonCta to="/biografia">Leer Más</UiBotonCta>
        </div>

        <div class="flex flex-col gap-8">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--color-azul-alto)]">Testimonios</h2>
          <div
            v-for="testimonio in testimonios"
            :key="testimonio.id"
            class="border-b border-[var(--color-linea)] pb-8 last:border-b-0"
          >
            <blockquote class="italic text-[var(--color-tinta)] leading-relaxed" style="font-family: var(--font-display)">
              <ContentRenderer :value="testimonio" />
            </blockquote>
            <p class="text-lg font-bold text-[var(--color-azul-alto)] mt-4 pb-1 w-fit border-b-2 border-[var(--color-amarillo)]">
              {{ testimonio.nombre }}
            </p>
            <p v-if="testimonio.rolOCargo" class="text-sm text-[var(--color-tinta-suave)] mt-1 max-w-sm">{{ testimonio.rolOCargo }}</p>
            <p v-if="testimonio.servicioRelacionado" class="kicker text-[var(--color-azul)] mt-1">{{ testimonio.servicioRelacionado }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Con el apoyo de -->
    <section class="bg-[var(--color-azul)]">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-10">Con el apoyo de:</h2>
        <div class="flex items-center gap-4">
          <button
            type="button"
            aria-label="Anterior"
            class="shrink-0 flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
            @click="desplazarApoyo(-1)"
          >
            <Icon name="ph:caret-left" class="size-6" />
          </button>

          <div ref="carruselApoyo" class="flex-1 flex items-center gap-10 overflow-x-auto scroll-smooth [scrollbar-width:none]">
            <img
              v-for="marca in apoyo"
              :key="marca.nombre"
              :src="marca.logo"
              :alt="marca.nombre"
              class="h-16 w-auto shrink-0 object-contain"
            >
          </div>

          <button
            type="button"
            aria-label="Siguiente"
            class="shrink-0 flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
            @click="desplazarApoyo(1)"
          >
            <Icon name="ph:caret-right" class="size-6" />
          </button>
        </div>
      </div>
    </section>

    <!-- Redes sociales -->
    <section class="bg-[var(--color-papel-alto)] border-y border-[var(--color-linea)]">
      <div class="mx-auto max-w-3xl px-6 py-20 md:py-24 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-[var(--color-azul-alto)]">¡Síguenos en nuestras redes!</h2>
        <p class="kicker text-[var(--color-azul)] mt-2">LinkedIn e Instagram</p>

        <div class="grid grid-cols-2 gap-6 mt-10">
          <span
            class="aspect-square flex items-center justify-center rounded-[var(--radius-editorial)] bg-[var(--color-papel)] border border-[var(--color-linea)]"
            title="LinkedIn — próximamente"
          >
            <img src="/images/redes/linkedin.png" alt="LinkedIn" class="size-14 object-contain">
          </span>
          <span
            class="aspect-square flex items-center justify-center rounded-[var(--radius-editorial)] bg-[var(--color-papel)] border border-[var(--color-linea)]"
            title="Instagram — próximamente"
          >
            <img src="/images/redes/instagram.png" alt="Instagram" class="size-14 object-contain">
          </span>
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="mx-auto max-w-6xl px-6 py-20 md:py-28 text-center">
      <h2 class="mx-auto max-w-2xl text-3xl md:text-4xl">
        ¿Tu familia o tu empresa necesita prepararse para el cuidado de una persona mayor?
      </h2>
      <div class="mt-6">
        <UiBotonCta to="/contacto">Comuniquémonos</UiBotonCta>
      </div>
    </section>
  </div>
</template>
