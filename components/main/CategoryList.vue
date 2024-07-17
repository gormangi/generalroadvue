<template>
  <div class="container-fluid pt-5">
    <div class="row px-xl-5 pb-3">

      <div class="col-lg-4 col-md-6 pb-1" v-for="category in mainCategoryList" :key="category.categoryIdx">
        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
          <p class="text-right">{{category.categoryInProductCnt}} Products</p>
          <a href="javascript:void(0)" class="cat-img position-relative overflow-hidden mb-3" @click="methods.moveProductList(category.categoryIdx)">
            <img class="img-fluid" :src="category.thumbImgUrl" :alt="category.categoryName" style="width:100%;">
          </a>
          <h5 class="font-weight-semi-bold m-0">{{category.categoryName}}</h5>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useRouter} from "nuxt/app";

const props = defineProps({
  mainCategoryList: {
    type: Array
  }
});
const router = useRouter();

const methods = {
  moveProductList(categoryIdx) {
    router.push({
      path: '/product/ProductList',
      query: {
        categoryIdx: categoryIdx
      }
    });
  }
}
</script>

<style scoped>

</style>
