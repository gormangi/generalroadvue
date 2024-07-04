<template>
  <div class="page-inner">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <div class="page-header" :class="{'content-disabled': isLoading}">
      <h3 class="fw-bold mb-3">카테고리 추가</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">

                <div class="form-group">
                  <label for="categoryName">카테고리 명</label>
                  <input
                      type="text"
                      class="form-control"
                      id="categoryName"
                      placeholder="Enter Category Name"
                      maxlength="15"
                      v-model="state.categoryName"
                      ref="categoryNameRef"
                  />
                </div>
                <br/>
                <div class="form-group">
                  <label for="categoryThumbnail" style="padding-right: 8px;">썸네일 이미지</label>
                  <input
                      type="file"
                      class="form-control-file"
                      id="categoryThumbnail"
                      name="categoryThumbnail"
                      accept="image/jpeg, image/jpg, image/png, image/gif"
                      ref="categoryThumbnailRef"
                      @input="handleFileInput"
                      style="display:none"
                  />
                  <div class="input-group">
                    <button class="btn btn-black btn-border" type="button" @click="methods.thumbnailBtnClick">
                      이미지 업로드
                    </button>
                    <input v-for="file in files" type="text" :value="file.name" class="form-control" readonly="readonly" aria-describedby="basic-addon1">
                    <img v-for="file in files" :src="file.content" alt="" class="imagecheck-image">
                  </div>
                </div>
                <br/>
                <div class="form-group">
                  <label>카테고리 사용 여부</label><br />
                  <div class="d-flex">
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="topCategoryUseY" value="Y" v-model="state.categoryUseYn"/>
                      <label class="form-check-label" for="topCategoryUseY">사용</label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" id="topCategoryUseN" value="N" v-model="state.categoryUseYn"/>
                      <label class="form-check-label" for="topCategoryUseN">사용하지 않음</label>
                    </div>
                  </div>
                  <small class="form-text text-muted">카테고리 사용여부를 사용하지 않음으로 설정시 고객 화면에는 노출되지않습니다.</small>
                </div>

              </div>
            </div>
          </div>
          <div class="card-action">
            <button type="button" @click="methods.topCategoryAdd" class="btn btn-success" style="margin-right:10px;">추가</button>
            <button type="button" @click="methods.topCategoryAddCancel" class="btn btn-danger">취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from "nuxt/app";
import {onMounted, reactive, ref} from "vue";
import { useLoading } from '@/composables/useLoading';
definePageMeta({
  layout: 'admin-default'
});

const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const state = reactive({
  categoryName: '',
  categoryUseYn: '',
  categoryThumbnail: {}
});
const categoryNameRef = ref(null);
const categoryThumbnailRef = ref(null);
const {handleFileInput, files} = useFileStorage();

onMounted(() => {
  state.categoryUseYn = 'Y';
});

const methods = {
  async topCategoryAdd() {
    if (!state.categoryName) {
      alert('카테고리명을 입력하세요');
      categoryNameRef.value.focus();
      return false;
    }
    if (files.value.length < 1) {
      alert('썸네일을 반드시 등록해야 합니다');
      categoryThumbnailRef.value.focus();
      return false;
    }
    files.value.forEach((file) => {
      state.categoryThumbnailVO = {
        fileContent: file.content,
        fileName: file.name,
        fileSize: file.size,
        fileExtentionName: file.name.split('.')[1],
        fileType: file.type
      }
    });
    startLoading();
    const res = await $fetch('/api/category/insertTopCategoryInfo', {method:'post', body: state}).finally(() => stopLoading());
    if (res === 'topCategoryFull') {
      alert('상위카테고리는 6개를 초과하여 추가할 수 없습니다');
      return false;
    }
    router.back();
  },
  topCategoryAddCancel() {
    router.back();
  },
  thumbnailBtnClick() {
    categoryThumbnailRef.value.click();
  }
}
</script>

<style scoped>

</style>