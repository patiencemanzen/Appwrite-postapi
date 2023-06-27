<!-- eslint-disable prettier/prettier -->
<template>
  <div v-if="isOpen || request.length > 0" class="w-full h-full relative tabnet-content rounded-[10px] overflow-y-auto ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 delay-150 duration-700 ease-in-out bg-white bg-clip-border shadow-3xl shadow-shadow-500 p-2 dark:bg-white/5">
    <div><SendRequest :request="request.request" :id="request.id" /></div>

    <div class="mb-4 mx-2 ring-1 rounded-[10px] ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 py-2 dark:border-gray-700">
        <ul class="flex flex-wrap text-md font-bold text-left p-0 m-0" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
            <li class="mr-2" role="presentation">
                <button class="inline-block py-2 dark:text-gray-400 px-4 rounded hover:border-gray-300 dark:hover:text-gray-300" id="auth-tab" @click="openActiveTab('auth-content-tab', 'auth-tab')" control-tab="tab-controller" data-tabs-target="#auth" type="button" role="tab" aria-controls="auth" aria-selected="false">
                    Auth
                </button>
            </li>
            <li class="mr-2" role="presentation">
                <button class="inline-block py-2 px-4 dark:text-gray-400 rounded" id="headers-tab" data-tabs-target="#headers" type="button" role="tab" @click="openActiveTab('headers-content-tab', 'headers-tab')" control-tab="tab-controller" aria-controls="headers" aria-selected="false">
                    Headers
                </button>
            </li>
            <li class="mr-2" role="presentation">
                <button class="inline-block p-3 py-2 dark:text-gray-400 px-4 rounded hover:border-gray-300 dark:hover:text-gray-300" id="body-tab" data-tabs-target="#body" @click="openActiveTab('body-content-tab', 'body-tab')" control-tab="tab-controller" type="button" role="tab" aria-controls="body" aria-selected="false">
                    Body
                </button>
            </li>
            <li class="mr-2" role="presentation">
                <button class="inline-block py-2 px-4 rounded dark:text-gray-400 hover:border-gray-300 dark:hover:text-gray-300" id="params-tab" data-tabs-target="#params" @click="openActiveTab('params-content-tab', 'params-tab')" control-tab="tab-controller" type="button" role="tab" aria-controls="params" aria-selected="false">
                    Params
                </button>
            </li>
            <li class="mr-2" role="presentation">
                <button class="inline-block py-2 px-4 rounded dark:text-gray-400 bg-[#475569] text-white hover:border-gray-300 dark:hover:text-gray-300" id="Description-tab" data-tabs-target="#Description" @click="openActiveTab('description-content-tab', 'Description-tab')" control-tab="tab-controller" type="button" role="tab" aria-controls="Description" aria-selected="true">
                    Description
                </button>
            </li>
        </ul>
    </div>
    <div id="myTabContent" class="mx-2">
        <div class="hidden p-4 rounded-lg ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 bg-gray-50 dark:bg-white/5" id="auth-content-tab" role="tree-1-tabs" aria-labelledby="auth-tab">
            <RequestAuth :auths="request.request?.auth !== undefined ? request.request.auth : {} " />
        </div>
        <div class="hidden p-4 rounded-lg ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 bg-gray-50 dark:bg-white/5" id="headers-content-tab" role="tree-1-tabs" aria-labelledby="headers-tab">
            <RequestHeaders :headers="request.request?.header !== undefined ? request.request.header : {} " />
        </div>
        <div class="hidden p-4 rounded-lg ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 bg-gray-50 dark:bg-white/5" id="body-content-tab" role="tree-1-tabs" aria-labelledby="body-tab">
            <RequestBody :body="request.request?.body !== undefined ? request.request.body : {} " />
        </div>
        <div class="hidden p-4 rounded-lg ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 bg-gray-50 dark:bg-white/5" id="params-content-tab" role="tree-1-tabs" aria-labelledby="params-tab">
            <RequestParams :url="request.request?.url !== undefined ?  request.request.url : {}" />
        </div>
        <div class="p-4 rounded-lg ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 bg-gray-50 dark:bg-white/5" id="description-content-tab" role="tree-1-tabs" aria-labelledby="Description-tab">
            <RequestDescription :name="request.name" :desc="request?.description !== undefined ? request.description : '' " :id="request.id" />
        </div>
        <div class="hidden p-4 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 rounded-lg bg-gray-50 dark:bg-white/5" id="response-content-tab" role="tree-1-tabs" aria-labelledby="response-tab">
            <GetResponse :response="response" />
        </div>
    </div>

    <ResponseHandler :response="request.response" />
  </div>
</template>

<script>
export default {
  components: {
    SendRequest: () => import("../SingleRequest/SendRequest.vue"),
    ResponseHandler: () => import("../SingleRequest/ResponseHandler.vue"),
    RequestAuth: () => import("../SingleRequest/RequestAuth.vue"),
    RequestHeaders: () => import("../SingleRequest/RequestHeaders.vue"),
    RequestBody: () => import("../SingleRequest/RequestBody.vue"),
    RequestParams: () => import("../SingleRequest/RequestParams.vue"),
    GetResponse: () => import("../SingleRequest/GetResponse.vue"),
    RequestDescription: () => import("../SingleRequest/RequestDescription.vue"),
  },
  data() {
    return {
      request: {},
      response: {},
      isOpen: false,
    };
  },
  methods: {
    openActiveTab(tabId, self) {
      document.querySelectorAll('[role="tree-1-tabs"]').forEach((Element) => {
        Element.classList.add("hidden");
      });

      document
        .querySelectorAll('[control-tab="tab-controller"]')
        .forEach((Element) => {
          Element.classList.remove("dark:text-white");
          Element.classList.remove("bg-[#475569]");
        });

      if (self) {
        document.getElementById(self).classList.add("dark:text-white");
        document.getElementById(self).classList.add("bg-[#475569]");
      }

      document.getElementById(tabId).classList.remove("hidden");
    },
  },
  mounted() {
    this.$root.$on("single_request", (request) => {
      this.isOpen = true;
      this.request = {};
      this.request = request;
    });

    this.$root.$on("responses", (response) => {
      this.openActiveTab(response.tab, "");
      this.response = response.contents;
    });
  },
};
</script>
