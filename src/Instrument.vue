<template lang="html">
  <div>
    <select v-model="value.name">
      <option v-for="n in names" :value="n">{{ n }} </option>
    </select>
    <button @click="updateParams">
      Update params
    </button>
    <AceEditor
      :showPrintMargin="true"
      :showGutter="true"
      :highlightActiveLine="true"
      :value="JSON.stringify(value.params, null, 2)"
      :enableBasicAutocompletion="true"
      width="350"
      mode="json"
      theme="dawn"
      :onChange="storeParamsInput"
      :name="`instrument-editor-${id}`"
      :key="`instrument-editor-${id}`"
      :editorProps="{ $blockScrolling: true }"
    />
  </div>
</template>

<script>
import brace from "brace";
import { Ace as AceEditor } from "vue2-brace-editor";
import "brace/mode/json";
import "brace/theme/dawn";

function getDefaultParams(instrumentName) {
  let instrumentTemplate = new Tone.PolySynth(Tone[instrumentName]);
  return instrumentTemplate.get();
}

export default {
  components: { AceEditor },
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
      paramsInput: undefined,
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
      ]
    };
  },
  computed: {
    id() {
      return this.$vnode.key.split("-")[1];
    }
  },
  methods: {
    storeParamsInput(jsonString) {
      this.paramsInput = jsonString;
    },
    updateParams() {
      if (this.paramsInput) {
        this.value.params = JSON.parse(this.paramsInput);
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
        this.instrumentInput = JSON.stringify(this.value.params, null, 2);
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

<style lang="css" scoped></style>
