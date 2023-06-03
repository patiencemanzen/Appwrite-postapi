<!-- eslint-disable-next-line vue/valid-template-root -->
<template></template>
<script>
import { appWriteCollections } from "../../config/services";
import { AppwriteService } from "../../Services/AppwriteService";
import { useUserStore } from "../../stores/UserStore";
import { tryCatch } from "../../Utils/GeneralUtls";

export default {
  data() {
    return {
      urlParams: new URLSearchParams(window.location.search),
      user: useUserStore(),
      storage: AppwriteService().storage(),
      database: AppwriteService().database(),
    };
  },
  methods: {
    async loadCollection() {
      if (this.urlParams.has("collection")) {
        tryCatch(() => {
          this.database.collection(appWriteCollections.collection_table);
          this.database
            .show(this.urlParams.get("collection"))
            .then(async (collection) => {
              const file = this.storage.view(collection.storage_file_id);

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
                  let activeCollection = {
                    ...collection,
                    file: json,
                    file_id: collection.storage_file_id,
                  };

                  this.$root.$emit("autoload_collection", {
                    before: () => this.$root.$emit("set_loader_on"),
                    collection: activeCollection,
                    after: () => this.$root.$emit("set_loader_off"),
                  });
                });
            });
        });
      }
    },
  },
  async mounted() {
    this.loadCollection();
  },
};
</script>
