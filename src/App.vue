<!-- eslint-disable prettier/prettier -->
<template>
  <div id="app">
    <!-- Global messages alert -->
    <div><PublicAlert /></div>

    <!-- Screen Wide Spinner -->
    <div><OpenSpinner /></div>

    <!-- Handle all collection changes and save -->
    <div><CollectionChanges /></div>

    <!-- User Invitation banner -->
    <div><UserInvitation /></div>

    <header class="site-header sticky top-0 z-30 border border-gray-200" :style="backgroundImage">
      <div class="g-padding transition-all">
        <div class="header-inner border border-gray-200 dark:bg-[#0b14374d] flex justify-space-between dark:bg-deep-green-800 relative">
          <div class="flex items-center justify-between w-full px-3 py-3 mx-auto max-w-8xl lg:px-4">
            <div class="flex items-center">
              <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" class="p-2 mr-2 text-gray-500 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg id="toggleSidebarMobileHamburger" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                <svg id="toggleSidebarMobileClose" class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
              <div class="flex items-center justify-between">
                <router-link to="/">
                  <div class="flex">
                    <img src="./assets/img/logos/logo-no-background.svg" class="h-8 mr-3" alt="postapi logo">
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">POSTAPI</span>
                  </div>
                </router-link>
              </div>
            </div>
        
            <div class="flex items-center">
              <ul id="flowbiteMenu" class="flex-col hidden pt-6 lg:flex-row lg:self-center lg:py-0 lg:flex">
                <router-link v-if="!auth" to="/">
                  <li class="mb-3 lg:px-2 xl:px-2 lg:mb-0 flex items-center justify-center">
                    <button id="theme-toggle" data-tooltip-target="tooltip-toggle" type="button" class="text-gray-500 dark:text-gray-400 bg-gray-100 hover:bg-[#334155] hover:text-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-md p-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>                                         
                      <span class="sr-only">Home</span>
                    </button> 
                  </li>
                </router-link>
                <router-link to="/published">
                  <li class="mb-3 cursor-pointer lg:px-2 xl:px-2 lg:mb-0 flex items-center justify-center">
                    <button id="theme-toggle" data-tooltip-target="tooltip-toggle" type="button" class="text-gray-500 dark:text-gray-400 bg-gray-100 hover:bg-[#334155] hover:text-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-md p-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                      </svg> 
                      <span class="sr-only">Published collection</span>
                    </button> 
                  </li>
                </router-link>
                <div v-if="auth && user" @click="logout">
                  <li class="mb-3 cursor-pointer lg:px-2 xl:px-2 lg:mb-0 flex items-center justify-center">
                    <button id="theme-toggle" data-tooltip-target="tooltip-toggle" type="button" class="text-gray-500 dark:text-gray-400 bg-gray-100 hover:bg-[#334155] hover:text-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-md p-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>  
                    </button>                  
                  </li>
                </div>
                <router-link to="/login" v-else>
                  <li class="mb-3 cursor-pointer lg:px-2 xl:px-2 lg:mb-0 flex items-center justify-center">
                    <button id="theme-toggle" data-tooltip-target="tooltip-toggle" type="button" class="text-gray-500 dark:text-gray-400 bg-gray-100 hover:bg-[#334155] hover:text-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-md p-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>                      
                    </button> 
                  </li>
                </router-link>
              </ul>

              <div v-if="auth && user" @click="openNotifications" class="flex hover:bg-[#334155] hover:text-gray-50 items-center cursor-pointer justify-center bg-gray-100 ml-3 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-md p-2.5">
                <button class="relative text-gray-500" type="button"> 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>                  
                </button> 
              </div>

              <!-- Notifications -->
              <UserNotifications />

              <router-link v-if="auth && user" to="/dashboard">
                <div class="ml-3 cursor-pointer relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-deep-green-700 rounded-full dark:bg-gray-600">
                  <span class="font-medium text-gray-100 dark:text-gray-300">{{ stringIntials(user.name) }}</span>
                </div>
              </router-link>

            </div>
          </div>
        </div>
      </div>
    </header>

    <div v-if="isLoading">
      <div class="fixed top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-40 rounded-[10px] flex items-center justify-center">
        <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
      </div>
    </div>
    
    <!-- Collection manager navbar -->
    <ManageCollection />

    <router-view />
    <div><UrlHandler /></div>
  </div>
</template>
<script>
import { useUserStore } from "./stores/UserStore";
import { AppwriteService } from "./resources/AppwriteService";
import { getInitials } from "./utils/GeneralUtils";
import router from "./router";
import { Auth } from "./resources/AuthService";

export default {
  data: () => ({
    backgroundImage: `background-image: url('${
      import.meta.env.VITE_BASE_URL
    }/spaceguy.jpg')`,
    user: useUserStore().get,
    auth: false,
    stringIntials: getInitials,
    isLoading: false,
  }),
  components: {
    PublicAlert: () => import("./components/Utilities/PublicAlert.vue"),
    OpenSpinner: () => import("./components/Utilities/OpenSpinner.vue"),
    CollectionChanges: () =>
      import("./components/CollectionManager/CollectionChanges.vue"),
    UrlHandler: () => import("./components/CollectionManager/UrlHandler.vue"),
    ManageCollection: () =>
      import("./components/CollectionManager/AccountManager.vue"),
    UserNotifications: () => import("./components/UserNotifications.vue"),
    UserInvitation: () => import("./components/UserInvitation.vue"),
  },
  methods: {
    async logout() {
      const account = AppwriteService().account();
      this.isLoading = true;

      account.listSessions().then((sessions) => {
        for (const session in sessions.sessions) {
          account.deleteSession(sessions.sessions[session].$id).then(() => {
            this.isLoading = false;
            router.push({ path: "/" });
            window.location.reload();
          });
        }
      });
    },

    /**
     * Open Notification dropdown
     */
    openNotifications() {
      this.$root.$emit("open_notifications");
    },
  },
  mounted() {
    Auth()
      .user()
      .then((response) => {
        useUserStore().store(response);
        this.user = response;
        this.auth = true;
      })
      .catch(() => (this.auth = false));
  },
};
</script>
