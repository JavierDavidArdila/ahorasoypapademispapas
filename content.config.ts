import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    servicios: defineCollection({
      type: 'page',
      source: 'servicios/*.md',
      schema: z.object({
        titulo: z.string(),
        resumenCorto: z.string(),
        icono: z.string(),
        orden: z.number(),
        disponible: z.boolean().default(true),
        acento: z.enum(['terracota', 'salvia']).default('terracota'),
        cta: z.object({ texto: z.string(), destino: z.string() }).optional(),
        imagenPortada: z.string().optional(),
        borrador: z.boolean().default(false),
        seoTitulo: z.string().optional(),
        seoDescripcion: z.string().optional(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        titulo: z.string(),
        fecha: z.date(),
        autor: z.string().default('Fernando Roca Correa'),
        resumen: z.string(),
        imagenPortada: z.string().optional(),
        etiquetas: z.array(z.string()).default([]),
        borrador: z.boolean().default(false),
        seoTitulo: z.string().optional(),
        seoDescripcion: z.string().optional(),
      }),
    }),
    testimonios: defineCollection({
      type: 'page',
      source: 'testimonios/*.md',
      schema: z.object({
        nombre: z.string(),
        rolOCargo: z.string().optional(),
        reconocimiento: z.string().optional(),
        servicioRelacionado: z.string().optional(),
        foto: z.string().optional(),
        destacadoEnHome: z.boolean().default(false),
        orden: z.number().default(0),
      }),
    }),
    prensa: defineCollection({
      type: 'data',
      source: 'prensa/*.md',
      schema: z.object({
        grupo: z.string(),
        subtitulo: z.string().optional(),
        medio: z.string(),
        fecha: z.date(),
        titular: z.string(),
        tema: z.string(),
        url: z.string().url().optional(),
        imagen: z.string().optional(),
      }),
    }),
  },
})
