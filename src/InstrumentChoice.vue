<template>
  <select v-model="instrumentName">
    <option v-for="name in instrumentNames" :value="name">{{ name }} </option>
  </select>
</template>

<script>
const instrumentNames = [
  "AMSynth",
  "DuoSynth",
  "FMSynth",
  "MembraneSynth",
  "MetalSynth",
  "MonoSynth",
  "NoiseSynth",
  "PluckSynth",
  "PolySynth",
  "Sampler",
  "Synth"
];

export default {
  data() {
    return {
      instrumentNames,
      instrumentName: "Synth"
    };
  },
  watch: {
    instrumentName: function() {
      this.$emit("choice", this.instrumentName);
    }
  }
};
</script>
