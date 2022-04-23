<template>
  <div>
    <div class="lg:text-center mb-12 lg:mb-24 lg:mt-12">
      <!-- This example requires Tailwind CSS v2.0+ -->
      <!-- Global notification live region, render this permanently at the end of the document -->
      <div
        aria-live="assertive"
        class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
          <!--
      Notification panel, dynamically insert this into the live region when it needs to be displayed

      Entering: "transform ease-out duration-300 transition"
        From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        To: "translate-y-0 opacity-100 sm:translate-x-0"
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
          <div
            v-if="isTwitter"
            class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
          >
            <div class="p-4">
              <div class="flex items-center">
                <div class="w-0 flex-1 flex justify-between">
                  <p class="w-0 flex-1 text-sm font-medium text-gray-900">
                    Made with ❤️
                    <a
                      href="https://twitter.com/Student_Rosi"
                      target="_blank"
                      class="ml-1 underline"
                      >by Tony</a
                    >
                  </p>
                </div>
                <div class="ml-4 flex-shrink-0 flex">
                  <button
                    @click="closeTwitter"
                    class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span class="sr-only">Close</span>
                    <!-- Heroicon name: solid/x -->
                    <svg
                      class="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2
        class="text-base text-indigo-600 font-semibold tracking-wide uppercase"
      >
        TRADING VIEW ONLY
      </h2>
      <p
        class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
      >
        Consolidate your watchlists into one
      </p>
      <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
        A small app to allow you to manage and consolidate your Trading View
        watchlists
      </p>
    </div>
    <div>
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Upload your watchlists from Trading View
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Export your list from Trading View and upload one or multiple text files
        here.
      </p>
      <fieldset class="space-y-5 mt-6">
        <div class="relative flex items-start">
          <div class="flex items-center h-5">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              v-model="consolidateSections"
              @click="toggleRemoveSections"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="comments" class="font-medium text-gray-700"
              >Keep and Consolidate sections</label
            >
            <p id="comments-description" class="text-gray-500">
              The consolidated watchlist will keep the sections. If the item
              moved it will stay in the latest section.
            </p>
          </div>
        </div>
      </fieldset>
    </div>

    <div class=" sm:border-gray-200 sm:pt-5 w-full mb-12">
      <div class="mt-1 w-full" @dragover.prevent @drop.prevent>
        <div
          @drop="dragFile"
          class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
        >
          <div class="space-y-1 text-center">
            <!-- zone of icons -->
            <div class="w-full flex" v-if="files.length > 0">
              <div
                v-for="(file, $index) in names.slice(0, 5)"
                :key="$index"
                class="flex flex-col w-20 h-20 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  id="Icons"
                  viewBox="0 0 24 24"
                >
                  <defs>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="linear-gradient"
                      x1="12"
                      x2="12"
                      y1="1.277"
                      y2="22.983"
                    >
                      <stop offset="0" stop-color="#fff650" />
                      <stop offset="1" stop-color="#ffab17" />
                    </linearGradient>
                  </defs>
                  <path
                    class="cls-1"
                    d="M18,23H6a3,3,0,0,1-3-3V4A3,3,0,0,1,6,1h5.343a4,4,0,0,1,2.829,1.172l5.656,5.656A4,4,0,0,1,21,10.657V20A3,3,0,0,1,18,23Z"
                  />
                  <path
                    class="cls-2"
                    d="M17,20H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Z"
                  />
                  <path
                    class="cls-2"
                    d="M11,16H7a1,1,0,0,1,0-2h4a1,1,0,0,1,0,2Z"
                  />
                  <path
                    class="cls-3"
                    d="M20.64,9H16a3,3,0,0,1-3-3V1.36a4.089,4.089,0,0,1,1.17.81l5.66,5.66A4.089,4.089,0,0,1,20.64,9Z"
                  />
                </svg>
                <span class="text-xs mt-2 text-gray-400"
                  >Watchlist {{ $index + 1 }}
                </span>
              </div>

              <div v-if="names.length >= 4" class="w-20 h-20 flex-col">
                <svg
                  class="w-14 h-14 flex justify-center mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  id="Icons"
                  viewBox="0 0 24 24"
                >
                  <defs>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="linear-gradient"
                      x1="12"
                      x2="12"
                      y1="1.277"
                      y2="22.983"
                    >
                      <stop offset="0" stop-color="#fff650" />
                      <stop offset="1" stop-color="#ffab17" />
                    </linearGradient>
                    <linearGradient
                      gradientUnits="userSpaceOnUse"
                      id="linear-gradient-2"
                      x1="10"
                      x2="10"
                      y1="12.447"
                      y2="19.673"
                    >
                      <stop offset="0" stop-color="#17cc1b" />
                      <stop offset="1" stop-color="#0faa0f" />
                    </linearGradient>
                  </defs>
                  <path
                    class="cls-1"
                    d="M18,23H6a3,3,0,0,1-3-3V4A3,3,0,0,1,6,1h5.343a4,4,0,0,1,2.829,1.172l5.656,5.656A4,4,0,0,1,21,10.657V20A3,3,0,0,1,18,23Z"
                  />
                  <path
                    class="cls-2"
                    d="M20.64,9H16a3,3,0,0,1-3-3V1.36a4.089,4.089,0,0,1,1.17.81l5.66,5.66A4.089,4.089,0,0,1,20.64,9Z"
                  />
                  <path
                    class="cls-3"
                    d="M13,15H11V13a1,1,0,0,0-2,0v2H7a1,1,0,0,0,0,2H9v2a1,1,0,0,0,2,0V17h2a1,1,0,0,0,0-2Z"
                  />
                </svg>

                <span class="text-xs mt-2 text-gray-400">...</span>
              </div>
            </div>

            <svg
              v-else
              class="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <!-- end of zone -->
            <div class="flex text-sm text-gray-600 justify-center mt-4">
              <label
                for="file-upload"
                class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  multiple
                  @change="selectFile"
                />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <dl
        class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-2 md:divide-y-0 md:divide-x"
      >
        <div class="px-4 py-3 sm:p-6">
          <dt class="text-base font-normal text-gray-900">Total Tickers</dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div
              class="flex items-baseline text-2xl font-semibold text-indigo-600"
            >
              {{ reformattedText.length > 1 ? reformattedText.length : 0 }}
            </div>
          </dd>
        </div>

        <div class="px-4 py-3 sm:p-6">
          <dt class="text-base font-normal text-gray-900">Duplicates found</dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div
              class="flex items-baseline text-2xl font-semibold text-indigo-600"
            >
              {{
                duplicates.length > 1
                  ? duplicates.length - reformattedText.length
                  : 0
              }}
            </div>
          </dd>
        </div>

        <!-- <div class="px-4 py-3 sm:p-6">
          <dt class="text-base font-normal text-gray-900">Removed sections</dt>
          <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div
              class="flex items-baseline text-2xl font-semibold text-indigo-600"
            >
              {{ sections.length > 0 ? sections.length : 0 }}
            </div>
          </dd>
        </div> -->
      </dl>
    </div>

    <div class="card mt-12" v-if="names.length > 0">
      <div class="card-header">List of Files</div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item flex justify-between"
          v-for="(name, $index) in names"
          :key="$index"
        >
          <a>{{ name }}</a>

          <button
            @click="removeFile(name, $index)"
            class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">Close</span>
            <!-- Heroicon name: solid/x -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>

    <div class="mt-12">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Enter file name*
      </h3>
      <p class="mt-1 text-sm text-gray-500">
        Export your list from Trading View and upload one or multiple text files
        here.
      </p>
    </div>

    <div class="sm:col-span-3 ">
      <div class="mt-3 mb-6">
        <input
          type="text"
          name="first-name"
          id="first-name"
          autocomplete="given-name"
          v-model="newWatchlistName"
          @keyup="removeError"
          placeholder="Enter name of file"
          class="shadow focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-3"
        />

        <p v-if="showError" class="text-sm text-red-500 mt-2">
          You must fill in the file name*
        </p>
      </div>
    </div>

    <div class="mb-12">
      <button
        @click="saveFile"
        type="button"
        class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :class="[
          newWatchlistName.length == 0 ? 'custom--cursor-not-allowed' : '',
        ]"
      >
        <!-- Heroicon name: solid/mail -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="-ml-1 mr-3 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download watchlist
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "upload-files",
  data() {
    return {
      files: [],
      text: [],
      message: "",
      names: [],
      newWatchlistName: "",
      isTwitter: true,
      consolidateSections: false,
      showError: false,
    };
  },
  computed: {
    checkInput() {
      return this.newWatchlistName.length;
    },

    tvText() {
      if (!this.text.length) return null;
      let joined = this.text
        .join()
        .split(",")
        .filter((item) => item.indexOf("###") < 0);

      return [...new Set(joined)].join(",").replace(/['"]+/g, "");
    },

    tvConsolidatedSections() {
      if (!this.text.length) return null;

      let arr = this.text;
      let currentProp = "###UNCATEGORISED";

      let t = arr.reduce(
        function(acc, key) {
          if (key.indexOf("#") > -1) {
            acc[key] = [];
            currentProp = key;
          } else {
            acc[currentProp].push(key);
          }
          return acc;
        },
        { "###UNCATEGORISED": [] }
      );

      // remove empty sections
      let clean = Object.entries(t)
        .filter((v) => v.length > 0)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

      // need to add comma to key to separate the section
      let addComma = Object.entries(clean).map((i) => {
        if (i[0].indexOf("#") > -1) {
          i = i.slice(0) + ",";
        }
        return i;
      });

      // stringify, remove " and remove last ,
      return JSON.stringify(addComma.join(""))
        .replace(/["]/g, "")
        .slice(0, -1);
    },
    reformattedText() {
      let joined = this.text
        .join()
        .split(",")
        .filter((item) => item.indexOf("###") < 0);

      return [...new Set(joined)];
    },
    duplicates() {
      if (!this.text) return null;

      return this.text
        .join()
        .split(",")
        .filter((item) => item.indexOf("###") < 0);
    },
    sections() {
      return this.text
        .join()
        .split(",")
        .filter((item) => item.indexOf("###") > -1);
    },
  },

  methods: {
    removeError() {
      if (this.newWatchlistName.length > 0) {
        this.showError = false;
      }
    },
    toggleRemoveSections() {
      this.consolidateSections = !this.consolidateSections;
    },
    closeTwitter() {
      this.isTwitter = false;
    },
    removeFile(name, $index) {
      this.names = this.names.filter((i) => i !== name);
      this.text.splice($index, 1);
    },
    saveFile: function() {
      if (this.newWatchlistName.length == 0) {
        this.showError = true;
        return;
      }

      const data = !this.consolidateSections
        ? this.tvText
        : this.tvConsolidatedSections;

      // console.log(data);

      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = this.newWatchlistName + ".txt";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },

    dragFile(e) {
      this.loadTextFromFile(e.dataTransfer.files);
      this.files.push(e.dataTransfer.files);
      this.loadNames(e.dataTransfer.files);
    },
    selectFile(event) {
      this.loadTextFromFile(event.target.files);
      this.files.push(event.target.files);
      this.loadNames(event.target.files);
    },
    loadNames(ev) {
      for (let i = 0; i < ev.length; i++) {
        this.names.push(ev[i].name);
      }
    },
    loadTextFromFile(ev) {
      for (let i = 0; i < ev.length; i++) {
        const file = ev[i];

        const reader = new FileReader();

        reader.onload = (e) => {
          this.text.push(e.target.result);
        };
        reader.readAsText(file);
      }
    },
    reformat(arr) {
      let filterOutSections = arr
        .split(",")
        .filter((item) => item.indexOf("###") < 0);

      return [...new Set(filterOutSections)];
    },
  },
};

// add the week number / month / combined textu --> all buttons that add text to the input name
</script>

<style>
.cls-1 {
  fill: url(#linear-gradient);
}
.cls-2 {
  fill: #ed960a;
}
.cls-3 {
  fill: #ffb;
}
.custom--cursor-not-allowed {
  cursor: not-allowed !important;
}
</style>
