<!-- eslint-disable prettier/prettier -->
<template>
    <div class="request-input flex justify-start pt-4 px-4 pb-0">
        <div class="">
            <select v-model="method" id="countries" class="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="GET" class="text-green-800">GET</option>
                <option value="POST" class="text-indigo-800">POST</option>
                <option value="DELETE" class="text-red-800">DELETE</option>
                <option value="PUT" class="text-gray-800">PUT</option>
            </select>
        </div>
        <div class="mb-6 w-96 ml-3">
          <input v-model="url" type="text" id="success" autocomplete="false" class="bg-gray-50 border border-gray-300 text-gray-600 font-bold dark:text-green-400 placeholder-gray-400 dark:placeholder-green-500 text-md leading-3 rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="https://api.example.com/api">
        </div>
        <div class="ml-3">
            <button @click="sendRequest" :class="'relative cursor-pointer inline-flex h-10 w-12 items-center justify-center rounded-lg border border-transparent text-white bg-gray-800 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                <div :class="!isLoading ? 'hidden' : ''">
                    <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
                        <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                    </div>
                </div>
            </button>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    request: { require: true },
  },
  data() {
    return {
      method: this.request.method,
      url: this.request.url.raw,
      headers: {},
      auths: {},
      params: {},
      body: {},
      isLoading: false,
    };
  },
  watch: {
    request: {
      handler(request) {
        this.method = request.method;
        this.url = request.url.raw;
      },
      immediate: true,
    },
  },
  methods: {
    async sendRequest() {
      this.isLoading = true;

      const RequestSettings = {
        method: this.method,
        headers: this.headers,
        cache: "default",
      };

      if (this.method != "GET") {
        RequestSettings.body = this.body;
      }

      let customResponse = {};
      let customheaders = [];

      try {
        const url = new URL(this.url);
        const params = new URLSearchParams(url.search);

        await fetch(url.href + "?" + params, RequestSettings)
          .then(async (response) => {
            customheaders.push(...response.headers);
            customResponse.body = await response.text();
            customResponse.bodyUsed = response.bodyUsed;
            customResponse.headers = response.headers;
            customResponse.ok = response.ok;
            customResponse.status = response.status;
            customResponse.statusText = response.statusText;
            customResponse.type = response.type;
            customResponse.url = response.url;
            customResponse.redirected = response.redirected;
            customResponse.params = new URLSearchParams(
              new URL(response.url).search
            ).entries();
          })
          .catch(() => {
            this.$root.$emit("new_message", {
              responseType: "error",
              response: "Unable to fetch request",
              hasResponse: true,
            });
          });

        customResponse.headers = customheaders;

        this.$root.$emit("responses", {
          tab: "response-content-tab",
          contents: customResponse,
        });
      } catch (error) {
        this.$root.$emit("new_message", {
          responseType: "error",
          response: error.message,
          hasResponse: true,
        });
      }

      this.isLoading = false;
    },
  },
  mounted() {
    this.$root.$on("new_auth", (auth) => {
      this.auths = auth;
    });

    this.$root.$on("new_headers", (headers) => {
      this.headers = headers;
    });

    this.$root.$on("new_body", (body) => {
      this.body = body;
    });
  },
};
</script>
