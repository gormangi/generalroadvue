<template>
  <div class="page-inner">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <div class="page-header">
      <h3 class="fw-bold mb-3">상품 수정</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-weight: bold">상품명</label>
                  <input type="text" v-model="productTitle" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="productThumbnail" style="font-weight: bold">썸네일 이미지</label>
                  <input
                      type="file"
                      class="form-control-file"
                      id="productThumbnail"
                      accept="image/jpeg, image/jpg, image/png, image/gif"
                      ref="productThumbnailRef"
                      style="display:none"
                      @change="methods.onThumbnailChange($event)"
                  />
                  <div class="input-group">
                    <button class="btn btn-black btn-border" type="button" @click="methods.thumbnailBtnClick">
                      이미지 업로드
                    </button>
                    <input type="text" :value="previewThumbnailImgName" class="form-control" readonly="readonly" />
                  </div>
                  <img :src="previewThumbnailImgSrc" class="imagecheck-image" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-weight: bold">판매가</label><br>
                  <div class="d-flex">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="productCurrencyType1" value="1" v-model="productCurrencyType">
                      <label class="form-check-label" for="productCurrencyType1">
                        원(￦)
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="productCurrencyType2" value="2" v-model="productCurrencyType">
                      <label class="form-check-label" for="productCurrencyType2">
                        달러(＄)
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="productCurrencyType3" value="3" v-model="productCurrencyType">
                      <label class="form-check-label" for="productCurrencyType3">
                        엔(￥)
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="productCurrencyType4" value="4" v-model="productCurrencyType">
                      <label class="form-check-label" for="productCurrencyType4">
                        유로(€)
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group mb-3">
                    <span class="input-group-text">원가 {{productCurrencySign}}</span>
                    <input type="number" class="form-control" v-model="productOriginPrice">
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">할인가 {{productCurrencySign}}</span>
                    <input type="number" class="form-control" v-model="productDcPrice">
                  </div>
                  <small class="form-text text-muted">원가와 할인가를 동일하게 입력시 할인가만 표시됩니다.</small>
                </div>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-weight: bold">상품 상세</label>
                  <ClientOnly>
                    <QuillEditor ref="productDetailRef" :options="productDetailEditOptions"/>
                  </ClientOnly>
                </div>
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-weight: bold">상품 설명</label>
                  <ClientOnly>
                    <QuillEditor ref="productDescriptionRef" :options="productDescEditOptions"/>
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
          <div class="card-action">
            <button type="button" @click="methods.productModify" class="btn btn-success" style="margin-right:10px;">수정</button>
            <button type="button" @click="router.back()" class="btn btn-danger">취소</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {useRouter} from "nuxt/app";
import {computed, onMounted, ref} from "vue";

definePageMeta({
  layout: 'admin-default'
});
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const productDetailEditOptions = {
  placeholder: "상품 상세 입력",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // <strong>, <em>, <u>, <s>
      ["blockquote", "code-block"], // <blockquote>, <pre class="ql-syntax" spellcheck="false">
      [{header: 1}, {header: 2}], // <h1>, <h2>
      [{list: "ordered"}, {list: "bullet"}],
      [{script: "sub"}, {script: "super"}], // <sub>, <sup>
      [{indent: "-1"}, {indent: "+1"}], // class제어
      [{direction: "rtl"}], //class 제어
      [{size: ["small", false, "large", "huge"]}], //class 제어 - html로 되도록 확인
      [{header: [1, 2, 3, 4, 5, 6, false]}], // <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, normal
      [{font: []}], // 글꼴 class로 제어
      [{color: []}, {background: []}], //style="color: rgb(230, 0, 0);", style="background-color: rgb(230, 0, 0);"
      [{align: []}], // class
      ["link", "image", "video"]
    ]
  }
}
const productDescEditOptions = {
  placeholder: "상품 설명 입력",
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // <strong>, <em>, <u>, <s>
      ["blockquote", "code-block"], // <blockquote>, <pre class="ql-syntax" spellcheck="false">
      [{header: 1}, {header: 2}], // <h1>, <h2>
      [{list: "ordered"}, {list: "bullet"}],
      [{script: "sub"}, {script: "super"}], // <sub>, <sup>
      [{indent: "-1"}, {indent: "+1"}], // class제어
      [{direction: "rtl"}], //class 제어
      [{size: ["small", false, "large", "huge"]}], //class 제어 - html로 되도록 확인
      [{header: [1, 2, 3, 4, 5, 6, false]}], // <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, normal
      [{font: []}], // 글꼴 class로 제어
      [{color: []}, {background: []}], //style="color: rgb(230, 0, 0);", style="background-color: rgb(230, 0, 0);"
      [{align: []}], // class
      ["link", "image", "video"]
    ]
  }
};

