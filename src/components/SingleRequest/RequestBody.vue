<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <div class="mb-4 border-b border-gray-200 pb-2 dark:border-gray-700">
            <ul class="flex flex-wrap text-md font-bold font-anek text-left p-0 m-0" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                <li class="mr-2" role="presentation">
                    <button class="inline-block py-2 px-4 rounded dark:text-gray-400 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" @click="openActiveTab('formdata')" id="form-data-tab" data-tabs-target="#form-data" type="button" role="tab" aria-controls="form-data" aria-selected="true">
                        Form-data
                    </button>
                </li>
                <li class="mr-2" role="presentation">
                    <button class="inline-block py-2 px-4 rounded dark:text-gray-400" id="raw-data-tab" @click="openActiveTab('json')" data-tabs-target="#raw-data" type="button" role="tab" aria-controls="raw-data" aria-selected="false">
                        Raw
                    </button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div class="rounded-lg p-5 bg-gray-50 dark:bg-gray-800" id="formdata-content" role="tree-3-tabs" aria-labelledby="form-data-tab">
                <div class="flex justify-between">
                    <div></div>
                    <div class="w-auto mb-2 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 rounded-[10px] bg-white dark:bg-white/5 px-3 py-2.5 shadow-sm shadow-shadow-200 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
                        <div class="font-semibold text-sm mb-3 dark:text-gray-200">Add new row</div>
                        <div class="flex flex-grow items-center justify-center relative">
                            <div class="flex items-center">
                                <div class="mr-1">
                                    <select v-model="newFormKeyPaired.type" id="countries" class="bg-gray-50 border-none ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 dark:bg-white/5 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="text" selected>text</option>
                                        <option value="file">file</option>
                                    </select>
                                </div>
                                <div class="mr-1"><input v-model="newFormKeyPaired.key" type="text" autocomplete="false" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border-none ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 dark:bg-white/5 ml-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="key"></div>
                                <div v-if="newFormKeyPaired.type == 'text'"><input v-model="newFormKeyPaired.value" autocomplete="false" type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="value"></div>
                                <div v-if="newFormKeyPaired.type == 'file'"><input @change="onFileChange" class="block w-full text-sm text-gray-900 border-none ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 dark:bg-white/5 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"></div>
                            </div>
                            <div class="ml-3">
                                <button @click="registerFormdata" class="relative cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent text-white bg-gray-800 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto shadow-md bg sm:rounded-lg mt-2">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" class="px-6 py-3">Key</th>
                              <th scope="col" class="px-6 py-3">Value</th>
                              <th scope="col" class="px-6 py-3">Type</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="formdata in request_body_as_formdata" :key="formdata.key+Math.random().toString(16).slice(2)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                  {{ formdata.key }}
                              </th>
                              <td class="px-6 py-4 w-32" style="display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden !important;">{{ formdata.value  }}</td>
                              <td class="px-6 py-4">{{ formdata.type }}</td>
                          </tr>
                      </tbody>
                  </table>
                </div>
            </div>
            <div class="hidden p-5 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm" id="json-content" role="tree-3-tabs" aria-labelledby="raw-data-tab">
                <div> 
                    <textarea id="request_body_as_json" v-model="request_body_as_json" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-none ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 dark:bg-white/5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="{}"></textarea>

                    <ssh-pre language="json" label="body" copy-button @copied="onBodyCopied">
                        <template #copy-button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                            </svg>
                        </template>
                        {{ request_body_as_json }}
                    </ssh-pre>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
pre.ssh-pre {
  position: relative;
  padding: 0.5em;
  margin: 0px !important;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background-color: rgba(0, 0, 0, 0.025);
  border-radius: 4px;
  display: block;
  white-space: unset !important;
  word-break: normal !important;
}
</style>
<script>
import SshPre from "simple-syntax-highlighter";
import "simple-syntax-highlighter/dist/sshpre.css";

export default {
  props: ["body"],
  components: { SshPre },
  data() {
    return {
      request_body_as_json: "",
      request_body_as_formdata: [],
      active_data_type: "formdata",
      newFormKeyPaired: {
        key: "",
        value: "",
        type: "",
      },
    };
  },
  methods: {
    /**
     * Set active tab and set active body-type: help in submition of
     * body with request to determine how to handle incoming data for ex: (tabID=formdata) mean body-type accept (formdata)
     */
    openActiveTab(tabId) {
      document.querySelectorAll('[role="tree-3-tabs"]').forEach((Element) => {
        Element.classList.add("hidden");
      });

      document.getElementById(tabId + "-content").classList.remove("hidden");
      this.active_data_type = tabId;
    },
    onBodyCopied() {
      this.$root.$emit("new_message", {
        responseType: "success",
        response: "Body Copied",
        subject: "Copied",
        source: "/",
      });
    },
    registerFormdata() {
      this.request_body_as_formdata = [
        ...this.request_body_as_formdata,
        {
          key: this.newFormKeyPaired.key,
          value: this.newFormKeyPaired.value,
          type: this.newFormKeyPaired.type,
        },
      ];
    },

    /**
     * listern to input-file change
     * and keep image in data handler
     */
    onFileChange(e) {
      this.newFormKeyPaired.value = e.target.files[0];
    },
  },
  watch: {
    // Watch Current file request body and register
    body: {
      handler(body) {
        let newBody = null;

        if (body.mode == "formdata") {
          body.formdata.forEach((value) => {
            this.request_body_as_formdata = [
              ...this.request_body_as_formdata,
              {
                key: value.key,
                value: value.value,
                type: value.type,
              },
            ];
          });

          newBody = body.formdata;
          this.active_data_type = "formdata";
        }

        if (body.mode == "raw") {
          newBody = body.raw;
          this.request_body_as_json = newBody;
          this.active_data_type = "json";
        }

        this.$root.$emit("new_body", {
          body_type: this.active_data_type,
          data: newBody,
        });
      },
      immediate: true,
    },

    // Watch new json data and register
    request_body_as_json: {
      handler(body) {
        this.$root.$emit("new_body", {
          body_type: this.active_data_type,
          data: body,
        });
      },
      immediate: true,
    },

    // Watch new formdata and register
    request_body_as_formdata: {
      handler(body) {
        this.$root.$emit("new_body", {
          body_type: this.active_data_type,
          data: body,
        });
      },
      immediate: true,
    },
  },
};
</script>
