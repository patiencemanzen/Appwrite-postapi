<!-- eslint-disable prettier/prettier -->
<template>
    <div>
        <li class="mb-10 ml-6" v-if="!folder.hasOwnProperty('request')" :id="folder.name">
            <span class="absolute flex items-center justify-center w-8 h-8 bg-blue-400 text-center text-gray-200 rounded-full -left-4 top-2 ring-4 ring-[#ecf1fa] dark:ring-gray-900 dark:bg-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
            </span>
            <div class="relative">
                <div class="flex items-center ">
                    <aside class="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white" aria-label="Component requires Tailwind v3.0">
                        <span class="bg-white dark:bg-gray-900 rounded-full text-black px-4 py-1 mr-3 text-center">
                            <span class="text-lg mb-1 font-semibold text-gray-900 dark:text-white capitalize">{{ folder.name }}</span>
                        </span> 
                    </aside>
                    <span class="bg-blue-100 text-blue-800 text-sm mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">{{ folder.hasOwnProperty('request') ? "Request" : "Folder" }}</span>
                    <div v-if="owner" @click="openFolderTitleEditor(uniqueIdentifier)" :id="'*_title_'+uniqueIdentifier" class="cursor-pointer inline-flex items-center justify-between px-1 py-1 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white">
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
                </div>
                <div class="p-1"></div>
                <div v-if="folder.description === ''" class="w-full mt-2">
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[400px] mb-2.5"></div>
                </div>
                <div class="hidden" :id="'#_title_'+uniqueIdentifier">
                    <div class="absolute -bottom-16 z-10 flex w-auto border border-gray-100 flex-grow items-center justify-center rounded-[10px] bg-white px-3 py-2.5 shadow-md shadow-shadow-200 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
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
            </div>

            <div class="editableFolder">
                <p class="font-anek font-medium text-gray-600">{{ folder.description }}</p>
                <div :id="'#_desc_'+uniqueIdentifier" class="hidden relative w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label for="comment" class="sr-only">Your comment</label>
                        <textarea :value="folder.description" :id="'#v-model_desc_'+uniqueIdentifier" rows="2" class="font-anek font-medium text-gray-600 w-full px-0 text-sm bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button @click="submitDocFolderDescription(folder.id, uniqueIdentifier)" type="submit" class="inline-flex cursor-pointer items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Save changes
                        </button>
                        <button @click="closeDescEditor(uniqueIdentifier)" type="submit" class="inline-flex items-center py-2.5 cursor-pointer px-4 text-xs font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
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

            <ol v-if="folder?.item" class="relative border-l mt-5 border-gray-200 dark:border-gray-700">
                <CollectionStructure v-for="nextItem in folder.item" :key="slugfi(nextItem.id+uniqueIdentifier)" :folder="nextItem" :owner="owner" />
            </ol>
        </li>

        <li class="mb-10 ml-6 pr-3" v-if="folder.hasOwnProperty('request')">
            <span :class="methodsSymbols[folder.request.method]+' absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-[#ecf1fa] dark:ring-gray-900 dark:bg-blue-900'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
            </span>
            <div class=relative>
                <div class="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white capitalize">
                    <span :class="methodsSymbols[folder.request.method]+' text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300'">
                        {{ folder.request?.method !== undefined ? folder.request?.method : '' }}
                    </span>
                    {{ folder.name }}
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
                </div>
                <div class="hidden" :id="'#_title_'+uniqueIdentifier">
                    <div class="absolute -bottom-16 z-10 flex w-auto border border-gray-100 flex-grow items-center justify-center rounded-[10px] bg-white px-3 py-2.5 shadow-md shadow-shadow-200 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
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
            </div>
            <div class="editableFolder">
                <p class="font-anek font-medium text-gray-600">{{ folder.description }}</p>
                <div :id="'#_desc_'+uniqueIdentifier" class="hidden relative w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label for="comment" class="sr-only">Your comment</label>
                        <textarea :value="folder.description" :id="'#v-model_desc_'+uniqueIdentifier" rows="2" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button @click="submitDocFolderDescription(folder.id, uniqueIdentifier)" type="button" class="cursor-pointer inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Save changes
                        </button>
                        <button @click="closeDescEditor(uniqueIdentifier)" type="submit" class="cursor-pointer inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
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

            <div class="py-2 px-3 mt-3 text-sm ring-2 ring-gray-200 text-gray-500 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                {{ folder.request.url?.raw !== undefined ? folder.request.url.raw : '' }}
            </div>

            <!-- Authentication -->
            <div class="relative overflow-x-auto mt-3 pt-3 ring-2 ring-gray-200 sm:rounded-lg" v-if="folder.request?.auth !== undefined">
                <span class="px-3 py-2 text-md font-bold text-left text-gray-500 bg-white dark:text-white dark:bg-gray-800">Authorization</span>
                <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700">

                <div class="text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption class="px-3 py-2 text-md font-bold text-left text-gray-500 bg-white dark:text-white dark:bg-gray-800">
                            Request Auth | <span>{{ folder.request.auth.type }}</span>
                        </caption>
                        <tbody>
                            <tr v-for="auth in folder.request.auth.bearer" :key="auth.type" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="px-3 py-2">
                                    {{ auth.value }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Request Headers -->
            <div class="relative overflow-x-auto mt-3 pt-3 ring-2 ring-gray-200 sm:rounded-lg" v-if="folder.request.header.length > 0">
                <span class="px-3 py-2 text-md font-bold text-left text-gray-500 bg-white dark:text-white dark:bg-gray-800">
                    Headers
                </span>
                <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700">

                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption class="px-3 py-2 text-md font-bold text-left text-gray-500 bg-white dark:text-white dark:bg-gray-800">
                        Request Headers
                    </caption>
                    <tbody>
                        <tr v-for="head in folder.request.header" :key="head.key" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {{ head.key }}
                            </th>
                            <td class="px-3 py-2">
                                {{ head.value }}
                            </td>
                            <td class="px-3 py-2">
                                {{ head.type }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Request Body -->
            <div v-if="folder.request?.body !== undefined" class="w-full mb-4 mt-3 ring-2 ring-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div class="flex items-center justify-between px-3 border-b dark:border-gray-600">
                    <div class="flex pt-2 flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                        <div class="flex items-center space-x-1 sm:pr-4">
                            <button type="button" class="text-md text-gray-500 p-2 font-anek font-bold rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <span class="text-md">Request Body</span>
                            </button>
                        </div>
                        <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
                            <button type="button" class="text-gray-500 p-2 text-md font-anek font-bold rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                <span class="text-md">
                                    {{folder.request.body.mode}}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800 overflow-x-auto">
                    <label for="editor" class="sr-only">Publish post</label>

                    <div class="text-sm">
                        <ssh-pre v-if="folder.request.body?.raw !== undefined" language="json" label="body" copy-button @copied="onCopiedDoSomething">
                            <template #copy-button>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                </svg>
                            </template>
                            {{ folder.request.body.raw }}
                        </ssh-pre>
                    </div>

                    <table v-if="folder.request.body?.formdata !== undefined" class="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-scroll">
                        <tbody>
                            <tr v-for="formData in folder.request.body.formdata" :key="formData.key" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ formData.key }}
                                </th>
                                <td class="px-3 py-2">
                                    {{ formData.value }}
                                </td>
                                <td class="px-3 py-2">
                                    {{ formData.type }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </li>
    </div>
</template>
<style scoped>
pre.ssh-pre {
  position: relative;
  padding: 0.5em;
  margin: 0px !important;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background-color: rgba(0, 0, 0, 0.025);
  border-radius: 4px;
  display: block;
  white-space: unset !important;
  word-break: normal !important;
}
</style>
<script>
import "simple-syntax-highlighter/dist/sshpre.css";
import { slugify } from "../../Utils/GeneralUtls";

export default {
  props: ["folder", "owner"],
  components: {
    SshPre: () => import("simple-syntax-highlighter"),
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
        hasResponse: true,
      });
    },
  },
};
</script>
