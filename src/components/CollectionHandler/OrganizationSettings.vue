<!-- eslint-disable prettier/prettier -->
<template>
    <!-- Main modal -->
    <div v-if="opened" id="authentication-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 bg-gray-50/75 flex items-center justify-center left-0 bottom-0 right-0 z-40 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-[15px] shadow dark:bg-gray-700">
                <button @click="closeSettings" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-4 text-md font-semibold text-gray-500 dark:text-white capitalize truncate">{{ organization.name }}</h3>
                    <hr class="h-px mt-8 mb-4 bg-gray-200 border-0 dark:bg-gray-700">
                    <div>
                        <input v-model="model.organization_name" type="text" name="organization" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Organization Name">
                    </div>
                    <hr class="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-700">

                    <div class="mt-4 mb-4">
                        <div class="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                            <span aria-hidden="true" class="text-xs bg-[#065F46] rounded-full text-white px-3 py-1.5 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                </svg>                              
                            </span> 
                            <span class="text-sm font-medium">
                                Members | invite new member
                            </span>
                        </div>
                    </div>

                    <form class="flex items-center mt-4">   
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <input @keyup="searchUsers($event.target.value)" autocomplete="false" type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users...">
                        </div>
                        <div v-if="!isEmpty(search_user_result)" class="w-full border mb-2 border-gray-100 rounded-b-[5px] bg-white px-3 py-2.5 shadow-sm shadow-shadow-200 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
                            <div v-for="user in search_user_result" :key="user.$id" class="border cursor-pointer border-gray-200 p-2 rounded-[10px] mt-3 relative hover:bg-gray-100 relative">
                                <div class="flex items-center space-x-4" @click="openRoleOptions(user.$id)">
                                    <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-deep-green-700 rounded-full dark:bg-gray-600">
                                        <span class="font-medium text-gray-100 dark:text-gray-300">{{ getInitials(user.name) }}</span>
                                    </div>
                                    <div class="font-medium dark:text-white">
                                        <div>{{ user.name }}</div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">
                                            <span>Invite Member</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="hidden" :id="'roles_'+user.$id">
                                    <div class="absolute z-10 w-full top-0 right-2 left-2 bottom-0 flex items-center justify-center">
                                        <a class="flex items-center justify-between px-2 w-full py-2 pr-4 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-[10px] dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Component requires Flowbite JavaScript">
                                            <select v-model="model.role" id="underline_select" class="ml-3 py-2 px-0 capitalize border-none text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                                <option selected>Pick a Role</option>
                                                <option v-for="(role, key) in roles" :key="role.$id" :value="role.$id" :selected="key == 0">{{ role.name }}</option>
                                            </select>
                                            <button @click="inviteUser(user)" type="button" class="text-white bg-[#0F766E] hover:bg-[#0F766E]/75 font-medium rounded-lg text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">invite</button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div v-if="!isEmpty(members)">
                        <div v-for="member in members" :key="member.$id" class="border border-gray-200 p-2 rounded-[10px] mt-3 relative">
                            <div class="flex items-center space-x-4">
                                <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-deep-green-700 rounded-full dark:bg-gray-600">
                                    <span class="font-medium text-gray-100 dark:text-gray-300">{{ getInitials(member.user.name) }}</span>
                                </div>
                                <div class="font-medium dark:text-white">
                                    <div class="capitalize">{{ member.user.name }}</div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">
                                        <span>{{ diffFromHuman(member.$createdAt) }}</span>
                                        <span class="mx-2 text-gray-400">/</span>
                                        <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Editor</span>
                                        <span v-if="!member.accepted" class="mx-2 text-gray-400">/</span>
                                        <span v-if="!member.accepted" class="bg-[#F472B6] text-gray-200 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Pending</span>
                                    </div>
                                </div>
                            </div>
                            <button @click="revokeOrgRoleFromMember(member)" type="button" class="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div v-else class="mt-3 flex items-center justify-center">
                        <span class="font-bold text-md text-gray-300">No Members Found</span>
                    </div>
                    <div v-if="loadingMembers" class="flex justify-center items-center">
                        <span class="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-indigo-600"></span>
                    </div>

                    <hr class="h-px mt-4 mb-5 bg-gray-200 border-0 dark:bg-gray-700">
                    <button @click="updateOrgName" type="submit" class="w-auto relative text-white bg-[#065F46] hover:bg-[#065F46]/75 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Save Change
                        <div v-if="savingChanges" class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
                            <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Query } from "appwrite";
import { appAPIConfigs, appWriteCollections } from "../../config/services";
import { AppwriteService } from "../../Services/AppwriteService";
import { tryCatch } from "../../Utils/GeneralUtls";
import axios from "axios";
import moment from "moment";
import { isEmpty, getInitials } from "../../Utils/GeneralUtls";
import { useUserStore } from "../../stores/UserStore";

