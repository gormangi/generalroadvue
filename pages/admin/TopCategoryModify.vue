<template>
  <div class="page-inner">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <div class="page-header" :class="{'content-disabled': isLoading}">
      <h3 class="fw-bold mb-3">카테고리 수정</h3>
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
                      @change="modifyFileReg = true"
                      style="display:none"
                  />
                  <div class="input-group">
                    <button class="btn btn-black btn-border" type="button" @click="methods.thumbnailBtnClick">
                      이미지 업로드
                    </button>
                    <input v-show="modifyFileReg === false" type="text" :value="previewFile.name" class="form-control" readonly="readonly" aria-describedby="basic-addon1">
                    <input v-show="modifyFileReg === true" v-for="file in files" type="text" :value="file.name" class="form-control" readonly="readonly" aria-describedby="basic-addon1">
                  </div>
                  <img v-show="modifyFileReg === false" :src="previewFile.content" alt="" class="imagecheck-image">
                  <img v-show="modifyFileReg === true" v-for="file in files" :src="file.content" alt="" class="imagecheck-image">
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
                  <small class="form-text text-muted">카테고리 사용여부를 사용하지 않음으로 설정시 화면에 노출되지않지만 삭제되는것은 아닙니다.</small>
                </div>
              </div>
            </div>
          </div>
          <div class="card-action">
            <button type="button" class="btn btn-success" @click="methods.topCategoryModify" style="margin-right:10px;">수정</button>
            <button type="button" class="btn btn-danger" @click="methods.topCategoryModifyCancel">취소</button>
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
  categoryIdx: '',
  categoryName: '',
  categoryUseYn: '',
  categoryThumbnail: {}
});
const receiveParam = router.currentRoute.value.query;
const categoryNameRef = ref(null);
const categoryThumbnailRef = ref(null);
const {handleFileInput, files} = useFileStorage();
let previewFile = ref({});
let modifyFileReg = false;

onMounted(() => {
  methods.modifyInit(receiveParam.categoryIdx);
});

const methods = {
  async modifyInit(categoryIdx) {
    startLoading();
    let data = await $fetch('/api/category/getCategoryInfo', {method:'post', body: categoryIdx}).finally(() => stopLoading());

    state.categoryIdx = categoryIdx;
    state.categoryName = data.categoryName;
    state.categoryUseYn = data.categoryUseYn;
    previewFile.value = {name: data.categoryThumbnailVO.originalFileName, content: data.categoryThumbnailVO.filePath};
  },
  async topCategoryModify() {
    if (!state.categoryName) {
      alert('카테고리명을 입력하세요');
      categoryNameRef.value.focus();
      return false;
    }
    const exts = ['jpg', 'jpeg', 'png', 'gif'];
    let extValid = true;
    files.value.forEach((file) => {
      if (!exts.includes(file.name.split('.')[1])) extValid = false;
      state.categoryThumbnailVO = {
        fileContent: file.content,
        fileName: file.name,
        fileSize: file.size,
        fileExtentionName: file.name.split('.')[1],
        fileType: file.type
      }
    });
    if (!extValid) {
      alert('이미지 외에는 업로드 할 수 없습니다');
      return false;
    }
    startLoading();
    await $fetch('/api/category/updateCategoryInfo', {method: 'PUT', body: state}).finally(() => stopLoading());
    router.back();
  },
  topCategoryModifyCancel() {
    router.back();
  },
  thumbnailBtnClick() {
    categoryThumbnailRef.value.click();
  }
}
</script>

<style scoped>

</style>