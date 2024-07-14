<template>
  <div class="sidebar" data-background-color="dark">
    <div class="sidebar-logo">
      <!-- Logo Header -->
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
        <button class="topbar-toggler more">
          <i class="gg-more-vertical-alt"></i>
        </button>
      </div>
      <!-- End Logo Header -->
    </div>
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
      <div class="sidebar-content">
        <ul class="nav nav-secondary">
          <li class="nav-item active">
            <a data-bs-toggle="collapse" href="#submenu">
              <i class="fas fa-bars"></i>
              <p>Administrator Menu</p>
              <span class="caret"></span>
            </a>
            <div class="collapsed" id="submenu">
              <ul class="nav nav-collapse">
                <li>
                  <a href="javascript:void(0)" @click="methods.goMenu('/admin/AdminIndex')"><span class="sub-item">카테고리 관리</span></a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="methods.goMenu('/admin/ProductManagement')"><span class="sub-item">상품 관리</span></a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="methods.goMenu('/admin/CategoryProductLink')"><span class="sub-item">카테고리상품연결</span></a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="methods.goMenu('')"><span class="sub-item">메인배너 관리</span></a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "nuxt/app";

const router = useRouter();

const methods = {
  goMenu(location) {
    router.push(location);
    document.querySelector('html').classList.remove('nav_open');
  }
}
</script>

<style scoped>

</style>
