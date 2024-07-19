<template>
  <div class="container-fluid">
    <div class="row bg-secondary py-2 px-xl-5">
      <div class="col-lg-6 d-none d-lg-block"></div>
    </div>
    <div class="row align-items-center py-3 px-xl-5">
      <div class="col-lg-3 d-none d-lg-block">
        <NuxtLink to="/" class="text-decoration-none">
          <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">GEN</span>Road</h1>
        </NuxtLink>
      </div>
      <div class="col-lg-6 col-6 text-left">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for products" v-model="searchKeyword" @keyup.enter="methods.productSearch" maxlength="30">
          <div class="input-group-append" style="cursor: pointer;" @click="methods.productSearch">
            <span class="input-group-text bg-transparent text-primary">
                <i class="fa fa-search"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from "vue";

const searchKeyword = ref('');
const methods = {
  productSearch() {
    if (searchKeyword.value !== '') {
      window.location.href = '/product/Search?searchKeyword=' + searchKeyword.value;
    } else {
      alert('검색어를 입력하세요');
      return false;
    }
  }
}
</script>
