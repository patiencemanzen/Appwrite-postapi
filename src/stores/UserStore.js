import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref({});
  const jwt = ref(null);

  const get = computed(() => user.value);
  const getToken = computed(() => jwt.value);

  function store(data) {
    user.value = data;
  }

  function storeJWT(jwt) {
    jwt.value = jwt;
  }

  return { user, get, store, storeJWT, getToken };
});
