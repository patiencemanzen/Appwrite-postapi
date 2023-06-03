<!-- eslint-disable prettier/prettier -->
<template>
    <div class="" v-if="auth && user && isDashboard">
        <!-- Breadcrumb -->
        <nav class="px-4 py-3 text-gray-700 border border-gray-200 sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <div class="g-padding items-center justify-between sm:flex">
                <ol class="inline-flex items-center mb-3 p-0 space-x-1 md:space-x-3 sm:mb-0">
                    <li>
                        <div class="flex items-center space-x-4">
                            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-deep-green-700 rounded-full dark:bg-gray-600">
                              <span class="font-medium text-gray-100 dark:text-gray-300">{{ stringIntials(user.name) }}</span>
                            </div>
                            <div class="font-medium dark:text-white truncate ... w-40">
                                <div class="text-left font-anek font-bold truncate capitalize">{{ user.name }}</div>
                                <div class="text-sm text-left font-anek text-gray-500 dark:text-gray-400 truncate">Joined {{ diffFromHuman(user.$createdAt) }}</div>
                            </div>
                        </div>
                    </li>
                </ol>
                <div>
                    <button @click="openCollectionsDrawer" data-dropdown-toggle="dropdown" class="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-100 bg-deep-green-900 rounded-lg hover:bg-deep-green-800 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700">
                        Manage Collections
                    </button>
                </div>
            </div>
        </nav>
    
        <!-- drawer component -->
        <div id="sidebar-collection-drawer" class="fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-[30vw] shadow-lg border border-gray-200 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
            <div class="flex items-center justify-center">
                <h3 id="drawer-right-label" class="mt-4 text-center inline-flex items-center mb-4 text-md font-semibold text-gray-500 dark:text-gray-400">
                    Manage Your Collections
                </h3>
            </div>
            <button @click="closeCollectionsDrawer" type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close menu</span>
            </button>
            <div class="border border-x-0 mt-4 border-t-0 border-gray-200"></div>
            <div class="flex items-center mt-4 justify-center">
                <input
                    id="custom_file"
                    type="file"
                    @change="onFileChange"
                    style="display: none"
                />
                <button @click="importFile" type="button" class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>                      
                    Import Collection
                </button>
                <button @click="openCollectionCreator" type="button" class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>                      
                    Create New Collection
                </button>
            </div>
            <div class="border border-x-0 border-b-0 border-gray-200 mt-4"></div>
            <div id="collection-form" class="collection-form mt-3 hidden">
                <label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Collection Name</label>
                <input type="text" v-model="model.collectionName" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example-API-Collection">
                <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your Collection until you publish it.</p>
                <button @click="submitNewCollection" type="button" class="mt-3 text-white bg-green-800 hover:bg-green-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                    create now
                </button>
            </div>
            <div class="border border-gray-200 mt-4 rounded-[10px] bg-clip-border bg-[#f5f7fe] shadow-3xl shadow-shadow-500 p-2 overflow-y-auto h-auto">
                <ul v-if="!isEmpty(collections)" class="p-0 m-0">
                    <li class="cursor-pointer mb-2" v-for="collection in collections" :key="collection.$id">
                        <a @click="loadCollection(collection)" class="hover:bg-gray-300 border border-gray-200 flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-50 dark:hover:bg-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                            </svg>
                            <span class="flex-1 ml-3 truncate">
                                {{ collection.file.info.name }}
                            </span>
                        </a>
                    </li>
                </ul>

                <div v-else class="flex items-center grayscale justify-center">
                  <img class="w-32" src="../../assets/img/folder.png" alt="">
                </div>

                <div v-if="isLoading" class="flex justify-center items-center">
                    <span class="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-indigo-600"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { AppwriteService } from "../../Services/AppwriteService.js";
import { useUserStore } from "../../stores/UserStore";
import {
  getInitials,
  randomId,
  slugify,
  tryCatch,
} from "../../Utils/GeneralUtls";
import { appWriteCollections } from "../../config/services";
import moment from "moment";
import { ID, Query } from "appwrite";
import { Auth } from "../../Services/Auth.js";
import { isEmpty } from "../../Utils/GeneralUtls";

