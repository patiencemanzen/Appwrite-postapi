<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <div class="mb-4 border-b border-gray-200 pb-2 dark:border-gray-700">
            <ul class="flex flex-wrap text-md font-bold font-anek text-left p-0 m-0" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                <li class="mr-2" role="presentation">
                    <button class="inline-block py-2 px-4 dark:text-gray-400 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" @click="openActiveTab('none-auth-content-tab')" id="none-auth-tab" data-tabs-target="#none-auth" type="button" role="tab" aria-controls="none-auth" aria-selected="true">
                        None
                    </button>
                </li>
                <li class="mr-2" role="presentation">
                    <button class="inline-block p-3 py-2 px-4 dark:text-gray-400 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" @click="openActiveTab('bearer-auth-content-tab')" id="bearer-auth-tab" data-tabs-target="#bearer-auth" type="button" role="tab" aria-controls="bearer-auth" aria-selected="false">
                        Bearer Token
                    </button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div :class="(!auths) ? '' : 'hidden' + ' rounded-lg bg-gray-50 dark:bg-gray-800 p-5'" id="none-auth-content-tab" role="tree-2-tabs" aria-labelledby="none-auth-tab">
                <span class="text-gray-300">No authorization was set for this request.</span>
            </div>
            <div :class="(auths && auths.type == 'bearer') ? '' : 'hidden' + ' rounded-lg bg-gray-50 p-5 dark:bg-gray-800'" id="bearer-auth-content-tab" role="tree-2-tabs" aria-labelledby="bearer-auth-tab">
                <div class="mb-6">
                    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type: {{auths.type}}</label>
                    <input v-model="authsToken" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["auths"],
  data() {
    return {
      authsToken: "",
    };
  },
  methods: {
    // Open new tab on-each-tab-click
    openActiveTab(tabId) {
      document.querySelectorAll('[role="tree-2-tabs"]').forEach((Element) => {
        Element.classList.add("hidden");
      });

      document.getElementById(tabId).classList.remove("hidden");
    },
  },
  watch: {
    auths: {
      handler(auths) {
        this.authsToken =
          auths?.bearer !== undefined ? auths.bearer[0].value : "";

        this.$root.$emit("new_auth", {
          key: auths.type,
          value: auths?.bearer !== undefined ? auths.bearer[0].value : "",
        });
      },
      immediate: true,
    },
    authsToken: {
      handler(token) {
        this.$root.$emit("new_auth", {
          key: "bearer",
          value: token,
        });
      },
      immediate: true,
    },
  },
};
</script>
