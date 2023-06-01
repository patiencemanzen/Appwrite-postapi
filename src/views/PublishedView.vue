<!-- eslint-disable prettier/prettier -->
<template>
    <div class="loop-section global-padding dark:bg-deep-green-800 pt-10">
        <div class="loop-wrap">
            <div v-for="collection in collections" :key="collection.$id">
                <CollectionCard :collection="collection" />
            </div>
        </div>
    </div>
</template>
<style>
@import "../assets/css/bash.css";
</style>
<script>
import { Query } from "appwrite";
import { appWriteCollections } from "../config/services";
import { AppwriteService } from "../Services/AppwriteService";
import { useUserStore } from "../stores/UserStore";
import { tryCatch } from "../Utils/GeneralUtls";

export default {
  components: {
    CollectionCard: () => import("../components/Published/CollectionCard.vue"),
  },
  data: () => ({
    user: useUserStore().get,
    storage: AppwriteService().storage(),
    database: AppwriteService().database(),
    collections: {},
  }),
  mounted() {
    tryCatch(() => {
      this.database.collection(appWriteCollections.collection_table);
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
