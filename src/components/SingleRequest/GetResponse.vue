<!-- eslint-disable prettier/prettier -->
<template>
    <div v-if="response">
        <div :class="(ok) ? alertState.alertSuccess : alertState.alertError" role="alert">
            <svg v-if="ok" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>

            <svg v-if="!ok" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <div>
                <span :class="(ok) ? alertState.badgeSuccess : alertState.badgeError">
                    {{ status }}
                </span>
                {{ statusText }}
            </div>
        </div>
        <div class="mb-4 border-b border-t border-gray-200 py-2 dark:border-gray-700">
            <ul class="flex flex-wrap text-md font-bold font-anek text-left p-0 m-0" id="responseTabContent" data-tabs-toggle="#responseTab" role="tablist">
                <li class="mr-2" role="presentation">
                    <button class="inline-block py-2 px-4 rounded" id="headers-tab" data-tabs-target="#headers" type="button" role="tab" @click="openActiveTab('headers-response-tab')" aria-controls="headers" aria-selected="false">
                        Headers
                    </button>
                </li>
                <li class="mr-2" role="presentation">
                    <button class="inline-block p-3 py-2 px-4 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="body-tab" data-tabs-target="#body" @click="openActiveTab('body-response-tab')" type="button" role="tab" aria-controls="body" aria-selected="false">
                        Body
                    </button>
                </li>
                <li role="presentation">
                    <button class="inline-block py-2 px-4 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="params-tab" data-tabs-target="#params" @click="openActiveTab('params-response-tab')" type="button" role="tab" aria-controls="params" aria-selected="false">
                        Params
                    </button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div class="p-1 rounded-lg bg-gray-50 dark:bg-gray-800" id="headers-response-tab" role="tree-4-tabs" aria-labelledby="headers-tab">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"></caption>

                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Header Name</th>
                            <th scope="col" class="px-6 py-3">Header Value</th>
                            <th scope="col" class="px-6 py-3">Disabled</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="header in headers" :key="header[0]+Math.random().toString(16).slice(2)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ header[0] }}
                            </th>
                            <td class="px-6 py-4">{{ header[1] }}</td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center">
                                    <input :checked="false" id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="hidden p-1 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm" id="body-response-tab" role="tree-4-tabs" aria-labelledby="body-tab">
                <ssh-pre language="json" label="body" copy-button @copied="onBodyCopied">
                    <template #copy-button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                        </svg>
                    </template>
                    {{ body }}
                </ssh-pre>
            </div>
            <div class="hidden p-1 rounded-lg bg-gray-50 dark:bg-gray-800" id="params-response-tab" role="tree-4-tabs" aria-labelledby="params-tab">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"></caption>

                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Key</th>
                            <th scope="col" class="px-6 py-3">Value</th>
                            <th scope="col" class="px-6 py-3">Disabled</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="param in params" :key="param[0]+Math.random().toString(16).slice(2)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ param[0] }}
                            </th>
                            <td class="px-6 py-4">{{ param[1] }}</td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex items-center">
                                    <input :checked="false" id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
  props: {
    response: { require: true },
  },
  components: { SshPre },
  data() {
    return {
      body: this.response.body,
      headers: this.response.headers,
      ok: this.response.ok,
      redirected: this.response.redirected,
      status: this.response.status,
      statusText: this.response.statusText,
      type: this.response.type,
      url: this.response.url,
      params: this.response.params,
      alertState: {
        alertSuccess:
          "text-green-800 border-gray-300 bg-green-100 dark:text-green-400 dark:border-gray-800 flex p-3 mb-4 text-md border rounded-lg dark:bg-gray-800",
        alertError:
          "text-red-800 border-gray-300 bg-red-100 dark:text-red-400 dark:border-red-800 flex p-3 mb-4 text-md border rounded-lg dark:bg-gray-800",
        badgeSuccess:
          "bg-green-300 text-green-800 text-md font-bold ml-2 mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300",
        badgeError:
          "bg-red-300 text-red-800 text-md font-bold ml-2 mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300",
      },
    };
  },
  watch: {
    response: {
      handler(response) {
        this.body = response.body;
        this.headers = response.headers;
        this.ok = response.ok;
        this.redirected = response.redirected;
        this.status = response.status;
        this.statusText = response.statusText;
        this.type = response.type;
        this.url = response.url;
        this.params = response.params;
      },
      immediate: true,
    },
  },
  methods: {
    openActiveTab(tabId) {
      document.querySelectorAll('[role="tree-4-tabs"]').forEach((Element) => {
        Element.classList.add("hidden");
      });

      document.getElementById(tabId).classList.remove("hidden");
    },
    onBodyCopied() {
      this.$root.$emit("new_message", {
        responseType: "success",
        response: "Body Copied",
      });
    },
  },
};
</script>
