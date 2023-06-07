<!-- eslint-disable prettier/prettier -->
<template>
  <div class="loop-section global-padding dark:bg-deep-green-800 pt-10">
    <div v-if="!isEmpty(collections)" class="loop-wrap">
      <div v-for="collection in collections" :key="collection.$id">
        <CollectionCard :collection="collection" />
      </div>
    </div>

    <div v-else class="loop-wrap text-gray-300 flex items-center justify-center p-10 w-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-56 h-56">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
      </svg>    
      <h3>No Public Collection Found</h3>  
    </div>
  </div>
</template>

<style>
@import "../assets/css/bash.css";
</style>

<script>
import { Query } from "appwrite";
import { appwriteCollections } from "../configs/services";
import { AppwriteService } from "../resources/AppwriteService";
import { useUserStore } from "../stores/UserStore";
import { tryCatch, isEmpty } from "../utils/GeneralUtils";

export default {
  components: {
    CollectionCard: () =>
      import("../components/PublicCollections/CollectionCard.vue"),
  },
  data: () => ({
    user: useUserStore().get,
    storage: AppwriteService().storage(),
    database: AppwriteService().database(),
    collections: {},
    isEmpty,
  }),
  mounted() {
    tryCatch(() => {
      this.database.collection(appwriteCollections.collection_table);
      this.collections = [];

      this.database
        .index([Query.orderAsc("$createdAt"), Query.equal("published", [true])])
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
              .then((json) =>
                this.collections.push({
                  ...value,
                  file: json,
                  file_id: value.storage_file_id,
                })
              );
          });
        });
    });
  },
};
</script>
