<!-- eslint-disable prettier/prettier -->
<template>
    <div class="request-input flex items-center justify-between pt-4 px-2 pb-0 mb-5">
        <div class="">
            <select v-model="method" id="countries" class="bg-gray-50 font-bold border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="GET" class="text-green-800">GET</option>
                <option value="POST" class="text-indigo-800">POST</option>
                <option value="DELETE" class="text-red-800">DELETE</option>
                <option value="PUT" class="text-gray-800">PUT</option>
            </select>
        </div>
        <div class="ml-3 xl:w-80">
          <input v-model="url" type="text" id="success" autocomplete="false" class="w-full bg-gray-50 border border-gray-300 text-gray-600 font-bold dark:text-green-400 placeholder-gray-400 dark:placeholder-green-500 text-md leading-3 rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 dark:bg-gray-700 dark:border-green-500" placeholder="https://api.example.com/api">
        </div>
        <div class="ml-3 flex">
            <button @click="testRequest" class="relative cursor-pointer inline-flex h-10 w-12 items-center justify-center rounded-lg border border-transparent text-white bg-[#334155] hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                <div :class="!isLoading ? 'hidden' : ''">
                    <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
                        <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                    </div>
                </div>
            </button>
            <button @click="saveRequest" class="ml-2 relative cursor-pointer inline-flex h-10 w-12 items-center justify-center rounded-lg border border-transparent text-white bg-[#0369A1] hover:bg-[#475569] px-2 py-1 text-sm font-medium shadow-sm disabled:opacity-75">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
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
import { isEmpty, tryCatch } from "../../utils/GeneralUtils";

export default {
  props: {
    request: { require: true },
    id: { require: true },
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
      isEmpty,
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
    /**
     * Correct all headers, auths and bodies
     * and send a request with given url to test
     *
     * *** when response come - emit response component
     * *** to display the response
     */
    async testRequest() {
      this.isLoading = true;

      let headers = new Headers();

      this.headers.forEach((value) => {
        headers.append(value.key, value.value);
      });

      const RequestSettings = {
        method: this.method,
        headers: headers,
        cache: "default",
      };

      if (this.method != "GET") {
        if (this.body.body_type == "json") {
          RequestSettings.body = this.body;
        } else {
          let formdata = new FormData();
          this.body.data.forEach((value) => {
            formdata.append(value.key, value.value);
          });
          RequestSettings.body = formdata;
        }
      }

      let customResponse = {};
      let customheaders = [];

      tryCatch(
        async () => {
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
                subject: "Failed Request",
                source: "/",
              });
            });

          customResponse.headers = customheaders;

          this.$root.$emit("responses", {
            tab: "response-content-tab",
            contents: customResponse,
          });

          this.isLoading = false;
        },
        (error) => {
          this.$root.$emit("new_message", {
            responseType: "error",
            response: error.message,
            subject: "Failed Request",
            source: "/",
          });

          this.isLoading = false;
        }
      );
    },

    /**
     * Send and save request changes
     * to collection file
     */
    async saveRequest() {
      // Request Auth tokens
      let authToken = {
        type: "bearer",
        bearer: [
          {
            key: "token",
            value: this.auths.value,
            type: "string",
          },
        ],
      };

      // Request Body contents as Formdata
      let body_formdata = {
        mode: this.body.body_type,
        formdata: this.body.data,
      };

      // Request Body contents as json
      let body_json = {
        mode: this.body.body_type,
        raw: JSON.stringify(this.body.data),
        options: {
          raw: {
            language: "json",
          },
        },
      };

      // Emit global collection changes saver
      // to handler the incoming request change
      this.$root.$emit("save_collection_changes", {
        data: {
          id: this.id,
          request: {
            auth: authToken,
            method: this.method,
            header: this.headers,
            url: { raw: this.url },
            body: this.body.body_type == "json" ? body_json : body_formdata,
          },
          section: "item",
        },
      });
    },
  },
  mounted() {
    /**
     * Listen to request auths component
     * and register the auths contents
     */
    this.$root.$on("new_auth", (auth) => {
      this.auths = auth;
    });

    /**
     * Listen to request headers component
     * and register the headers contents
     */
    this.$root.$on("new_headers", (headers) => {
      this.headers = headers;
    });

    /**
     * Listen to request body component
     * and register the body contents
     */
    this.$root.$on("new_body", (body) => {
      this.body = body;
    });

    /**
     * Listen to URL param component
     * and register the params
     */
    this.$root.$on("new_params", (params) => {
      if (!this.isEmpty(params)) {
        params.forEach((value) => {
          if (this.url.includes("?")) {
            this.url = `${this.url}&${value.key}=${value.value}`;
          } else {
            this.url = `${this.url}?${value.key}=${value.value}`;
          }
        });
      }
    });
  },
};
</script>
