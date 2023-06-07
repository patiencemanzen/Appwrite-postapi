<!-- eslint-disable prettier/prettier -->
<template>
    <aside style="width: 100%" class="top-0 left-0 z-40 p-2 h-[72vh] mb-2 mt-1 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800 rounded-[10px] border border-gray-200 transition delay-150 duration-700 ease-in-out bg-white bg-clip-border shadow-3xl shadow-shadow-500">
            <div class="flex">
              <aside class="mb-5">
                <a class="inline-flex border border-gray-200 items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                  <span class="text-xs bg-deep-green-900 rounded-full text-white px-3 py-1.5 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                  </span> 
                  <span class="text-sm font-semibold">
                    <span v-if="folderName">{{ folderName }}</span>
                    <span v-else>Active Folder</span>
                  </span> 
                </a>
              </aside>
              <aside v-if="folderId" class="mb-5 ml-2 cursor-pointer" @click="openRequestCreator">
                <a class="inline-flex border border-gray-200 items-center justify-between px-1 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                  <span class="text-xs bg-gray-600 rounded-full text-white px-3 py-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>                    
                  </span> 
                </a>
              </aside>
              <aside v-else class="mb-5 ml-2 cursor-pointer disabled">
                <a class="inline-flex border border-gray-200 items-center justify-between px-1 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                  <span class="text-xs bg-gray-400 rounded-full text-white px-3 py-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>                    
                  </span> 
                </a>
              </aside>
            </div>
            <div id="request-name-form" class="request-name-form relative hidden">
              <button @click="closeRequestCreator" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute -top-2 right-0 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close menu</span>
              </button>
              <div>
                <label for="helper-text" class="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Request Name</label>
                <input v-model="model.requestName" type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Get all users">
              </div>
              <div class="mt-2">
                <label for="message" class="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Description</label>
                <textarea v-model="model.requestDescription" id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Some Description..."></textarea>
              </div>
              <button @click="submitNewRequest" type="button" class="mt-2 w-full justify-center text-white bg-green-800 hover:bg-green-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                  save changes
              </button>
            </div>

            <div class="" style="margin-top: .7rem">
              <ul class="space-y-2 font-medium p-0 m-0 cursor-pointer" v-if="requests">
                <li v-for="request in requests" :key="request.name+Math.random().toString(16).slice(2)">
                    <a @click="viewRequest(request)" :render-request="isActiveTab(request)" :id="request.id" class="border border-gray-200 flex items-center justify-between p-2 text-gray-900 rounded-[10px] bg-clip-border shadow-3xl shadow-shadow-500 dark:text-white bg-gray-100 dark:hover:bg-gray-700">
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <div class="text-left ml-2 w-36 overflow-hidden">
                                <div class="text-left truncate">{{ request.name }}</div>
                                <div class="text-sm text-left text-gray-500 truncate">{{ request.request.url.raw }}</div>
                            </div>
                        </div>
                        <span :class="methodsSymbols[request.request.method]+` inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-50 rounded-full dark:bg-gray-700 dark:text-gray-300`">
                            {{ request.request.method }}
                        </span>
                    </a>
                </li>
              </ul>
            </div>

            <div v-if="isEmpty(requests)" class="h-32"></div>
            <div v-if="isEmpty(requests)" class="flex grayscale flex-col items-center justify-center">
              <img class="w-32" src="../../assets/img/file.png" alt="">
              <h4 class="mt-4 text-center inline-flex items-center mb-4 text-md font-semibold text-gray-500 dark:text-gray-400">
                Requests
              </h4>
            </div>

            <div v-if="isLoading">
                <span class="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-indigo-600"></span>
            </div>
        </div>
    </aside>
</template>
<script>
import { isEmpty } from "../../utils/GeneralUtils";
import { urlPushState } from "../../utils/UrlUtils";

export default {
  data() {
    return {
      folderId: null,
      folderName: null,
      requests: {},
      methodsSymbols: {
        POST: "bg-indigo-500",
        GET: "bg-green-500",
        PUT: "bg-gray-500",
        DELETE: "bg-red-500",
      },
      isLoading: false,
      model: { requestName: "", requestDescription: "" },
      isEmpty,
    };
  },
  methods: {
    openRequestCreator() {
      document.getElementById("request-name-form").classList.remove("hidden");
    },

    closeRequestCreator() {
      document.getElementById("request-name-form").classList.add("hidden");
    },

    submitNewRequest() {
      if (!isEmpty(this.model.requestName)) {
        this.closeRequestCreator();

        this.$root.$emit("new_request", {
          alertMessage: `Submit new request'`,
          data: {
            folderId: this.folderId,
            name: this.model.requestName,
            description: this.model.requestDescription,
            id: Math.random().toString(16).slice(2),
            request: {
              method: "GET",
              header: [],
              url: {
                raw: "https://example.com/api",
                host: ["https://example.com"],
                path: [this.folderName],
              },
            },
            response: [],
          },
        });
      } else {
        this.$root.$emit("new_message", {
          responseType: "error",
          response: "Folder name required",
          hasResponse: true,
        });
      }
    },

    // click to view single request
    viewRequest(request) {
      // update url
      urlPushState("request_tab", request.id);
      this.$root.$emit("single_request", request);
    },

    // render on first load
    isActiveTab(request) {
      let urlParams = new URLSearchParams(window.location.search);

      if (urlParams.has("request_tab")) {
        if (urlParams.get("request_tab") == request.id) {
          this.$root.$emit("single_request", request);
          return "render";
        }
      }
    },
  },
  mounted() {
    this.$root.$on("list_requests", (folder) => {
      this.isLoading = true;

      if (!isEmpty(folder)) {
        this.requests = {};
        this.folderId = folder.id;
        this.folderName = folder.name;
        this.requests = folder.requests;
      }

      this.isLoading = false;
    });
  },
};
</script>
