<!-- eslint-disable prettier/prettier -->
<template>
    <article class="prose dark:prose-invert mt-10 relative">
        <div v-if="!folder.hasOwnProperty('request')" :id="folder.name">
            <h1>{{ folder.name }}</h1>

            <div v-if="owner" @click="openFolderTitleEditor(uniqueIdentifier)" :id="'*_title_'+uniqueIdentifier" class="cursor-pointer inline-flex items-center justify-between px-1 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
                <span class="text-xs bg-white dark:bg-gray-900 rounded-full text-black px-3 py-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                </span>
            </div>

            <div class="hidden" :id="'#_title_'+uniqueIdentifier">
                <div class="absolute z-10 flex w-auto border border-gray-100 flex-grow items-center justify-center rounded-[10px] bg-white px-3 py-2.5 shadow-md shadow-shadow-200 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
                    <div>
                        <input :value="folder.name" type="text" :id="'#v-model_name_'+uniqueIdentifier" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title..">
                    </div>
                    <div>
                        <button @click="submitDocFolderName(folder.id, uniqueIdentifier)" class="relative cursor-pointer inline-flex h-10 w-20 items-center justify-center rounded-lg border border-transparent text-white bg-gray-800 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <button @click="closeFolderTitleEditor(uniqueIdentifier)" class="relative cursor-pointer inline-flex h-10 w-20 items-center justify-center rounded-lg border border-transparent text-white bg-gray-400 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div :id="'*_foldername_spinner_'+uniqueIdentifier" class="hidden">
                        <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
                            <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="owner" @click="openDescEditor(uniqueIdentifier)" :id="'*_desc_'+uniqueIdentifier" class="ml-3 cursor-pointer inline-flex items-center justify-between px-1 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
                <span class="text-xs bg-white dark:bg-gray-900 rounded-full text-black px-3 py-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </span>                        
            </div>

            <p class="lead">{{ folder.description }}</p>

            <div v-if="folder.description === ''" class="w-full mt-2">
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[400px] mb-2.5"></div>
            </div>

            <div class="editableFolder">
                <div :id="'#_desc_'+uniqueIdentifier" class="hidden relative w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label for="comment" class="sr-only">Your comment</label>
                        <textarea :value="folder.description" :id="'#v-model_desc_'+uniqueIdentifier" rows="2" class="font-anek font-medium text-gray-600 w-full px-0 text-sm bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button @click="submitDocFolderDescription(folder.id, uniqueIdentifier)" class="inline-flex cursor-pointer items-center py-1 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Save changes
                        </button>
                        <button @click="closeDescEditor(uniqueIdentifier)" class="inline-flex items-center py-1 cursor-pointer px-4 text-xs font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Cancel
                        </button>
                    </div>
                    <div :id="'*_folderdesc_spinner_'+uniqueIdentifier" class="hidden">
                        <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
                            <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                        </div>
                    </div>
                </div>
            </div>
            
            <CollectionStructure v-for="nextItem in folder.item" :key="slugfi(nextItem.id+uniqueIdentifier)" :folder="nextItem" :owner="owner" />
        </div>
        
        <div v-if="folder.hasOwnProperty('request')">
            <hr />
            <div class="flex items-center gap-x-3">
                <span :class="methodsSymbols[folder.request.method]+' font-mono text-[0.625rem] font-semibold leading-6 rounded-lg px-1.5 ring-1 ring-inset ring-sky-300 bg-sky-400/10 text-sky-500 dark:ring-sky-400/30 dark:bg-sky-400/10 dark:text-sky-400'">
                {{ folder.request?.method !== undefined ? folder.request?.method : '' }}
                </span>
                <span class="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
                <span class="font-mono text-xs text-zinc-400">
                {{ folder.request.url?.raw !== undefined ? folder.request.url.raw : '' }}
                </span>
            </div>
            <h2 id="create-a-contact" class="mt-2 scroll-mt-32">
                <a class="group text-inherit no-underline hover:text-inherit" href="/contacts#create-a-contact">{{ folder.name }}</a>
                <div v-if="owner" @click="openFolderTitleEditor(uniqueIdentifier)" :id="'*_title_'+uniqueIdentifier" class="cursor-pointer ml-3 inline-flex items-center justify-between px-1 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
                    <span class="text-xs bg-white dark:bg-gray-900 rounded-full text-black px-3 py-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </span>
                </div>
                <div v-if="owner" @click="openDescEditor(uniqueIdentifier)" :id="'*_desc_'+uniqueIdentifier" class="cursor-pointer inline-flex items-center justify-between px-1 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
                    <span class="text-xs bg-white dark:bg-gray-900 rounded-full text-black px-3 py-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg> 
                    </span>
                </div>
            </h2>
            <div class="hidden" :id="'#_title_'+uniqueIdentifier">
                <div class="absolute z-10 flex w-auto border border-gray-100 flex-grow items-center justify-center rounded-[10px] bg-white px-3 py-2.5 shadow-md shadow-shadow-200 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
                    <div>
                        <input :value="folder.name" type="text" :id="'#v-model_name_'+uniqueIdentifier" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title..">
                    </div>
                    <div>
                        <button @click="submitDocFolderName(folder.id, uniqueIdentifier)" class="relative cursor-pointer inline-flex h-10 w-20 items-center justify-center rounded-lg border border-transparent text-white bg-gray-800 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                            <span v-if="isLoading" class="absolute top-0 right-0 left-0 bottom-0 w-full flex justify-center items-center bg-gray-600 rounded-lg">
                                <div class="inline-flex items-center gap-px">
                                    <span class="animate-blink mx-px h-1.5 w-1.5 rounded-full bg-white"></span>
                                    <span class="animate-blink animation-delay-150 mx-px h-1.5 w-1.5 rounded-full bg-white"></span>
                                    <span class="animate-blink animation-delay-300 mx-px h-1.5 w-1.5 rounded-full bg-white"></span>
                                </div>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <button @click="closeFolderTitleEditor(uniqueIdentifier)" class="relative cursor-pointer inline-flex h-10 w-20 items-center justify-center rounded-lg border border-transparent text-white bg-gray-400 hover:bg-gray-900 px-2 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div :id="'*_foldername_spinner_'+uniqueIdentifier" class="hidden">
                        <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
                            <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="xl:max-w-none xl:grid-cols-2">
                <div class="[&amp;>:first-child]:mt-0 [&amp;>:last-child]:mb-0">
                    <p>{{ folder.description }}</p>
                    
                    <div :id="'#_desc_'+uniqueIdentifier" class="hidden relative w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label for="comment" class="sr-only">Your comment</label>
                            <textarea :value="folder.description" :id="'#v-model_desc_'+uniqueIdentifier" rows="2" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                        </div>
                        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                            <button @click="submitDocFolderDescription(folder.id, uniqueIdentifier)" class="cursor-pointer inline-flex items-center py-1 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Save changes
                            </button>
                            <button @click="closeDescEditor(uniqueIdentifier)" class="cursor-pointer inline-flex items-center py-1 px-4 text-xs font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Cancel
                            </button>
                        </div>
                        <div :id="'*_folderdesc_spinner_'+uniqueIdentifier" class="hidden">
                            <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full backdrop-blur-sm z-10 rounded-[10px] flex items-center justify-center">
                                <span class="relative inset-0 inline-flex h-6 w-6 animate-spin items-center justify-center rounded-full border-2 border-gray-300 after:absolute after:h-8 after:w-8 after:rounded-full after:border-2 after:border-y-indigo-500 after:border-x-transparent"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="[&amp;>:first-child]:mt-0 [&amp;>:last-child]:mb-0 xl:sticky xl:top-24 mt-5">
                <div class="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
                    <div>
                    <div id="headlessui-tabs-panel-:rl:" role="tabpanel" tabindex="0" data-headlessui-state="selected" aria-labelledby="headlessui-tabs-tab-:rh:">
                        <div class="group dark:bg-white/2.5">
                        <div class="flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 bg-zinc-900 px-4 dark:border-b-white/5 dark:bg-white/1">
                            <div class="dark flex">
                            <span class="font-mono text-[0.625rem] font-semibold leading-6 text-sky-500">
                                {{ folder.request?.method !== undefined ? folder.request?.method : '' }}
                            </span>
                            </div>
                            <span class="h-0.5 w-0.5 rounded-full bg-zinc-500"></span>
                            <span class="font-mono text-xs text-zinc-400">
                            {{ folder.request.url?.raw !== undefined ? folder.request.url.raw : '' }}
                        </span>
                        </div>
                        <div class="relative">
                            
                            <button type="button" class="group/button absolute right-4 top-3.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100 bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5">
                            <span aria-hidden="false" class="pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300">
                                <svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400">
                                <path stroke-width="0" d="M5.5 13.5v-5a2 2 0 0 1 2-2l.447-.894A2 2 0 0 1 9.737 4.5h.527a2 2 0 0 1 1.789 1.106l.447.894a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z"></path>
                                <path fill="none" stroke-linejoin="round" d="M12.5 6.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2m5 0-.447-.894a2 2 0 0 0-1.79-1.106h-.527a2 2 0 0 0-1.789 1.106L7.5 6.5m5 0-1 1h-3l-1-1"></path>
                                </svg>Copy</span>
                                <span aria-hidden="true" class="pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300 translate-y-1.5 opacity-0">Copied!</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    <span id="headlessui-tabs-panel-:rm:" role="tabpanel" tabindex="-1" aria-labelledby="headlessui-tabs-tab-:ri:"
                        style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;">
                        </span>
                        <span id="headlessui-tabs-panel-:rn:" role="tabpanel" tabindex="-1" aria-labelledby="headlessui-tabs-tab-:rj:"
                        style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;">
                        </span>
                        <span id="headlessui-tabs-panel-:ro:" role="tabpanel" tabindex="-1" aria-labelledby="headlessui-tabs-tab-:rk:" style="
                        position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px;
                        margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap;border-width: 0px;"
                    ></span>
                    </div>
                </div>

                <!-- Request -->
                <div class="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
                    <div class="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-center gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
                    <h3 class="mr-auto text-xs font-semibold text-white">
                        Request
                    </h3>
                    <div class="-mb-px flex gap-4 text-xs font-medium" role="tablist" aria-orientation="horizontal">
                        <button
                        class="border-b py-3 transition focus:[&amp;:not(:focus-visible)]:outline-none border-transparent text-zinc-400 hover:text-zinc-300"
                        id="headlessui-tabs-tab-:ri:"
                        role="tab"
                        type="button"
                        aria-selected="false"
                        tabindex="-1"
                        data-headlessui-state=""
                        aria-controls="headlessui-tabs-panel-:rm:">
                        JavaScript
                        </button>
                        <button
                        class="border-b py-3 transition focus:[&amp;:not(:focus-visible)]:outline-none border-transparent text-zinc-400 hover:text-zinc-300"
                        id="headlessui-tabs-tab-:rk:"
                        role="tab"
                        type="button"
                        aria-selected="false"
                        tabindex="-1"
                        data-headlessui-state=""
                        aria-controls="headlessui-tabs-panel-:ro:">
                        PHP
                        </button>
                    </div>
                    </div>
                    <div>
                    <div id="headlessui-tabs-panel-:rl:" role="tabpanel" tabindex="0" data-headlessui-state="selected" aria-labelledby="headlessui-tabs-tab-:rh:">
                        <div class="group dark:bg-white/2.5">
                        <div class="flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-white/2.5 bg-zinc-900 px-4 dark:border-b-white/5 dark:bg-white/1">
                            <div class="dark flex">
                            <span class="font-mono text-[0.625rem] font-semibold leading-6 text-sky-500">
                                {{ folder.request?.method !== undefined ? folder.request?.method : '' }}
                            </span>
                            </div>
                            <span class="h-0.5 w-0.5 rounded-full bg-zinc-500"></span>
                            <span class="font-mono text-xs text-zinc-400">
                            {{ folder.request.url?.raw !== undefined ? folder.request.url.raw : '' }}
                            </span>
                        </div>
                        <div class="relative">
                            <pre class="overflow-x-auto p-2 text-xs text-white">
                            <code class="language-bash">
                                <span><span style="color: var(--shiki-color-text)">curl https://api.protocol.chat/v1/contacts \</span></span>
                                <span><span style="color: var(--shiki-color-text)">  -H </span><span style="color: var(--shiki-token-string-expression)">"Authorization: Bearer {token}"</span><span style="color: var(--shiki-color-text)"> \</span></span>
                                <span><span style="color: var(--shiki-color-text)">  -d username=</span><span style="color: var(--shiki-token-string-expression)">"FrankMcCallister"</span><span style="color: var(--shiki-color-text)"> \</span></span>
                                <span><span style="color: var(--shiki-color-text)">  -d phone_number=</span><span style="color: var(--shiki-token-string-expression)">"1-800-759-3000"</span><span style="color: var(--shiki-color-text)"> \</span></span>
                                <span><span style="color: var(--shiki-color-text)">  -d avatar_url=</span><span style="color: var(--shiki-token-string-expression)">"https://assets.protocol.chat/avatars/frank.jpg"</span></span>
                                <span></span>
                            </code>
                            </pre>
                        </div>
                        </div>
                    </div>
                    <span id="headlessui-tabs-panel-:rm:" role="tabpanel" tabindex="-1" aria-labelledby="headlessui-tabs-tab-:ri:"
                        style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;">
                        </span>
                        <span id="headlessui-tabs-panel-:rn:" role="tabpanel" tabindex="-1" aria-labelledby="headlessui-tabs-tab-:rj:"
                        style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;">
                        </span>
                        <span id="headlessui-tabs-panel-:ro:" role="tabpanel" tabindex="-1" aria-labelledby="headlessui-tabs-tab-:rk:" style="
                        position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px;
                        margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap;border-width: 0px;"
                    ></span>
                    </div>
                </div>

                <!-- Response -->
                <div class="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10">
                    <div class="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-center gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
                    <h3 class="mr-auto text-xs font-semibold text-white">
                        Response
                    </h3>
                    </div>
                    <div class="group dark:bg-white/2.5">
                    <div class="relative">
                        <pre class="overflow-x-auto text-xs text-white">
                        <code class="language-json">
                            <span><span style="color: var(--shiki-color-text)">{</span></span>
                            <span><span style="color: var(--shiki-color-text)">  </span><span style="color: var(--shiki-token-keyword)">"id"</span><span style="color: var(--shiki-token-punctuation)">:</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-string-expression)">"WAz8eIbvDR60rouK"</span><span style="color: var(--shiki-token-punctuation)">,</span></span>
                            <span><span style="color: var(--shiki-color-text)">  </span><span style="color: var(--shiki-token-keyword)">"username"</span><span style="color: var(--shiki-token-punctuation)">:</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-string-expression)">"FrankMcCallister"</span><span style="color: var(--shiki-token-punctuation)">,</span></span>
                            <span><span style="color: var(--shiki-color-text)">  </span><span style="color: var(--shiki-token-keyword)">"phone_number"</span><span style="color: var(--shiki-token-punctuation)">:</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-string-expression)">"1-800-759-3000"</span><span style="color: var(--shiki-token-punctuation)">,</span></span>
                            <span><span style="color: var(--shiki-color-text)">  </span><span style="color: var(--shiki-token-keyword)">"avatar_url"</span><span style="color: var(--shiki-token-punctuation)">:</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-string-expression)">"https://assets.protocol.chat/avatars/frank.jpg"</span><span style="color: var(--shiki-token-punctuation)">,</span></span>
                            <span><span style="color: var(--shiki-color-text)">  </span><span style="color: var(--shiki-token-keyword)">"display_name"</span><span style="color: var(--shiki-token-punctuation)">:</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">null</span><span style="color: var(--shiki-token-punctuation)">,</span></span>
                            <span><span style="color: var(--shiki-color-text)">  </span><span style="color: var(--shiki-token-keyword)">"conversation_id"</span><span style="color: var(--shiki-token-punctuation)">:</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-string-expression)">"xgQQXg3hrtjh7AvZ"</span><span style="color: var(--shiki-token-punctuation)">,</span></span>
                            <span><span style="color: var(--shiki-color-text)">  </span><span style="color: var(--shiki-token-keyword)">"last_active_at"</span><span style="color: var(--shiki-token-punctuation)">:</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">null</span><span style="color: var(--shiki-token-punctuation)">,</span></span>
                            <span><span style="color: var(--shiki-color-text)">  </span><span style="color: var(--shiki-token-keyword)">"created_at"</span><span style="color: var(--shiki-token-punctuation)">:</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">692233200</span></span>
                            <span><span style="color: var(--shiki-color-text)">}</span></span>
                            <span></span>
                        </code>
                        </pre>
                    </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
    </article>
