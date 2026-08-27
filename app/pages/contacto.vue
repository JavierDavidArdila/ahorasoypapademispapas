<script setup lang="ts">
const config = useRuntimeConfig()

const nombre = ref('')
const apellido = ref('')
const email = ref('')
const telefono = ref('')
const empresa = ref('')
const asunto = ref('')
const mensaje = ref('')
const honeypot = ref('')

const asuntos = [
  'Libro',
  'Conferencias y cursos',
  'Programa Trabajador-Cuidador',
  'Des Cárgate',
  'Mentorías de familia',
  'Plataforma virtual',
  'Prensa / medios',
  'Otro',
]

const estado = ref<'inactivo' | 'enviando' | 'exito' | 'error'>('inactivo')

const claveConfigurada = computed(() => Boolean(config.public.web3formsKey))

async function enviarFormulario() {
  if (honeypot.value) return
  if (!claveConfigurada.value) {
    estado.value = 'error'
    return
  }

  estado.value = 'enviando'
  try {
    const respuesta = await $fetch<{ success: boolean }>('https://api.web3forms.com/submit', {
      method: 'POST',
      body: {
        access_key: config.public.web3formsKey,
        subject: 'Nuevo mensaje desde ahorasoypapademispapas.com',
        from_name: `${nombre.value} ${apellido.value}`.trim(),
        name: `${nombre.value} ${apellido.value}`.trim(),
        email: email.value,
        telefono: telefono.value,
        empresa: empresa.value,
        asunto: asunto.value,
        message: mensaje.value,
      },
    })

    if (respuesta.success) {
      estado.value = 'exito'
      nombre.value = ''
      apellido.value = ''
      email.value = ''
      telefono.value = ''
      empresa.value = ''
      asunto.value = ''
      mensaje.value = ''
    } else {
      estado.value = 'error'
    }
  } catch {
    estado.value = 'error'
  }
}

useSeoMeta({
  title: 'Comuniquémonos — Fernando Roca Correa',
  description: 'Escríbenos para conocer más sobre el libro, las conferencias, las mentorías o el programa Trabajador-Cuidador.',
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-16 md:py-20 grid md:grid-cols-2 gap-0 rounded-[var(--radius-editorial)] overflow-hidden border border-[var(--color-linea)]">
    <div class="bg-[var(--color-azul-medio)] text-white p-10 md:p-12 flex flex-col gap-6 justify-center">
      <h1 class="text-4xl md:text-5xl font-bold">Contacto</h1>
      <p class="leading-relaxed">
        Queremos escucharte y te presentamos las diferentes vías para que interactuemos:
      </p>
      <p class="leading-relaxed">
        Escríbenos ahora en el formulario o por WhatsApp.
      </p>
      <p class="leading-relaxed">
        Nos encuentras en:
        <a href="mailto:fernando@ahorasoypapademispapas.com" class="underline">fernando@ahorasoypapademispapas.com</a>
      </p>
      <a href="tel:+573153350785" class="flex items-center gap-2 font-semibold">
        <Icon name="ph:whatsapp-logo" class="size-5" />
        +57 315 335 0785
      </a>
    </div>

    <form v-if="estado !== 'exito'" class="p-10 md:p-12 flex flex-col gap-5" @submit.prevent="enviarFormulario">
      <div class="grid sm:grid-cols-2 gap-5">
        <div class="flex flex-col gap-2">
          <label for="nombre" class="text-sm text-[var(--color-azul)]">Nombre *</label>
          <input
            id="nombre"
            v-model="nombre"
            type="text"
            required
            class="border border-[var(--color-linea)] rounded-[var(--radius-editorial)] px-4 py-2.5 bg-transparent focus:outline-none focus:border-[var(--color-azul)]"
          >
        </div>
        <div class="flex flex-col gap-2">
          <label for="apellido" class="text-sm text-[var(--color-azul)]">Apellido *</label>
          <input
            id="apellido"
            v-model="apellido"
            type="text"
            required
            class="border border-[var(--color-linea)] rounded-[var(--radius-editorial)] px-4 py-2.5 bg-transparent focus:outline-none focus:border-[var(--color-azul)]"
          >
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm text-[var(--color-azul)]">Email *</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="border border-[var(--color-linea)] rounded-[var(--radius-editorial)] px-4 py-2.5 bg-transparent focus:outline-none focus:border-[var(--color-azul)]"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label for="telefono" class="text-sm text-[var(--color-azul)]">Teléfono Móvil *</label>
        <input
          id="telefono"
          v-model="telefono"
          type="tel"
          required
          class="border border-[var(--color-linea)] rounded-[var(--radius-editorial)] px-4 py-2.5 bg-transparent focus:outline-none focus:border-[var(--color-azul)]"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label for="empresa" class="text-sm text-[var(--color-azul)]">Empresa</label>
        <input
          id="empresa"
          v-model="empresa"
          type="text"
          class="border border-[var(--color-linea)] rounded-[var(--radius-editorial)] px-4 py-2.5 bg-transparent focus:outline-none focus:border-[var(--color-azul)]"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label for="asunto" class="text-sm text-[var(--color-azul)]">Escoge el asunto</label>
        <select
          id="asunto"
          v-model="asunto"
          class="border border-[var(--color-linea)] rounded-[var(--radius-editorial)] px-4 py-2.5 bg-transparent focus:outline-none focus:border-[var(--color-azul)]"
        >
          <option value="" disabled>Selecciona una opción</option>
          <option v-for="opcion in asuntos" :key="opcion" :value="opcion">{{ opcion }}</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label for="mensaje" class="text-sm text-[var(--color-azul)]">Mensaje</label>
        <textarea
          id="mensaje"
          v-model="mensaje"
          rows="4"
          class="border border-[var(--color-linea)] rounded-[var(--radius-editorial)] px-4 py-2.5 bg-transparent focus:outline-none focus:border-[var(--color-azul)]"
        />
      </div>

      <!-- honeypot anti-spam -->
      <input
        v-model="honeypot"
        type="text"
        name="_gotcha"
        class="hidden"
        tabindex="-1"
        autocomplete="off"
      >

      <button
        type="submit"
        :disabled="estado === 'enviando'"
        class="w-fit rounded-[var(--radius-editorial)] bg-[var(--color-azul)] px-6 py-3 kicker text-white hover:bg-[var(--color-azul-alto)] transition-colors disabled:opacity-60"
      >
        {{ estado === 'enviando' ? 'Enviando…' : 'Enviar' }}
      </button>

      <p v-if="estado === 'error'" class="text-sm text-[var(--color-terracota-alto)]">
        <template v-if="!claveConfigurada">
          El formulario aún no tiene configurada una clave de Web3Forms (variable de entorno
          <code>NUXT_PUBLIC_WEB3FORMS_KEY</code>). Este es un sitio de demostración.
        </template>
        <template v-else>
          No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directamente a
          fernando@ahorasoypapademispapas.com.
        </template>
      </p>
    </form>

    <div v-else class="p-10 md:p-12 flex flex-col justify-center">
      <p class="text-xl mb-2 font-bold text-[var(--color-azul-alto)]">¡Gracias por escribirnos!</p>
      <p class="text-[var(--color-tinta-suave)]">Te responderemos lo antes posible.</p>
    </div>
  </div>
</template>
