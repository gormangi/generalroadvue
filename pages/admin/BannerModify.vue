<template>
  <div class="page-inner">
    <div v-show="isLoading" class="loading-overlay">
      <img src="/img/loading/VZvw.gif" alt="Loading..." />
    </div>
    <div class="page-header" :class="{'content-disabled': isLoading}">
      <h3 class="fw-bold mb-3">배너 수정</h3>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">

                <div class="form-group">
                  <label for="bannerName" style="font-weight: bold">배너 제목</label>
                  <input
                      type="text"
                      class="form-control"
                      id="bannerName"
                      placeholder="배너제목 입력"
                      maxlength="15"
                      v-model="bannerTitle"
                      ref="bannerTitleRef"
                  />
                </div>
                <br/>
                <div class="form-group">
                  <label for="bannerSubName" style="font-weight: bold">배너 부제목</label>
                  <input
                      type="text"
                      class="form-control"
                      id="bannerSubName"
                      placeholder="배너부제목 입력"
                      maxlength="15"
                      v-model="bannerSubTitle"
                      ref="bannerSubTitleRef"
                  />
                </div>
                <br/>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="bannerImg" style="font-weight: bold">배너이미지</label>
                      <input
                          type="file"
                          class="form-control-file"
                          id="bannerImg"
                          accept="image/jpeg, image/jpg, image/png, image/gif"
                          ref="bannerImgRef"
                          style="display:none"
                          @change="methods.onBannerImgChange($event)"
                      />
                      <div class="input-group">
                        <button class="btn btn-black btn-border" type="button" @click="methods.bannerImgBtnClick">
                          이미지 업로드
                        </button>
                        <input type="text" :value="bannerImgName" class="form-control" readonly="readonly" />
                      </div>
                      <img :src="bannerImgSrc" class="imagecheck-image" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="bannerImg" style="font-weight: bold">링크 카테고리</label>
                      <div class="input-group">
                        <button class="btn btn-black btn-border" type="button" @click="methods.getChooseCategoryList">
                          카테고리 선택
                        </button>
                        <input type="text" :value="categoryName" class="form-control" readonly="readonly" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row" v-show="categoryListShow">
                  <div class="col-md-12">
                    <div class="card">
                      <div class="card-header">
                        <div class="d-flex align-items-center">
                          <h4 class="card-title">카테고리</h4>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="table-responsive">
                          <table
                              id="basic-datatables"
                              class="display table table-striped table-hover"
                              ref="categoryListRef"
                          >
                            <thead>
                            <tr>
                              <th>카테고리명</th>
                              <th>선택</th>
                            </tr>
                            </thead>
                            <template v-if="categoryList.length > 0">
                              <tbody>
                              <tr v-for="cate in categoryList" :key="cate.categoryIdx">
                                <td>{{cate.categoryName}}</td>
                                <td>
                                  <button class="btn btn-primary btn-round" style="color:white;font-size: 1em" v-show="cate.connectable === 1" @click="methods.chooseCategory(cate)">선택</button>
                                </td>
                              </tr>
                              </tbody>
                            </template>
                            <template v-else>
                              <tbody>
                              <tr>
                                <td colspan="2" style="text-align: center">등록된 카테고리가 없습니다</td>
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
              <div class="col-md-12" v-show="bannerPreviewRef" style="margin-top: 50px">
                <div class="form-group">
                  <label style="font-weight: bold">배너 미리보기</label>
                  <BannerPreview :bannerTitle="bannerTitle" :bannerSubTitle="bannerSubTitle" :bannerImgSrc="bannerImgSrc" :categoryName="categoryName"/>
                </div>
              </div>

            </div>
          </div>
          <div class="card-action">
            <button type="button" @click="methods.bannerModify" class="btn btn-success" style="margin-right:10px;">수정</button>
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
import BannerPreview from "/components/admin/BannerPreview";

definePageMeta({
  layout: 'admin-default'
});
const router = useRouter();
const { isLoading, startLoading, stopLoading } = useLoading();
const bannerTitleRef = ref(null);
const bannerSubTitleRef = ref(null);
const bannerImgRef = ref(null);
const bannerImgSrc = ref('');
const bannerImgName = ref('');
const categoryList = ref([]);
const categoryListRef = ref(null);
const categoryListShow = ref(false);
const bannerPreviewRef = computed(() => {
  let res = false;
  if (bannerTitle.value && Object.keys(bannerImgVO.value).length !== 0 && categoryIdx.value) {
    res = true;
  }
  return res;
});
const categoryName = ref('');
const receiveParam = router.currentRoute.value.query;

const bannerTitle = ref('');
const bannerSubTitle = ref('');
const bannerImgVO = ref({});
const categoryIdx = ref('');

onMounted(async () => {
  await methods.init();
});

const methods = {
  async init() {
    startLoading();
    const data = await $fetch('/api/banner/getBannerInfo', {method:'post', body: receiveParam.bannerIdx}).finally(() => stopLoading());
    bannerTitle.value = data.bannerTitle;
    bannerSubTitle.value = data.bannerSubTitle;
    categoryIdx.value = data.categoryIdx;
    bannerImgName.value = data.bannerImgVO.originalFileName;
    bannerImgSrc.value = data.bannerImgVO.filePath;
    bannerImgVO.value.originalFileName = data.bannerImgVO.originalFileName;
    bannerImgVO.value.filePath = data.bannerImgVO.filePath;
    categoryName.value = data.categoryName;
  },
  onBannerImgChange(e) {
    bannerImgName.value = e.target.files[0].name;
    bannerImgSrc.value = URL.createObjectURL(e.target.files[0]);
    this.imgToBase64(e.target.files[0]);
  },
  bannerImgBtnClick(){
    bannerImgRef.value.click();
  },
  imgToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
      bannerImgVO.value['fileContent'] = e.target.result;
      bannerImgVO.value['fileName'] = file.name;
      bannerImgVO.value['fileSize'] = file.size;
      bannerImgVO.value['fileExtentionName'] = file.name.split('.')[1];
      bannerImgVO.value['fileType'] = file.type;
    }
  },
  async getChooseCategoryList() {
    categoryListShow.value = true;
    startLoading();
    categoryList.value = await $fetch('/api/category/getCategoryProductLinkList', {method: 'post'}).finally(() => stopLoading());
    categoryListRef.value?.scrollIntoView({behavior: 'smooth'});
  },
  chooseCategory(cate) {
    categoryIdx.value = cate.categoryIdx;
    categoryName.value = cate.categoryName;
    categoryListShow.value = false;
  },
  async bannerModify() {
    if(!bannerTitle.value) {
      alert('배너제목을 입력하세요');
      return false;
    }

    if(!categoryIdx.value) {
      alert('링크 카테고리를 선택하세요');
      return false;
    }

    const bannerReq = {
      bannerIdx: receiveParam.bannerIdx,
      bannerTitle: bannerTitle.value,
      bannerSubTitle: bannerSubTitle.value,
      bannerImgVO: bannerImgVO.value,
      categoryIdx: categoryIdx.value
    };
    startLoading();
    await $fetch('/api/banner/modifyBanner', {method: 'post', body: bannerReq}).finally(() => stopLoading());
    router.back();
  }
}
</script>

<style scoped>

</style>