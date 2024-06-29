<template>
  <div class="page-inner">
    <div class="page-header">
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
definePageMeta({
  layout: 'admin-default'
});

const router = useRouter();
const state = reactive({
  categoryIdx: '',
  categoryName: '',
  categoryUseYn: ''
});
const categoryNameRef = ref(null);
const receiveParam = router.currentRoute.value.query;

onMounted(() => {
  methods.modifyInit(receiveParam.categoryIdx);
});

const methods = {
  async modifyInit(categoryIdx) {
    const data = await $fetch('/api/category/getCategoryInfo', {method:'post', body: categoryIdx});
    state.categoryIdx = categoryIdx;
    state.categoryName = data.categoryName;
    state.categoryUseYn = data.categoryUseYn;
  },
  async topCategoryModify() {
    if (!state.categoryName) {
      alert('카테고리명을 입력하세요');
      categoryNameRef.value.focus();
      return false;
    }
    await $fetch('/api/category/updateCategoryInfo', {method: 'PUT', body: state});
    router.back();
  },
  topCategoryModifyCancel() {
    router.back();
  }
}
</script>

<style scoped>

</style>