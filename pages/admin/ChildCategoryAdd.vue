<template>
  <div class="page-inner">
    <div class="page-header">
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
            <button type="button" @click="methods.childCategoryAdd" class="btn btn-success" style="margin-right:10px;">추가</button>
            <button type="button" @click="methods.childCategoryAddCancel" class="btn btn-danger">취소</button>
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
  parentCategoryIdx: '',
  categoryName: '',
  categoryUseYn: ''
});
const receiveParam = router.currentRoute.value.query;
const categoryNameRef = ref(null);

onMounted(() => {
  state.categoryUseYn = 'Y';
  state.parentCategoryIdx = receiveParam.parentCategoryIdx;
});

const methods = {
  async childCategoryAdd() {
    if (!state.categoryName) {
      alert('카테고리명을 입력하세요');
      categoryNameRef.value.focus();
      return false;
    }
    await $fetch('/api/category/insertChildCategoryInfo', {method:'post', body: state});
    router.push('/admin/AdminIndex');
  },
  childCategoryAddCancel()  {
    router.push('/admin/AdminIndex');
  }
}

</script>

<style scoped>

</style>