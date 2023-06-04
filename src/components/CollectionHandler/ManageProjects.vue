<!-- eslint-disable prettier/prettier -->
<template>
    <div v-if="isOpen" class="translate-x-0 fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform bg-white w-[30vw] shadow-lg border border-gray-200 dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-right-label">
        <div class="flex items-center justify-center">
            <h3 id="drawer-right-label" class="mt-4 text-center inline-flex items-center mb-4 text-md font-semibold text-gray-500 dark:text-gray-400">
                Manage Projects
            </h3>
        </div>
        <button @click="closeProjects()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close menu</span>
        </button>

        <div class="border border-x-0 mt-4 border-t-0 border-gray-200"></div>

        <div class="collection-form mt-3">
          <div class="mt-2">
            <label for="helper-text" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Project Name</label>
            <input type="text" v-model="model.projectName" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mentor App">
            <button @click="submitProject()" type="button" class="mt-3 text-white bg-green-800 hover:bg-green-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                create now
            </button>
          </div>
        </div>

        <div class="border border-gray-200 mt-4 rounded-[10px] bg-clip-border bg-[#f5f7fe] shadow-3xl shadow-shadow-500 p-2 overflow-y-auto h-auto">
          <ul v-if="!isEmpty(projects) && !isLoading" class="p-0 m-0 mt-3">
            <li class="cursor-pointer mb-2" v-for="project in projects" :key="project.$id">
                <a @click="setActiveProject(project, project.$id)" :id="project.$id" class="hover:bg-gray-300 border border-gray-200 flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-50 dark:hover:bg-gray-700">
                  
                  <div role="ctl-projects" :id="project.$id" :class="isActiveProject(project.$id) ? activeElement.active : activeElement.default">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>                    
                  </div>
                  
                  <span class="flex-1 ml-3 truncate">
                    {{ project.name }}
                  </span>
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
import { AppwriteService } from "../../Services/AppwriteService.js";
import { useUserStore } from "../../stores/UserStore";
import { tryCatch } from "../../Utils/GeneralUtls";
import { appWriteCollections } from "../../config/services";
import { Query } from "appwrite";
import { Auth } from "../../Services/Auth.js";
import { isEmpty } from "../../Utils/GeneralUtls";
import { useOrganizationStore } from "../../stores/OrganizationStore.js";
import { activeElement, colors } from "../../config/colors";

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

    isActiveProject(projectId) {
      if (this.urlParams.has("project"))
        return this.urlParams.get("project") == projectId;
      else return false;
    },

    setActiveProject(project, id) {
      this.$root.$emit("set_active_project", {
        project,
        shouldReload: true,
      });

      document.querySelectorAll('[role="ctl-projects"]').forEach((Element) => {
        Element.classList.remove(this.colors.Cyan);
        Element.classList.add(this.colors.Teal);
        Element.classList.remove("text-gray-100");
        Element.classList.add("text-gray-900");
      });

      document.getElementById(id).classList.remove(this.colors.Teal);
      document.getElementById(id).classList.add(this.colors.Cyan);
      document.getElementById(id).classList.add("text-gray-100");
      document.getElementById(id).classList.remove("text-gray-900");
    },

    async getProjects() {
      this.isLoading = true;

      this.database.collection(appWriteCollections.projects_table);
      this.database
        .index([
          Query.equal("organization_id", [this.organization.$id]),
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
      tryCatch(() => {
        this.isLoading = true;
        this.$root.$emit("set_loader_on");

        this.database.collection(appWriteCollections.projects_table);
        this.database
          .create({
            organization_id: this.activeOrganization.$id,
            name: this.model.projectName,
          })
          .then(() => {
            this.$root.$emit("new_message", {
              responseType: "success",
              response: "Project Created",
              hasResponse: true,
            });

            this.$root.$emit("set_loader_off");
            this.isLoading = false;
            this.$root.$emit("refresh_projects");
          })
          .catch(() => (this.isLoading = false));
      });
    },
  },
  async mounted() {
    Auth()
      .user()
      .then(async (response) => {
        useUserStore().store(response);
        this.user = response;
        this.auth = true;
      });

    this.$root.$on("refresh_projects", async () => {
      this.organization = useOrganizationStore().get;
      await this.getProjects();
    });

    this.$root.$on("open-projects", async () => {
      this.organization = useOrganizationStore().get;
      this.isOpen = true;
      await this.getProjects();
    });
  },
};
</script>
