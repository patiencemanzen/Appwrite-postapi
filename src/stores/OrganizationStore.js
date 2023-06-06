import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useOrganizationStore = defineStore("organization", () => {
  const organization = ref({});
  const get = computed(() => organization.value);

  function store(newOrganization) {
    organization.value = newOrganization;
  }

  return { organization, get, store };
});
