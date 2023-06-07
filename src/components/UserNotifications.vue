<!-- eslint-disable prettier/prettier -->
<template>
    <div v-if="isOpened" class="absolute top-10 right-10 border border-gray-200 z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-[10px] shadow dark:bg-gray-800 dark:divide-gray-700" aria-labelledby="dropdownNotificationButton">
        <div class="block px-4 py-2 font-bold text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
            Notifications
            <button @click="closeNotifications" type="button" data-drawer-hide="drawer-right-example" aria-controls="drawer-right-example" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close menu</span>
            </button>
        </div>
        <div v-if="!isEmpty(notifications)" class="divide-y divide-gray-100 dark:divide-gray-700">
          <a v-for="notification in notifications" :key="notification.$id" :href="notification.source" class="flex px-4 py-3 border border-x-0 border-t-0 border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <div class="w-full pl-3">
                <div class="text-gray-600 text-sm font-bold mb-1.5 dark:text-gray-400">{{ notification.subject }}</div>
                <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{{ notification.message }}</div>
                <div class="flex items-center">
                  <div class="text-sm font-semibold text-blue-400 dark:text-blue-500">{{ diffFromHuman(notification.$createdAt) }}</div>
                  <span class="mx-2 text-gray-400">/</span>
                  <span v-if="notification.type == 'success'" class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ notification.type }}</span>
                  <span v-if="notification.type == 'error'" class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{{ notification.type }}</span>
                </div>
            </div>
          </a>
        </div>
        <div v-if="isEmpty(notifications) && !isLoading" class="flex items-center grayscale justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-40 h-40 text-gray-300">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.964 8.964 0 002.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0118 9.75V9A6 6 0 006.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
          </svg>              
        </div>

        <div v-if="isLoading" class="flex justify-center items-center py-7">
          <span class="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-indigo-600"></span>
        </div>
    </div>
</template>
<script>
import { Query } from "appwrite";
import { appwriteCollections } from "../configs/services";
import { tryCatch, isEmpty, diffFromHuman } from "../utils/GeneralUtils";
import { useUserStore } from "../stores/UserStore";
import { AppwriteService } from "../resources/AppwriteService";

export default {
  data() {
    return {
      isOpened: false,
      notifications: [],
      isLoading: false,
      isEmpty,
      diffFromHuman,
      user: useUserStore().get,
      database: AppwriteService().database(),
    };
  },
  methods: {
    closeNotifications() {
      this.isOpened = false;
    },
    async getNotifications() {
      this.isLoading = true;
      this.notifications = [];

      tryCatch(() => {
        this.database.collection(appwriteCollections.notifications_table);
        this.database
          .index([
            Query.equal("user_id", [this.user.$id]),
            Query.orderDesc("$createdAt"),
          ])
          .then((notifications) => {
            this.notifications = notifications.documents;
            this.isLoading = false;
          })
          .catch(() => (this.isLoading = false));
      });
    },
  },
  mounted() {
    this.$root.$on("open_notifications", async () => {
      this.isOpened = true;
      await this.getNotifications();
    });
  },
};
</script>
