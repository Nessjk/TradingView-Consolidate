<template>
  <div>
    <div>
      <p>1 --------- Upload files</p>
    </div>
    <label class="btn btn-default">
      <input type="file" multiple @change="selectFile" />
    </label>

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
        @click="saveFile"
        :disabled="newWatchlistName.length < 1 && newWatchlistName"
      >
        Download watchlist
      </button>

      <br /><br />
      <div class="">
        <p>
          total tickers:
          {{ reformattedText.length > 1 ? reformattedText.length : 0 }}
        </p>
        <p>top watched tickers</p>
      </div>

      <br /><br />

      {{ reformattedText }}
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
  computed: {
    reformattedText() {
      let joined = this.text
        .join()
        .split(",")
        .filter((item) => item.indexOf("###") < 0);

      return [...new Set(joined)];
    },
  },
  methods: {
    saveFile: function() {
      const data = JSON.stringify(this.reformattedText);
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

// drag and drop area
// combine the tickers and sum top tickers
// install tailwind
// animation for the text drag and drop
// stats formatting
// add the week number / month / combined text --> all buttons that add text to the input name
</script>
