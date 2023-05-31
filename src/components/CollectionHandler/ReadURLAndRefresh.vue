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
            .then(async (document) => {
              const file = this.storage.view(document.storage_file_id);

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
                  this.$root.$emit("autoload_collection", {
                    before: () => this.$root.$emit("set_loader_on"),
                    collection: {
                      ...document,
                      file: json,
                      file_id: document.storage_file_id,
                    },
                    after: () => {
                      if (this.urlParams.has("requests")) {
                        document
                          .getElementById(this.urlParams.get("requests"))
                          .click();
                      }

                      this.$root.$emit("set_loader_off");
                    },
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
