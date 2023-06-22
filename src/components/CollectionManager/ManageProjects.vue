<!-- eslint-disable prettier/prettier -->
<template>
    <div v-if="isOpen" class="translate-x-0 fixed top-5 right-5 bottom-5 rounded-2xl z-40 p-4 overflow-y-auto transition-transform bg-white w-[30vw] shadow-lg ring-1 ring-zinc-900/10 dark:bg-[#17202e] hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20">
        <div class="flex items-center gap-2.5 rounded-2xl border border-emerald-500/20 bg-[#2c5385]/10 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]">
          <svg viewBox="0 0 16 16" aria-hidden="true" class="mt-1 h-4 w-4 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200">
            <circle cx="8" cy="8" r="8" stroke-width="0"></circle>
            <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 7.75h1.5v3.5"></path>
            <circle cx="8" cy="4" r=".5" fill="none"></circle>
          </svg>
          <div class="[&amp;>:first-child]:mt-0 [&amp;>:last-child]:mb-0">
            <h1 class="font-bold text-2xl">Manage Projects</h1>
          </div>
        </div>

        <button @click="closeProjects" class="text-gray-400 bg-gray-200 hover:bg-emerald-500 hover:text-gray-900 rounded-lg text-sm p-1 absolute top-3 right-4 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close menu</span>
        </button>

        <div class="collection-form mt-3">
            <label for="helper-text" class="block mb-2 text-md font-semibold text-gray-900 dark:text-white">Project Name</label>
           <div class="flex">
              <div class="w-64">
                <input type="text" v-model="model.projectName" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex: Generative AI, Postapi, ..." />
              </div>
              <div @click="submitProject()" class="inline-flex items-center gap-0.5 ml-2 justify-center overflow-hidden text-sm font-medium transition rounded-[10px] bg-[#2c5385] py-1 px-5 text-center text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300">
                <span>create</span>
              </div>
           </div>
        </div>

        <div class="ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 mt-4 rounded-[10px] bg-clip-border bg-[#f5f7fe] shadow-3xl shadow-shadow-500 p-2 overflow-y-auto h-auto dark:bg-white/5">
          <ul v-if="!isEmpty(projects) && !isLoading" class="p-0 m-0 mt-3">
            <li class="cursor-pointer mb-2" v-for="project in projects" :key="project.$id">
              <a @click="setActiveProject(project, project.$id)" class="hover:bg-gray-100 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-50 dark:hover:bg-gray-700 dark:bg-white/5">
                  
                <div role="ctl-projects" :id="project.$id" :class="isActiveProject(project.$id) ? activeElement.active : activeElement.default">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>                    
                </div>
                  
                <span class="flex-1 ml-3 truncate"> {{ project.name }} </span>
              </a>
            </li>
          </ul>
  
          <div v-if="isEmpty(projects) && !isLoading" class="flex items-center grayscale justify-center">
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
import { useOrganizationStore } from "../../stores/OrganizationStore.js";
import { activeElement, colors } from "../../configs/colors";

export default {
  data() {
    return {
      isOpen: false,
      user: useUserStore().get,
      storage: AppwriteService().storage(),
      database: AppwriteService().database(),
      urlParams: new URLSearchParams(window.location.search),
      model: { projectName: "" },
      activeOrganization: {},
      projects: {},
      isEmpty,
      isLoading: false,
      activeElement,
      colors,
    };
  },
  methods: {
    closeProjects() {
      this.isOpen = false;
    },

    /**
     * Check if given project ID is active in URL
     */
    isActiveProject(projectId) {
      if (this.urlParams.has("project"))
        return this.urlParams.get("project") == projectId;
      else return false;
    },

    /**
     * Set active project in URL
     * and mark project with active colors
     */
    setActiveProject(project, id) {
      this.$root.$emit("set_active_project", {
        project,
        shouldReload: true,
      });

      document.querySelectorAll('[role="ctl-projects"]').forEach((Element) => {
        Element.classList.remove(this.colors.bg_cyan);
        Element.classList.add(this.colors.bg_teal);
        Element.classList.remove("text-gray-100");
        Element.classList.add("text-gray-900");
      });

      document.getElementById(id).classList.remove(this.colors.bg_teal);
      document.getElementById(id).classList.add(this.colors.bg_cyan);
      document.getElementById(id).classList.add("text-gray-100");
      document.getElementById(id).classList.remove("text-gray-900");
    },

    async getProjects() {
      this.isLoading = true;

      this.database.collection(appwriteCollections.projects_table);
      this.database
        .index([
          Query.equal("organization_id", [this.activeOrganization.$id]),
          Query.orderDesc("$createdAt"),
        ])
        .then((data) => {
          this.isLoading = false;
          this.projects = data.documents;
        })
        .catch(() => (this.isLoading = true));
    },

    /**
     * Store and publish custom blog
     * then redirect back to dashboard
     */
    async submitProject() {
      if (this.isEmpty(this.activeOrganization)) {
        this.$root.$emit("new_message", {
          responseType: "error",
          response: "Set active organization and try again",
        });
      } else {
        if (!isEmpty(this.model.projectName)) {
          tryCatch(
            () => {
              this.isLoading = true;
              this.$root.$emit("set_loader_on");

              this.database.collection(appwriteCollections.projects_table);
              this.database
                .create({
                  organization_id: this.activeOrganization.$id,
                  name: this.model.projectName,
                })
                .then(() => {
                  this.$root.$emit("new_message", {
                    responseType: "success",
                    response: "Project Created",
                    subject: "New Project",
                    source: "/",
                    shouldSave: true,
                  });

                  this.$root.$emit("set_loader_off");
                  this.isLoading = false;
                  this.$root.$emit("refresh_projects");
                })
                .catch(() => {
                  this.isLoading = false;
                  this.$root.$emit("set_loader_off");
                  this.$root.$emit("new_message", {
                    responseType: "error",
                    response: "Unable to create new project",
                  });
                });
            },
            () => {
              this.isLoading = false;
              this.$root.$emit("set_loader_off");
              this.$root.$emit("new_message", {
                responseType: "error",
                response: "Unable to create new project",
              });
            }
          );
        } else {
          this.$root.$emit("new_message", {
            responseType: "error",
            response: "Project name is required",
          });
        }
      }
    },
  },
  async mounted() {
    /**
     * Listen to refresh-project request and refetch all project
     * associated to active organization and set active
     */
    this.$root.$on("refresh_projects", async () => {
      this.activeOrganization = useOrganizationStore().get;
      await this.getProjects();
    });

    /**
     * Listen to open-project request and fetch all project
     * associated to active organization
     */
    this.$root.$on("open-projects", async () => {
      this.activeOrganization = useOrganizationStore().get;
      this.isOpen = true;
      await this.getProjects();
    });
  },
};
</script>
