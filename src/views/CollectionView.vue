<!-- eslint-disable prettier/prettier -->
<template>
    <div id="downloadable">
        <div class="section no-bottom-padding wf-section">
            <CollectionContentsCompiler :collection="loadedCollection" :owner="owner" :author="author" />
        </div>
    </div>
</template>

<style>
@import "../assets/css/documentation.css";
</style>

<script>
import { Query } from "appwrite";
import { appwriteCollections } from "../configs/services";
import { tryCatch } from "../utils/GeneralUtils";
import { useUserStore } from "../stores/UserStore";
import { AppwriteService } from "../resources/AppwriteService";
import { useCollectionStore } from "../stores/CollectionStore";

export default {
  data() {
    return {
      loadedCollection: {},
      user: useUserStore().get,
      storage: AppwriteService().storage(),
      database: AppwriteService().database(),
      owner: false,
      author: {},
    };
  },
  components: {
    CollectionContentsCompiler: () =>
      import("../components/Documentation/CollectionContentsCompiler.vue"),
  },
  watch: {
    loadedCollection: {
      handler(newCollection) {
        useCollectionStore().store(newCollection);
      },
      immediate: true,
    },
  },
  mounted() {
    const collectionId = this.$route.params.collection;
    this.$root.$emit("set_loader_on");

    tryCatch(() => {
      this.database.collection(appwriteCollections.collection_table);

      this.database
        .index([Query.equal("$id", [collectionId])])
        .then((collectionResponse) => {
          if (collectionResponse.documents) {
            this.database.show(collectionId).then(async (document) => {
              const file = this.storage.view(document.storage_file_id);

              const fetchFileUrl = await fetch(file.href, {
                method: "GET",
                headers: {
                  "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_CLIENT_ID,
                  "Content-Type": "application/json",
                  "X-Appwrite-Key": import.meta.env.VITE_APPWRITE_API_KEY,
                },
              });

              fetchFileUrl.json().then((json) => {
                this.loadedCollection = {
                  ...document,
                  file: json,
                  file_id: document.storage_file_id,
                };

                this.$root.$emit("set_loader_off");
              });
            });
          }
        });
    });
  },
};
</script>
