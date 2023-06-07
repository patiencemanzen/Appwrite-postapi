<!-- eslint-disable prettier/prettier -->
<template>
    <!-- drawer component -->
    <div v-if="isOpen" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-0 bg-white w-[30vw] shadow-lg border border-gray-200 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
        <div class="flex items-center justify-center">
            <h3 id="drawer-right-label" class="mt-4 text-center inline-flex items-center mb-4 text-md font-semibold text-gray-500 dark:text-gray-400">
                Manage Your Collections
            </h3>
        </div>
        <button @click="closeCollections" type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
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
          <div>
            <label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Collection Name</label>
            <input type="text" v-model="model.collectionName" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Example-API-Collection">
            <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your Collection until you publish it.</p>
          </div>
          <button @click="submitNewCollection" type="button" class="mt-3 text-white bg-green-800 hover:bg-green-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
              create now
          </button>
        </div>

        <div class="border border-gray-200 mt-4 rounded-[10px] bg-clip-border bg-[#f5f7fe] shadow-3xl shadow-shadow-500 p-2 overflow-y-auto h-auto">
            <ul v-if="!isEmpty(collections) && !isLoading" class="p-0 m-0">
                <li class="cursor-pointer mb-2" v-for="collection in collections" :key="collection.$id">
                    <a @click="loadCollection(collection, collection.$id)" class="hover:bg-gray-300 border border-gray-200 flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-50 dark:hover:bg-gray-700">
                      
                      <div role="ctl-collection" :id="collection.$id" :class="isActiveCollection(collection.$id) ? activeElement.active : activeElement.default">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>                                           
                      </div>
                      <span class="flex-1 ml-3 truncate">
                        {{ collection.file.info.name }}
                      </span>

                    </a>
                </li>
            </ul>

            <div v-if="isEmpty(collections) && !isLoading" class="flex items-center grayscale justify-center">
                <img class="w-32" src="../../assets/img/folder.png" alt="">
            </div>

            <div v-if="isLoading" class="flex justify-center items-center">
                <span class="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-indigo-600"></span>
            </div>
        </div>
    </div>
</template>
<script>
import { AppwriteService } from "../../resources/AppwriteService.js";
import { useUserStore } from "../../stores/UserStore";
import { randomId, slugify, tryCatch } from "../../utils/GeneralUtils";
import { appwriteCollections } from "../../configs/services";
import { Query } from "appwrite";
import { Auth } from "../../resources/AuthService.js";
import { isEmpty } from "../../utils/GeneralUtils";
import { useProjectStore } from "../../stores/ProjectStore.js";
import { activeElement, colors } from "../../configs/colors";
import moment from "moment";

