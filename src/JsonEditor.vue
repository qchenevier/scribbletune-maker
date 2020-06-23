<template lang="html">
  <div>
    <codemirror
      :ref="`editor-${id}`"
      :key="`editor-${id}`"
      v-model="input"
      @blur="$emit('input', JSON5.parse(input))"
      :options="editorOptions"
      :style="cssParams"
    >
    </codemirror>
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
    value: {},
    editorOptions: {
      default() {
        return {
          tabSize: 2,
          mode: "text/javascript",
          theme: "idea",
          dragDrop: false,
          line: true
        };
      }
    },
    cssParams: {
      default() {
        return {
          fontSize: "12px",
          height: "300px",
          border: "1px solid #eee"
        };
      }
    }
  },
  data() {
    return {
      JSON5: JSON5,
      input: JSON5.stringify(this.value, null, 2)
    };
  },
  computed: {
    id() {
      return this.$vnode.key.split("-")[1];
    }
  },
  watch: {
    value() {
      this.input = JSON5.stringify(this.value, null, 2);
    }
  }
};
</script>

<style scoped>
/deep/ .CodeMirror {
  font-size: var(--fontSize);
  border: var(--border);
  height: var(--height);
  direction: ltr;
}
</style>
