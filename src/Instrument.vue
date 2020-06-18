<template lang="html">
  <div>
    <InstrumentChoice @choice="createInstrument" />
    <button @click="updateParams">
      Update params
    </button>
    <AceEditor
      :showPrintMargin="true"
      :showGutter="true"
      :highlightActiveLine="true"
      :value="JSON.stringify(instrumentParams, null, 2)"
      :enableBasicAutocompletion="true"
      width="350"
      mode="json"
      theme="dawn"
      :onChange="storeParams"
      name="instrument"
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
      instrument: undefined,
      instrumentParams: undefined,
      instrumentParamsInput: undefined
    };
  },
  methods: {
    createInstrument: function(instrumentName) {
      let instrumentTemplate = new Tone[instrumentName]();
      this.instrumentParams = instrumentTemplate.get();
      this.instrument = new Tone[instrumentName](this.instrumentParams);
    },
    storeParams: function(jsonString) {
      this.instrumentParamsInput = jsonString;
    },
    updateParams: function() {
      if (this.instrumentParamsInput) {
        this.instrumentParams = JSON.parse(this.instrumentParamsInput);
        this.instrument.set(this.instrumentParams);
      }
    }
  },
  watch: {
    instrument: {
      handler: function() {
        this.$emit("instrument", this.instrument);
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
