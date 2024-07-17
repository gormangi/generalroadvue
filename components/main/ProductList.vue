<template>
  <div class="container-fluid pt-5" v-for="cate in computedMainProductList" :key="cate.categoryName">
    <div class="text-center mb-4">
      <h2 class="section-title px-5"><span class="px-2">{{cate.categoryName}}</span></h2>
    </div>
    <div class="row px-xl-5 pb-3">
      <div class="col-lg-3 col-md-6 col-sm-12 pb-1" v-for="product in cate.productList" :key="product.productIdx">
        <div class="card product-item border-0 mb-4">
          <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img class="img-fluid w-100" :src="product.productImgPath" alt="">
          </div>
          <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 class="text-truncate mb-3" style="font-size: 0.9em">{{product.productTitle}}</h6>
            <div class="d-flex justify-content-center">
              <h6>{{product.productCurrencySign}}{{product.productDcPriceComma}}</h6>
              <h6 class="text-muted ml-2" v-show="product.productOriginPrice !== product.productDcPrice">
                <del>{{product.productCurrencySign}}{{product.productOriginPriceComma}}</del>
              </h6>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between bg-light border">
            <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  mainProductList: {
    type: Array
  }
});

const computedMainProductList = computed(() => {
  let computedMainProductList = props.mainProductList;
  computedMainProductList.forEach((item) => {
    item.productList.forEach((i) => {
      i.productOriginPriceComma = methods.addComma(i.productOriginPrice);
      i.productDcPriceComma = methods.addComma(i.productDcPrice);
      if (i.productCurrencyType === '1') {
        i.productCurrencySign = '￦';
      } else if (i.productCurrencyType === '2') {
        i.productCurrencySign = '＄';
      } else if (i.productCurrencyType === '3') {
        i.productCurrencySign = '￥';
      } else if (i.productCurrencyType === '4') {
        i.productCurrencySign = '€';
      }
    });
  });
  return computedMainProductList;
});

const methods = {
  addComma(cost) {
    return cost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
}
</script>

<style scoped>

</style>