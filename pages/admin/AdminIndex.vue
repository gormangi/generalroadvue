<template>
  <div class="wrapper">
    <!-- Sidebar -->
    <SideBar />
    <!-- End Sidebar -->

    <div class="main-panel">
      <div class="main-header">

        <!-- Logo Header -->
        <LogoHeader />
        <!-- End Logo Header -->

        <!-- Navbar Header -->
        <nav
          class="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom"
        >
          <div class="container-fluid">
            <nav
              class="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex"
            >
              <div class="input-group">
                <div class="input-group-prepend">
                  <button type="submit" class="btn btn-search pe-1">
                    <i class="fa fa-search search-icon"></i>
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search ..."
                  class="form-control"
                />
              </div>
            </nav>

          </div>
        </nav>
        <!-- End Navbar -->
      </div>

      <div class="container">
        <div class="page-inner">
          <div class="page-header">
            <h3 class="fw-bold mb-3">카테고리 관리</h3>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h4 class="card-title">상위카테고리</h4>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table
                      id="basic-datatables"
                      class="display table table-striped table-hover"
                      style="min-width:700px;"
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
                      <draggable v-model="state.topCategoryList"
                                 v-bind="dragOptions"
                                 tag="tbody"
                                 item-key="categoryIdx"
                                 @end="topCategorySort"
                                 handle=".handle">
                        <template #item="{element: item}">
                          <tr>
                            <td class="handle"><i class="fa fa-align-justify"></i></td>
                            <td>{{ item.categoryName }}</td>
                            <td>{{ item.categoryOrder }}</td>
                            <td>{{ item.categoryUseYn === true ? 'Y' : 'N' }}</td>
                            <td><button class="btn btn-primary btn-round" style="color:white" @click="viewChildCategory">{{ item.childCategoryCnt }} 개</button></td>
                            <td>
                              <div class="form-button-action">
                                <button type="button" @click="topCateModifyBtn" data-bs-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task">
                                  <i class="fa fa-edit"></i>
                                </button>
                                <button type="button" @click="topCateDeleteBtn" data-bs-toggle="tooltip" title="" class="btn btn-link btn-danger" data-original-title="Remove">
                                  <i class="fa fa-times"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </template>
                      </draggable>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script setup>
import SideBar from "/components/admin/SideBar";
import LogoHeader from "/components/admin/LogoHeader";
import Footer from "/components/admin/Footer";
import draggable from 'vuedraggable';
import {computed, onMounted, reactive} from "vue";

definePageMeta({
  layout: 'admin-default'
});

const state = reactive({
  topCategoryList: []
});

onMounted(async () => {
  state.topCategoryList = await $fetch('/api/category/getTopCategoryList', {method: 'post'});
});

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
  }
});

const topCateModifyBtn = () => {
  alert('ddd');
}

const topCateDeleteBtn = () => {
  alert('asef1');
}
const viewChildCategory = () => {
  alert('222');
}

const topCategorySort = async () => {
  state.topCategoryList.forEach((i, idx) => i.categoryOrder = idx + 1);
  await $fetch('/api/category/saveTopCategoryOrder', {method:'post', body: state.topCategoryList});
}

/*export default {
  name: "AdminIndex",
  layout: 'adminDefault',
  components: {
    Footer,
    LogoHeader,
    SideBar,
    draggable
  },
  data() {
    return {
      topCategoryList: []
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  async mounted() {
    this.topCategoryList = await this.$axios.$post('/api/category/getTopCategoryList', {});
  },
  methods: {
    topCateModifyBtn() {
      alert('ddd');
    },
    topCateDeleteBtn() {
      alert('asef1');
    },
    viewChildCategory() {
      alert('222');
    },
    async topCategorySort() {
      this.topCategoryList.forEach((i, idx) => i.categoryOrder = idx + 1);
      await this.$axios.$post('/api/category/saveTopCategoryOrder', this.topCategoryList);
    }
  }
}*/
</script>
