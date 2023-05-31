<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <div class="mb-4 border-b border-gray-200 pb-2 dark:border-gray-700">
            <ul class="flex flex-wrap text-md font-bold font-anek text-left p-0 m-0" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                <li class="mr-2" role="presentation">
                    <button class="inline-block py-2 px-4 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" @click="openActiveTab('form-data-body-content-tab')" id="form-data-tab" data-tabs-target="#form-data" type="button" role="tab" aria-controls="form-data" aria-selected="true">
                        Form-data
                    </button>
                </li>
                <li class="mr-2" role="presentation">
                    <button class="inline-block py-2 px-4 rounded" id="raw-data-tab" @click="openActiveTab('raw-data-body-content-tab')" data-tabs-target="#raw-data" type="button" role="tab" aria-controls="raw-data" aria-selected="false">
                        Raw
                    </button>
                </li>
                <li class="mr-2" role="presentation">
                    <button class="inline-block p-3 py-2 px-4 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" @click="openActiveTab('URL-Encoded-body-content-tab')" id="URL-Encoded-tab" data-tabs-target="#URL-Encoded" type="button" role="tab" aria-controls="URL-Encoded" aria-selected="false">
                        Form URL-Encoded
                    </button>
                </li>
                <li role="presentation">
                    <button class="inline-block py-2 px-4 rounded hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="Binary-tab" @click="openActiveTab('Binary-body-content-tab')" data-tabs-target="#Binary" type="button" role="tab" aria-controls="Binary" aria-selected="false">
                        Binary
                    </button>
                </li>
            </ul>
        </div>
        <div id="myTabContent">
            <div class="rounded-lg bg-gray-50 dark:bg-gray-800" id="form-data-body-content-tab" role="tree-3-tabs" aria-labelledby="form-data-tab">
                <div class="relative overflow-x-auto sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">Key</th>
                                <th scope="col" class="px-6 py-3">Value</th>
                                <th scope="col" class="px-6 py-3">Type</th>
                                <th scope="col" class="px-6 py-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="formdata in body.formdata" :key="formdata.key+Math.random().toString(16).slice(2)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ formdata?.key ? formdata.key : '' }}
                                </th>
                                <td class="px-6 py-4 w-32" style="display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden !important;">{{ formdata.type == 'file' ? (formdata?.src ? formdata.src : '') : (formdata?.value ? formdata.value : '') }}</td>
                                <td class="px-6 py-4">{{ formdata?.type ? formdata.type : '' }}</td>
                                <td class="px-6 py-4 text-right">{{ formdata?.description ? formdata.description : 'No description' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="hidden rounded-lg bg-gray-50 dark:bg-gray-800 text-sm" id="raw-data-body-content-tab" role="tree-3-tabs" aria-labelledby="raw-data-tab">
                <div>
                    <ssh-pre language="json" label="body" copy-button @copied="onCopiedDoSomething">
                        <template #copy-button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                            </svg>
                        </template>
                        {{ body?.raw !== undefined ? body.raw : {} }}
                    </ssh-pre>
                </div>
            </div>
            <div class="hidden rounded-lg bg-gray-50 dark:bg-gray-800" id="URL-Encoded-body-content-tab" role="tree-3-tabs" aria-labelledby="URL-Encoded-tab">
                <div class="relative overflow-x-auto sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">Key</th>
                                <th scope="col" class="px-6 py-3">Value</th>
                                <th scope="col" class="px-6 py-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="formdata in body.formdata" :key="formdata.key+Math.random().toString(16).slice(2)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ formdata?.key ? formdata.key : '' }}
                                </th>
                                <td class="px-6 py-4 w-32" style="display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden !important;">
                                    {{ formdata?.value ? formdata.value : '' }}
                                </td>
                                <td class="px-6 py-4 text-right">{{ formdata?.description ? formdata.description : 'No description' }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="hidden rounded-lg bg-gray-50 dark:bg-gray-800" id="Binary-body-content-tab" role="tree-3-tabs" aria-labelledby="Binary-tab">
                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
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
  methods: {
    openActiveTab(tabId) {
      document.querySelectorAll('[role="tree-3-tabs"]').forEach((Element) => {
        Element.classList.add("hidden");
      });

      document.getElementById(tabId).classList.remove("hidden");
    },
    onCopiedDoSomething() {
      this.$root.$emit("new_message", {
        responseType: "success",
        response: "Body Copied",
        hasResponse: true,
      });
    },
  },
  watch: {
    body: {
      handler(body) {
        let newBody = null;

        if (body.mode == "formdata") {
          let formdata = new FormData();

          body.formdata.forEach((value, index, array) => {
            formdata.append(value.key, value.value);
          });

          newBody = formdata;
        }

        if (body.mode == "raw") {
          newBody = body.raw;
        }

        this.$root.$emit("new_body", newBody);
      },
      immediate: true,
    },
  },
};
</script>
