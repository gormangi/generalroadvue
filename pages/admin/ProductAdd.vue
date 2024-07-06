<template>
  <div class="page-inner">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <div class="page-header">
      <h3 class="fw-bold mb-3">상품 추가</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label style="font-weight: bold">상품명</label>
                  <input type="text" class="form-control"/>
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
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group mb-3">
                    <span class="input-group-text">원가 {{productCurrencyType === '1' ? '￦' : '＄'}}</span>
                    <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)">
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-text">할인가 {{productCurrencyType === '1' ? '￦' : '＄'}}</span>
                    <input type="number" class="form-control" aria-label="Amount (to the nearest dollar)">
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
            <button type="button" @click="methods.productAdd" class="btn btn-success" style="margin-right:10px;">추가</button>
            <button type="button" class="btn btn-danger">취소</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

definePageMeta({
  layout: 'admin-default'
});

const { isLoading, startLoading, stopLoading } = useLoading();
const productThumbnailRef = ref(null);
let previewThumbnailImgName = ref('');
let previewThumbnailImgSrc = ref('');
let productDetailRef = ref('');
let productDescriptionRef = ref('');
const productDetailEditOptions = {
  placeholder: "상품 상세 입력 (필수입력)",
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
  placeholder: "상품 설명 입력 (선택입력)",
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

const productTitle = ref('');
const productCurrencyType = ref('');

onMounted(() => {
  productCurrencyType.value = '1';
});

const methods = {
  thumbnailBtnClick() {
    productThumbnailRef.value.click();
  },
  onThumbnailChange(e) {
    previewThumbnailImgName.value = e.target.files[0].name;
    previewThumbnailImgSrc.value = URL.createObjectURL(e.target.files[0]);
  },
  productAdd() {
    console.log(productDetailRef.value.getHTML());
    productDetailRef.value.setHTML('<p>sorry</p>');
  }
}
</script>

<style scoped>

</style>