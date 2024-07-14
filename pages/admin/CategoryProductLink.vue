<template>
  <div class="page-inner">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <div class="page-header">
      <h3 class="fw-bold mb-3">카테고리상품연결</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <h4 class="card-title">카테고리</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                  id="basic-datatables"
                  class="display table table-striped table-hover"
              >
                <thead>
                <tr>
                  <th>카테고리명</th>
                  <th>연결상품</th>
                  <th>상품선택</th>
                </tr>
                </thead>
                <template v-if="categoryList.length > 0">
                  <tbody>
                    <tr v-for="cate in categoryList" :key="cate.categoryIdx">
                      <td>{{cate.categoryName}}</td>
                      <td>
                        <button class="btn btn-primary btn-round" style="color:white;font-size: 1em" v-show="cate.connectable === 1" @click="methods.cateInProductList(cate.categoryIdx, cate.categoryName)">{{cate.categoryInProductCnt}} 개</button>
                      </td>
                      <td>
                        <button class="btn btn-primary btn-round" style="color:white;font-size: 1em" v-show="cate.connectable === 1" @click="methods.chooseProductList(cate.categoryIdx)">상품선택</button>
                      </td>
                    </tr>
                  </tbody>
                </template>
                <template v-else>
                  <tbody>
                    <tr>
                      <td colspan="3" style="text-align: center">등록된 카테고리가 없습니다</td>
                    </tr>
                  </tbody>
                </template>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="chooseProductListShow">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <h4 class="card-title">상품목록</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                  id="basic-datatables2"
                  class="display table table-striped table-hover"
                  ref="chooseProductListRef"
              >
                <thead>
                <tr>
                  <th>상품선택</th>
                  <th>상품명</th>
                </tr>
                </thead>
                <template v-if="chooseProductList.length > 0">
                  <tbody>
                    <tr v-for="product in chooseProductList" :key="product.productIdx">
                      <td style="width:150px;">
                        <label class="imagecheck">
                          <input type="checkbox" :value="product.productIdx" class="imagecheck-input" @change="methods.productCheck" :checked="product.choosedProduct === 'true'">
                          <figure class="imagecheck-figure">
                            <img :src="product.productImgPath" alt="title" class="imagecheck-image">
                          </figure>
                        </label>
                      </td>
                      <td>{{product.productTitle}}</td>
                    </tr>
                  </tbody>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="2" style="text-align: center">등록된 상품이 없습니다</td>
                  </tr>
                </template>
              </table>
            </div>
          </div>
        </div>
      </div>
      <template v-if="chooseProductList.length > 0">
        <div class="col-md-12">
          <div class="dataTables_paginate paging_simple_numbers">
            <ul class="pagination">
              <li class="paginate_button page-item previous">
                <a href="javascript:void(0)" @click="methods.renderChooseProductPrevPage" class="page-link">Previous</a>
              </li>
              <li v-for="n in chooseProductComputedPageArr" class="paginate_button page-item" :class="chooseProductPagination.currentPage === n ? 'active' : ''">
                <a href="javascript:void(0)" @click="methods.renderChooseProductChoosePage(n)" aria-controls="basic-datatables2" class="page-link">{{n}}</a>
              </li>
              <li class="paginate_button page-item next">
                <a href="javascript:void(0)" @click="methods.renderChooseProductNextPage" class="page-link">Next</a>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <div class="row" v-show="cateInProductListShow">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <h4 class="card-title">{{cateInProductCateName}} 연결상품목록</h4>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                  id="basic-datatables3"
                  class="display table table-striped table-hover"
                  ref="cateInProductListRef"
              >
                <thead>
                <tr>
                  <th></th>
                  <th>상품명</th>
                  <th>노출순서</th>
                  <th></th>
                </tr>
                </thead>
                <template v-if="cateInProductList.length > 0">
                  <draggable v-model="cateInProductList"
                             v-bind="cateInProductDragOptions"
                             tag="tbody"
                             item-key="draggable"
                             @end="methods.cateInProductSort"
                             handle=".handle">
                    <template #item="{element: item}">
                      <tr>
                        <td class="handle"><i class="fa fa-align-justify"></i></td>
                        <td>{{item.PRODUCT_TITLE}}</td>
                        <td>{{item.PRODUCT_ORDER}}</td>
                        <td>
                          <div class="form-button-action">
                            <button type="button" @click="methods.productModify(item.PRODUCT_IDX)" data-bs-toggle="tooltip" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                              <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" @click="methods.productDelete(item.PRODUCT_IDX)" data-bs-toggle="tooltip" class="btn btn-link btn-danger" data-original-title="Remove">
                              <i class="fa fa-times"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </draggable>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="4" style="text-align: center">연결된 상품이 없습니다</td>
                  </tr>
                </template>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import {computed, onMounted, ref} from "vue";
