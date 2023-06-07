<!-- eslint-disable prettier/prettier -->
<template>
    <div v-if="!isEmpty(invitations)" class="flex justify-between w-full p-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div class="flex items-center mx-auto">
            <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                <span class="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>                      
                    <span class="sr-only">Invitation</span>
                </span>
                <span>
                    {{ invitations[0].payload.message }}
                    <button @click="confurmInvitation(invitations[0].payload)" type="button" class="text-white ml-3 bg-[#115E59] hover:bg-[#115E59]/75 font-medium rounded-[10px] text-sm px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">confurm</button>
                </span>
            </p>
        </div>
        <div class="flex items-center">
            <button data-dismiss-target="#sticky-banner" type="button" class="flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close banner</span>
            </button>
        </div>
    </div>
</template>
<script>
import { Query } from "appwrite";
import { appWriteCollections } from "../config/services";
import { tryCatch, isEmpty } from "../Utils/GeneralUtls";
import { useUserStore } from "../stores/UserStore";

export default {
  data() {
    return {
      invitations: [],
      user: useUserStore().get,
      isEmpty,
    };
  },
  methods: {
    async getInvitations() {
      this.invitations = [];

      tryCatch(() => {
        this.database.collection(appWriteCollections.invitations_table);
        this.database
          .index([
            Query.equal("sender_id", [this.user.$id]),
            Query.orderDesc("$createdAt"),
          ])
          .then((data) => {
            data.documents.forEach((value) => {
              if (value.active_status) {
                this.invitations.push(value);
              }
            });
          });
      });
    },
    confurmInvitation(invitationId) {
      tryCatch(() => {
        this.database.collection(appWriteCollections.invitations_table);
        this.database
          .update(invitationId, { active_status: false })
          .then(async () => {
            this.$root.$emit("new_message", {
              responseType: "success",
              response: "Invitation confurmed",
            });
          });
      });
    },
  },
  mounted() {
    this.getInvitations();
  },
};
</script>
