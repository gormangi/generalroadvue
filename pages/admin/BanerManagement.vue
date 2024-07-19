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

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-default'
});
const { isLoading, startLoading, stopLoading } = useLoading();
</script>

<style scoped>

</style>