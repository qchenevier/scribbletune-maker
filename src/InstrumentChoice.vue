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
  methods: {
    emitChoice() {
      this.$emit("choice", this.instrumentName);
    }
  },
  mounted() {
    this.emitChoice();
  },
  watch: {
    instrumentName: "emitChoice"
  }
};
</script>
