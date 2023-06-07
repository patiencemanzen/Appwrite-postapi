<!-- eslint-disable-next-line vue/valid-template-root -->
<template></template>
<script>
import { appwriteCollections } from "../../configs/services";
import { AppwriteService } from "../../resources/AppwriteService";
import { useUserStore } from "../../stores/UserStore";
import { tryCatch } from "../../utils/GeneralUtils";

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
    async reloadUrlCurrentState() {
      if (this.urlParams.has("org"))
        await this.loadOrganization(this.urlParams.get("org"));

      if (this.urlParams.has("project"))
        await this.loadProject(this.urlParams.get("project"));

      if (this.urlParams.has("collection"))
        await this.loadCollection(this.urlParams.get("collection"));
    },

    async loadOrganization(orgId) {
      tryCatch(() => {
        this.database.collection(appwriteCollections.organization_table);
        this.database.show(orgId).then(async (organization) => {
          this.$root.$emit("set_active_organization", {
            organization,
            shouldReload: false,
          });
        });
      });
    },

    async loadProject(projectId) {
      tryCatch(() => {
        this.database.collection(appwriteCollections.projects_table);
        this.database.show(projectId).then(async (project) => {
          this.$root.$emit("set_active_project", {
            project,
            shouldReload: false,
          });
        });
      });
    },

    async loadCollection(collectionId) {
      tryCatch(() => {
        this.database.collection(appwriteCollections.collection_table);
        this.database.show(collectionId).then(async (collection) => {
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
    },
  },

  async mounted() {
    await this.reloadUrlCurrentState();
  },
};
</script>
