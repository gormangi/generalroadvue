<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
  useHead({
    title: 'General Road Shop',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: '/css/style.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css' },
      { rel: 'stylesheet', href: '/lib/owlcarousel/assets/owl.carousel.min.css' }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.4.1.min.js'},
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js'},
      { src: '/lib/easing/easing.min.js'},
      { src: '/lib/owlcarousel/owl.carousel.min.js'}
    ]
  })
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
  pointer-events: auto;
}
.loading-overlay img{
  pointer-events: none;
  height: 10%;
}
.content-disabled {
  pointer-events: none; /* Prevent clicks on the content when loading */
  opacity: 0.5; /* Optional: visually indicate that content is disabled */
}
</style>