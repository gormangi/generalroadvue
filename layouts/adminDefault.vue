<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <SideBar />
    <!-- End Sidebar -->
    <div class="main-panel">
      <div class="main-header">
        <!-- Logo Header -->
        <LogoHeader />
        <!-- End Logo Header -->
        <!-- Navbar Header -->
        <nav
            class="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom"
        >
          <div class="container-fluid">
            <nav
                class="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex"
            >
              <div class="input-group">
                <div class="input-group-prepend">
                  <button type="submit" class="btn btn-search pe-1">
                    <i class="fa fa-search search-icon"></i>
                  </button>
                </div>
                <input
                    type="text"
                    placeholder="Search ..."
                    class="form-control"
                />
              </div>
            </nav>
          </div>
        </nav>
        <!-- End Navbar -->
      </div>
      <div class="container" @click="methods.closeSideNav">
        <slot/>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
  import SideBar from "/components/admin/SideBar";
  import LogoHeader from "/components/admin/LogoHeader";
  import Footer from "/components/admin/Footer";
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
      //{src: '/assets/js/core/jquery-3.7.1.min.js'},
      //{src: '/assets/js/core/popper.min.js'},
      {src: '/assets/js/core/bootstrap.min.js'}
      //{src: '/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js'},
      //{src: '/assets/js/plugin/chart.js/chart.min.js'},
      //{src: '/assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js'},
      //{src: '/assets/js/plugin/chart-circle/circles.min.js'},
      //{src: '/assets/js/plugin/datatables/datatables.min.js'},
      //{src: '/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js'},
      //{src: '/assets/js/plugin/jsvectormap/jsvectormap.min.js'},
      //{src: '/assets/js/plugin/jsvectormap/world.js'},
      //{src: '/assets/js/kaiadmin.min.js'}
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

  const methods = {
    closeSideNav() {
      document.querySelector('html').classList.remove('nav_open');
    }
  }

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
