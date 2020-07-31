<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item>
        <h1 class="title">Scribbletune Maker</h1>
      </b-navbar-item>
      <b-navbar-item>
        <Oscilloscope />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="div">
        <b-field class="file">
          <b-upload size="is-small" v-model="file">
            <a class="button is-small">
              <b-icon size="is-small" icon="upload"></b-icon>
              <span>Load JSON</span>
            </a>
          </b-upload>
        </b-field>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <b-button icon-left="download" size="is-small" @click="saveJson">
          Save JSON
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Oscilloscope from "./Oscilloscope.vue";
import { saveAs } from "file-saver";

export default {
  components: {
    Oscilloscope
  },
  props: ["value"],
  data() {
    return { file: undefined };
  },
  methods: {
    saveJson() {
      const serializedChannels = JSON.stringify(this.value, null, 2);
      var blob = new Blob([serializedChannels], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, "scribbletune-maker-save.json");
    }
  },
  watch: {
    file(loadedFile) {
      var reader = new FileReader();
      // arrow function to access component methods from inside FileReader
      // see https://stackoverflow.com/questions/40707738/vuejs-accessing-a-method-from-another-method#comment77209572_40708474
      reader.onload = event => {
        let input = JSON.parse(event.target.result);
        this.$emit("input", input);
      };
      reader.readAsText(loadedFile);
    }
  }
};
</script>

<style></style>
