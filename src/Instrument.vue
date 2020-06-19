<template lang="html">
  <div>
    <InstrumentChoice :key="`instrument-choice-${index}`" @choice="storeName" />
    <button @click="updateParams">
      Update params
    </button>
    <AceEditor
      :showPrintMargin="true"
      :showGutter="true"
      :highlightActiveLine="true"
      :value="stringify(instrument.params)"
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
import InstrumentChoice from "./InstrumentChoice.vue";

import brace from "brace";
import { Ace as AceEditor } from "vue2-brace-editor";
import "brace/mode/json";
import "brace/theme/dawn";

export default {
  components: { InstrumentChoice, AceEditor },
  data() {
    return {
      toneInstrument: undefined,
      instrument: {
        params: undefined,
        name: undefined
      },
      paramsInput: undefined
    };
  },
  computed: {
    index() {
      return this.$vnode.key.split("-")[1];
    }
  },
  methods: {
    stringify(object) {
      return JSON.stringify(object, null, 2);
    },
    storeName(instrumentName) {
      this.instrument.name = instrumentName;
    },
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
