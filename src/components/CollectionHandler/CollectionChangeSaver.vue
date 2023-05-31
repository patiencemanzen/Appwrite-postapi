<!-- eslint-disable vue/valid-template-root -->
<template></template>
<script>
import { appWriteCollections } from "../../config/services";
import { AppwriteService } from "../../Services/AppwriteService";
import { useCollectionStore } from "../../stores/CollectionStore";
import { randomId, tryCatch } from "../../Utils/GeneralUtls";

export default {
  data() {
    return {
      storage: AppwriteService().storage(),
      database: AppwriteService().database(),
    };
  },
  methods: {
    /**
     * Submit newly changes to user collection
     *
     * @param {Object} data
     */
    async submitCollectionChanges(data) {
      tryCatch(() => {
        let collection = useCollectionStore().get;
        let collectionFile = collection.file;
        let newCollection = {};

        (data.section == "info.name") ? collectionFile.info.name = data.name
        : (data.section == "info.description") ? collectionFile.info.description = data.description
        : (collectionFile.hasOwnProperty("info")) ? newCollection.info = collectionFile.info
        : (collectionFile.hasOwnProperty("auth")) ? newCollection.auth = collectionFile.auth
        : (collectionFile.hasOwnProperty("event")) ? newCollection.event = collectionFile.event
        : (collectionFile.hasOwnProperty("item")) ? newCollection.item = collectionFile.item
        : false;

        if (data.section == "item") {
          let collectionItems = this.traverseThroughJSON(collectionFile.item, data.id, data);
          newCollection.item = collectionItems;
        }

        const blob = new Blob([JSON.stringify(newCollection)], {
          type: "application/json",
        });

        const file = new File([blob], "patienceman_" + randomId(10) + ".json", {
          type: blob.type,
        });

        // Create new file and update user collection document
        this.storage.store(file).then((collectionFile) => {
          const data = {
            storage_file_id: collectionFile.$id,
            collection_url: collectionFile.name,
          };

          this.database.collection(appWriteCollections.collection_table);
          this.database.update(collection.$id, data).then((response) => {
            this.storage.destroy(collection.file_id).then(() => {
              useCollectionStore().store({
                ...response,
                file: newCollection,
                file_id: collectionFile.$id,
              });

              this.$root.$emit("new_message", {
                responseType: "success",
                response: "File updated successfully",
                hasResponse: true,
              });
            });
          });
        });
      });
    },

    /**
     * Traverse and update json file based on search
     * and requested changes
     */
    traverseThroughJSON(collectionItems, search, changes) {
      for (var k in collectionItems) {
        if (
          typeof collectionItems[k] === "object" &&
          collectionItems[k] !== null
        ) {
          collectionItems[k] = this.traverseThroughJSON(
            collectionItems[k],
            search,
            changes
          );
        } else if (k == "id" && collectionItems[k] == search) {
          // eslint-disable-next-line no-prototype-builtins
          if (changes.hasOwnProperty("name")) {
            collectionItems["name"] = changes.name;
          }

          // eslint-disable-next-line no-prototype-builtins
          if (changes.hasOwnProperty("description")) {
            collectionItems["description"] = changes.description;
          }
        }
      }

      return collectionItems;
    },
  },
  mounted() {
    this.$root.$on("save_collection_changes", async (payload) => {
      // eslint-disable-next-line no-prototype-builtins
      payload.hasOwnProperty("before") && payload.before instanceof Function
        ? payload.before()
        : "";

      await this.submitCollectionChanges(payload.data);

      // eslint-disable-next-line no-prototype-builtins
      payload.hasOwnProperty("after") && payload.after instanceof Function
        ? payload.after()
        : "";
    });
  },
};
</script>
scrip
