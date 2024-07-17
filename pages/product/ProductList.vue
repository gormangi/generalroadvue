<template>
  <div>
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <!-- Topbar Start -->
    <Topbar />
    <!-- Topbar End -->

    <!-- Navbar Start -->
    <Navbar :topCategoryList="state.topCategoryList" :childCategoryList="state.childCategoryList"/>
    <!-- Navbar End -->

    <!-- Page Header Start -->
    <div class="container-fluid bg-secondary mb-5" style="margin-bottom: 0px !important;">
      <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 130px">
        <h1 class="font-weight-semi-bold text-uppercase mb-1">{{state.categoryName}}</h1>
        <template v-if="state.parentCategoryName">
          <div class="d-inline-flex">
            <p class="m-0">{{state.parentCategoryName}}</p>
            <p class="m-0 px-2">-</p>
            <p class="m-0">{{state.categoryName}}</p>
          </div>
        </template>
      </div>
    </div>
    <!-- Page Header End -->

    <!-- Shop Start -->
    <div class="container-fluid pt-5">
      <div class="row px-xl-5">

        <!-- Shop Product Start -->
        <div class="col-lg-12 col-md-12">
          <div class="row pb-3">
            <div class="col-12 pb-1">
              <div class="d-flex align-items-center justify-content-between mb-4">
                <div class="input-group" style="width:40%;">
                  <input type="text" class="form-control" placeholder="Search by name" v-model="searchKeyword" @keyup.enter="methods.productSearch">
                  <div class="input-group-append" style="cursor: pointer" @click="methods.productSearch">
                    <span class="input-group-text bg-transparent text-primary">
                        <i class="fa fa-search"></i>
                    </span>
                  </div>
                </div>
                <div class="dropdown ml-4">
                  <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{sortKindText}}
                  </button>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                    <a class="dropdown-item" href="javascript:void(0)" @click="methods.productSortChange('regSort')">최신순</a>
                    <a class="dropdown-item" href="javascript:void(0)" @click="methods.productSortChange('priceAscSort')">낮은가격순</a>
                    <a class="dropdown-item" href="javascript:void(0)" @click="methods.productSortChange('priceDescSort')">높은가격순</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12 pb-1" v-for="product in computedProductList" :key="product.productIdx">
              <div class="card product-item border-0 mb-4">
                <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  <a href="javascript:void(0)"><img class="img-fluid w-100" :src="product.productImgPath" alt=""></a>
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
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
                <span>등록된 상품이 없습니다.</span>
              </div>
            </template>

          </div>
        </div>
        <!-- Shop Product End -->
      </div>
    </div>
    <!-- Shop End -->

    <!-- Footer Start -->
    <Footer/>
    <!-- Footer End -->
  </div>
</template>

<script setup>
import Topbar from "/components/sub/Topbar";
import Footer from "/components/main/Footer";
import {computed, onMounted, reactive, ref} from "vue";
import Navbar from "/components/sub/Navbar";
import {useRouter} from "nuxt/app";

const state = reactive({
  topCategoryList: [],
  childCategoryList: [],
  categoryName: '',
  parentCategoryName: ''
});
const router = useRouter();
const receiveParam = router.currentRoute.value.query;
const { isLoading, startLoading, stopLoading } = useLoading();

let currentPage = ref(1);
let viewDataCnt = ref(8);
let viewPageCnt = ref(5);
let productList = ref([]);
let pagination = ref({});
let searchKeyword = ref('');
let sortKind = ref('regSort');

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
const sortKindText = computed(() => {
  let res = '';
  if (sortKind.value === 'regSort') {
    res = '최신순';
  } else if (sortKind.value === 'priceAscSort') {
    res = '낮은가격순';
  } else if (sortKind.value === 'priceDescSort') {
    res = '높은가격순';
  }
  return res;
});

onMounted(async () => {
  startLoading();
  await methods.getBaseData();
  await methods.getCategoryInfo();
  await methods.getProductList();
  stopLoading();
});

const methods = {
  async getBaseData() {
    const data = await $fetch('/api/main');
    state.topCategoryList = data.mainTopCategoryList;
    state.childCategoryList = data.mainChildCategoryList;
  },

  async getCategoryInfo() {
    const data = await $fetch('/api/category/getCategoryInfo',  {method: 'post', body: receiveParam.categoryIdx});
    state.categoryName = data.categoryName;
    if (data.categoryDept > 1) {
      state.parentCategoryName = data.parentCategoryName;
    }
  },

  async getProductList() {
    const data = await $fetch(
      '/api/product/getB2CProductList',
      {
        method:'post',
        body:{
          pagination:{
            currentPage: currentPage.value,
            viewDataCnt: viewDataCnt.value,
            viewPageCnt: viewPageCnt.value
          },
          categoryIdx: receiveParam.categoryIdx,
          searchKeyword: searchKeyword.value,
          sortKind: sortKind.value
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
  async productSearch() {
    startLoading();
    await this.getProductList();
    stopLoading();
  },
  async productSortChange(chooseSortKind) {
    sortKind.value = chooseSortKind;
    startLoading();
    await this.getProductList();
    stopLoading();
  }
}
</script>
