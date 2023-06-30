<!-- eslint-disable prettier/prettier -->
<template>
    <div class="flex relative">
      <div class="relative px-4 sm:px-6 lg:px-8 flex">

        <div>
          <TableOfContents
          :page_description="info.description"
          :page_title="info.name"
          :collection_items="items"
        /></div>

        <main class="py-20 md:px-10 md:w-[900px] md:h-[90vh] md:overflow-auto xsm:w-[95vw] xsm:overflow-x-hidden">
          <article v-if="!dynamicChange && isEmpty(dynamicContent)" class="prose dark:prose-invert">
            <div><PatternsVue /></div>

            <div class="flex items-center relative">
              <h1 class="text-4xl"> {{ data.name }} </h1>
              <div v-if="owner" @click="openEditor('_title_')" id="*_title_" class="cursor-pointer ml-3 h-10 inline-flex items-center justify-between px-1 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-white/5 dark:text-white">
                <span class="text-xs bg-white dark:bg-gray-900 dark:text-gray-200 rounded-full text-black px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </span>
              </div>
              <div v-if="owner" @click="openEditor('_desc_')" id="*_desc_" class="cursor-pointer ml-3 h-10 inline-flex items-center justify-between px-1 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-white/5 dark:text-white">
                <span class="text-xs bg-white dark:bg-gray-900 dark:text-gray-200 rounded-full text-black px-3 py-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </span>
              </div>
              <div class="hidden" id="#_title_">
                <div class="absolute -bottom-14 z-20 w-auto ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 rounded-[10px] bg-white dark:bg-[#17202e] px-3 py-2.5 shadow-md shadow-shadow-200 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
                    <div class="flex flex-grow items-center justify-between relative">
                        <div>
                          <input v-model="data.name" type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border-none ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-white/5  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title...">
                        </div>
                        <div class="ml-3">
                            <button @click="submitDocTitle" class="relative cursor-pointer inline-flex h-10 w-20 items-center justify-center rounded-lg border border-transparent text-white bg-gray-800 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                            </button>
                        </div>
                        <div class="ml-2">
                            <button @click="closeEditor('_title_')" class="relative cursor-pointer inline-flex h-10 w-20 items-center justify-center rounded-lg border border-transparent text-white bg-gray-400 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
  
                        <div :id="'*_title_spinner_'+uniqueIdentifier" class="hidden">
                            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
                                <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <div class="relative">
              <p class="lead"> {{data.description}} </p>
              <div class="hidden" id="#_desc_">
                <div class="absolute -bottom-48 z-20 w-auto ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 rounded-[10px] bg-white dark:bg-[#17202e] px-3 py-2.5 shadow-md shadow-shadow-200 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
                    <div class="flex-grow items-center justify-center relative">
                        <div>
                            <textarea v-model="data.description" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-none ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20  focus:ring-blue-500 focus:border-blue-500 dark:bg-white/5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                        </div>
                        <div class="flex justify-between mt-3">
                            <button @click="submitDocDesc" class="relative cursor-pointer inline-flex h-10 w-20 items-center justify-center rounded-lg border border-transparent text-white bg-gray-800 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                            </button>
                            <button @click="closeEditor('_desc_')" class="relative cursor-pointer inline-flex h-10 w-20 items-center justify-center rounded-lg border border-transparent text-white bg-gray-400 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div :id="'*_desc_spinner_'+uniqueIdentifier" class="hidden">
                            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
                                <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <div class="">
              <div class="post-author">Collected and Mantained</div>
              <div class="by-text"> by</div>
              <div class="post-author capitalize dark:text-emerald-400">
                {{ author.name }} 
              </div>
            </div>

            <div class="text-gray-500 dark:text-emerald-400 text-md font-bold" style="letter-spacing: 1">
              {{ format(collection.$createdAt) }}
            </div>

          </article>

          <div class="prose dark:prose-invert mt-12"><hr /></div>
          
          <div class="" v-if="dynamicChange && !isEmpty(dynamicContent)">
            <CollectionStructure
              :folder="dynamicContent"
              :owner="owner"
            />
          </div>
          <div class="" v-else>
            <CollectionStructure
              v-for="item in items"
              :key="slugify(item.name + id.unique())"
              :folder="item"
              :owner="owner"
            />
          </div>
        </main>
      </div>

      <!-- PUBLISH COLLECTION -->
      <div v-if="owner">
          <PublishCollection :collectionId="preparedCollection.id" />
      </div>
    </div>
