<!-- eslint-disable prettier/prettier -->
<template>
    <div class="" v-if="auth && user && isDashboard">

        <!-- Breadcrumb -->
        <nav class="px-4 py-3 text-gray-700 border border-gray-200 sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <div class="g-padding items-center justify-between sm:flex">
                <ol class="inline-flex items-center mb-3 p-0 space-x-1 md:space-x-3 sm:mb-0">
                    <li>
                        <div class="flex items-center space-x-4">
                            <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-deep-green-700 rounded-full dark:bg-gray-600">
                              <span class="font-medium text-gray-100 dark:text-gray-300">{{ getInitials(user.name) }}</span>
                            </div>
                            <div class="font-medium dark:text-white truncate ... w-40">
                                <div class="text-left font-anek font-bold truncate capitalize">{{ user.name }}</div>
                                <div class="text-sm text-left font-anek text-gray-500 dark:text-gray-400 truncate">Joined {{ diffFromHuman(user.$createdAt) }}</div>
                            </div>
                        </div>
                    </li>
                    <li v-if="!isEmpty(active_organization)" aria-current="page">
                      <div class="flex items-center">
                        <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <a href="#" class="ml-1 text-md font-semibold text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                          {{ active_organization.name }}
                        </a>
                      </div>
                    </li>
                    <li v-if="!isEmpty(active_project)" aria-current="page">
                      <div class="flex items-center">
                        <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <span class="mx-1 text-md font-semibold text-gray-500 md:mx-2 dark:text-gray-400">
                          {{ active_project.name }}
                        </span>
                      </div>
                    </li>
                </ol>
                <div>
                    <button @click="openOrganizations" class="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-100 bg-[#2a857d] rounded-lg hover:bg-deep-green-800 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                      </svg>                      
                      Organizations
                    </button>
                    
                    <span class="mx-2 text-gray-400">/</span>

                    <button @click="openProjects" class="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-100 bg-[#2c5385] rounded-lg hover:bg-deep-green-800 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                      </svg>                        
                      Projects
                    </button>

                    <span class="mx-2 text-gray-400">/</span>

                    <button @click="openCollections" class="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-100 bg-deep-green-900 rounded-lg hover:bg-deep-green-800 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                      </svg>
                      Collections
                    </button>
                </div>
            </div>
        </nav>

        <!-- Manage Organizations -->
        <div><ManageOrganizations /></div>

        <!-- Manage Projects -->
        <div><ManageProjects /></div>

        <!-- Manage Collections -->
        <div><ManageCollections /></div>

        <!-- Organization Settings -->
        <OrganizationSettings />
    </div>
</template>
<script>
import { useUserStore } from "../../stores/UserStore";
import { Auth } from "../../resources/AuthService.js";
import { isEmpty, diffFromHuman, getInitials } from "../../utils/GeneralUtils";
import { useOrganizationStore } from "../../stores/OrganizationStore";
import { useProjectStore } from "../../stores/ProjectStore";
import { urlPushState, urlRemoveState } from "../../utils/UrlUtils";

export default {
  data() {
    return {
      auth: false,
      user: useUserStore().get,
      isLoading: false,
      responseType: null,
      response: null,
      getInitials,
      isEmpty,
      diffFromHuman,
      active_organization: {},
      active_project: {},
    };
  },
  components: {
    ManageOrganizations: () => import("./ManageOrganizations.vue"),
    ManageProjects: () => import("./ManageProjects.vue"),
    ManageCollections: () => import("./ManageCollections.vue"),
    OrganizationSettings: () => import("./OrganizationSettings.vue"),
  },
  computed: {
    isDashboard() {
      return this.$route.name != "dashboard" ? false : true;
    },
  },
  methods: {
    openOrganizations() {
      this.$root.$emit("open-organizations");
    },
    openProjects() {
      this.$root.$emit("open-projects");
    },
    openCollections() {
      this.$root.$emit("open-collections");
    },
  },
  async mounted() {
    Auth()
      .user()
      .then(async (response) => {
        useUserStore().store(response);
        this.user = response;
        this.auth = true;
      })
      .catch(() => (this.auth = false));

    /**
     * Set active organization
     */
    this.$root.$on("set_active_organization", (payload) => {
      useOrganizationStore().store(payload.organization);

      let storageId = `ptman_on_org_${this.user.$id}`;
      let storageValue = JSON.stringify({
        user: this.user.$id,
        organization: payload.organization.$id,
      });

      localStorage.setItem(storageId, storageValue);

      if (payload.shouldReload) {
        // Update url states and reset the URL stack structure
        urlPushState("org", payload.organization.$id);
        urlRemoveState("project");
        urlRemoveState("collection");
        urlRemoveState("requests");
        urlRemoveState("request_tab");
      }

      this.active_organization = payload.organization;
      this.active_project = {};
    });

    /**
     * Set active project
     */
    this.$root.$on("set_active_project", (payload) => {
      useProjectStore().store(payload.project);

      let storageId = `ptman_on_proj_${payload.project.$id}`;
      let storageValue = JSON.stringify({
        user: this.user.$id,
        project: payload.project.$id,
      });

      localStorage.setItem(storageId, storageValue);

      if (payload.shouldReload) {
        // Update url states
        urlPushState("project", payload.project.$id);
      }

      this.active_project = payload.project;
    });
  },
};
</script>