export default {
  data() {
    return {
      organization: {},
      members: [],
      users: [],
      roles: [],
      search_user_result: [],
      search_query: "",
      model: {
        organization_name: "",
        role: "",
      },
      opened: false,
      database: AppwriteService().database(),
      user: useUserStore().get,
      loadingMembers: false,
      savingChanges: false,
      isEmpty,
      chosen_role: "",
      getInitials,
    };
  },
  watch: {
    organization: {
      handler(org) {
        this.model.organization_name = org.name;
      },
      immediate: true,
    },
  },
  methods: {
    closeSettings() {
      this.opened = false;
    },
    openRoleOptions(elementId) {
      document.getElementById(`roles_${elementId}`).classList.remove("hidden");
    },
    diffFromHuman(date) {
      return moment(date).fromNow();
    },
    async getMembers() {
      this.loadingMembers = true;
      this.members = [];

      tryCatch(() => {
        this.database.collection(
          appWriteCollections.organization_members_table
        );
        this.database
          .index([
            Query.equal("organization_id", [this.organization.$id]),
            Query.orderDesc("$createdAt"),
          ])
          .then(async (data) => {
            if (!isEmpty(data.documents)) {
              data.documents.forEach((value) => {
                axios(
                  `${import.meta.env.VITE_APPWRITE_CLIENT_ENDPOINT}/users/${
                    value.user_id
                  }`,
                  { headers: appAPIConfigs.headers }
                ).then((user) => {
                  this.members.push({ ...value, user: user.data });
                  this.loadingMembers = false;
                });
              });
            } else {
              this.loadingMembers = false;
            }
          })
          .catch(() => (this.loadingMembers = false));
      });
    },
    async getRoles() {
      this.roles = [];

      tryCatch(() => {
        this.database.collection(appWriteCollections.organization_roles_table);
        this.database.index().then(async (data) => {
          this.roles = data.documents;
        });
      });
    },
    async getUsers() {
      axios(`${import.meta.env.VITE_APPWRITE_CLIENT_ENDPOINT}/users`, {
        headers: appAPIConfigs.headers,
      }).then((user) => (this.users = user.data.users));
    },
    searchUsers(search) {
      if (!isEmpty(search)) {
        let authUser = this.user.$id;
        this.search_user_result = this.users.filter(function (user) {
          return user.name.includes(search) && user.$id !== authUser;
        });
      } else {
        this.search_user_result = [];
      }
    },
    inviteUser(user) {
      if (!isEmpty(this.model.role)) {
        tryCatch(() => {
          this.isLoading = true;
          this.$root.$emit("set_loader_on");

          this.database.collection(
            appWriteCollections.organization_members_table
          );

          this.database
            .index([Query.equal("organization_id", [this.organization.$id])])
            .then((data) => {
              let exist = data.documents.filter(
                (value) => value.user_id == user.$id
              );

              if (isEmpty(exist)) {
                this.database
                  .create({
                    user_id: user.$id,
                    organization_id: this.organization.$id,
                    role_id: this.model.role,
                    accepted: false,
                  })
                  .then(() => {
                    this.$root.$emit("new_message", {
                      responseType: "success",
                      response: "Invitation sent",
                      hasResponse: true,
                    });

                    document
                      .getElementById(`roles_${user.$id}`)
                      .classList.add("hidden");

                    this.getMembers();
                  });
              } else {
                this.$root.$emit("new_message", {
                  responseType: "error",
                  response: "User already invite",
                  hasResponse: true,
                });
              }
            });
        });
      } else {
        this.$root.$emit("new_message", {
          responseType: "error",
          response: "Select role to assign",
          hasResponse: true,
        });
      }
    },
    revokeOrgRoleFromMember(membership) {
      tryCatch(() => {
        this.loadingMembers = true;

        this.database.collection(
          appWriteCollections.organization_members_table
        );

        this.database
          .destroy(membership.$id)
          .then(() => {
            this.$root.$emit("new_message", {
              responseType: "success",
              response: "Membership Revoked",
              hasResponse: true,
            });

            this.loadingMembers = false;
            this.getMembers();
          })
          .catch(() => (this.loadingMembers = false));
      });
    },
    updateOrgName() {
      this.roles = [];
      this.savingChanges = true;

      tryCatch(() => {
        this.database.collection(appWriteCollections.organization_table);
        this.database
          .update(this.organization.$id, { name: this.model.organization_name })
          .then(() => {
            this.$root.$emit("new_message", {
              responseType: "success",
              response: "Changes saved",
              hasResponse: true,
            });

            this.savingChanges = false;
            window.location.reload();
          })
          .then(() => (this.savingChanges = false));
      });
    },
  },
  mounted() {
    this.$root.$on("open_org_settings", (org) => {
      this.organization = org;
      this.opened = true;
      this.getUsers();
      this.getRoles();
      this.getMembers();
    });
  },
};
</script>
