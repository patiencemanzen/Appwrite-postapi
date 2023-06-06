<!-- eslint-disable prettier/prettier -->
<template>
    <article class="item is-loop is-image" key="doc.id">
        <div class="item-image global-image global-image-orientation global-radius is-landscape bg-gray-300">
            <a :href="'/collection/'+preparedCollection.$id" class="global-link" :aria-label="collection_name"></a>
            <img src="https://images.unsplash.com/photo-1683349767621-21e880ef6bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                loading="lazy"
                :alt="collection_name"
                srcset="https://images.unsplash.com/photo-1683349767621-21e880ef6bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80 300w,
                        https://images.unsplash.com/photo-1683349767621-21e880ef6bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80 600w,
                        https://images.unsplash.com/photo-1683349767621-21e880ef6bb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80 1200w'"
                sizes="(max-width:480px) 300px, (max-width:768px) 600px, 1200px">
        </div>

        <div class="flex items-center space-x-4 px-[2rem] mt-4">
            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-deep-green-700 rounded-full dark:bg-gray-600">
              <span class="font-medium text-gray-100 dark:text-gray-300">{{ stringIntials(author.name) }}</span>
            </div>
            <div class="font-medium dark:text-white">
                <div>{{ author.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">Published {{ format(preparedCollection.published_at) }}</div>
            </div>
        </div>

        <div class="item-content">
            <h4 class="item-title" style="margin-top: 1.3rem">
                <a :href="'/collection/'+preparedCollection.$id" class="dark:text-gray-200">
                    {{ collection_name }}
                </a>
            </h4>
            <p class="item-excerpt dark:text-gray-200">{{ collection_desc }}</p>
            <div class="w-full" v-if="!collection_desc || collection_desc === ''">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            </div>
        </div>
    </article>
</template>
<script>
import moment from "moment";
import axios from "axios";
import { appAPIConfigs } from "../../config/services";
import { getInitials } from "../../Utils/GeneralUtls";

export default {
  props: {
    collection: { required: true },
  },
  data: () => ({
    preparedCollection: {},
    collection_name: "",
    collection_desc: null,
    author: {},
    stringIntials: getInitials,
  }),
  methods: {
    format(date) {
      return moment(date).fromNow();
    },
  },
  watch: {
    collection: {
      handler(newCollection) {
        if (newCollection && newCollection.file) {
          this.preparedCollection = newCollection;
          this.collection_desc =
            newCollection.file.info?.description !== undefined
              ? newCollection.file.info.description
              : null;
          this.collection_name = newCollection.file.info.name;
        }

        /**
         * If Collection loaded then get the author
         * and check if auth user is the owner
         */
        if (newCollection.user_id) {
          // eslint-disable-next-line prettier/prettier
          const getUser = axios(`${import.meta.env.VITE_APPWRITE_CLIENT_ENDPOINT}/users/${newCollection.user_id}`,
            { headers: appAPIConfigs.headers }
          );

          getUser.then((user) => (this.author = user.data));
        }
      },
      immediate: true,
    },
  },
};
</script>
