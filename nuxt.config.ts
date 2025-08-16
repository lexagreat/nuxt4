// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'; // Импортируем svgLoader

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ],
    },
  },
  css: ['@/assets/scss/style.scss'],
  vite: {
    plugins: [
      svgLoader(), // Добавляем плагин для работы с SVG как с Vue компонентами
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/vars.scss" as *;',
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://admin.ownstone.ru',
    },
  },
  experimental: {
    typedPages: true,
    payloadExtraction: true, // Уменьшает объём передаваемых данных // оптимизация
  },
  // build: {
  //    // оптимизация
  //    splitChunks: {
  //       layouts: true,
  //       pages: true,
  //       commons: true,
  //    },
  // },
  nitro: {
    // оптимизация
    compressPublicAssets: true, // Включить сжатие
  },
});