const receiveParam = router.currentRoute.value.query;
const productThumbnailRef = ref(null);
let productDetailRef = ref('');
let productDescriptionRef = ref('');

let previewThumbnailImgName = ref('');
let previewThumbnailImgSrc = ref('');

const productTitle = ref('');
const productThumbnailVO = ref({});
const productCurrencyType = ref('');
const productOriginPrice = ref(null);
const productDcPrice = ref(null);
const productDetail = ref('');
const productDescription = ref('');

const productCurrencySign = computed(() => {
  let sign = '';
  if (productCurrencyType.value === '1') {
    sign = '￦';
  } else if (productCurrencyType.value === '2') {
    sign = '＄';
  } else if (productCurrencyType.value === '3') {
    sign = '￥';
  } else if (productCurrencyType.value === '4') {
    sign = '€';
  }
  return sign;
});

onMounted(() => {
  methods.modifyInit(receiveParam.productIdx);
});

const methods = {
  async modifyInit(productIdx) {
    startLoading();
    const data = await $fetch('/api/product/getProductInfo', {method:'post', body: {productIdx}}).finally(() => stopLoading());
    productTitle.value = data.productTitle;
    previewThumbnailImgName.value = data.productThumbnailVO.originalFileName;
    previewThumbnailImgSrc.value = data.productThumbnailVO.filePath;
    productCurrencyType.value = data.productCurrencyType;
    productOriginPrice.value = data.productOriginPrice;
    productDcPrice.value = data.productDcPrice;
    productDetailRef.value.setHTML(data.productDetail);
    productDescriptionRef.value.setHTML(data.productDescription);
  },
  thumbnailBtnClick() {
    productThumbnailRef.value.click();
  },
  onThumbnailChange(e) {
    previewThumbnailImgName.value = e.target.files[0].name;
    previewThumbnailImgSrc.value = URL.createObjectURL(e.target.files[0]);
    this.imgToBase64(e.target.files[0]);
  },
  imgToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
      productThumbnailVO.value['fileContent'] = e.target.result;
      productThumbnailVO.value['fileName'] = file.name;
      productThumbnailVO.value['fileSize'] = file.size;
      productThumbnailVO.value['fileExtentionName'] = file.name.split('.')[1];
      productThumbnailVO.value['fileType'] = file.type;
    }
  },
  async productModify() {
    if(!productTitle.value) {
      alert('상품명을 입력하세요');
      return false;
    }

    if(!productOriginPrice.value) {
      alert('상품 원가를 입력해야 합니다');
      return false;
    }

    if(!productDcPrice.value) {
      alert('상품 할인가를 입력해야 합니다');
      return false;
    }

    productDetail.value = productDetailRef.value.getHTML();
    productDescription.value = productDescriptionRef.value.getHTML();

    const params = {
      productIdx: receiveParam.productIdx,
      productTitle: productTitle.value,
      productThumbnailVO: productThumbnailVO.value,
      productCurrencyType: productCurrencyType.value,
      productOriginPrice: productOriginPrice.value,
      productDcPrice: productDcPrice.value,
      productDetail: productDetail.value,
      productDescription: productDescription.value
    }

    startLoading();
    await $fetch('/api/product/modifyProduct', {method:'post', body: params}).finally(() => stopLoading());
    router.back();
  }
}
</script>

<style scoped>

</style>