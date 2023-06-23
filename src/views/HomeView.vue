<!-- eslint-disable prettier/prettier -->
<template>
  <div class="pt-16 h-[92vh] w-full relative">
    <div class="relative px-4 w-full sm:px-6 lg:px-8 flex">
      <main class="pb-16 pt-12 px-10 w-full">
        <article class="w-full">
          <div><PatternsVue /></div>

          <div class="flex items-center relative w-full">
            <div class="w-[35rem] xl:w-[40rem] lg:w-[35rem] md:w-[30rem] sm:w-[25rem]">
              <h1 class="text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-gray-200 mb-5">Organize Your Postman API Collections &amp; Document</h1>
              <p class="lead dark:text-gray-200">
                Simplifies the process of creating, organizing, and maintaining 
                APIS Collection. And Save your teams to collaborate effectively, improves documentation consistency, 
                and ensures that information is easily accessible to all your Team member, project manager and DevOps.
              </p>
  
              <h2 class="scroll-mt-20 dark:text-gray-200 text-2xl font-extrabold leading-none tracking-tight md:text-2xl xl:text-2xl mt-10 mb-5">Getting started</h2>
              <p class="lead dark:text-gray-200">
                To get started, create a new application in your
                <a href="/#">developer settings</a>, then read about how to make
                requests for the resources you need to access using our HTTP APIs
                or dedicated client SDKs. When your integration is ready to go
                live, publish it to our <a href="/#">integrations directory</a> to
                reach the Protocol community.
              </p>
  
              <div v-if="!auth" class="socialite not-prose mb-16 mt-10 flex gap-3">
                <a @click="loginWithGitHub" class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300">
                  <svg class="mt-0.5 h-5 w-5 mr-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                  </svg>
                  Continue with Guthub
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path>
                  </svg>
                </a>
                <a @click="loginWithGoogle" class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white">
                  <svg class="mt-1 w-4 h-4 mr-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                  Continue with Google
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" class="mt-0.5 h-5 w-5 -mr-1">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div class="w-[40rem] ml-24 xl:w-[35rem] lg:w-[30rem] md:w-[25rem] sm:w-[20rem]">
              <img src="https://demo.themesberg.com/landwind/images/hero.png" alt="" class="w-full">
            </div>
          </div>

          <div v-if="isLoading">
            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
              <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
            </div>
          </div>

        </article>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { AppwriteService } from "../resources/AppwriteService";
import { Auth } from "../resources/AuthService";
import { useUserStore } from "../stores/UserStore";
import PatternsVue from "../components/PatternsVue.vue";

const isLoading = ref(false);
const auth = ref(false);

/**
 * initiates the login process with Google
 * on the client website or application.
 */
const loginWithGoogle = () => {
  const account = AppwriteService().account();

  isLoading.value = true;
  account.createOAuth2Session(
    "google",
    `${import.meta.env.VITE_BASE_URL}/dashboard`,
    `${import.meta.env.VITE_BASE_URL}/login?sucusess=false`
  );

  account.get().then((response) => {
    useUserStore().store(response);
    isLoading.value = false;
  });
};

/**
 * initiates the login process with GitHub
 * on the client website or application.
 */
const loginWithGitHub = () => {
  const account = AppwriteService().account();

  isLoading.value = true;
  account.createOAuth2Session(
    "github",
    `${import.meta.env.VITE_BASE_URL}/dashboard`,
    `${import.meta.env.VITE_BASE_URL}/login?sucusess=false`
  );

  account.get().then((response) => {
    useUserStore().store(response);
    isLoading.value = false;
  });
};

onMounted(async () => {
  auth.value = await Auth().check();
  if (auth.value) window.location.replace("/dashboard");
});
</script>
