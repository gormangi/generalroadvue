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
      <button class="btn btn-primary btn-xs ms-auto" @click="logout">LOGOUT</button>
      <div class="nav-toggle">
        <button @click="sideNavToggle" class="btn btn-toggle toggle-sidebar">
          <i class="gg-menu-right"></i>
        </button>
        <button @click="sideNavToggle" class="btn btn-toggle sidenav-toggler">
          <i class="gg-menu-left"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
async function logout() {
  await $fetch('/api/lgout', {method: 'post'});
  window.location.reload();
}
function sideNavToggle() {
  if(!document.querySelector('html').classList.contains('nav_open')) {
    document.querySelector('html').className += ' nav_open';
  } else {
    document.querySelector('html').classList.remove('nav_open');
  }
}
</script>

<style scoped>

</style>
