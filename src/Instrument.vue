<template lang="html">
  <div>
    <select v-model="instrument.name">
      <option v-for="n in names" :value="n">{{ n }} </option>
    </select>
    <button @click="updateParams">
      Update params
    </button>
    <AceEditor
      :showPrintMargin="true"
      :showGutter="true"
      :highlightActiveLine="true"
      :value="JSON.stringify(instrument.params, null, 2)"
      :enableBasicAutocompletion="true"
      width="350"
      mode="json"
      theme="dawn"
      :onChange="storeParamsInput"
      :name="`instrument-editor-${index}`"
      :key="`instrument-editor-${index}`"
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
      toneInstrument: undefined,
      instrument: {
        params: undefined,
        name: "Synth"
      },
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
    index() {
      return this.$vnode.key.split("-")[1];
    }
  },
  methods: {
    createToneInstrument() {
      this.toneInstrument = new Tone.PolySynth(Tone[this.instrument.name]);
      this.instrument.params = this.toneInstrument.get();
      this.$emit("toneInstrument", this.toneInstrument);
    },
    storeParamsInput(jsonString) {
      this.paramsInput = jsonString;
    },
    updateParams() {
      if (this.paramsInput) {
        this.instrument.params = JSON.parse(this.paramsInput);
      }
    },
    updateInstrument() {
      this.toneInstrument.set(this.instrument.params);
    }
  },
  mounted() {
    this.createToneInstrument();
  },
  watch: {
    "instrument.name": {
      handler() {
        this.createToneInstrument();
      }
    },
    "instrument.params": {
      deep: true,
      handler() {
        this.updateInstrument();
      }
    },
    instrument: {
      deep: true,
      handler() {
        this.$emit("instrument", this.instrument);
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
