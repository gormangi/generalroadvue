<template>
  <div class="col-lg-3 d-none d-lg-block">
    <a class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style="height: 65px; margin-top: -1px; padding: 0 30px;">
      <h6 class="m-0">Categories</h6>
      <i class="fa fa-angle-down text-dark"></i>
    </a>
    <nav class="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
      <div class="navbar-nav w-100 overflow-hidden" style="height: 410px">
        <template v-for="item in mainTopCategoryList">
          <template v-if="item.childCategoryCnt">
            <div class="nav-item dropdown">
              <a href="javascript:void(0)" class="nav-link" data-toggle="dropdown">{{ item.categoryName }} <i class="fa fa-angle-down float-right mt-1"></i></a>
              <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                <template v-for="i in mainChildCategoryList">
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
