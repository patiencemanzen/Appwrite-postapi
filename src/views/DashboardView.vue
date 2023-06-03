<!-- eslint-disable prettier/prettier -->
<template>
  <main class="bg-white">
    <div class="g-padding flex">
      <aside id="sidebar-multi-level-sidebar" class="top-0 left-0 z-10 p-2 h-[72vh] mb-2 mt-1 transition-transform -translate-x-full sm:translate-x-0 " aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto rounded-[10px] border border-gray-200 transition delay-150 duration-700 ease-in-out bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:bg-gray-800">
          <CollectionsSideBar />
        </div>
      </aside>
      
      <div class="diff-requests-container"><ListCollectionRequests /></div>
      <div class="single-request-container"><SingleRequest /></div>
    </div>
  </main>
</template>
<style>
@import "../assets/css/bash.css";
@import "../assets/css/dashboard.css";
</style>
<script>
export default {
  components: {
    CollectionsSideBar: () => import("../components/CollectionsSideBar.vue"),
    // eslint-disable-next-line prettier/prettier
    ListCollectionRequests: () => import("../components/ListCollectionRequests.vue"),
    SingleRequest: () => import("../components/SingleRequest.vue"),
  },
};
</script>
