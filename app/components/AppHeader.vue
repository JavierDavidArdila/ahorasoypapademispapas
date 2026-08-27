<script setup lang="ts">
const { data: servicios } = await useAsyncData('header-servicios', () =>
  queryCollection('servicios').order('orden', 'ASC').all()
)

function rutaServicio(servicio: { path: string }) {
  return servicio.path === '/servicios/libro' ? '/libro' : servicio.path
}

const menuAbierto = ref(false)
const dropdownAbierto = ref(false)
const dropdownMovilAbierto = ref(false)

const enlaces = [
  { texto: 'Inicio', to: '/' },
  { texto: 'Bio', to: '/biografia' },
  { texto: 'Blog', to: '/blog' },
  { texto: 'Prensa', to: '/prensa' },
  { texto: 'Comuniquémonos', to: '/contacto' },
]
</script>

<template>
  <header class="border-b border-[var(--color-linea)] bg-white">
    <div class="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-6">
      <NuxtLink to="/" class="flex items-center gap-3 shrink-0">
        <img src="/images/logo/logo.png" alt="Ahora soy papá de mis papás" class="size-14 rounded-xl">
        <span class="leading-tight font-bold uppercase text-[var(--color-azul-alto)] text-sm tracking-tight">
          <span class="block">Fernando</span>
          <span class="block">Roca</span>
          <span class="block">Correa</span>
        </span>
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-7 kicker">
        <NuxtLink
          to="/"
          class="text-[var(--color-azul)] hover:text-[var(--color-azul-alto)] transition-colors"
          active-class="text-[var(--color-azul-alto)]"
        >
          Inicio
        </NuxtLink>

        <div
          class="relative"
          @mouseenter="dropdownAbierto = true"
          @mouseleave="dropdownAbierto = false"
        >
          <button
            type="button"
            class="flex items-center gap-1 text-[var(--color-azul)] hover:text-[var(--color-azul-alto)] transition-colors"
            :aria-expanded="dropdownAbierto"
            @click="dropdownAbierto = !dropdownAbierto"
          >
            Productos y Servicios
            <Icon name="ph:caret-down" class="size-3.5" />
          </button>
          <div
            v-if="dropdownAbierto"
            class="absolute left-0 top-full pt-3 w-64"
          >
            <div class="rounded-[var(--radius-editorial)] border border-[var(--color-linea)] bg-white shadow-lg py-2 normal-case">
              <NuxtLink
                v-for="servicio in servicios"
                :key="servicio.path"
                :to="rutaServicio(servicio)"
                class="block px-4 py-2.5 text-sm font-medium text-[var(--color-azul)] hover:bg-[var(--color-papel-alto)] hover:text-[var(--color-azul-alto)] transition-colors"
                @click="dropdownAbierto = false"
              >
                {{ servicio.titulo }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <NuxtLink
          v-for="enlace in enlaces.slice(1)"
          :key="enlace.to"
          :to="enlace.to"
          class="text-[var(--color-azul)] hover:text-[var(--color-azul-alto)] transition-colors"
          active-class="text-[var(--color-azul)]"
        >
          {{ enlace.texto }}
        </NuxtLink>
      </nav>

      <div class="hidden lg:flex items-center shrink-0">
        <span
          class="relative inline-flex items-center gap-2 rounded-[var(--radius-editorial)] bg-[var(--color-azul)] px-4 py-2.5 text-white kicker cursor-not-allowed opacity-90"
          title="Muy pronto"
        >
          <Icon name="ph:storefront" class="size-4" />
          Tienda
          <span class="absolute -top-2 -right-2 rounded-full bg-[var(--color-amarillo)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--color-azul-alto)] leading-none">
            Pronto
          </span>
        </span>
      </div>

      <button
        class="lg:hidden text-[var(--color-azul)]"
        aria-label="Abrir menú"
        @click="menuAbierto = !menuAbierto"
      >
        <Icon :name="menuAbierto ? 'ph:x' : 'ph:list'" class="size-7" />
      </button>
    </div>

    <nav v-if="menuAbierto" class="lg:hidden border-t border-[var(--color-linea)] px-6 py-4 flex flex-col gap-1 kicker">
      <NuxtLink to="/" class="py-2" @click="menuAbierto = false">Inicio</NuxtLink>

      <button
        type="button"
        class="flex items-center justify-between py-2 text-left"
        @click="dropdownMovilAbierto = !dropdownMovilAbierto"
      >
        Productos y Servicios
        <Icon :name="dropdownMovilAbierto ? 'ph:caret-up' : 'ph:caret-down'" class="size-3.5" />
      </button>
      <div v-if="dropdownMovilAbierto" class="flex flex-col gap-1 pl-4 pb-2 normal-case">
        <NuxtLink
          v-for="servicio in servicios"
          :key="servicio.path"
          :to="rutaServicio(servicio)"
          class="py-1.5 text-sm font-medium text-[var(--color-azul)]"
          @click="menuAbierto = false"
        >
          {{ servicio.titulo }}
        </NuxtLink>
      </div>

      <NuxtLink
        v-for="enlace in enlaces.slice(1)"
        :key="enlace.to"
        :to="enlace.to"
        class="py-2"
        @click="menuAbierto = false"
      >
        {{ enlace.texto }}
      </NuxtLink>

      <span class="mt-2 inline-flex w-fit items-center gap-2 rounded-[var(--radius-editorial)] bg-[var(--color-azul)] px-4 py-2.5 text-white opacity-90">
        <Icon name="ph:storefront" class="size-4" />
        Tienda — Pronto
      </span>
    </nav>
  </header>
</template>
