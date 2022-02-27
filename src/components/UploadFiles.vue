<template>
  <div>
    <div>
      <p>1 --------- Upload files</p>
    </div>
    <label class="btn btn-default">
      <input type="file" multiple @change="selectFile" />
    </label>

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
        <li class="list-group-item" v-for="(name, index) in names" :key="index">
          <a>{{ name }}</a>
        </li>
      </ul>
    </div>

    <br /><br /><br />

    <div>
      <p>2 --------- Enter name</p>
    </div>
    <label class="btn btn-default">
      <input
        type="text"
        placeholder="Enter name of file"
        v-model="newWatchlistName"
      />
    </label>

    <div>
      <button
        class="btn btn-success"
        @click="loadTextFromFile"
        :disabled="newWatchlistName.length < 1 && newWatchlistName"
      >
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
    };
  },
  methods: {
    selectFile(event) {
      console.log(event.target.files);
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
  },
};
</script>
