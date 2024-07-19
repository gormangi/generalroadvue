<template>
  <div>
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <!-- Shop Start -->
    <div class="container-fluid pt-5">
      <div class="row px-xl-5">

        <!-- Shop Product Start -->
        <div class="col-lg-12 col-md-12">
          <div class="row pb-3">
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1" v-for="product in computedProductList" :key="product.productIdx">
              <div class="card product-item border-0 mb-4">
                <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  <a href="javascript:void(0)" @click="methods.moveProduct(product.productIdx)"><img class="img-fluid w-100" :src="product.productImgPath"></a>
                </div>
                <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                  <h6 class="text-truncate mb-3">{{product.productTitle}}</h6>
                  <div class="d-flex justify-content-center">
                    <h6>{{product.productCurrencySign}}{{product.productDcPriceComma}}</h6>
                    <h6 class="text-muted ml-2" v-show="product.productOriginPrice !== product.productDcPrice">
                      <del>{{product.productCurrencySign}}{{product.productOriginPriceComma}}</del>
                    </h6>
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between bg-light border">
                  <a href="javascript:void(0)" @click="methods.moveProduct(product.productIdx)" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                </div>
              </div>
            </div>

            <template v-if="productList.length > 0">
              <div class="col-12 pb-1">
                <nav aria-label="Page navigation">
                  <ul class="pagination justify-content-center mb-3">
                    <li class="page-item">
                      <a class="page-link" @click="methods.renderPrevPage" href="javascript:void(0)" aria-label="Previous">
                        <span aria-hidden="true"><</span>
                        <span class="sr-only">Previous</span>
                      </a>
                    </li>
                    <li v-for="n in computedPageArr" class="page-item" :class="pagination.currentPage === n ? 'active' : ''">
                      <a class="page-link" @click="methods.renderChoosePage(n)" href="javascript:void(0)">{{n}}</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" @click="methods.renderNextPage" href="javascript:void(0)" aria-label="Next">
                        <span aria-hidden="true">></span>
                        <span class="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </template>
            <template v-else>
              <div class="col-12 pb-1" style="text-align: center;">
                <span>검색된 상품이 없습니다.</span>
              </div>
            </template>

          </div>
        </div>
        <!-- Shop Product End -->
      </div>
    </div>
    <!-- Shop End -->
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRouter} from "nuxt/app";

definePageMeta({
  layout: 'sub-default'
});
const { isLoading, startLoading, stopLoading } = useLoading();
const router = useRouter();
const receiveParam = router.currentRoute.value.query;
let currentPage = ref(1);
let viewDataCnt = ref(8);
let viewPageCnt = ref(5);
let productList = ref([]);
let pagination = ref({});
const computedProductList = computed(() => {
  productList.value.forEach((i) => {
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
  return productList.value;
});
const computedPageArr = computed(() => {
  let arr = [];
  for (let i = pagination.value.firstPage; i <= pagination.value.lastPage; i++) arr.push(i);
  return arr;
});

onMounted(async () => {
  startLoading();
  await methods.getProductList();
  stopLoading();
});

const methods = {
  async getProductList() {
    const data = await $fetch(
        '/api/product/getB2CProductList',
        {
          method: 'post',
          body: {
            pagination: {
              currentPage: currentPage.value,
              viewDataCnt: viewDataCnt.value,
              viewPageCnt: viewPageCnt.value
            },
            searchKeyword: receiveParam.searchKeyword
          }
        }
    );
    productList.value = data.productList;
    pagination.value = data.pagination;
  },
  addComma(cost) {
    return cost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  },
  renderPrevPage() {
    if (currentPage.value > 1) {
      currentPage.value = currentPage.value - 1;
      this.getProductList();
    }
  },
  renderChoosePage(n) {
    currentPage.value = n;
    this.getProductList();
  },
  renderNextPage() {
    if (currentPage.value < pagination.value.totalPageCnt) {
      currentPage.value = currentPage.value + 1;
      this.getProductList();
    }
  },
  moveProduct(productIdx) {
    router.push({
      path: '/product/Product',
      query: {
        productIdx: productIdx
      }
    });
  }
}
</script>

<style scoped>

</style>