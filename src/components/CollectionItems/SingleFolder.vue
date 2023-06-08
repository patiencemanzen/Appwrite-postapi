<!-- eslint-disable prettier/prettier -->
<template>
    <li v-if="!folder.hasOwnProperty('request')">
        <a @click="parseRequests(folder, nextGen)" :id="folder.id" class="border border-gray-200 mt-2 flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap truncate">{{ folder.name }}</span>
            <span class="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-50 bg-green-500 rounded-full dark:bg-gray-700 dark:text-gray-300">{{ folder.item.length }}</span>
        </a>
        <ul v-if="folder?.item" :id="nextGen" class="hidden">
            <SingleFolder v-for="nextItem in folder.item" :key="nextItem.name+Math.random().toString(16).slice(2)" :folder="nextItem" />
        </ul>
    </li>
</template>
<script>
import { urlPushState } from "../../utils/UrlUtils";

export default {
  props: { folder: { require: true } },
  components: {
    SingleFolder: () => import("./SingleFolder.vue"),
  },
  data() {
    return {
      uniqueIdentifier: Math.random().toString(16).slice(2),
      nextGen: "dropdown-" + this.folder.name + "-" + this.uniqueIdentifier,
      urlParams: new URLSearchParams(window.location.search),
    };
  },
  methods: {
    parseRequests(folder, nextGenId) {
      let requests = [];

      // eslint-disable-next-line no-prototype-builtins
      if (folder.hasOwnProperty("request")) {
        this.$root.$emit("list_requests", {
          id: folder.id,
          name: folder.name,
          requests: folder,
        });
      }

      // if folder has items inside them | open requests list
      // eslint-disable-next-line no-prototype-builtins
      if (folder.hasOwnProperty("item")) {
        if (document.getElementById(nextGenId).classList.contains("hidden")) {
          // eslint-disable-next-line no-prototype-builtins
          if (folder.hasOwnProperty("item")) {
            document.getElementById(nextGenId).classList.remove("hidden");
          }
        } else {
          document.getElementById(nextGenId).classList.add("hidden");
        }
      }

      // Find all requests withion folder
      for (var key in folder.item) {
        // eslint-disable-next-line no-prototype-builtins
        if (folder.item[key].hasOwnProperty("request")) {
          requests.push(folder.item[key]);
        }
      }

      // update url active request ID
      urlPushState("requests", folder.id);

      // List all folder requests
      this.$root.$emit("list_requests", {
        id: folder.id,
        name: folder.name,
        requests: requests,
      });
    },
  },
  mounted() {
    /**
     * If there is current single request ID in url
     * and that id equal to this iteration id
     * then click this folder|request
     */
    if (
      this.folder &&
      this.urlParams.has("requests") &&
      this.folder.id == this.urlParams.get("requests")
    ) {
      document.getElementById(this.urlParams.get("requests")).click();
    }
  },
};
</script>
