<!-- eslint-disable prettier/prettier -->
<template>
    <div>
      <div @click="publishCollection" class="not-prose mb-16 mt-6 flex gap-3 fixed md:right-[4vw] md:top-[43vw] xsm:right-[2vw] xsm:bottom-[0vw] sm:right-[2vw] sm:bottom-[0vw] z-20">
        <a class="inline-flex gap-0.5 cursor-pointer justify-center items-center overflow-hidden text-md font-medium transition rounded-full bg-zinc-900 py-2 px-6 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300">
          Publish
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path>
          </svg>
        </a>
        <div v-if="isLoading">
          <div class="fixed top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-30 rounded-[10px] flex items-center justify-center">
              <span class="relative inset-0 inline-flex h-16 w-16 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-20 after:w-20 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { appwriteCollections } from "../../configs/services";
import { AppwriteService } from "../../resources/AppwriteService";
import { useCollectionStore } from "../../stores/CollectionStore";
import { useUserStore } from "../../stores/UserStore";
import { tryCatch } from "../../utils/GeneralUtils";
import moment from "moment";

export default {
  props: { collectionId: { required: true } },
  data: () => ({
    isLoading: false,
    user: useUserStore().get,
    collection: useCollectionStore().get,
    database: AppwriteService().database(),
  }),
  methods: {
    async publishCollection() {
      tryCatch(
        () => {
          this.isLoading = true;
          this.database.collection(appwriteCollections.collection_table);

          this.database
            .update(this.collection.$id, {
              published: true,
              published_at: moment(),
            })
            .then(() => {
              this.$root.$emit("new_message", {
                responseType: "success",
                response: "Collection published successfully",
                subject: "Published",
                source: "/",
                shouldSave: true,
              });

              this.isLoading = false;
            })
            .catch(() => (this.isLoading = false));
        },
        () => {
          this.isLoading = false;
          this.$root.$emit("new_message", {
            responseType: "error",
            response: "unable to publish collection",
          });
        }
      );
    },
  },
};
</script>
