<template>
  <!-- Shop Detail Start -->
  <div class="container-fluid py-5">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <div class="row px-xl-5">
      <div class="col-lg-5 pb-5">
        <div class="carousel-item active">
          <img class="w-100 h-100" :src="productDetail.productImgPath" alt="Image">
        </div>
      </div>
      <div class="col-lg-7 pb-5">
        <h3 class="font-weight-semi-bold">{{productDetail.productTitle}}</h3>
        <h3 class="font-weight-semi-bold mb-4" style="display: inline;margin-right: 8px; color: darkblue">{{productDetail.productCurrencySign}}{{productDetail.productDcPrice}}</h3>
        <del v-show="productDetail.productOriginPrice !== productDetail.productDcPrice">{{productDetail.productCurrencySign}}{{productDetail.productOriginPrice}}</del>
        <br/><br/>
        <span class="mb-4" v-html="productDetail.productDescription"></span>
      </div>
    </div>
    <div class="row px-xl-5">
      <div class="col">
        <div class="nav nav-tabs border-secondary mb-4">
          <a class="nav-item nav-link active">Detail</a>
        </div>
        <div>
          <div v-html="productDetail.productDetail"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- Shop Detail End -->
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRouter} from "nuxt/app";

definePageMeta({
  layout: 'sub-default'
});

const router = useRouter();
const receiveParam = router.currentRoute.value.query;
const { isLoading, startLoading, stopLoading } = useLoading();
const productDetail = ref({});

onMounted(async () => {
  startLoading();
  await methods.getProductDetail();
  stopLoading();
});

const methods = {
  async getProductDetail() {
    productDetail.value = await $fetch('/api/product/getProductDetail', {method: 'post', body: receiveParam.productIdx});

    productDetail.value.productOriginPrice = methods.addComma(productDetail.value.productOriginPrice);
    productDetail.value.productDcPrice = methods.addComma(productDetail.value.productDcPrice);
    if (productDetail.value.productCurrencyType === '1') {
      productDetail.value.productCurrencySign = '￦';
    } else if (productDetail.value.productCurrencyType === '2') {
      productDetail.value.productCurrencySign = '＄';
    } else if (productDetail.value.productCurrencyType === '3') {
      productDetail.value.productCurrencySign = '￥';
    } else if (productDetail.value.productCurrencyType === '4') {
      productDetail.value.productCurrencySign = '€';
    }
  },

  addComma(cost) {
    return cost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}
</script>

<style scoped>

</style>