</template>
<script>
import "simple-syntax-highlighter/dist/sshpre.css";
import { slugify } from "../../utils/GeneralUtils";

export default {
  props: ["folder", "owner"],
  components: {
    CollectionStructure: () => import("./CollectionStructure.vue"),
  },
  data() {
    return {
      isLoading: false,
      uniqueIdentifier: Math.random().toString(16).slice(2),
      methodsSymbols: {
        POST: "bg-indigo-400 text-gray-50",
        GET: "bg-green-400 text-gray-50",
        PUT: "bg-gray-400 text-gray-50",
        DELETE: "bg-red-400 text-gray-50",
      },
      slugfi: slugify,
    };
  },
  methods: {
    // folder desc editor
    openDescEditor(folderId) {
      document.getElementById("#_desc_" + folderId).classList.remove("hidden");
      document.getElementById("*_desc_" + folderId).classList.add("d-none");
    },

    closeDescEditor(folderId) {
      document.getElementById("#_desc_" + folderId).classList.add("hidden");
      document.getElementById("*_desc_" + folderId).classList.remove("d-none");
    },

    // folder title editor
    openFolderTitleEditor(folderId) {
      document.getElementById("#_title_" + folderId).classList.remove("hidden");
      document.getElementById("*_title_" + folderId).classList.add("d-none");
    },

    closeFolderTitleEditor(folderId) {
      document.getElementById("#_title_" + folderId).classList.add("hidden");
      document.getElementById("*_title_" + folderId).classList.remove("d-none");
    },

    async submitDocFolderName(folderId, identifier) {
      let folderModel = document.getElementById(
        "#v-model_name_" + identifier
      ).value;

      this.$root.$emit("save_collection_changes", {
        alertMessage: `Save new changes from 'name'`,
        after: () => this.$root.$emit("refresh_collection"),
        data: {
          id: folderId,
          name: folderModel,
          section: "item",
        },
      });
    },

    async submitDocFolderDescription(folderId, identifier) {
      let folderModel = document.getElementById(
        "#v-model_desc_" + identifier
      ).value;

      this.$root.$emit("save_collection_changes", {
        alertMessage: `Save new changes from 'description'`,
        data: {
          id: folderId,
          description: folderModel,
          section: "item",
        },
        after: () => this.$root.$emit("refresh_collection"),
      });
    },
    onCopiedDoSomething() {
      this.$root.$emit("new_message", {
        responseType: "success",
        response: "Body Copied",
        subject: "Copied",
        source: "/",
      });
    },
  },
};
</script>
