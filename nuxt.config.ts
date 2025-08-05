export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Reserva Hotel - Tu Hotel',
      meta: [
        // Open Graph y otras etiquetas SEO
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Reserva tu habitación en nuestro hotel de lujo, disponibilidad en tiempo real.' },
        { property: 'og:title', content: 'Reserva de Habitaciones en el Hotel de Ensueño' },
        { property: 'og:description', content: 'Un sistema de reservas fácil y rápido. ¡Encuentra tu habitación ideal hoy!' },
        { property: 'og:image', content: 'https://ejemplo.com/imagen-del-hotel.jpg' }, // ¡Cambia esto por tu URL de imagen!
        { property: 'og:url', content: 'https://ejemplo.com' }, // ¡Cambia esto por tu URL de dominio!
        { property: 'og:type', content: 'website' },
        // Etiqueta específica para Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Reserva en el Hotel de Ensueño' },
        { name: 'twitter:description', content: 'Reserva tu habitación de forma fácil y segura. ¡Te esperamos!' },
        { name: 'twitter:image', content: 'https://ejemplo.com/imagen-del-hotel.jpg' } // Misma imagen
      ]
    }
  }
})