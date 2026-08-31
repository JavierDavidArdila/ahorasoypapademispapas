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

// La cinta se duplica para lograr un desplazamiento infinito sin saltos.
const apoyoCinta = [...apoyo, ...apoyo]

const prensaDestacada = [
  {
    medio: 'RCN TV',
    detalle: 'Colombia',
    imagen: '/images/prensa/rcn-tv.png',
    url: 'https://www.youtube.com/watch?v=-aQihbNpTfc',
  },
  {
    medio: 'Univision',
    detalle: 'Al punto con Jorge Ramos — USA',
    imagen: '/images/prensa/jorge-ramos-entrevista.jpg',
    url: 'https://www.youtube.com/watch?v=cUYoAXlBMWU',
  },
  {
    medio: 'Blu Radio',
    detalle: 'Píldora del cuidado — En Blu Jeans',
    imagen: '/images/prensa/blu-radio.jpg',
    url: 'https://www.bluradio.com/en-blu-jeans/31-de-octubre-de-2021-en-blu-jeans-programa-completo',
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
        <a
          v-for="entrada in prensaDestacada"
          :key="entrada.medio"
          :href="entrada.url"
          target="_blank"
          rel="noopener"
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
        </a>
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
                class="mt-2 inline-flex w-fit items-center gap-2 rounded-[var(--radius-editorial)] bg-[var(--color-azul)] px-4 py-2 kicker text-white transition-colors hover:bg-[var(--color-azul-alto)]"
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
            class="w-full max-w-md mx-auto rounded-[var(--radius-editorial)] object-cover shadow-md"
            loading="lazy"
            width="640"
            height="426"
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
            <blockquote class="italic text-[var(--color-tinta)] leading-relaxed [&_p:not(:last-child)]:mb-3" style="font-family: var(--font-display)">
              <ContentRenderer :value="testimonio" />
            </blockquote>
            <p class="text-lg font-bold text-[var(--color-azul-alto)] mt-4 pb-1 w-fit border-b-2 border-[var(--color-amarillo)]">
              {{ testimonio.nombre }}
            </p>
            <p v-if="testimonio.rolOCargo" class="text-sm text-[var(--color-tinta-suave)] mt-1 max-w-sm">{{ testimonio.rolOCargo }}</p>
            <p v-if="testimonio.servicioRelacionado" class="kicker text-[var(--color-azul)] mt-1">{{ testimonio.servicioRelacionado }}</p>
          </div>
          <UiBotonCta to="/testimonios" variante="secundario" class="w-fit">Ver todos los testimonios</UiBotonCta>
        </div>
      </div>
    </section>

    <!-- Con el apoyo de -->
    <section class="bg-[var(--color-azul)]">
      <div class="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-10">Con el apoyo de:</h2>
        <div class="apoyo-marquee">
          <ul class="apoyo-pista">
            <li
              v-for="(marca, i) in apoyoCinta"
              :key="`${marca.nombre}-${i}`"
              class="shrink-0"
              :aria-hidden="i >= apoyo.length ? 'true' : undefined"
            >
              <img
                :src="marca.logo"
                :alt="i >= apoyo.length ? '' : marca.nombre"
                class="h-14 w-auto object-contain"
                loading="lazy"
                decoding="async"
              >
            </li>
          </ul>
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

<style scoped>
.apoyo-marquee {
  overflow: hidden;
  /* Difuminado en los bordes para que la cinta entre y salga sin corte seco. */
  -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
  mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
}

.apoyo-pista {
  display: flex;
  align-items: center;
  width: max-content;
  animation: apoyo-desliz 60s linear infinite;
}

.apoyo-pista > li {
  /* Espacio como padding (no gap) para que el ancho de una copia sea exacto y -50% no salte. */
  padding-inline: 2rem;
}

.apoyo-marquee:hover .apoyo-pista {
  animation-play-state: paused;
}

/* La cinta es el doble de ancha (lista duplicada); mover -50% deja el punto de unión invisible. */
@keyframes apoyo-desliz {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .apoyo-pista {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
    row-gap: 2.5rem;
  }
  /* Sin animación no hace falta la segunda copia de la cinta. */
  .apoyo-pista > li[aria-hidden="true"] {
    display: none;
  }
  .apoyo-marquee {
    -webkit-mask-image: none;
    mask-image: none;
  }
}
</style>
