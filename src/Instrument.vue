<template lang="html">
  <div>
    <select v-model="input.name">
      <option v-for="n in names" :value="n">{{ n }} </option>
    </select>
    <JsonEditor :key="`instrument-editor-${id}`" v-model="input.params" />
  </div>
</template>

<script>
import JsonEditor from "./JsonEditor.vue";

function getDefaultParams(instrumentName) {
  let instrumentTemplate = new Tone.PolySynth(Tone[instrumentName]);
  return instrumentTemplate.get();
}

export default {
  components: { JsonEditor },
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
      input: this.value,
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
  mounted() {
    this.$emit("input", this.input);
  },
  watch: {
    "input.name": {
      handler() {
        this.input.params = getDefaultParams(this.input.name);
      }
    },
    input: {
      deep: true,
      handler() {
        this.$emit("input", this.input);
      }
    }
  }
};
</script>

<style scoped></style>
