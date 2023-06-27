<!-- eslint-disable prettier/prettier -->
<template>
    <div v-if="!isEmpty(invitations)" class="fixed bottom-0 flex justify-between w-full p-4 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 dark:bg-white/10">
        <div class="flex items-center mx-auto">
            <div class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
              <span class="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>                      
                  <span class="sr-only">Invitation</span>
              </span>
              <div v-if="isLoading" class="flex justify-center items-center">
                <span class="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-gray-300"></span>
              </div>
              <span>
                <span class="dark:text-white font-bold">{{ invitations[0].payload.message }}</span>
                <button v-if="!isLoading" @click="confurmInvitation(invitations[0].$id)" type="button" class="text-white ml-3 bg-[#115E59] hover:bg-[#115E59]/75 font-medium rounded text-sm px-5 py-1 dark:bg-green-600 cursor-pointer dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">confurm</button>
              </span>
            </div>
        </div>
        <div class="flex items-center">
            <button @click="rejectInvitation(invitations[0].$id)" data-dismiss-target="#sticky-banner" type="button" class="flex-shrink-0 inline-flex justify-center items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg aria-hidden="true" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close banner</span>
            </button>
        </div>
    </div>
</template>
<script>
import { Query } from "appwrite";
import { appwriteCollections } from "../configs/services";
import { tryCatch, isEmpty } from "../utils/GeneralUtils";
import { useUserStore } from "../stores/UserStore";
import { AppwriteService } from "../resources/AppwriteService";
import { storeToRefs } from "pinia";
import { Auth } from "../resources/AuthService";

export default {
  data() {
    return {
      invitations: [],
      isEmpty,
      database: AppwriteService().database(),
      isLoading: false,
      user: storeToRefs(useUserStore()),
    };
  },
  methods: {
    getInvitations() {
      this.invitations = [];

      tryCatch(
        () => {
          this.database.collection(appwriteCollections.invitations_table);
          this.database
            .index([
              Query.equal("reciever_id", [useUserStore().get.$id]),
              Query.orderDesc("$createdAt"),
            ])
            .then((data) => {
              data.documents.forEach((value) => {
                if (value.active_status) {
                  this.invitations.push(value);
                }
              });
            });
        },
        (error) => console.log(error)
      );
    },
    confurmInvitation(invitationId) {
      tryCatch(
        () => {
          this.isLoading = true;
          this.database.collection(appwriteCollections.invitations_table);
          this.database
            .update(invitationId, { active_status: false })
            .then(async () => {
              this.database.collection(
                appwriteCollections.organization_members_table
              );
              this.database
                .update(invitationId, { accepted: true })
                .then(async () => {
                  this.isLoading = false;
                  this.$root.$emit("new_message", {
                    responseType: "success",
                    response: "Invitation confurmed",
                  });

                  this.getInvitations();
                });
            });
        },
        () => (this.isLoading = false)
      );
    },
    rejectInvitation(invitationId) {
      tryCatch(
        () => {
          this.isLoading = true;
          this.database.collection(appwriteCollections.invitations_table);
          this.database.destroy(invitationId).then(async () => {
            this.isLoading = false;
            this.$root.$emit("new_message", {
              responseType: "success",
              response: "Invitation deleted",
            });

            this.getInvitations();
          });
        },
        () => (this.isLoading = false)
      );
    },
  },
  mounted() {
    Auth()
      .user()
      .then(() => this.getInvitations());
  },
};
</script>
