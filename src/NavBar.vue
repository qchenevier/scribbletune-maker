<template>
  <b-navbar wrapper-class="container is-fluid">
    <template slot="brand">
      <b-navbar-item>
        <h1 class="title">Scribbletune Maker</h1>
      </b-navbar-item>
      <b-navbar-item>
        <Oscilloscope />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item>
        <b-field class="file">
          <b-upload size="is-small" v-model="file">
            <div>
              <b-icon size="is-small" icon="upload"></b-icon>
              <span>Load JSON</span>
            </div>
          </b-upload>
        </b-field>
      </b-navbar-item>
      <b-navbar-item>
        <div @click="saveJson">
          <b-icon size="is-small" icon="download"></b-icon>
          <span>Save JSON</span>
        </div>
      </b-navbar-item>
      <b-navbar-item>
        <div @click="getLink">
          <b-icon size="is-small" icon="link"></b-icon>
          <span>Share with link</span>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import buffer from "buffer";
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
  computed: {
    valueBase64() {
      return buffer.Buffer.from(JSON.stringify(this.value)).toString("base64");
    }
  },
  methods: {
    saveJson() {
      const serializedChannels = JSON.stringify(this.value, null, 2);
      var blob = new Blob([serializedChannels], {
        type: "text/plain;charset=utf-8"
      });
      saveAs(blob, "scribbletune-maker-save.json");
    },
    getLink() {
      let url =
        window.location.origin +
        window.location.pathname +
        `?state=${this.valueBase64}`;
      let toast = this.$buefy.toast;
      let confirmObject = {
        title: "Use this link to share the fun !",
        size: "is-small",
        message: `<div style="word-break:break-all">The state of the app is saved into this url:<br/><a href="${url}">${url}</a></div>`,
        confirmText: "Paste link to clipboard",
        type: "is-link",
        hasIcon: true,
        icon: "content-copy",
        onConfirm: () => {
          this.$copyText(url).then(
            () => toast.open("Copied"),
            () => toast.open("Did not copy")
          );
        }
      };
      this.$buefy.dialog.confirm(confirmObject);
    },
    emitStateFromUrl() {
      if (this.$route.query.state) {
        let input = JSON.parse(
          buffer.Buffer.from(this.$route.query.state, "base64").toString()
          //   "ascii"
          // )
        );
        this.$emit("input", input);
        this.resetUrlState();
      }
    },
    resetUrlState() {
      if (this.$route.query.state) {
        let query = Object.assign({}, this.$route.query);
        delete query.state;
        this.$router.replace({ query });
      }
    }
  },
  mounted() {
    this.emitStateFromUrl();
  },
  watch: {
    file(loadedFile) {
      this.resetUrlState();
      var reader = new FileReader();
      // arrow function to access component methods from inside FileReader
      // see https://stackoverflow.com/questions/40707738/vuejs-accessing-a-method-from-another-method#comment77209572_40708474
      reader.onload = event => {
        let input = JSON.parse(event.target.result);
        this.$emit("input", input);
      };
      reader.readAsText(loadedFile);
    },
    "$route.query.state": {
      handler() {
        this.emitStateFromUrl();
      }
    }
  }
};
</script>

<style></style>
