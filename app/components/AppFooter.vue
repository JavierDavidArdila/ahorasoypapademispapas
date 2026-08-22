<script setup lang="ts">
const anioActual = new Date().getFullYear()

const redes = [
  { nombre: 'X', icono: '/images/redes/x.png' },
  { nombre: 'Facebook', icono: '/images/redes/facebook.png' },
  { nombre: 'Instagram', icono: '/images/redes/instagram.png' },
  { nombre: 'LinkedIn', icono: '/images/redes/linkedin.png' },
]

const legal = [
  { texto: 'Política de Privacidad', to: '/legal/politica-de-privacidad' },
  { texto: 'Política de Reembolso', to: '/legal/politica-de-reembolso' },
]
</script>

<template>
  <footer class="bg-[var(--color-azul-oscuro)] text-white mt-[var(--space-4xl)]">
    <div class="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-3">
      <div class="flex flex-col gap-3">
        <p class="text-xl" style="font-family: var(--font-display)">Fernando Roca Correa</p>
        <p class="text-sm text-white/70 leading-relaxed">
          Cuidador, conferencista y mentor de familia. Autor de
          <em>¡Ahora soy papá de mis papás!</em>
        </p>
      </div>

      <div class="flex flex-col gap-3">
        <p class="kicker text-[var(--color-amarillo)]">Comuniquémonos</p>
        <a href="mailto:fernando@ahorasoypapademispapas.com" class="flex items-center gap-2 text-sm hover:underline">
          <Icon name="ph:envelope-simple" class="size-4" />
          fernando@ahorasoypapademispapas.com
        </a>
        <a href="tel:+573122040393" class="flex items-center gap-2 text-sm hover:underline">
          <Icon name="ph:whatsapp-logo" class="size-4" />
          +57 312 204 0393
        </a>
      </div>

      <div class="flex flex-col gap-3">
        <p class="kicker text-[var(--color-amarillo)]">Legal</p>
        <NuxtLink
          v-for="item in legal"
          :key="item.to"
          :to="item.to"
          class="text-sm text-white/85 hover:underline"
        >
          {{ item.texto }}
        </NuxtLink>
      </div>
    </div>

    <div class="border-t border-white/10 px-6 py-8 text-center">
      <div class="flex items-center justify-center gap-4">
        <span
          v-for="red in redes"
          :key="red.nombre"
          class="flex size-9 items-center justify-center rounded-full bg-white/10"
          :title="`${red.nombre} — próximamente`"
        >
          <img :src="red.icono" :alt="red.nombre" class="size-5 object-contain">
        </span>
      </div>
      <p class="text-xs text-white/60 mt-4">
        © {{ anioActual }} Todos los Derechos Reservados por Cuidar es 360 SAS
      </p>
    </div>
  </footer>
</template>
