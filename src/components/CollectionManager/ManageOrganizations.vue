<!-- eslint-disable prettier/prettier -->
<template>
    <div v-if="isOpen" class="translate-x-0 fixed top-5 right-5 bottom-5 rounded-2xl z-40 p-4 overflow-y-auto transition-transform bg-white w-[30vw] shadow-lg ring-1 ring-zinc-900/10 dark:bg-[#17202e] hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20">
        <div class="flex items-center gap-2.5 rounded-2xl border border-emerald-500/20 bg-[#2a857d]/10 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]">
          <svg viewBox="0 0 16 16" aria-hidden="true" class="mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200">
            <circle cx="8" cy="8" r="8" stroke-width="0"></circle>
            <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 7.75h1.5v3.5"></path>
            <circle cx="8" cy="4" r=".5" fill="none"></circle>
          </svg>
          <div class="[&amp;>:first-child]:mt-0 [&amp;>:last-child]:mb-0">
            <h1 class="font-bold text-2xl">Manage Organizations</h1>
          </div>
        </div>

        <button @click="closeOrganizations" class="text-gray-400 bg-gray-200 hover:bg-emerald-500 hover:text-gray-900 rounded-lg text-sm p-1 absolute top-3 right-4 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close menu</span>
        </button>

        <div class="collection-form mt-3">
            <label for="helper-text" class="block mb-2 text-md font-semibold text-gray-900 dark:text-white">Organization Name</label>
           <div class="flex">
              <div class="w-64">
                <input type="text" v-model="model.organizationName" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex: Google, Amazone, ..." />
              </div>
              <div @click="submitOrganization" class="inline-flex items-center gap-0.5 ml-2 justify-center overflow-hidden text-sm font-medium transition rounded-[10px] bg-[#055e6d] py-1 px-5 text-center text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300">
                <span>create</span>
              </div>
           </div>
        </div>
        <div class="ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 mt-4 rounded-[10px] bg-clip-border bg-[#f5f7fe] shadow-3xl shadow-shadow-500 p-2 overflow-y-auto h-auto dark:bg-white/5">
          <ul v-if="!isEmpty(organizations)" class="p-0 m-0">
            <li class="cursor-pointer mb-2" v-for="organization in organizations" :key="organization.$id">
              <a class="hover:bg-gray-100 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-50 dark:bg-white/5">
                
                <div @click="setActiveOrganization(organization, organization.$id)" role="ctl-organizations" :id="organization.$id" :class="isActiveOrganization(organization.$id) ? activeElement.active : activeElement.default">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                
                <span @click="setActiveOrganization(organization, organization.$id)" class="flex-1 ml-3 truncate font-semibold">
                  {{ organization.name }}
                </span>

                <svg @click="openOrgSettings(organization)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 text-gray-600 dark:text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg> 
              </a>
            </li>
          </ul>

          <div v-if="isEmpty(organizations) && !isLoading" class="flex items-center grayscale justify-center">
            <img class="w-32" src="../../assets/img/folder.png" alt="">
          </div>

          <div v-if="isLoading" class="flex justify-center items-center">
              <span class="inline-flex h-6 w-6 animate-spin rounded-full border-4 border-dotted border-indigo-600"></span>
          </div>
        </div>
    </div>
</template>
<script>
import { AppwriteService } from "../../resources/AppwriteService.js";
import { useUserStore } from "../../stores/UserStore";
import { tryCatch } from "../../utils/GeneralUtils";
import { appwriteCollections } from "../../configs/services";
import { Query } from "appwrite";
import { isEmpty } from "../../utils/GeneralUtils";
import { activeElement, colors } from "../../configs/colors";

export default {
  data() {
    return {
      isOpen: false,
      model: { organizationName: "" },
      user: useUserStore().get,
      storage: AppwriteService().storage(),
      database: AppwriteService().database(),
      organizations: {},
      isLoading: false,
      urlParams: new URLSearchParams(window.location.search),
      activeElement,
      colors,
      isEmpty,
    };
  },
  methods: {
    isActiveOrganization(organizationId) {
      if (this.urlParams.has("org"))
        return this.urlParams.get("org") == organizationId;
      else return false;
    },

    setActiveOrganization(organization, id) {
      this.$root.$emit("set_active_organization", {
        organization,
        shouldReload: true,
      });

      /**
       * reset the colors of organization
       */
      document
        .querySelectorAll('[role="ctl-organizations"]')
        .forEach((Element) => {
          Element.classList.remove(this.colors.bg_cyan);
          Element.classList.add(this.colors.bg_teal);
          Element.classList.remove("text-gray-100");
          Element.classList.add("text-gray-900");
        });

      /**
       * Add proper color to active organization
       */
      document.getElementById(id).classList.remove(this.colors.bg_teal);
      document.getElementById(id).classList.add(this.colors.bg_cyan);
      document.getElementById(id).classList.add("text-gray-100");
      document.getElementById(id).classList.remove("text-gray-900");
    },

    closeOrganizations() {
      this.isOpen = false;
    },

    async getOrganizations() {
      this.isLoading = true;
      this.organizations = [];

      tryCatch(
        () => {
          this.database.collection(appwriteCollections.organization_table);
          this.database
            .index([
              Query.equal("user_id", [this.user.$id]),
              Query.orderDesc("$createdAt"),
            ])
            .then(async (data) => {
              this.organizations = data.documents;
              this.isLoading = false;
            })
            .catch(() => (this.isLoading = false));
        },
        () => (this.isLoading = false)
      );
    },

    /**
     * Store and publish custom blog
     * then redirect back to dashboard
     */
    async submitOrganization() {
      if (!isEmpty(this.model.organizationName)) {
        tryCatch(
          () => {
            this.isLoading = true;
            this.$root.$emit("set_loader_on");

            this.database.collection(appwriteCollections.organization_table);
            this.database
              .create({
                name: this.model.organizationName,
                user_id: this.user.$id,
              })
              .then(() => {
                this.$root.$emit("new_message", {
                  responseType: "success",
                  response: "Organization Created",
                  subject: "New organization",
                  source: "/",
                  shouldSave: true,
                });

                this.$root.$emit("set_loader_off");
                this.isLoading = false;
                this.$root.$emit("reload_organizations");
              });
          },
          () => {
            this.isLoading = false;
            this.$root.$emit("new_message", {
              responseType: "error",
              response: "Unable to create new organization",
            });
          }
        );
      } else {
        this.$root.$emit("new_message", {
          responseType: "error",
          response: "Organization name required",
          subject: "Required field",
          source: "/",
        });
      }
    },

    /**
     * Open organization settings model
     */
    openOrgSettings(organization) {
      this.$root.$emit("open_org_settings", organization);
    },
  },
  async mounted() {
    this.$root.$on("reload_organizations", () => this.getOrganizations());

    this.$root.$on("open-organizations", () => {
      this.isOpen = true;
      this.getOrganizations();
    });
  },
};
</script>
