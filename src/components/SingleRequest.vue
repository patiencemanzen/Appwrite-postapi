<!-- eslint-disable prettier/prettier -->
<template>
    <div class="p-2 relative" style="width: 100%" v-if="isOpen || request.length > 0">
        <div class="tabnet-content rounded-[10px] border overflow-y-auto border-gray-200 transition delay-150 duration-700 ease-in-out bg-white bg-clip-border shadow-3xl shadow-shadow-500 max-h-[78vh] p-2 mb-2 mt-1">
            <div><TestRequest :request="request.request" /></div>

            <div class="mb-4 border-b border-t border-gray-200 py-2 dark:border-gray-700">
                <ul class="flex flex-wrap text-md font-bold font-anek text-left p-0 m-0" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li class="mr-2" role="presentation">
                        <button class="inline-block py-2 px-4 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="auth-tab" @click="openActiveTab('auth-content-tab')" data-tabs-target="#auth" type="button" role="tab" aria-controls="auth" aria-selected="false">
                            Auth
                        </button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button class="inline-block py-2 px-4 rounded" id="headers-tab" data-tabs-target="#headers" type="button" role="tab" @click="openActiveTab('headers-content-tab')" aria-controls="headers" aria-selected="false">
                            Headers
                        </button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button class="inline-block p-3 py-2 px-4 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="body-tab" data-tabs-target="#body" @click="openActiveTab('body-content-tab')" type="button" role="tab" aria-controls="body" aria-selected="false">
                            Body
                        </button>
                    </li>
                    <li role="presentation">
                        <button class="inline-block py-2 px-4 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="params-tab" data-tabs-target="#params" @click="openActiveTab('params-content-tab')" type="button" role="tab" aria-controls="params" aria-selected="false">
                            Params
                        </button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button class="inline-block py-2 px-4 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="Description-tab" data-tabs-target="#Description" @click="openActiveTab('description-content-tab')" type="button" role="tab" aria-controls="Description" aria-selected="true">
                            Description
                        </button>
                    </li>
                </ul>
            </div>
            <div id="myTabContent">
                <div class="hidden p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-800" id="auth-content-tab" role="tree-1-tabs" aria-labelledby="auth-tab">
                    <RequestAuth :auths="request.request?.auth !== undefined ? request.request.auth : {} " />
                </div>
                <div class="hidden p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-800" id="headers-content-tab" role="tree-1-tabs" aria-labelledby="headers-tab">
                    <RequestHeaders :headers="request.request?.header !== undefined ? request.request.header : {} " />
                </div>
                <div class="hidden p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-800" id="body-content-tab" role="tree-1-tabs" aria-labelledby="body-tab">
                    <RequestBody :body="request.request?.body !== undefined ? request.request.body : {} " />
                </div>
                <div class="hidden p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-800" id="params-content-tab" role="tree-1-tabs" aria-labelledby="params-tab">
                    <RequestParams :url="request.request?.url !== undefined ?  request.request.url : {}" />
                </div>
                <div class="p-4 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-800" id="description-content-tab" role="tree-1-tabs" aria-labelledby="Description-tab">
                    <RequestDescription :name="request.name" :desc="request?.description !== undefined ? request.description : '' " :id="request.id" />
                </div>
                <div class="hidden p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800" id="response-content-tab" role="tree-1-tabs" aria-labelledby="response-tab">
                    <GetResponse :response="response" />
                </div>
            </div>

            <ResponseHandler :response="request.response" />
        </div>
    </div>
</template>
<script>
export default {
  components: {
    TestRequest: () => import("../components/SingleRequest/TestRequest.vue"),
    ResponseHandler: () => import("../components/SingleRequest/ResponseHandler.vue"),
    RequestAuth: () => import("../components/SingleRequest/RequestAuth.vue"),
    RequestHeaders: () => import("../components/SingleRequest/RequestHeaders.vue"),
    RequestBody: () => import("../components/SingleRequest/RequestBody.vue"),
    RequestParams: () => import("../components/SingleRequest/RequestParams.vue"),
    GetResponse: () => import("../components/SingleRequest/GetResponse.vue"),
    RequestDescription: () => import("../components/SingleRequest/RequestDescription.vue"),
  },
  data() {
    return {
      request: {},
      response: {},
      isOpen: false,
    };
  },
  methods: {
    openActiveTab(tabId) {
      document.querySelectorAll('[role="tree-1-tabs"]').forEach((Element) => {
        Element.classList.add("hidden");
      });

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
      this.openActiveTab(response.tab);
      this.response = response.contents;
    });
  },
};
</script>
