import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxtjs/seo',
    '@nuxt/eslint',
  ],

  css: ['~/assets/css/main.css', '~/assets/css/typography.css'],

  nitro: {
    preset: 'static',
  },

  icon: {
    mode: 'svg',
  },

  // El sitio usa Arial (fuente de sistema); las imágenes OG necesitan una
  // fuente descargable, así que se les fija una propia sin afectar el sitio.
  ogImage: {
    fonts: ['Inter:400', 'Inter:700'],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: 'https://ahorasoypapademispapas.david-ardila.workers.dev',
    name: 'Ahora soy papá de mis papás',
    description:
      'Fernando Roca Correa — cuidador, conferencista y mentor de familia. Recursos, formación y acompañamiento para el cuidado de personas mayores.',
    defaultLocale: 'es',
  },

  runtimeConfig: {
    public: {
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || '',
      testBienestarApiUrl:
        process.env.NUXT_PUBLIC_TEST_BIENESTAR_API_URL ||
        'https://casa-test-bienestar-api.<tu-subdominio>.workers.dev',
    },
  },

  routeRules: {
    '/servicios/libro': { redirect: '/libro' },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es-CO' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
})
