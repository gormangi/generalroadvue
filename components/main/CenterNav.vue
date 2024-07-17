<template>
  <div class="col-lg-9">
    <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
      <NuxtLink to="/" class="text-decoration-none d-block d-lg-none">
        <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">GEN</span>Road</h1>
      </NuxtLink>
      <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
        <div class="navbar-nav mr-auto py-0">
          <template v-for="item in mainTopCategoryList" key="topCategoryKey">
            <template v-if="item.childCategoryCnt">
              <div class="nav-item dropdown">
                <a href="javascript:void(0)" class="nav-link dropdown-toggle" data-toggle="dropdown">{{ item.categoryName }}</a>
                <div class="dropdown-menu rounded-0 m-0">
                  <template v-for="i in mainChildCategoryList" key="childCategoryKey">
                    <template v-if="i.parentCategoryIdx === item.categoryIdx">
                      <a href="javascript:void(0)" @click="moveProductList(i.categoryIdx)" class="dropdown-item">{{ i.categoryName }}</a>
                    </template>
                  </template>
                </div>
              </div>
            </template>
            <template v-else>
              <a href="javascript:void(0)" @click="moveProductList(item.categoryIdx)" class="nav-item nav-link">{{ item.categoryName }}</a>
            </template>
          </template>
        </div>
      </div>
    </nav>
    <div id="header-carousel" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" style="height: 410px;">
          <img class="img-fluid" src="/img/bottega/bottega.jpg" alt="Image">
          <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
            <div class="p-3" style="max-width: 700px;">
              <h4 class="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
              <h3 class="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
              <a href="" class="btn btn-light py-2 px-3">Shop Now</a>
            </div>
          </div>
        </div>
        <div class="carousel-item" style="height: 410px;">
          <img class="img-fluid" src="/img/hermes/hermes.jpg" alt="Image">
          <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
            <div class="p-3" style="max-width: 700px;">
              <h4 class="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
              <h3 class="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
              <a href="" class="btn btn-light py-2 px-3">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#header-carousel" data-slide="prev">
        <div class="btn btn-dark" style="width: 45px; height: 45px;">
          <span class="carousel-control-prev-icon mb-n2"></span>
        </div>
      </a>
      <a class="carousel-control-next" href="#header-carousel" data-slide="next">
        <div class="btn btn-dark" style="width: 45px; height: 45px;">
          <span class="carousel-control-next-icon mb-n2"></span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>

  import {useRouter} from "nuxt/app";

  const router = useRouter();

  const props = defineProps({
    mainTopCategoryList: {
      type: Array
    },
    mainChildCategoryList: {
      type: Array
    }
  });

  const moveProductList = (categoryIdx) => {
    router.push({
      path: '/product/ProductList',
      query: {
        categoryIdx: categoryIdx
      }
    });
  }
</script>

<style scoped>

</style>
