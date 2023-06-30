<!-- eslint-disable prettier/prettier -->
<template>
  <main class="relative">
    <div><PatternsVue /></div>

    <div class="flex px-4 py-4 transition sm:px-6 lg:px-8">
      <!-- Side bar contain all collection folders -->
      <div class="md:h-[72vh] md:w-[300px] xsm:w-[100%] xsm:mb-4 px-3 py-4 overflow-y-auto rounded-[10px] ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 delay-150 duration-700 ease-in-out bg-white dark:bg-white/5 bg-clip-border shadow-3xl shadow-shadow-500">
        <FoldersList />
      </div>
      
      <!-- Middle bar contain all folder's requets -->
      <div class="md:h-[72vh] md:w-[300px] xsm:w-[100%] xsm:mb-4 xsm:ml-0 md:ml-3" aria-label="Sidebar">
        <RequestsList />
      </div>

      <!-- Right bar contains clicked single request vuew -->
      <div class="single-request-container md:ml-3 max-h-[72vh]">
        <SingleRequest />
      </div>
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
    FoldersList: () => import("../components/CollectionItems/FoldersList.vue"),
    RequestsList: () =>
      import("../components/CollectionItems/RequestsList.vue"),
    SingleRequest: () =>
      import("../components/CollectionItems/SingleRequest.vue"),
    PatternsVue: () => import("../components/PatternsVue.vue"),
  },
};
</script>
