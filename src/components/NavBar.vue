<!-- eslint-disable prettier/prettier -->
<template>
  <div class="fixed top-0 right-0 left-0 z-40 h-16 flex items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8 backdrop-blur-sm dark:backdrop-blur bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]" style="--bg-opacity-light: 0.5; --bg-opacity-dark: 0.2">
    <div class="absolute inset-x-0 top-full h-px transition bg-zinc-900/7.5 dark:bg-white/7.5"></div>
    <div class="hidden lg:flex">
        <router-link to="/">
            <a aria-label="Home" href="/" class="flex ml-1">
              <img src="../assets/img/logos/logo-no-background.svg" class="h-8 mr-3" alt="postapi logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">POSTAPI</span>
            </a>
        </router-link>
    </div>
    <div class="hidden lg:block lg:max-w-md lg:flex-auto">
      <button type="button" class="hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset lg:flex focus:[&amp;:not(:focus-visible)]:outline-none">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="h-5 w-5 stroke-current">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"></path>
        </svg>
        Find something...
        <kbd class="ml-auto text-2xs text-zinc-400 dark:text-zinc-500">
          <kbd class="font-sans">⌘</kbd>
          <kbd class="font-sans">K</kbd>
        </kbd>
      </button>
    </div>
    <div class="flex items-center gap-5 lg:hidden">
      <button type="button" class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5" aria-label="Toggle navigation">
        <svg viewBox="0 0 10 9" fill="none" stroke-linecap="round" aria-hidden="true" class="w-2.5 stroke-zinc-900 dark:stroke-white">
          <path d="M.5 1h9M.5 8h9M.5 4.5h9"></path>
        </svg>
      </button>
      <a aria-label="Home" href="/" class="flex ml-1">
        <img src="../assets/img/logos/logo-no-background.svg" class="h-8 mr-3" alt="postapi logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">POSTAPI</span>
      </a>
    </div>
    <div class="flex items-center gap-5">
      <nav class="hidden md:block">
        <ul role="list" class="flex items-center gap-8">
          <li>
            <router-link v-if="!auth" to="/">
              <a class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/">
                Home
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="/published">
              <a class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/#">
                Published Collections
              </a>
            </router-link>
          </li>
          <li v-if="auth && user" @click="logout">
            <a class="text-sm leading-5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/#">
              Logout
            </a>
          </li>
        </ul>
      </nav>

      <div class="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15"></div>
      <div class="flex gap-4">
        <div class="contents lg:hidden">
          <button type="button" class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden focus:[&amp;:not(:focus-visible)]:outline-none" aria-label="Find something...">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="h-5 w-5 stroke-zinc-900 dark:stroke-white">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"></path>
            </svg>
          </button>
        </div>

        <button id="theme-toggle" type="button" class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5" aria-label="Toggle dark mode">
          <svg id="theme-toggle-dark-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" class="h-6 w-6 stroke-zinc-900 dark:hidden">
            <path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
            <path stroke-linecap="round" d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707"></path>
          </svg>
          <svg id="theme-toggle-light-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true" class="hidden h-5 w-5 stroke-white dark:block">
            <path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z"></path>
          </svg>
        </button>

        <button v-if="auth && user" @click="openNotifications" type="button" class="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 dark:text-white" aria-label="Toggle dark mode">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>            
        </button>
      </div>

      <div class="hidden min-[416px]:contents">
        <router-link to="/login" v-if="!auth && !user">
          <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300" href="/#">
            Sign in
          </a>
        </router-link>
      </div>

      <router-link v-if="auth && user" to="/dashboard">
        <div class="ml-3 cursor-pointer relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-deep-green-700 rounded-full dark:bg-gray-600">
          <span class="font-medium text-gray-100 dark:text-gray-300">{{
            stringIntials(user.name)
          }}</span>
        </div>
      </router-link>

      <!-- Notifications -->
      <UserNotifications />
    </div>
  </div>
</template>
<script>
import { useUserStore } from "../stores/UserStore";
import { AppwriteService } from "../resources/AppwriteService";
import { getInitials } from "../utils/GeneralUtils";
import router from "../router";
import { Auth } from "../resources/AuthService";

export default {
  data: () => ({
    user: useUserStore().get,
    auth: false,
    stringIntials: getInitials,
    isLoading: false,
  }),
  components: {
    UserNotifications: () => import("../components/UserNotifications.vue"),
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
