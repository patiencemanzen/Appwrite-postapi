import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useProjectStore = defineStore("project", () => {
  const project = ref({});
  const get = computed(() => project.value);

  function store(newProject) {
    project.value = newProject;
  }

  return { project, get, store };
});
