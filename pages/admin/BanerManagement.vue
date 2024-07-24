<template>
  <div class="page-inner">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <div class="page-header">
      <h3 class="fw-bold mb-3">메인배너 관리</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex align-items-center">
              <h4 class="card-title">배너목록</h4>
              <button type="button" @click="methods.bannerAdd" class="btn btn-primary btn-round ms-auto">
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
                  style="min-width:550px;"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>노출순서</th>
                    <th>배너제목</th>
                    <th>연결카테고리</th>
                    <th></th>
                  </tr>
                </thead>
                <template v-if="bannerList.length > 0">
                  <draggable v-model="bannerList"
                             v-bind="bannerDragOptions"
                             tag="tbody"
                             item-key="draggable"
                             @end="methods.bannerSort"
                             handle=".handle">
                    <template #item="{element: item}">
                      <tr>
                        <td class="handle"><i class="fa fa-align-justify"></i></td>
                        <td>{{item.bannerOrder}}</td>
                        <td>{{item.bannerTitle}}</td>
                        <td>{{item.categoryName}}</td>
                        <td>
                          <div class="form-button-action">
                            <button type="button" @click="methods.bannerModify(item.bannerIdx)" data-bs-toggle="tooltip" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                              <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" @click="methods.bannerDelete(item)" data-bs-toggle="tooltip" class="btn btn-link btn-danger" data-original-title="Remove">
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
                      <td colspan="5" style="text-align: center">등록된 배너가 없습니다</td>
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
import {computed, onMounted, ref} from "vue";
import {useRouter} from "nuxt/app";

definePageMeta({
  layout: 'admin-default'
});
const { isLoading, startLoading, stopLoading } = useLoading();
const bannerList = ref([]);
const bannerDragOptions = computed(() => {
  return {
    animation: 200,
    group: "description1",
    disabled: false,
    ghostClass: "ghost"
  }
});
const router = useRouter();

onMounted(async () => {
  await methods.getMainBannerList();
});

const methods = {
  async getMainBannerList() {
    startLoading();
    bannerList.value = await $fetch('/api/banner/getBannerList', {method:'post'}).finally(() => {stopLoading()});
  },
  bannerAdd() {
    router.push({path: '/admin/BannerAdd'});
  },
  async bannerSort() {
    bannerList.value.forEach((i, idx) => i.bannerOrder = idx + 1);
    await $fetch('/api/banner/saveBannerOrder', {method:'post', body: bannerList.value});
  },
  bannerModify(bannerIdx) {
    router.push({
      path: '/admin/BannerModify',
      query: {
        bannerIdx: bannerIdx
      }
    });
  },
  async bannerDelete(item) {
    if(confirm('해당 배너를 삭제하시겠습니까?')) {
      startLoading();
      await $fetch('/api/banner/bannerDelete', {method: 'post', body:item.bannerIdx}).finally(() => stopLoading());
      await this.getMainBannerList();
    }
  }
}
</script>

<style scoped>

</style>