export default {
  data() {
    return {
      isOpen: false,
      auth: false,
      newCollection: {},
      model: { importedCollection: "", collectionName: "" },
      user: useUserStore().get,
      storage: AppwriteService().storage(),
      database: AppwriteService().database(),
      items: {},
      collections: {},
      isLoading: false,
      isEmpty,
      activeProject: {},
      urlParams: new URLSearchParams(window.location.search),
      activeElement,
      colors,
    };
  },
  methods: {
    closeCollections() {
      this.isOpen = false;
    },

    isActiveCollection(collectionId) {
      if (this.urlParams.has("collection"))
        return this.urlParams.get("collection") == collectionId;
      else return false;
    },

    async getCollections() {
      this.isLoading = true;
      this.collections = [];

      tryCatch(() => {
        this.database.collection(appwriteCollections.collection_table);
        this.database
          .index([
            Query.equal("project_id", [this.activeProject.$id]),
            Query.orderDesc("$createdAt"),
          ])
          .then(async (data) => {
            if (!this.isEmpty(data.documents)) {
              await data.documents.map(async (value) => {
                const file = this.storage.view(value.storage_file_id);

                fetch(file.href, {
                  method: "GET",
                  headers: {
                    "X-Appwrite-Project": import.meta.env
                      .VITE_APPWRITE_CLIENT_ID,
                    "Content-Type": "application/json",
                    "X-Appwrite-Key": import.meta.env.VITE_APPWRITE_API_KEY,
                  },
                })
                  .then((response) => response.json())
                  .then((json) => {
                    // eslint-disable-next-line no-prototype-builtins
                    if (json.hasOwnProperty("code") && json.code == "404")
                      false;
                    else
                      this.collections.push({
                        ...value,
                        file: json,
                        file_id: value.storage_file_id,
                      });

                    this.isLoading = false;
                  })
                  .catch(() => (this.isLoading = false));
              });
            } else {
              this.isLoading = false;
            }
          })
          .catch(() => (this.isLoading = false));
      });
    },

    /**
     * Activate active collection
     */
    loadCollection(collection, id) {
      this.$root.$emit("refresh_collections", collection);

      /**
       * reset the colors of organization
       */
      document
        .querySelectorAll('[role="ctl-collection"]')
        .forEach((Element) => {
          Element.classList.remove(this.colors.bg_cyan);
          Element.classList.add(this.colors.bg_teal);
          Element.classList.remove("text-gray-100");
          Element.classList.add("text-gray-900");
        });

      /**
       * Add proper color to active organization
       */
      document.getElementById(id).classList.remove(this.colors.bg_teal);
      document.getElementById(id).classList.add(this.colors.bg_cyan);
      document.getElementById(id).classList.add("text-gray-100");
      document.getElementById(id).classList.remove("text-gray-900");
    },

    importFile() {
      if (this.isEmpty(this.activeProject)) {
        this.$root.$emit("new_message", {
          responseType: "error",
          response: "Set Active Project and Try again",
          hasResponse: true,
          subject: "Active project",
          source: "/",
        });
      } else {
        document.getElementById("custom_file").click();
      }
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
      this.submitImportedCollection();
    },

    /**
     * Store imported custom collection
     */
    async submitImportedCollection() {
      tryCatch(
        () => {
          this.isLoading = true;
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

            this.storage
              .store(mappedFile)
              .then((collectionFile) => {
                const data = {
                  project_id: this.activeProject.$id,
                  slug: slugify(
                    randomId(10) + " " + this.user.name + "collection"
                  ),
                  storage_file_id: collectionFile.$id,
                  collection_url: collectionFile.name,
                  published: false,
                  published_at: moment(),
                };

                this.database.collection(appwriteCollections.collection_table);
                this.database.create(data).then((collection) => {
                  this.$root.$emit("new_message", {
                    responseType: "success",
                    response: "File imported successfully",
                    hasResponse: true,
                    subject: "Import File",
                    source: "/",
                    shouldSave: true,
                  });

                  this.$root.$emit("set_loader_off");
                  this.isLoading = false;
                  this.$root.$emit("refresh_collections", {
                    ...collection,
                    file: this.newCollection,
                    file_id: collectionFile.$id,
                  });
                });
              })
              .catch(() => (this.isLoading = false));
          });
        },
        () => {
          this.isLoading = false;
          this.$root.$emit("new_message", {
            responseType: "error",
            response: "unable to import file",
            hasResponse: true,
          });
        }
      );
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
      if (this.isEmpty(this.activeProject)) {
        this.$root.$emit("new_message", {
          responseType: "error",
          response: "Set Active Project and Try again",
          hasResponse: true,
          subject: "Active project",
          source: "/",
        });
      } else {
        if (!isEmpty(this.model.collectionName)) {
          tryCatch(
            () => {
              this.isLoading = true;
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

              this.storage
                .store(newFile)
                .then((file) => {
                  const data = {
                    project_id: this.activeProject.$id,
                    slug: slugify(
                      randomId(10) + " " + this.user.name + "collection"
                    ),
                    storage_file_id: file.$id,
                    collection_url: file.name,
                    published: false,
                    published_at: moment(),
                  };

                  this.database.collection(
                    appwriteCollections.collection_table
                  );
                  this.database.create(data).then((collection) => {
                    this.$root.$emit("new_message", {
                      responseType: "success",
                      response: "Collection created successfully",
                      hasResponse: true,
                      subject: "New collection",
                      source: "/",
                      shouldSave: true,
                    });

                    this.$root.$emit("refresh_collections", {
                      ...collection,
                      file: fileData,
                      file_id: file.$id,
                    });

                    this.$root.$emit("set_loader_off");
                    this.isLoading = false;
                    this.$root.$emit("reload_collections");
                  });
                })
                .catch(() => (this.isLoading = false));
            },
            () => {
              this.isLoading = false;
              this.$root.$emit("new_message", {
                responseType: "error",
                response: "unable to create collection",
                hasResponse: true,
              });
            }
          );

          document.getElementById("collection-form").classList.add("hidden");
        } else {
          this.$root.$emit("new_message", {
            responseType: "error",
            response: "Collection name is required",
            hasResponse: true,
          });
        }
      }
    },
  },

  async mounted() {
    Auth()
      .user()
      .then(async (response) => {
        useUserStore().store(response);
        this.user = response;
        this.auth = true;
      })
      .catch(() => (this.auth = false));

    this.$root.$on("reload_collections", async () => {
      this.activeProject = useProjectStore().get;
      await this.getCollections();
    });

    this.$root.$on("open-collections", async () => {
      this.activeProject = useProjectStore().get;
      this.isOpen = true;
      await this.getCollections();
    });
  },
};
</script>
