<!-- eslint-disable prettier/prettier -->
<template>
    <li class="cursor-pointer">
        <input
            id="custom_file"
            type="file"
            @change="onFileChange"
            style="display: none"
        />
        <a @click="importFile" class="border border-gray-200 flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-indigo-100 dark:hover:bg-gray-700">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Import Collection</span>
        </a>
    </li>
</template>
<script>
import { AppwriteService } from "../../Services/AppwriteService.js";
import { useUserStore } from "../../stores/UserStore";
import { randomId, slugify, tryCatch } from "../../Utils/GeneralUtls";
import { appWriteCollections } from "../../config/services";
import moment from "moment";

export default {
  data() {
    return {
      newCollection: {},
      model: { collection: "" },
      user: useUserStore().get,
      storage: AppwriteService().storage(),
      database: AppwriteService().database(),
    };
  },
  methods: {
    importFile() {
      document.getElementById("custom_file").click();
    },

    /**
     * listern to inputfile change
     * and keep image in data handler
     */
    onFileChange(e) {
      this.model.collection = e.target.files[0];
      this.submitCollection();
    },

    /**
     * Store and publish custom blog
     * then redirect back to dashboard
     */
    async submitCollection() {
      tryCatch(() => {
        this.$root.$emit("set_loader_on");

        const blob = new Blob([this.model.collection], {
          type: "application/json",
        });

        blob.text().then((data) => {
          const jsonData = JSON.parse(data);

          this.newCollection["info"] = jsonData.info;
          this.newCollection["event"] = jsonData.event;
          this.newCollection["auth"] = jsonData.auth;

          const items = this.recursiveMap(jsonData.item, (val) => ({
            ...val,
            id: Math.random().toString(16).slice(2),
            description: val?.description ? val.description : "",
          }));

          this.newCollection["item"] = items;

          const mappedBlob = new Blob([JSON.stringify(this.newCollection)], {
            type: "application/json",
          });

          const mappedFile = new File(
            [mappedBlob],
            "patienceman_" + randomId(10) + ".json",
            {
              type: mappedBlob.type,
            }
          );

          this.storage.store(mappedFile).then((collectionFile) => {
            const data = {
              user_id: this.user.$id,
              slug: slugify(randomId(10) + " " + this.user.name + "collection"),
              storage_file_id: collectionFile.$id,
              collection_url: collectionFile.name,
              published: false,
              published_at: moment(),
            };

            this.database.collection(appWriteCollections.collection_table);
            this.database.create(data).then((collection) => {
              this.$root.$emit("new_message", {
                responseType: "success",
                response: "File imported successfully",
                hasResponse: true,
              });

              this.$root.$emit("set_loader_off");
              this.$root.$emit("refresh_collections", {
                ...collection,
                file: this.newCollection,
                file_id: collectionFile.$id,
              });
            });
          });
        });
      });

      this.hasResponse = true;
    },

    /**
     * iterate over collection recusvely
     * If the value is an object, recursively call
     * the function with that object as the new argument
     */
    recursiveMap(obj, callback) {
      // eslint-disable-next-line no-unused-vars
      obj.forEach((value, key, array) => {
        // eslint-disable-next-line no-prototype-builtins
        if (value.hasOwnProperty("item")) {
          if (typeof value.item === "object") {
            obj[key] = {
              name: value.name,
              id: Math.random().toString(16).slice(2),
              item: this.recursiveMap(value.item, callback),
              description: value?.description ? value.description : "",
            };
          }
        } else {
          obj[key] = callback(value);
        }
      });

      return obj;
    },
  },
};
</script>
