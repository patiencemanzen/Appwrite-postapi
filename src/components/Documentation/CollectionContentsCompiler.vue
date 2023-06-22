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

        <main class=" py-20 px-10 w-[900px] h-[90vh] overflow-auto">
          <article v-if="!dynamicChange && isEmpty(dynamicContent)" class="prose dark:prose-invert">
            <div><PatternsVue /></div>

            <h1 class="text-4xl"> {{ data.name }} </h1>
            <p class="lead"> {{data.description}} </p>

            <div class="not-prose mb-16 mt-6 flex gap-3">
              <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300" href="/quickstart">
                Publish
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path>
                </svg>
              </a>
            </div>
          </article>
          
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

                user.data.$id == this.user.$id
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
