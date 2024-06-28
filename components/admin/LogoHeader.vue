<template>
  <div class="main-header-logo">
    <div class="logo-header" data-background-color="dark">
      <NuxtLink to="/admin/AdminIndex" class="logo">
        <img
          src="/assets/img/kaiadmin/logo_light2.png"
          alt="navbar brand"
          class="navbar-brand"
          height="28"
        />
      </NuxtLink>
      <div class="nav-toggle">
        <button class="btn btn-toggle toggle-sidebar">
          <i class="gg-menu-right"></i>
        </button>
        <button class="btn btn-toggle sidenav-toggler">
          <i class="gg-menu-left"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>
