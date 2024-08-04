<template>
  <div class="sidebar" data-background-color="dark">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
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
                  <a href="javascript:void(0)" @click="methods.goMenu('/admin/banerManagement')"><span class="sub-item">메인배너 관리</span></a>
                </li>
                <li>
                  <a href="javascript:void(0)" @click="methods.allClear"><span class="sub-item">전체 초기화</span></a>
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
const { isLoading, startLoading, stopLoading } = useLoading();

const methods = {
  goMenu(location) {
    router.push(location);
    document.querySelector('html').classList.remove('nav_open');
  },
  async allClear() {
    if (confirm('전체 초기화를 실행합니다\n\r모든 카테고리, 모든상품, 모든배너가 삭제됩니다')) {
      if (confirm('삭제 후에는 복구할수없습니다 실행 하시겠습니까?')) {
        startLoading();
        await $fetch('/api/allClear', {method:'post'}).finally(() => {
          stopLoading();
          alert('전체 초기화가 완료되었습니다');
          this.goMenu('/admin/AdminIndex');
        });
      }
    }
  }
}
</script>

<style scoped>

</style>
