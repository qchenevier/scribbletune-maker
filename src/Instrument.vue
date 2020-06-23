<template lang="html">
  <div>
    <select v-model="value.name">
      <option v-for="n in names" :value="n">{{ n }} </option>
    </select>
    <button @click="updateParams">
      Update params
    </button>
    <div>
      <codemirror
        :ref="`instrument-editor-${id}`"
        :key="`instrument-editor-${id}`"
        v-model="paramsInput"
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

function getDefaultParams(instrumentName) {
  let instrumentTemplate = new Tone.PolySynth(Tone[instrumentName]);
  return instrumentTemplate.get();
}

export default {
  components: { codemirror },
  props: {
    value: {
      default() {
        return {
          name: "Synth",
          params: getDefaultParams("Synth")
        };
      }
    }
  },
  data() {
    return {
      paramsInput: JSON5.stringify(this.value, null, 2),
      names: [
        "AMSynth",
        "DuoSynth",
        "FMSynth",
        "MembraneSynth",
        "MetalSynth",
        "MonoSynth",
        "NoiseSynth",
        "PluckSynth",
        "Sampler",
        "Synth"
      ],
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
    updateParams() {
      if (this.paramsInput) {
        this.value.params = JSON5.parse(this.paramsInput);
      }
    }
  },
  mounted() {
    this.$emit("input", this.value);
  },
  watch: {
    "value.name": {
      handler() {
        this.value.params = getDefaultParams(this.value.name);
        this.instrumentInput = JSON5.stringify(this.value.params, null, 2);
      }
    },
    value: {
      deep: true,
      handler() {
        this.$emit("input", this.value);
      }
    }
  }
};
</script>

<style scoped>
/deep/ .CodeMirror {
  font-size: 12px;
  border: 1px solid #eee;
  height: 300px;
  direction: ltr;
}
</style>
