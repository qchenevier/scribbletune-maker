<template lang="html">
  <div>
    <button @click="updateClips">Update clips</button>
    <AceEditor
      :showPrintMargin="true"
      :showGutter="true"
      :highlightActiveLine="true"
      :value="stringify(clips)"
      :enableBasicAutocompletion="true"
      :wrapEnabled="true"
      width="350"
      height="200"
      mode="json"
      theme="dawn"
      :onChange="storeInput"
      :name="`clips-${index}`"
      :key="`clips-${index}`"
      :editorProps="{ $blockScrolling: true }"
    />
  </div>
</template>

<script>
import brace from "brace";
import { Ace as AceEditor } from "vue2-brace-editor";
import "brace/mode/json";
import "brace/theme/dawn";

export default {
  components: { AceEditor },
  data() {
    return {
      clips: undefined,
      clipsInput: undefined
    };
  },
  computed: {
    index() {
      return this.$vnode.key.split("-")[1];
    }
  },
  methods: {
    storeInput(jsonString) {
      this.clipsInput = jsonString;
    },
    updateClips() {
      this.clips = JSON.parse(this.clipsInput);
    },
    stringify(object) {
      return JSON.stringify(object, null, 2);
    }
  },
  mounted() {
    this.clips = [
      {
        notes: "CM-3 CM-3 DM7-3 DM7-3 GM-2 GM-2",
        pattern: "[xx_-][xx_-][xx_-]"
      }
    ];
    this.clipsInput = this.stringify(this.clips);
  },
  watch: {
    clips: {
      deep: true,
      handler() {
        this.$emit("clips", this.clips);
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