export default {
  data() {
    return {
      auth: false,
      newCollection: {},
      model: { importedCollection: "", collectionName: "" },
      user: useUserStore().get,
      storage: AppwriteService().storage(),
      database: AppwriteService().database(),
      items: {},
      collections: {},
      isLoading: false,
      responseType: null,
      response: null,
      stringIntials: getInitials,
      uniqueString: ID,
      isEmpty,
    };
  },
  computed: {
    isDashboard() {
      return this.$route.name != "dashboard" ? false : true;
    },
  },
  methods: {
    /**
     * Convert date to human friendly date
     */
    diffFromHuman(date) {
      return moment(date).fromNow();
    },
    async getCollections() {
      this.isLoading = true;
      this.collections = [];

      tryCatch(() => {
        this.database.collection(appWriteCollections.collection_table);
        this.database
          .index([
            Query.equal("user_id", [this.user.$id]),
            Query.orderDesc("$createdAt"),
          ])
          .then(async (data) => {
            await data.documents.map(async (value) => {
              const file = this.storage.view(value.storage_file_id);

              fetch(file.href, {
                method: "GET",
                headers: {
                  "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_CLIENT_ID,
                  "Content-Type": "application/json",
                  "X-Appwrite-Key": import.meta.env.VITE_APPWRITE_API_KEY,
                },
              })
                .then((response) => response.json())
                .then((json) => {
                  // eslint-disable-next-line no-prototype-builtins
                  if (json.hasOwnProperty("code") && json.code == "404") false;
                  else
                    this.collections.push({
                      ...value,
                      file: json,
                      file_id: value.storage_file_id,
                    });
                });
            });
          });
      });

      this.isLoading = false;
    },
    /**
     * Activate active collection
     */
    loadCollection(collection) {
      this.$root.$emit("refresh_collections", collection);
    },
    openCollectionsDrawer() {
      document
        .getElementById("sidebar-collection-drawer")
        .classList.remove("translate-x-full");
    },

    closeCollectionsDrawer() {
      document
        .getElementById("sidebar-collection-drawer")
        .classList.add("translate-x-full");
    },

    importFile() {
      document.getElementById("custom_file").click();
    },

    openCollectionCreator() {
      document.getElementById("collection-form").classList.remove("hidden");
    },

    /**
     * listern to inputfile change
     * and keep image in data handler
     */
    onFileChange(e) {
      this.model.importedCollection = e.target.files[0];
      this.submitCollection();
    },

    /**
     * Store and publish custom blog
     * then redirect back to dashboard
     */
    async submitCollection() {
      tryCatch(() => {
        this.$root.$emit("set_loader_on");

        const blob = new Blob([this.model.importedCollection], {
          type: "application/json",
        });

        blob.text().then((data) => {
          const jsonData = JSON.parse(data);

          this.newCollection["info"] = jsonData.info;
          this.newCollection["event"] = jsonData.event;
          this.newCollection["auth"] = jsonData.auth;

          const items = this.recursiveMap(jsonData.item, (val) => ({
            ...val,
            id: Math.random().toString(16).slice(2),
            description: val?.description ? val.description : "",
          }));

          this.newCollection["item"] = items;

          const mappedBlob = new Blob([JSON.stringify(this.newCollection)], {
            type: "application/json",
          });

          const mappedFile = new File(
            [mappedBlob],
            "patienceman_" + randomId(10) + ".json",
            {
              type: mappedBlob.type,
            }
          );

          this.storage.store(mappedFile).then((collectionFile) => {
            const data = {
              user_id: this.user.$id,
              slug: slugify(randomId(10) + " " + this.user.name + "collection"),
              storage_file_id: collectionFile.$id,
              collection_url: collectionFile.name,
              published: false,
              published_at: moment(),
            };

            this.database.collection(appWriteCollections.collection_table);
            this.database.create(data).then((collection) => {
              this.$root.$emit("new_message", {
                responseType: "success",
                response: "File imported successfully",
                hasResponse: true,
              });

              this.$root.$emit("set_loader_off");
              this.$root.$emit("refresh_collections", {
                ...collection,
                file: this.newCollection,
                file_id: collectionFile.$id,
              });
            });
          });
        });
      });

      this.hasResponse = true;
    },

    /**
     * iterate over collection recusvely
     * If the value is an object, recursively call
     * the function with that object as the new argument
     */
    recursiveMap(obj, callback) {
      // eslint-disable-next-line no-unused-vars
      obj.forEach((value, key, array) => {
        // eslint-disable-next-line no-prototype-builtins
        if (value.hasOwnProperty("item")) {
          if (typeof value.item === "object") {
            obj[key] = {
              name: value.name,
              id: Math.random().toString(16).slice(2),
              item: this.recursiveMap(value.item, callback),
              description: value?.description ? value.description : "",
            };
          }
        } else {
          obj[key] = callback(value);
        }
      });

      return obj;
    },

    /**
     * Create new collection file
     */
    submitNewCollection() {
      tryCatch(() => {
        this.$root.$emit("set_loader_on");

        let fileData = {
          info: {
            name: this.model.collectionName,
          },
          item: [],
          auth: {},
          event: {},
        };

        const blob = new Blob([JSON.stringify(fileData)], {
          type: "application/json",
        });

        const newFile = new File(
          [blob],
          "patienceman_" + randomId(10) + ".json",
          {
            type: blob.type,
          }
        );

        this.storage.store(newFile).then((file) => {
          const data = {
            user_id: this.user.$id,
            slug: slugify(randomId(10) + " " + this.user.name + "collection"),
            storage_file_id: file.$id,
            collection_url: file.name,
            published: false,
            published_at: moment(),
          };

          this.database.collection(appWriteCollections.collection_table);
          this.database.create(data).then((collection) => {
            this.$root.$emit("new_message", {
              responseType: "success",
              response: "Collection created successfully",
              hasResponse: true,
            });

            this.$root.$emit("refresh_collections", {
              ...collection,
              file: fileData,
              file_id: file.$id,
            });

            this.$root.$emit("set_loader_off");
            this.$root.$emit("reload_collections");
          });
        });
      });

      this.hasResponse = true;
      document.getElementById("collection-form").classList.add("hidden");
    },
  },
  async mounted() {
    Auth()
      .user()
      .then(async (response) => {
        useUserStore().store(response);
        this.user = response;
        this.auth = true;
        await this.getCollections();
      })
      .catch(() => (this.auth = false));

    this.$root.$on(
      "reload_collections",
      async () => await this.getCollections()
    );
  },
};
</script>
