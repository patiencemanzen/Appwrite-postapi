import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCollectionStore = defineStore("collection", () => {
  const collection = ref({});
  const get = computed(() => collection.value);

  function store(newCollection) {
    collection.value = newCollection;
  }

  return { collection, get, store };
});
