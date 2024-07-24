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
        <template v-if="mainBannerList.length > 0">
          <div class="carousel-item" :class="idx === 0 ? 'active' : ''" style="height: 410px;" v-for="(banner, idx) in mainBannerList">
            <img class="img-fluid" :src="banner.bannerImgVO.filePath" alt="Image">
            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div class="p-3" style="max-width: 700px;">
                <h4 class="text-light text-uppercase font-weight-medium mb-3">{{banner.bannerSubTitle}}</h4>
                <h3 class="display-4 text-white font-weight-semi-bold mb-4">{{banner.bannerTitle}}</h3>
                <a href="javascript:void(0)" @click="moveProductList(banner.categoryIdx)" class="btn btn-light py-2 px-3">Shop Now</a>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="carousel-item active" style="height: 410px;">
            <img class="img-fluid" src="/img/standardBanner.png" alt="Image">
            <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
              <div class="p-3" style="max-width: 700px;">
                <h4 class="text-light text-uppercase font-weight-medium mb-3">General Road Shop</h4>
                <h3 class="display-4 text-white font-weight-semi-bold mb-4">오픈런 없이 합리적인 가격 편안한 명품 쇼핑</h3>
              </div>
            </div>
          </div>
        </template>
      </div>
      <template v-if="mainBannerList.length > 1">
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
      </template>
    </div>
  </div>
</template>

<script setup>

  import {useRouter} from "nuxt/app";
  import {onMounted} from "vue";

  const router = useRouter();

  const props = defineProps({
    mainTopCategoryList: {
      type: Array
    },
    mainChildCategoryList: {
      type: Array
    },
    mainBannerList: {
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
