<template>
  <div id="app">
    <h1>Scribbletune playground</h1>
    <PlayPauseButton @playPause="tonePlayPause" />
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
      name="editor"
      :editorProps="{ $blockScrolling: true }"
    />
  </div>
</template>

<script>
import PlayPauseButton from "./PlayPauseButton.vue";
import InstrumentChoice from "./InstrumentChoice.vue";
import createSession from "./session.js";

import brace from "brace";
import { Ace as AceEditor } from "vue2-brace-editor";
import "brace/mode/json";
import "brace/theme/dawn";

export default {
  components: { PlayPauseButton, InstrumentChoice, AceEditor },
  data() {
    return {
      instrument: undefined,
      instrumentParams: undefined,
      instrumentParamsInput: undefined,
      session: undefined
    };
  },
  methods: {
    tonePlayPause: function(play) {
      if (play) {
        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
      }
    },
    createInstrument: function(instrumentName) {
      let instrumentTemplate = new Tone[instrumentName]();
      this.instrumentParams = instrumentTemplate.get();
      this.instrument = new Tone[instrumentName](this.instrumentParams);
    },
    storeParams: function(jsonString) {
      this.instrumentParamsInput = jsonString;
    },
    updateParams: function() {
      this.instrumentParams = JSON.parse(this.instrumentParamsInput);
      this.instrument.set(this.instrumentParams);
    }
  },
  watch: {
    instrument: [
      function() {
        Tone.Transport.cancel();
        this.session = createSession(this.instrument);
      }
    ]
  }
};
</script>

<style>
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
}
</style>
