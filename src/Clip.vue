<template lang="html">
  <div>
    <button @click="emitClips">Update clips</button>
    <AceEditor
      :showPrintMargin="true"
      :showGutter="true"
      :highlightActiveLine="true"
      :value="JSON.stringify(clips, null, 2)"
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
  props: {
    clips: {
      default() {
        return [
          {
            notes: "CM-3 CM-3 DM7-3 DM7-3 GM-2 GM-2",
            pattern: "[xx_-][xx_-][xx_-]"
          }
        ];
      }
    }
  },
  data() {
    return {
      clipsInput: JSON.stringify(this.clips, null, 2)
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
    emitClips() {
      this.$emit("input", JSON.parse(this.clipsInput));
    }
  },
  mounted() {
    this.emitClips();
  }
};
</script>

<style lang="css" scoped></style>
