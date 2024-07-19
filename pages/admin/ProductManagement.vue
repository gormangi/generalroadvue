<template>
  <div class="page-inner">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <div class="page-header">
      <h3 class="fw-bold mb-3">상품 관리</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <button type="button" class="btn btn-primary btn-round ms-auto" @click="methods.productAdd">
                <i class="fa fa-plus"></i>
                추가
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="display table table-striped table-hover" style="min-width:750px;">
                <thead>
                <tr>
                  <th>상품명</th>
                  <th>원가</th>
                  <th>할인가</th>
                  <th>등록일</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                  <template v-if="productList.length > 0">
                    <tr v-for="product in productList">
                      <td>{{product.productTitle}}</td>
                      <td>{{product.productCurrencyType}} {{product.productOriginPrice}}</td>
                      <td>{{product.productCurrencyType}} {{product.productDcPrice}}</td>
                      <td>{{product.productRegDate}}</td>
                      <td>
                        <div class="form-button-action">
                          <button type="button" @click="methods.productModify(product.productIdx)" data-bs-toggle="tooltip" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                            <i class="fa fa-edit"></i>
                          </button>
                          <button type="button" @click="methods.productDelete(product.productIdx)" data-bs-toggle="tooltip" class="btn btn-link btn-danger" data-original-title="Remove">
                            <i class="fa fa-times"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="5" style="text-align: center">등록된 상품이 없습니다</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="productList.length > 0">
      <div class="row">
        <div class="col-md-12">
          <div class="dataTables_paginate paging_simple_numbers">
            <ul class="pagination">
              <li class="paginate_button page-item previous">
                <a href="javascript:void(0)" @click="methods.renderPrevPage" class="page-link">Previous</a>
              </li>
              <li v-for="n in computedPageArr" class="paginate_button page-item" :class="pagination.currentPage === n ? 'active' : ''">
                <a href="javascript:void(0)" @click="methods.renderChoosePage(n)" aria-controls="basic-datatables" class="page-link">{{n}}</a>
              </li>
              <li class="paginate_button page-item next">
                <a href="javascript:void(0)" @click="methods.renderNextPage" class="page-link">Next</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRouter} from "nuxt/app";

definePageMeta({
  layout: 'admin-default'
});

let currentPage = ref(1);
let viewDataCnt = ref(5);
let viewPageCnt = ref(5);
let productList = ref([]);
let pagination = ref({});
const { isLoading, startLoading, stopLoading } = useLoading();
const computedPageArr = computed(() => {
  let arr = [];
  for (let i = pagination.value.firstPage; i <= pagination.value.lastPage; i++) arr.push(i);
  return arr;
});
const router = useRouter();
const receiveParam = router.currentRoute.value.query;

onMounted(() => {
  methods.getProductList();
});

const methods = {
  async getProductList() {
    startLoading();
    const data = await $fetch(
        '/api/product/getProductList',
        {
          method:'post',
          body:{
            pagination:{
              currentPage: currentPage.value,
              viewDataCnt: viewDataCnt.value,
              viewPageCnt: viewPageCnt.value
            },
            searchKeyword: receiveParam.searchKeyword
          }
        }
    ).finally(() => stopLoading());
    data.productList.forEach((item) => {
      if (item.productCurrencyType === '1') {
        item.productCurrencyType = '￦';
      } else if (item.productCurrencyType === '2') {
        item.productCurrencyType = '＄';
      } else if (item.productCurrencyType === '3') {
        item.productCurrencyType = '￥';
      } else if (item.productCurrencyType === '4') {
        item.productCurrencyType = '€';
      }
    });
    productList.value = data.productList;
    pagination.value = data.pagination;
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
  productAdd() {
    router.push('/admin/ProductAdd');
  },
  productModify(productIdx) {
    router.push({
      path: '/admin/ProductModify',
      query: {
        productIdx: productIdx
      }
    });
  },
  async productDelete(productIdx) {
    if(confirm('해당 상품을 삭제하시겠습니까?')) {
      startLoading();
      await $fetch('/api/product/productDelete', {method: 'post', body:productIdx}).finally(() => stopLoading());
      await this.getProductList();
    }
  }

}
</script>

<style scoped>

</style>