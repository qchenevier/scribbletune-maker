<template>
  <div>
    <b-input
      size="is-small"
      type="file"
      id="file"
      @change="loadJson"
      multiple
    />
    <b-button size="is-small" @click="saveJson">
      <b-icon size="is-small" icon="download" />
      Save JSON
    </b-button>
  </div>
</template>

<script>
import { saveAs } from "file-saver";

export default {
  props: ["value"],
  methods: {
    saveJson() {
      const serializedChannels = JSON.stringify(this.value, null, 2);
      var blob = new Blob([serializedChannels], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, "scribbletune-maker-save.json");
    },
    loadJson(event) {
      var reader = new FileReader();
      // arrow function to access component methods from inside FileReader
      // see https://stackoverflow.com/questions/40707738/vuejs-accessing-a-method-from-another-method#comment77209572_40708474
      reader.onload = event => {
        let input = JSON.parse(event.target.result);
        this.$emit("input", input);
      };
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        reader.readAsText(files[i]);
      }
    }
  }
};
</script>

<style></style>
