<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
  import {onMounted} from "vue";

  useHead({
    title: 'GENERAL ROAD ADMIN',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'},
    ],
    link: [
      {rel: 'stylesheet', href: '/assets/css/bootstrap.min.css'},
      {rel: 'stylesheet', href: '/assets/css/plugins.min.css'},
      {rel: 'stylesheet', href: '/assets/css/kaiadmin.min.css'}
    ],
    script: [
      {src: '/assets/js/plugin/webfont/webfont.min.js'},
      {src: '/assets/js/core/jquery-3.7.1.min.js'},
      //{src: '/assets/js/core/popper.min.js'},
      {src: '/assets/js/core/bootstrap.min.js'},
      {src: '/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js'},
      //{src: '/assets/js/plugin/chart.js/chart.min.js'},
      //{src: '/assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js'},
      //{src: '/assets/js/plugin/chart-circle/circles.min.js'},
      //{src: '/assets/js/plugin/datatables/datatables.min.js'},
      //{src: '/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js'},
      //{src: '/assets/js/plugin/jsvectormap/jsvectormap.min.js'},
      //{src: '/assets/js/plugin/jsvectormap/world.js'},
      {src: '/assets/js/kaiadmin.min.js'}
    ]
  })

  onMounted(() => {
    WebFont.load({
      google: {families: ["Public Sans:300,400,500,600,700"]},
      custom: {
        families: [
          "Font Awesome 5 Solid",
          "Font Awesome 5 Regular",
          "Font Awesome 5 Brands",
          "simple-line-icons",
        ],
        urls: ["/assets/css/fonts.min.css"]
      },
      active: function () {
        sessionStorage.fonts = true;
      }
    });
  });

</script>

<style scoped>

</style>
