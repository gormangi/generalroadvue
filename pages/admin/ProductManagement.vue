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
                  <th>표시통화</th>
                  <th>등록일</th>
                </tr>
                </thead>
                <tbody>
                  <template v-if="productList.length > 0">
                    <tr v-for="product in productList">
                      <td>{{product.productTitle}}</td>
                      <td>{{product.productOriginPrice}}</td>
                      <td>{{product.productDcPrice}}</td>
                      <td>{{product.productCurrencyType}}</td>
                      <td>{{product.productRegDate}}</td>
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
            }
          }
        }
    ).finally(() => stopLoading());
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
  }
}
</script>

<style scoped>

</style>