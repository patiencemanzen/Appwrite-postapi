<!-- eslint-disable prettier/prettier -->
<template>
    <ul class="space-y-2 font-medium p-0 m-0 relative">
        <div class="active-collection relative min-h-20 mb-2">
            <h4 class="mx-2 text-gray-500 truncate leading-10">
              <span v-if="activeFile.name">{{ activeFile.name }}</span>
              <span v-else>Active Collection</span>
            </h4>

            <div @click="openDropDown('moreCollectionInfo')" class="mt-2 inline-flex border border-gray-200 absolute shadow-sm right-0 -top-2 cursor-pointer items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-[10px] hover:bg-gray-100 focus:outline-none dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700" type="button">
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
            </div>

            <!-- Dropdown menu -->
            <div id="moreCollectionInfo" class="z-10 absolute right-0 top-11 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <ul v-if="!isEmpty(items)" class="p-0 m-0 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                    <li class="cursor-pointer"><span @click="openFolderCreator" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Create New Folder
                    </span></li>
                    <li><a :href="'/collection/'+activeCollection.$id" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        View documentation
                    </a></li>
                </ul>
                <div v-if="Object.keys(items).length > 0" class="py-2">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100 dark:hover:bg-red-600 dark:text-red-200 dark:hover:text-white">
                        Delete
                    </a>
                </div>
            </div>
        </div>

        <div id="folder-name-form" class="folder-name-form mt-3 hidden relative">
          <button @click="closeFolderCreator" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute -top-2 right-0 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close menu</span>
          </button>
          <div>
            <label for="helper-text" class="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Folder Name</label>
            <input v-model="model.folderName" type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Handle Users">
          </div>
          <div class="mt-2">
            <label for="message" class="block mb-2 text-sm text-gray-900 dark:text-white font-semibold">Description</label>
            <textarea v-model="model.folderDescription" id="message" rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Something that explain why this folder..."></textarea>
          </div>
          <button @click="submitNewFolder" type="button" class="mt-2 w-full justify-center text-white bg-green-800 hover:bg-green-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
              save changes
          </button>
        </div>

        <div class="mt-3" style="margin-top: 2rem">
          <ul class="p-0 m-0">
            <SingleFolder v-for="item in items.item" :key="item.name+Math.random().toString(16).slice(2)" :forlder="item" />
          </ul>
        </div>

        <div v-if="isEmpty(items) || isEmpty(items.item)" class="h-28"></div>
        <div v-if="isEmpty(items) || isEmpty(items.item)" class="flex grayscale flex-col items-center justify-center">
          <img class="w-32" src="../../assets/img/folders.png" alt="">
          <h4 class="mt-4 text-center inline-flex items-center mb-4 text-md font-semibold text-gray-500 dark:text-gray-400">
            Folders
          </h4>
        </div>
    </ul>
</template>
<script>
import { urlPushState, urlRemoveState } from "../../utils/UrlUtils";
import { useUserStore } from "../../stores/UserStore";
import { getInitials } from "../../utils/GeneralUtils";
import { useCollectionStore } from "../../stores/CollectionStore";
import { isEmpty } from "../../utils/GeneralUtils";

export default {
  components: {
    SingleFolder: () => import("../CollectionItems/SingleFolder.vue"),
  },
  data: () => ({
    items: {},
    model: { folderName: "", folderDescription: "" },
    isLoading: false,
    responseType: null,
    response: null,
    activeCollection: "",
    activeFile: "",
    user: useUserStore().get,
    getInitials,
    isEmpty,
  }),
  methods: {
    /**
     * Get all request that are not
     * in forlder on first iteration
     */
    passInitialUnFoldedRequest() {
      let requests = [];

      for (var key in this.items.item) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.items.item[key].hasOwnProperty("request")) {
          requests.push(this.items.item[key]);
        }
      }

      requests.length > 0
        ? this.$root.$emit("list_requests", {
            id: this.items.id,
            name: this.items.name,
            requests: requests,
          })
        : this.$root.$emit("list_requests", {});
    },

    /**
     * Open and close collection list dropdown
     */
    openDropDown(dropdownId) {
      const collections = document.getElementById(dropdownId);
      if (collections.classList.contains("hidden"))
        collections.classList.remove("hidden");
      else collections.classList.add("hidden");
    },

    openFolderCreator() {
      this.openDropDown("moreCollectionInfo");
      document.getElementById("folder-name-form").classList.remove("hidden");
    },

    closeFolderCreator() {
      document.getElementById("folder-name-form").classList.add("hidden");
    },

    submitNewFolder() {
      if (!isEmpty(this.model.folderName)) {
        document.getElementById("folder-name-form").classList.add("hidden");
        this.$root.$emit("new_folder", {
          alertMessage: `Submit new folder'`,
          data: {
            name: this.model.folderName,
            description: this.model.folderDescription,
            id: Math.random().toString(16).slice(2),
            item: [],
          },
          after: () => this.$root.$emit("refresh_collection"),
        });
      } else {
        this.$root.$emit("new_message", {
          responseType: "error",
          response: "Folder name required",
          hasResponse: true,
        });
      }
    },
  },
  async mounted() {
    /**
     * refresh collection on custom call
     */
    this.$root.$on("refresh_collections", async (collection) => {
      this.items = collection.file;
      this.activeCollection = collection;
      this.activeFile = collection.file.info;

      /**
       * reset window states
       */
      urlPushState("collection", this.activeCollection.$id);
      urlRemoveState("requests");
      urlRemoveState("request_tab");

      this.$root.$emit("list_requests", {});

      this.passInitialUnFoldedRequest();
      useCollectionStore().store(collection);
    });

    /**
     * autoload and set active collection during reload
     */
    this.$root.$on("autoload_collection", async (payload) => {
      // eslint-disable-next-line no-prototype-builtins
      payload.hasOwnProperty("before") && payload.before instanceof Function
        ? payload.before()
        : "";

      this.items = payload.collection.file;
      this.activeCollection = payload.collection;
      this.activeFile = payload.collection.file.info;

      this.passInitialUnFoldedRequest();
      useCollectionStore().store(payload.collection);

      // eslint-disable-next-line no-prototype-builtins
      payload.hasOwnProperty("after") && payload.after instanceof Function
        ? payload.after(this.activeCollection)
        : "";
    });
  },
};
</script>
