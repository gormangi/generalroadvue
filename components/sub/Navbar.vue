<template>
  <div class="container-fluid">
    <div class="row border-top px-xl-5">
      <div class="col-lg-3 d-none d-lg-block">
        <a class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
           data-toggle="collapse" href="#navbar-vertical" style="height: 65px; margin-top: -1px; padding: 0 30px;">
          <h6 class="m-0">Categories</h6>
          <i class="fa fa-angle-down text-dark"></i>
        </a>
        <nav
            class="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
            id="navbar-vertical" style="width: calc(100% - 30px); z-index: 1;">
          <div class="navbar-nav w-100 overflow-hidden" style="height: 410px">

            <template v-for="item in topCategoryList">
              <template v-if="item.childCategoryCnt">
                <div class="nav-item dropdown">
                  <a href="javascript:void(0)" class="nav-link" data-toggle="dropdown">{{ item.categoryName }} <i class="fa fa-angle-down float-right mt-1"></i></a>
                  <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                    <template v-for="i in childCategoryList">
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
        </nav>
      </div>
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
              <template v-for="item in topCategoryList" key="topCategoryKey">
                <template v-if="item.childCategoryCnt">
                  <div class="nav-item dropdown">
                    <a href="javascript:void(0)" class="nav-link dropdown-toggle" data-toggle="dropdown">{{ item.categoryName }}</a>
                    <div class="dropdown-menu rounded-0 m-0">
                      <template v-for="i in childCategoryList" key="childCategoryKey">
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
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  topCategoryList: {
    type: Array
  },
  childCategoryList: {
    type: Array
  }
});
const moveProductList = (categoryIdx) => {
  window.location.href = '/product/ProductList?categoryIdx=' + categoryIdx;
}
</script>

<style scoped>

</style>