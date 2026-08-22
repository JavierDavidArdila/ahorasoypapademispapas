<script setup lang="ts">
useSeoMeta({
  title: 'Biografía — Fernando Roca Correa',
  description:
    'Cuidador, conferencista, mentor de familia y autor de ¡Ahora soy papá de mis papás! Conoce la trayectoria de Fernando Roca Correa.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-2 gap-12 items-start">
    <NuxtImg
      src="/images/bio/biografia-rubik.jpg"
      alt="Fernando Roca Correa"
      class="w-full rounded-[var(--radius-editorial)] object-cover shadow-md"
      loading="lazy"
      width="800"
      height="800"
    />

    <div class="flex flex-col gap-6">
      <h1 class="text-3xl md:text-4xl font-bold leading-tight text-[var(--color-azul-alto)]">
        Cuidador | Conferencista | Mentor de familia | Autor de ¡Ahora soy papá de mis papás!
      </h1>
      <p class="text-xl font-bold text-[var(--color-azul)]">
        Consultor empresarial en Economía del Cuidado
      </p>

      <div class="flex flex-col gap-4 text-[var(--color-tinta-suave)] leading-relaxed">
        <p>
          Fundador de <strong class="text-[var(--color-tinta)]">Ahora soy papá de mis papás / Cuidar es 360 SAS</strong>,
          es Diplomado en Nueva Longevidad y abanderado del cuidado.
        </p>
        <p>
          Con experiencia de más 38 años en publicidad y mercadeo, cambió su vida hacia la
          educación y el cuidado al tener que cuidar desde 2013 de su madre y suegra con
          Alzheimer.
        </p>
        <p>
          Su proyecto de vida es el cuidado y Bien Estar de las personas mayores, los cuidadores
          y las familias. Desarrolla programas educativos, conferencias y asesorías familiares
          sobre estos temas.
        </p>
        <p>
          Su libro <em>¡Ahora soy Papá de mis Papás!</em>, que ya está en su segunda edición, es
          Best Seller de Bienestar en Colombia y otros países de Latinoamérica.
        </p>
      </div>

      <a
        href="/contacto"
        class="inline-flex w-fit items-center gap-2 rounded-[var(--radius-editorial)] border-2 border-[var(--color-amarillo)] px-6 py-3 kicker text-[var(--color-azul-alto)] hover:bg-[var(--color-amarillo)] transition-colors"
      >
        Contáctalo aquí
      </a>
    </div>
  </div>
</template>