import {useRouter} from "nuxt/app";

definePageMeta({
  layout: 'admin-default'
});
const { isLoading, startLoading, stopLoading } = useLoading();
let chooseProductListShow = ref(false);
let cateInProductListShow = ref(false);
let chooseProductListCategoryIdx = ref('');
const chooseProductListRef = ref(null);
const cateInProductListRef = ref(null);
const cateInProductCateName = ref('');

const categoryList = ref([]);
const chooseProductList = ref([]);
const cateInProductList = ref([]);
const chooseProductListParam = ref({
  currentPage: 1,
  viewDataCnt: 5,
  viewPageCnt: 5
});
const chooseProductPagination = ref({});
const chooseProductComputedPageArr = computed(() => {
  let arr = [];
  for (let i = chooseProductPagination.value.firstPage; i <= chooseProductPagination.value.lastPage; i++) arr.push(i);
  return arr;
});
const cateInProductDragOptions = computed(() => {
  return {
    animation: 200,
    group: "description1",
    disabled: false,
    ghostClass: "ghost"
  }
});
const router = useRouter();

onMounted(() => {
  methods.init();
});

const methods = {
  async init() {
    startLoading();
    categoryList.value = await $fetch('/api/category/getCategoryProductLinkList', {method: 'post'}).finally(() => stopLoading());
  },
  async chooseProductList(categoryIdx) {
    chooseProductListShow.value = true;
    cateInProductListShow.value = false;
    chooseProductListCategoryIdx.value = categoryIdx;
    startLoading();
    const data = await $fetch(
      '/api/product/getProductChooseList',
      {
        method: 'post',
        body:{
          pagination:{
            currentPage: chooseProductListParam.value.currentPage,
            viewDataCnt: chooseProductListParam.value.viewDataCnt,
            viewPageCnt: chooseProductListParam.value.viewPageCnt
          },
          categoryIdx: chooseProductListCategoryIdx.value
        }
      }
    ).finally(() => stopLoading());
    chooseProductList.value = data.productList;
    chooseProductPagination.value = data.pagination;
    chooseProductListRef.value?.scrollIntoView({behavior: 'smooth'});
  },
  renderChooseProductPrevPage() {
    if (chooseProductListParam.value.currentPage > 1) {
      chooseProductListParam.value.currentPage = chooseProductListParam.value.currentPage - 1;
      this.chooseProductList(chooseProductListCategoryIdx.value);
    }
  },
  renderChooseProductChoosePage(n) {
    chooseProductListParam.value.currentPage = n;
    this.chooseProductList(chooseProductListCategoryIdx.value);
  },
  renderChooseProductNextPage() {
    if (chooseProductListParam.value.currentPage < chooseProductPagination.value.totalPageCnt) {
      chooseProductListParam.value.currentPage = chooseProductListParam.value.currentPage + 1;
      this.chooseProductList(chooseProductListCategoryIdx.value);
    }
  },
  async productCheck(event) {
    if(event.target.checked) {
      await $fetch('/api/category/addCategoryPrductLink', {method: 'post', body:{categoryIdx:chooseProductListCategoryIdx.value, productIdx:event.target.value}}).finally(() => stopLoading());
    } else {
      await $fetch('/api/category/removeCategoryPrductLink', {method: 'post', body:{categoryIdx:chooseProductListCategoryIdx.value, productIdx:event.target.value}}).finally(() => stopLoading());
    }
    await this.init();
  },

  async cateInProductList(categoryIdx, categoryName) {
    chooseProductListShow.value = false;
    cateInProductListShow.value = true;
    cateInProductCateName.value = categoryName;

    cateInProductList.value = await $fetch('/api/product/getCateInProductList', {method: 'post', body: categoryIdx}).finally(() => stopLoading());

    cateInProductListRef.value?.scrollIntoView({behavior: 'smooth'});
  },

  async cateInProductSort() {
    cateInProductList.value.forEach((i, idx) => i.PRODUCT_ORDER = idx + 1);
    await $fetch('/api/product/saveCateInProductOrder', {method: 'post', body: cateInProductList.value});
  },

  productModify(PRODUCT_IDX) {
    router.push({
      path: '/admin/ProductModify',
      query: {
        productIdx: PRODUCT_IDX
      }
    });
  },

  async productDelete(PRODUCT_IDX) {
    if(confirm('해당 상품을 삭제하시겠습니까?')) {
      startLoading();
      await $fetch('/api/product/productDelete', {method: 'post', body:PRODUCT_IDX}).finally(() => stopLoading());
      cateInProductListShow.value = false;
      await this.init();
    }
  }

}
</script>

<style scoped>

</style>