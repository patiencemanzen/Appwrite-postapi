<!-- eslint-disable prettier/prettier -->
<template>
  <header class="contents lg:pointer-events-none lg:z-40">
    <div class="h-[90vh] contents lg:pointer-events-auto lg:block lg:w-60 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-28 lg:dark:border-white/10 xl:w-70">
      
      <div class="hidden lg:flex">
        <a aria-label="Home" href="/" class="font-bold dark:text-white">
          Table of Contents
        </a>
      </div>
      
      <nav class="hidden lg:mt-5 lg:block">
        <ul role="list">
          <li class="md:hidden">
            <a class="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/">
              API
            </a>
          </li>

          <li class="md:hidden">
            <a class="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/#">
              Documentation
            </a>
          </li>

          <li class="md:hidden">
            <a class="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="/#">
              Support
            </a>
          </li>

          <li class="relative mt-6 md:mt-0" v-for="item in collection_items" :key="item.id">
            <h2 class="text-xs font-bold text-zinc-900 dark:text-white">
              {{ item.name }}
            </h2>
            <div class="relative mt-3 pl-2">
              <div class="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5" style="height: 32px; top: 0px; opacity: 1; border-radius: 8px; transform: none; transform-origin: 50% 50% 0px;"></div>
              <div class="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5" style="transform: none; transform-origin: 50% 50% 0px"></div>
              <div class="absolute left-2 h-6 w-px bg-emerald-500" style="top: 4px;opacity: 1; transform: none; transform-origin: 50% 50% 0px;"></div>
              <ul role="list" class="border-l border-transparent">
                <li class="relative cursor-pointer" v-for="nextItem in item.item" :key="nextItem.id" @click="renderContent(nextItem)">
                  <div class="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-900 dark:text-white">
                    <span class="truncate w-28"> {{ nextItem.name }} </span>
                    <span v-if="nextItem.hasOwnProperty('request')" :class="methodsSymbols[nextItem.request.method]+' font-mono text-[0.625rem] font-semibold leading-6 dark:text-zinc-500'">
                      {{ nextItem.request.method }}
                    </span>
                    <span v-else class="font-mono text-[0.625rem] font-semibold leading-6 dark:text-zinc-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-yellow-500 mt-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                      </svg>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          
          <li class="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
            <a class="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-emerald-500 dark:text-white dark:hover:bg-emerald-400 w-full" href="/#">
              Sign in
            </a>
          </li>
        </ul>
      </nav>

    </div>
  </header>
</template>
<script>
import html2pdf from "html2pdf.js";

export default {
  props: {
    collection_items: { require: true },
    page_url: {
      type: String,
      default: window.location.href,
    },
    page_description: {
      type: String,
      default: () => "",
    },
    page_title: {
      type: String,
      default: () => "",
    },
  },
  data: () => ({
    source: "downloadable",
    methodsSymbols: {
      POST: "text-sky-500",
      GET: "text-emerald-500",
      PUT: "text-amber-500",
      DELETE: "text-red-500",
    },
  }),
  methods: {
    /**
     * Export the doc as PDF file
     */
    exportInPDF() {
      let options = {
        margin: 5,
        enableLinks: true,
        pagebreak: { mode: "avoid-all", before: "#page_brak_post_content" },
        image: { type: "jpeg", quality: 0.98 },
        filename: this.page_title + "-from-patienceman.com.pdf",
      };

      html2pdf(document.getElementById(this.source), options);
    },

    /**
     * Export the doc as DOCX file
     */
    exportInDOCX() {
      var header =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
      var footer = "</body></html>";
      var sourceHTML =
        header + document.getElementById(this.source).innerHTML + footer;

      var source =
        "data:application/vnd.ms-word;charset=utf-8," +
        encodeURIComponent(sourceHTML);
      var fileDownload = document.createElement("a");

      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = "document.docx";
      fileDownload.click();
      document.body.removeChild(fileDownload);
    },

    renderContent(content) {
      this.$root.$emit("new_dyno_content", content);
    },
  },
};
</script>
<style scoped>
.button-social {
  padding: 5px 8px !important;
  font-size: 14px !important;
}
</style>
