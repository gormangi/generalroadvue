<template>
  <div>
    <!-- Topbar Start -->
    <Topbar />
    <!-- Topbar End -->

    <!-- Navbar Start -->
    <div class="container-fluid mb-5">
      <div class="row border-top px-xl-5">
        <LeftNav :mainTopCategoryList="state.mainTopCategoryList" :mainChildCategoryList="state.mainChildCategoryList"/>
        <CenterNav :mainTopCategoryList="state.mainTopCategoryList" :mainChildCategoryList="state.mainChildCategoryList" :mainBannerList="state.mainBannerList"/>
      </div>
    </div>
    <!-- Navbar End -->

    <!-- Categories Start -->
    <CategoryList :mainCategoryList="state.mainCategoryList"/>
    <!-- Categories End -->

    <!-- Products Start -->
    <ProductList :mainProductList="state.mainProductList"/>
    <!-- Products End -->

    <!-- Footer Start -->
    <Footer />
    <!-- Footer End -->

    <!-- Back to Top -->
    <a href="#" class="btn btn-primary back-to-top"><i class="fa fa-angle-double-up"></i></a>
  </div>

</template>

<script setup>
import Topbar from "/components/main/Topbar";
import LeftNav from "/components/main/LeftNav";
import CenterNav from "/components/main/CenterNav";
import CategoryList from "/components/main/CategoryList";
import Footer from "/components/main/Footer";
import {reactive} from "vue";
import {useAsyncData} from "nuxt/app";
import ProductList from "/components/main/ProductList";

const state = reactive({
  mainTopCategoryList: [],
  mainChildCategoryList: [],
  mainCategoryList: [],
  mainProductList: [],
  mainBannerList: []
});

const { data, refresh, error } = await useAsyncData('indexAsyncData', () => $fetch('/api/main'));
state.mainTopCategoryList = data.value.mainTopCategoryList;
state.mainChildCategoryList = data.value.mainChildCategoryList;
state.mainCategoryList = data.value.mainCategoryList;
state.mainProductList = data.value.mainProductList;
state.mainBannerList = data.value.mainBannerList;

</script>