</template>
<script>
import moment from "moment";
import { useCollectionStore } from "../../stores/CollectionStore";
import axios from "axios";
import {
  appwriteAuthHeader,
  appwriteCollections,
} from "../../configs/services";
import { useUserStore } from "../../stores/UserStore";
import { ID } from "appwrite";
import { slugify, isEmpty } from "../../utils/GeneralUtils";
import { AppwriteService } from "../../resources/AppwriteService";

export default {
  props: {
    collection: { required: true },
  },
  components: {
    TableOfContents: () => import("./TableOfContents.vue"),
    PublishCollection: () => import("./PublishCollection.vue"),
    CollectionStructure: () => import("./CollectionStructure.vue"),
    PatternsVue: () => import("../PatternsVue.vue"),
  },
  data: () => ({
    info: {},
    items: {},
    author: {},
    preparedCollection: {},
    uniqueIdentifier: Math.random().toString(16).slice(2),
    database: AppwriteService().database(),
    user: useUserStore().get,
    data: {
      name: "",
      description: "",
    },
    owner: false,
    isLoading: false,
    id: ID,
    slugify,
    isEmpty,
    dynamicChange: false,
    dynamicContent: [],
  }),
  methods: {
    /**
     * Format custom date
     */
    format(date) {
      return moment(date).format("MMMM Do YYYY");
    },

    /**
     * Single Folder Desc
     * editor opener
     */
    openEditor(folderId) {
      document.getElementById("#" + folderId).classList.remove("hidden");
      document.getElementById("*" + folderId).classList.add("d-none");
    },

    /**
     * Single Folder Desc
     * editor closer
     */
    closeEditor(folderId) {
      document.getElementById("#" + folderId).classList.add("hidden");
      document.getElementById("*" + folderId).classList.remove("d-none");
    },

    /**
     * Submit new changed title
     * and refresh the page
     */
    async submitDocTitle() {
      this.$root.$emit("save_collection_changes", {
        alertMessage: `Saving Collection title`,
        data: {
          id: this.uniqueIdentifier,
          name: this.data.name,
          section: "info.name",
        },
        after: () => this.$root.$emit("refresh_collection"),
      });
    },

    /**
     * Submit new changed description
     * and refresh the page
     */
    async submitDocDesc() {
      this.$root.$emit("save_collection_changes", {
        alertMessage: `Saving Collection Description`,
        data: {
          id: this.uniqueIdentifier,
          description: this.data.description,
          section: "info.description",
        },
        after: () => this.$root.$emit("refresh_collection"),
      });
    },

    openContent(content) {
      this.dynamicChange = true;
      this.dynamicContent = content;
    },
  },
  watch: {
    collection: {
      handler(newCollection) {
        if (newCollection && newCollection.file) {
          this.data.name =
            newCollection.file.info?.name !== undefined
              ? newCollection.file.info.name
              : "";
          this.data.description =
            newCollection.file.info?.description !== undefined
              ? newCollection.file.info.description
              : "";
          this.info = newCollection.file.info;
          this.items = newCollection.file.item;
        }

        useCollectionStore().store(newCollection);

        /**
         * If Collection loaded then get the author
         * and check if auth user is the owner
         */
        if (newCollection.project_id) {
          // Get project by ID
          this.database.collection(appwriteCollections.projects_table);
          this.database.show(newCollection.project_id).then((project) => {
            // Get organization by project ID
            this.database.collection(appwriteCollections.organization_table);
            this.database.show(project.organization_id).then((organization) => {
              // Get user by user_id from organization
              // eslint-disable-next-line prettier/prettier
              const getUser = axios(`${import.meta.env.VITE_APPWRITE_CLIENT_ENDPOINT}/users/${organization.user_id}`,
                { headers: appwriteAuthHeader.headers }
              );

              getUser.then((user) => {
                this.author = user.data;

                user.data.$id == useUserStore().get.$id
                  ? (this.owner = true)
                  : (this.owner = false);
              });
            });
          });
        }
      },
      immediate: true,
    },
  },
  async mounted() {
    this.$root.$on("new_dyno_content", (content) => this.openContent(content));

    /**
     * Listen to collection refresh request
     * and register updated collectiom
     */
    this.$root.$on("refresh_collection", () => {
      const collection = useCollectionStore().get;

      this.data.name =
        collection.file.info?.name !== undefined
          ? collection.file.info.name
          : "";

      this.data.description =
        collection.file.info?.description !== undefined
          ? collection.file.info.description
          : "";

      this.info = collection.file.info;
      this.items = collection.file.item;
    });
  },
};
</script>
