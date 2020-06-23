<template lang="html">
  <div>
    <button @click="emitClips">Update clips</button>
    <div>
      <codemirror
        :ref="`clips-${id}`"
        :key="`clips-${id}`"
        v-model="clipsInput"
        :options="editorOptions"
      >
      </codemirror>
    </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/idea.css";

import JSON5 from "json5";

export default {
  components: { codemirror },
  props: {
    value: {
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
      clipsInput: JSON5.stringify(this.value, null, 2),
      editorOptions: {
        tabSize: 2,
        mode: "text/javascript",
        theme: "idea",
        dragDrop: false,
        line: true
      }
    };
  },
  computed: {
    id() {
      return this.$vnode.key.split("-")[1];
    }
  },
  methods: {
    storeInput(jsonString) {
      this.clipsInput = jsonString;
    },
    emitClips() {
      this.$emit("input", JSON5.parse(this.clipsInput));
    }
  },
  mounted() {
    this.emitClips();
  }
};
</script>

<style scoped>
/deep/ .CodeMirror {
  font-size: 12px;
  border: 1px solid #eee;
  height: 100px;
  direction: ltr;
}
</style>
