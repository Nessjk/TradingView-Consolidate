<template>
  <div>
    <div v-if="progressInfos">
      <div
        class="mb-2"
        v-for="(progressInfo, index) in progressInfos"
        :key="index"
      >
        <span>{{ progressInfo.fileName }}</span>
        <div class="progress">
          <div
            class="progress-bar progress-bar-info"
            role="progressbar"
            :aria-valuenow="progressInfo.percentage"
            aria-valuemin="0"
            aria-valuemax="100"
            :style="{ width: progressInfo.percentage + '%' }"
          >
            {{ progressInfo.percentage }}%
          </div>
        </div>
      </div>
    </div>

    <label class="btn btn-default">
      <input type="file" multiple @change="selectFile" />
    </label>

    <button
      class="btn btn-success"
      :disabled="!selectedFiles"
      @click="uploadFiles"
    >
      Upload
    </button>
    <button class="btn btn-success" @click="loadTextFromFile">
      Read
    </button>

    <div v-if="message" class="alert alert-light" role="alert">
      <ul>
        <li v-for="(ms, i) in message.split('\n')" :key="i">
          {{ ms }}
        </li>
      </ul>
    </div>

    <div class="card">
      <div class="card-header">List of Files</div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(file, index) in fileInfos"
          :key="index"
        >
          <a :href="file.url">{{ file.name }}</a>
        </li>
      </ul>
    </div>

    <pre>
      {{ files }}
    </pre>
  </div>
</template>

<script>
import UploadService from "../services/UploadFilesService";

export default {
  name: "upload-files",
  data() {
    return {
      selectedFiles: undefined,
      files: [],
      text: [],
      progressInfos: [],
      message: "",

      fileInfos: [],
    };
  },
  methods: {
    selectFile(event) {
      const e = event.target.files;
      const len = event.target.files.length;

      if (e.length > 1) {
        for (let i = 0; i < len; i++) {
          console.log(e[i]);
          this.files.push(e[i]);
          this.loadTextFromFile(event);
        }
      } else {
        this.files.push(e);
      }
    },

    // loadTextFromFile() {
    //   for (let i = 0; i < this.files.length; i++) {
    //     const file = this.files[i][0];
    //     console.log(file);

    //     const reader = new FileReader();

    //     reader.onload = (e) => {
    //       this.text.push(e.target.result);
    //     };
    //     reader.readAsText(file);
    //   }
    // },
    // loadTextFromFile(ev) {
    //   const file = ev[0];

    //   const reader = new FileReader();

    //   reader.onload = (e) => {
    //     this.text.push(e.target.result);
    //   };
    //   reader.readAsText(file);
    // },
    loadTextFromFile(ev) {
      const file = ev.target.files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        this.text = e.target.result;
        this.$emit("load", e.target.result);
      };
      reader.readAsText(file);
    },

    upload(idx, file) {
      this.progressInfos[idx] = { percentage: 0, fileName: file.name };

      UploadService.upload(file, (event) => {
        this.progressInfos[idx].percentage = Math.round(
          (100 * event.loaded) / event.total
        );
      })
        .then((response) => {
          let prevMessage = this.message ? this.message + "\n" : "";
          this.message = prevMessage + response.data.message;

          return UploadService.getFiles();
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progressInfos[idx].percentage = 0;
          this.message = "Could not upload the file:" + file.name;
        });
    },

    uploadFiles() {
      this.message = "";

      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    },
  },
  mounted() {
    // UploadService.getFiles().then((response) => {
    //   this.fileInfos = response.data;
    // });
  },
};
</script>
