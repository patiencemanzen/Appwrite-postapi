import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const get = computed(() => user.value);

  function store(data) {
    user.value = data;
  }

  return { user, get, store };
});
