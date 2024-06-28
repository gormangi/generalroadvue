<template>
  <div>
    <!-- Topbar Start -->
    <Topbar />
    <!-- Topbar End -->

    <!-- Navbar Start -->
    <div class="container-fluid mb-5">
      <div class="row border-top px-xl-5">
        <LeftNav :topCategoryList="state.topCategoryList" :childCategoryList="state.childCategoryList"/>
        <CenterNav :topCategoryList="state.topCategoryList" :childCategoryList="state.childCategoryList"/>
      </div>
    </div>
    <!-- Navbar End -->

    <!-- Categories Start -->
    <CategoryList />
    <!-- Categories End -->

    <!-- Products Start -->
    <div class="container-fluid pt-5">
      <div class="text-center mb-4">
        <h2 class="section-title px-5"><span class="px-2">Trandy Products</span></h2>
      </div>
      <div class="row px-xl-5 pb-3">
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img class="img-fluid w-100" src="/img/product-1.jpg" alt="">
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
              <div class="d-flex justify-content-center">
                <h6>$123.00</h6>
                <h6 class="text-muted ml-2">
                  <del>$123.00</del>
                </h6>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To
                Cart</a>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img class="img-fluid w-100" src="/img/product-2.jpg" alt="">
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
              <div class="d-flex justify-content-center">
                <h6>$123.00</h6>
                <h6 class="text-muted ml-2">
                  <del>$123.00</del>
                </h6>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To
                Cart</a>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img class="img-fluid w-100" src="/img/product-3.jpg" alt="">
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
              <div class="d-flex justify-content-center">
                <h6>$123.00</h6>
                <h6 class="text-muted ml-2">
                  <del>$123.00</del>
                </h6>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To
                Cart</a>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img class="img-fluid w-100" src="/img/product-4.jpg" alt="">
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
              <div class="d-flex justify-content-center">
                <h6>$123.00</h6>
                <h6 class="text-muted ml-2">
                  <del>$123.00</del>
                </h6>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To
                Cart</a>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img class="img-fluid w-100" src="/img/product-5.jpg" alt="">
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
              <div class="d-flex justify-content-center">
                <h6>$123.00</h6>
                <h6 class="text-muted ml-2">
                  <del>$123.00</del>
                </h6>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To
                Cart</a>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img class="img-fluid w-100" src="/img/product-6.jpg" alt="">
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
              <div class="d-flex justify-content-center">
                <h6>$123.00</h6>
                <h6 class="text-muted ml-2">
                  <del>$123.00</del>
                </h6>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To
                Cart</a>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img class="img-fluid w-100" src="/img/product-7.jpg" alt="">
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
              <div class="d-flex justify-content-center">
                <h6>$123.00</h6>
                <h6 class="text-muted ml-2">
                  <del>$123.00</del>
                </h6>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To
                Cart</a>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
          <div class="card product-item border-0 mb-4">
            <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img class="img-fluid w-100" src="/img/product-8.jpg" alt="">
            </div>
            <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 class="text-truncate mb-3">Colorful Stylish Shirt</h6>
              <div class="d-flex justify-content-center">
                <h6>$123.00</h6>
                <h6 class="text-muted ml-2">
                  <del>$123.00</del>
                </h6>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-between bg-light border">
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
              <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To
                Cart</a>
            </div>
          </div>
        </div>
      </div>
    </div>
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

const state = reactive({
  topCategoryList: [],
  childCategoryList: []
});

const { data, refresh, error } = await useAsyncData('indexAsyncData', () => $fetch('/api/main'));
state.topCategoryList = data._value.topCategoryList;
state.childCategoryList = data._value.childCategoryList;

</script>
