<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <div class="flex justify-between mb-3">
            <div></div>
            <div class="w-auto mb-2 border-none ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 dark:bg-white/5 rounded-[10px] bg-white px-3 py-2.5 shadow-sm shadow-shadow-200 dark:!bg-navy-800 dark:shadow-none md:flex-grow-0 md:gap-1 xl:gap-2">
                <div class="font-semibold text-sm mb-3 dark:text-gray-200">Add new row</div>
                <div class="flex flex-grow items-center justify-center relative">
                    <div class="flex items-center mr-3">
                        <div class="mr-1"><input v-model="newFormKeyPaired.key" type="text" autocomplete="false" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border-none ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 dark:bg-white/5 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="key"></div>
                        <div><input v-model="newFormKeyPaired.value" autocomplete="false" type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border-none ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:ring-white/10 dark:hover:ring-white/20 dark:bg-white/5 ml-2 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="value"></div>
                    </div>
                    <div class="ml-3">
                        <button @click="registerParams" class="relative cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-lg border border-transparent text-white bg-gray-800 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                </caption>
    
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Param Key</th>
                        <th scope="col" class="px-6 py-3">Param Value</th>
                    </tr>
                </thead>
                <tbody v-if="params">
                    <tr v-for="param in params" :key="param.key+Math.random().toString(16).slice(2)" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ param.key }}
                        </th>
                        <td class="px-6 py-4">{{ param.value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
  props: ["url"],
  data() {
    return {
      params: [],
      newFormKeyPaired: {
        key: "",
        value: "",
      },
    };
  },
  methods: {
    registerParams() {
      this.params = [
        ...this.params,
        {
          key: this.newFormKeyPaired.key,
          value: this.newFormKeyPaired.value,
        },
      ];
    },
  },
  watch: {
    params: {
      handler(newParams) {
        this.$root.$emit("new_params", newParams);
      },
      immediate: true,
    },
    url: {
      handler(newUrl) {
        this.params = newUrl?.query !== undefined ? newUrl.query : [];
      },
      immediate: true,
    },
  },
};
</script>
