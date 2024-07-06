<template>
  <div class="page-inner">
    <div class="page-header">
      <h3 class="fw-bold mb-3">카테고리 관리</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <h4 class="card-title">상위카테고리</h4>
              <button type="button" @click="methods.topCateAdd" class="btn btn-primary btn-round ms-auto">
                <i class="fa fa-plus"></i>
                추가
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                id="basic-datatables"
                class="display table table-striped table-hover"
                style="min-width:750px;"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>카테고리명</th>
                    <th>노출순서</th>
                    <th>사용여부</th>
                    <th>하위카테고리</th>
                    <th></th>
                  </tr>
                </thead>
                <template v-if="state.topCategoryList.length > 0">
                  <draggable v-model="state.topCategoryList"
                             v-bind="topDragOptions"
                             tag="tbody"
                             item-key="draggable1"
                             @end="methods.topCategorySort"
                             handle=".handle">
                    <template #item="{element: item}">
                      <tr>
                        <td class="handle"><i class="fa fa-align-justify"></i></td>
                        <td>{{ item.categoryName }}</td>
                        <td>{{ item.categoryOrder }}</td>
                        <td>{{ item.categoryUseYn }}</td>
                        <td><button class="btn btn-primary btn-round" style="color:white" @click="methods.viewChildCategory(item)">{{ item.childCategoryCnt }} 개</button></td>
                        <td>
                          <div class="form-button-action">
                            <button type="button" @click="methods.topCateModify(item.categoryIdx)" data-bs-toggle="tooltip" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                              <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" @click="methods.topCateDelete(item)" data-bs-toggle="tooltip" class="btn btn-link btn-danger" data-original-title="Remove">
                              <i class="fa fa-times"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </draggable>
                </template>
                <template v-else>
                  <tbody>
                    <tr>
                      <td colspan="6" style="text-align: center">등록된 카테고리가 없습니다</td>
                    </tr>
                  </tbody>
                </template>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="row" v-show="state.childCategoryListShow">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <h4 class="card-title">{{state.childCategoryListName}} 하위카테고리</h4>
              <button type="button" @click="methods.childCateAdd(state.parentCategoryIdx)" class="btn btn-primary btn-round ms-auto">
                <i class="fa fa-plus"></i>
                추가
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                  id="basic-datatables2"
                  class="display table table-striped table-hover"
                  ref="childCategoryListRef"
                  style="min-width:750px;"
              >
                <thead>
                <tr>
                  <th></th>
                  <th>카테고리명</th>
                  <th>노출순서</th>
                  <th>사용여부</th>
                  <th></th>
                </tr>
                </thead>
                <template v-if="state.childCategoryList.length > 0">
                  <draggable v-model="state.childCategoryList"
                             v-bind="childDragOptions"
                             tag="tbody"
                             item-key="draggable2"
                             @end="methods.childCategorySort"
                             handle=".handle">
                    <template #item="{element: item}">
                      <tr>
                        <td class="handle"><i class="fa fa-align-justify"></i></td>
                        <td>{{ item.categoryName }}</td>
                        <td>{{ item.categoryOrder }}</td>
                        <td>{{ item.categoryUseYn }}</td>
                        <td>
                          <div class="form-button-action">
                            <button type="button" @click="methods.childCateModify(item.categoryIdx)" data-bs-toggle="tooltip" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                              <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" @click="methods.childCateDelete(item)" data-bs-toggle="tooltip" class="btn btn-link btn-danger" data-original-title="Remove">
                              <i class="fa fa-times"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </template>
                  </draggable>
                </template>
                <template v-else>
                  <tbody>
                  <tr>
                    <td colspan="6" style="text-align: center">등록된 카테고리가 없습니다</td>
                  </tr>
                  </tbody>
                </template>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable';
import {computed, onMounted, reactive, ref} from "vue";
import {useRouter} from "nuxt/app";

definePageMeta({
  layout: 'admin-default'
});

const router = useRouter();
const state = reactive({
  topCategoryList: [],
  childCategoryListShow: false,
  childCategoryName: '',
  parentCategoryIdx: '',
  childCategoryList: []
});
const topDragOptions = computed(() => {
  return {
    animation: 200,
    group: "description1",
    disabled: false,
    ghostClass: "ghost"
  }
});
const childDragOptions = computed(() => {
  return {
    animation: 200,
    group: "description2",
    disabled: false,
    ghostClass: "ghost"
  }
});
const childCategoryListRef = ref(null);

onMounted(() => {
  methods.renderTopCategoryList();
});

const methods = {
  async renderTopCategoryList() {
    state.topCategoryList = await $fetch('/api/category/getAdminTopCategoryList', {method: 'post'});
  },
  async renderChildCategoryList(item)  {
    state.childCategoryList = await $fetch('/api/category/getAdminChildCategoryList', {method: 'post', body: item})
  },
  async topCateAdd() {
    const res = await $fetch('/api/category/getTopCategoryCnt', {method:'post'});
    if (res >= 6) {
      alert('상위카테고리는 6개를 초과하여 추가할 수 없습니다');
      return false;
    }
    router.push('/admin/TopCategoryAdd');
  },
  childCateAdd() {
    router.push({
      path: '/admin/ChildCategoryAdd',
      query: {
        parentCategoryIdx: state.parentCategoryIdx
      }
    });
  },
  topCateModify(categoryIdx) {
    router.push({
      path: '/admin/TopCategoryModify',
      query: {
        categoryIdx: categoryIdx
      }
    });
  },
  childCateModify(categoryIdx) {
    router.push({
      path: '/admin/ChildCategoryModify',
      query: {
        categoryIdx: categoryIdx
      }
    });
  },
  async topCateDelete(item) {
    let flag = true;
    if (item.childCategoryCnt > 0) {
      if (!confirm(item.categoryName + ' 카테고리와\n하위 카테고리 ' + item.childCategoryCnt +'개도 삭제됩니다\n삭제하시겠습니까?')) flag = false;
    } else {
      if (!confirm(item.categoryName + ' 카테고리를 삭제하시겠습니까?')) flag = false;
    }
    if (flag) {
      await $fetch('/api/category/deleteTopCategory', {method: 'post', body: item});
      await methods.renderTopCategoryList();
      await methods.topCategorySort();
      state.childCategoryListShow = false;
    }
  },
  async childCateDelete(item) {
    if(confirm(item.categoryName + ' 카테고리를 삭제하시겠습니까?')) {
      await $fetch('/api/category/deleteChildCategory',  {method: 'post', body: item});
      item['categoryIdx'] = state.parentCategoryIdx;
      await methods.renderTopCategoryList();
      await methods.renderChildCategoryList(item);
      await methods.childCategorySort();
    }
  },
  async viewChildCategory(item) {
    state.childCategoryListShow = true;
    state.childCategoryListName = item.categoryName;
    state.parentCategoryIdx = item.categoryIdx;
    await methods.renderChildCategoryList(item);
    childCategoryListRef.value?.scrollIntoView({behavior: 'smooth'});
  },
  async topCategorySort() {
    state.topCategoryList.forEach((i, idx) => i.categoryOrder = idx + 1);
    await $fetch('/api/category/saveCategoryOrder', {method:'post', body: state.topCategoryList});
  },
  async childCategorySort() {
    state.childCategoryList.forEach((i, idx) => i.categoryOrder = idx + 1);
    await $fetch('/api/category/saveCategoryOrder', {method: 'post', body: state.childCategoryList});
  }
}

</script>
