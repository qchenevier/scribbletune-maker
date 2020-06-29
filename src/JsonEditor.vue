<template lang="html">
  <div>
    <codemirror
      :ref="`editor-${id}`"
      :key="`editor-${id}`"
      v-model="input"
      @focus="background = '#FFFFFF'"
      @blur="
        $emit('input', YAML.parse(input));
        background = '#F7F7F7';
      "
      :options="editorOptions"
      :style="{ height, background }"
    >
    </codemirror>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/yaml/yaml";

import YAML from "yaml";

export default {
  components: { codemirror },
  props: {
    value: {},
    editorOptions: {
      default() {
        return {
          tabSize: 2,
          mode: "text/yaml",
          dragDrop: false,
          line: true
        };
      }
    },
    height: { default: "300px" }
  },
  data() {
    return {
      YAML: YAML,
      input: YAML.stringify(this.value),
      background: "#F7F7F7"
    };
  },
  computed: {
    id() {
      return this.$vnode.key.split("-")[1];
    }
  },
  watch: {
    value() {
      this.input = YAML.stringify(this.value);
    }
  }
};
</script>

<style scoped>
/deep/ .CodeMirror {
  font-size: 12;
  height: var(--height);
  direction: ltr;
  background: var(--background);
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
}
</style>
