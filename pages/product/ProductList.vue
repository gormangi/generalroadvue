<template>
  <div>
    <!-- Topbar Start -->
    <Topbar />
    <!-- Topbar End -->

    <!-- Navbar Start -->
    <div class="container-fluid">
      <div class="row border-top px-xl-5">
        <div class="col-lg-3 d-none d-lg-block">
          <a class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
             data-toggle="collapse" href="#navbar-vertical" style="height: 65px; margin-top: -1px; padding: 0 30px;">
            <h6 class="m-0">Categories</h6>
            <i class="fa fa-angle-down text-dark"></i>
          </a>
          <nav
            class="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
            id="navbar-vertical" style="width: calc(100% - 30px); z-index: 1;">
            <div class="navbar-nav w-100 overflow-hidden" style="height: 410px">
              <div class="nav-item dropdown">
                <a href="#" class="nav-link" data-toggle="dropdown">Dresses <i
                  class="fa fa-angle-down float-right mt-1"></i></a>
                <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                  <a href="" class="dropdown-item">Men's Dresses</a>
                  <a href="" class="dropdown-item">Women's Dresses</a>
                  <a href="" class="dropdown-item">Baby's Dresses</a>
                </div>
              </div>
              <a href="" class="nav-item nav-link">Shirts</a>
              <a href="" class="nav-item nav-link">Jeans</a>
              <a href="" class="nav-item nav-link">Swimwear</a>
              <a href="" class="nav-item nav-link">Sleepwear</a>
              <a href="" class="nav-item nav-link">Sportswear</a>
              <a href="" class="nav-item nav-link">Jumpsuits</a>
              <a href="" class="nav-item nav-link">Blazers</a>
              <a href="" class="nav-item nav-link">Jackets</a>
              <a href="" class="nav-item nav-link">Shoes</a>
            </div>
          </nav>
        </div>
        <div class="col-lg-9">
          <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <a href="" class="text-decoration-none d-block d-lg-none">
              <h1 class="m-0 display-5 font-weight-semi-bold"><span
                class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
            </a>
            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              <div class="navbar-nav mr-auto py-0">
                <a href="index.html" class="nav-item nav-link">Home</a>
                <a href="shop.html" class="nav-item nav-link active">Shop</a>
                <a href="detail.html" class="nav-item nav-link">Shop Detail</a>
                <div class="nav-item dropdown">
                  <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
                  <div class="dropdown-menu rounded-0 m-0">
                    <a href="cart.html" class="dropdown-item">Shopping Cart</a>
                    <a href="checkout.html" class="dropdown-item">Checkout</a>
                  </div>
                </div>
                <a href="contact.html" class="nav-item nav-link">Contact</a>
              </div>
              <div class="navbar-nav ml-auto py-0">
                <a href="" class="nav-item nav-link">Login</a>
                <a href="" class="nav-item nav-link">Register</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <!-- Navbar End -->


    <!-- Page Header Start -->
    <div class="container-fluid bg-secondary mb-5">
      <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
        <h1 class="font-weight-semi-bold text-uppercase mb-3">Our Shop</h1>
        <div class="d-inline-flex">
          <p class="m-0"><a href="">Home</a></p>
          <p class="m-0 px-2">-</p>
          <p class="m-0">Shop</p>
        </div>
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
                <form action="">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search by name">
                    <div class="input-group-append">
                                        <span class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </span>
                    </div>
                  </div>
                </form>
                <div class="dropdown ml-4">
                  <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false">
                    Sort by
                  </button>
                  <div class="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                    <a class="dropdown-item" href="#">Latest</a>
                    <a class="dropdown-item" href="#">Popularity</a>
                    <a class="dropdown-item" href="#">Best Rating</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add
                    To Cart</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add
                    To Cart</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add
                    To Cart</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add
                    To Cart</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add
                    To Cart</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add
                    To Cart</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add
                    To Cart</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add
                    To Cart</a>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
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
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View
                    Detail</a>
                  <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add
                    To Cart</a>
                </div>
              </div>
            </div>
            <div class="col-12 pb-1">
              <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center mb-3">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item active"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
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
import Topbar from "/components/main/Topbar";
import Footer from "/components/main/Footer";
import {onMounted, reactive} from "vue";

const state = reactive({
  topCategoryList: [],
  childCategoryList: []
});

onMounted(async () => {
  const data = await $fetch('/api/main');
  console.log(data);
  state.topCategoryList = data.topCategoryList;
  state.childCategoryList = data.childCategoryList;
});
</script>
