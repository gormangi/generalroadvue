<template>
  <div id="header-carousel" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active" style="height: 410px;">
        <img class="img-fluid" :src="bannerImgSrc" alt="Image">
        <div class="carousel-caption d-flex flex-column align-items-center justify-content-center">
          <div class="p-3" style="max-width: 700px;">
            <h4 class="text-light text-uppercase font-weight-medium mb-3">{{bannerSubTitle}}</h4>
            <h3 class="display-4 text-white font-weight-semi-bold mb-4">{{bannerTitle}}</h3>
            <a href="javascript:void(0)" @click="methods.showAlert" class="btn btn-light py-2 px-3">Shop Now</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  bannerTitle: {
    type: String
  },
  bannerSubTitle: {
    type: String
  },
  bannerImgSrc: {
    type: String
  },
  categoryName: {
    type: String
  }
});
const methods = {
  showAlert() {
    alert(props.categoryName + ' 카테고리로 이동');
  }
}
</script>

<style scoped>
@import "public/css/style.css";
@import "public/lib/owlcarousel/assets/owl.carousel.min.css";
</style>