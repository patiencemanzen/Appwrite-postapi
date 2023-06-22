<!-- eslint-disable prettier/prettier -->
<template>
  <div class="fixed top-0 right-0 left-0 z-50 h-16 flex items-center justify-between gap-12 px-4 transition sm:px-6 lg:z-30 lg:px-8 backdrop-blur-sm dark:backdrop-blur bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]" style="--bg-opacity-light: 0.5; --bg-opacity-dark: 0.2">
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
      <a aria-label="Home" href="/">
        <svg viewBox="0 0 99 24" aria-hidden="true" class="h-6">
          <path class="fill-emerald-400" d="M16 8a5 5 0 0 0-5-5H5a5 5 0 0 0-5 5v13.927a1 1 0 0 0 1.623.782l3.684-2.93a4 4 0 0 1 2.49-.87H11a5 5 0 0 0 5-5V8Z"></path>
          <path class="fill-zinc-900 dark:fill-white" d="M26.538 18h2.654v-3.999h2.576c2.672 0 4.456-1.723 4.456-4.333V9.65c0-2.61-1.784-4.333-4.456-4.333h-5.23V18Zm4.58-10.582c1.52 0 2.416.8 2.416 2.241v.018c0 1.441-.896 2.25-2.417 2.25h-1.925V7.418h1.925ZM38.051 18h2.566v-5.414c0-1.371.923-2.206 2.382-2.206.396 0 .791.061 1.178.15V8.287a3.843 3.843 0 0 0-.958-.123c-1.257 0-2.136.615-2.443 1.661h-.159V8.323h-2.566V18Zm11.55.202c2.979 0 4.772-1.88 4.772-5.036v-.018c0-3.128-1.82-5.036-4.773-5.036-2.953 0-4.772 1.916-4.772 5.036v.018c0 3.146 1.793 5.036 4.772 5.036Zm0-2.013c-1.372 0-2.145-1.116-2.145-3.023v-.018c0-1.89.782-3.023 2.144-3.023 1.354 0 2.145 1.134 2.145 3.023v.018c0 1.907-.782 3.023-2.145 3.023Zm10.52 1.846c.492 0 .967-.053 1.283-.114v-1.907a6.057 6.057 0 0 1-.755.044c-.87 0-1.24-.387-1.24-1.257v-4.544h1.995V8.323H59.41V6.012h-2.592v2.311h-1.495v1.934h1.495v5.133c0 1.88.949 2.645 3.304 2.645Zm7.287.167c2.98 0 4.772-1.88 4.772-5.036v-.018c0-3.128-1.82-5.036-4.772-5.036-2.954 0-4.773 1.916-4.773 5.036v.018c0 3.146 1.793 5.036 4.773 5.036Zm0-2.013c-1.372 0-2.145-1.116-2.145-3.023v-.018c0-1.89.782-3.023 2.145-3.023 1.353 0 2.144 1.134 2.144 3.023v.018c0 1.907-.782 3.023-2.144 3.023Zm10.767 2.013c2.522 0 4.034-1.353 4.297-3.463l.01-.053h-2.374l-.017.036c-.229.966-.853 1.467-1.908 1.467-1.37 0-2.135-1.08-2.135-3.04v-.018c0-1.934.755-3.006 2.135-3.006 1.099 0 1.74.615 1.908 1.556l.008.017h2.391v-.026c-.228-2.162-1.749-3.56-4.315-3.56-3.033 0-4.738 1.837-4.738 5.019v.017c0 3.217 1.714 5.054 4.738 5.054Zm10.257 0c2.98 0 4.772-1.88 4.772-5.036v-.018c0-3.128-1.82-5.036-4.772-5.036-2.953 0-4.773 1.916-4.773 5.036v.018c0 3.146 1.793 5.036 4.773 5.036Zm0-2.013c-1.371 0-2.145-1.116-2.145-3.023v-.018c0-1.89.782-3.023 2.145-3.023 1.353 0 2.144 1.134 2.144 3.023v.018c0 1.907-.782 3.023-2.144 3.023ZM95.025 18h2.566V4.623h-2.566V18Z"></path>
        </svg>
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
