<template lang="html">
  <div class="box">
    <div>
      <!-- lazy input change for buefy component https://github.com/buefy/buefy/issues/401 -->
      <b-input
        size="is-small"
        :value="input.idx"
        @change.native="input.idx = $event.target.value"
      />
      <b-button size="is-small" @click="$emit('close', id)"
        ><b-icon icon="close" size="is-small" /> Close</b-button
      >
    </div>
    <div>
      <b-button size="is-small" @click="() => addEffect()"
        ><b-icon icon="auto-fix" size="is-small" />
        &nbsp; Add effect
      </b-button>
      <b-switch size="is-small" v-model="input.offlineRendering"
        >Prerender</b-switch
      >
    </div>
    <Clip class="box" :key="`clip-${id}`" v-model="input.clips" />
    <Instrument
      :key="`instrument-${id}`"
      :names="instrumentNames"
      v-model="input.instrument"
      class="box"
    />
    <Instrument
      v-for="(effect, idEffect) in input.effects"
      :key="`effect-${idEffect}`"
      :names="effectNames"
      v-model="input.effects[idEffect]"
      :closeButton="true"
      @close="removeEffect"
      height="100px"
      class="box"
    />
  </div>
</template>

<script>
import Instrument from "./Instrument.vue";
import Clip from "./Clip.vue";

function randomHash() {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
}

export default {
  components: { Instrument, Clip },
  props: {
    value: {
      default() {
        return {
          clips: undefined,
          instrument: undefined,
          effects: {},
          offlineRendering: false,
          idx: undefined
        };
      }
    }
  },
  data() {
    return {
      input: this.value,
      instrumentNames: [
        "AMSynth",
        "DuoSynth",
        "FMSynth",
        "MembraneSynth",
        "MetalSynth",
        "MonoSynth",
        "NoiseSynth",
        "PluckSynth",
        "Synth"
      ],
      effectNames: [
        "AutoFilter",
        "AutoPanner",
        "AutoWah",
        "BitCrusher",
        "Chebyshev",
        "Chorus",
        "Distortion",
        "FeedbackDelay",
        "Freeverb",
        "FrequencyShifter",
        "JCReverb",
        "Phaser",
        "PingPongDelay",
        "PitchShift",
        "Reverb",
        "StereoWidener",
        "Tremolo",
        "Vibrato"
      ]
    };
  },
  created() {
    this.input.idx = this.value.idx || this.id;
  },
  computed: {
    id() {
      return this.$vnode.key.split("-")[1];
    }
  },
  methods: {
    addEffect(effect) {
      let id = randomHash();
      this.$set(this.input.effects, id, effect);
    },
    removeEffect(id) {
      this.$delete(this.input.effects, id);
    }
  },
  watch: {
    input: {
      deep: true,
      handler() {
        this.$emit("input", this.input);
      }
    }
  }
};
</script>

<style lang="css" scoped>
.column-homemade {
  float: left;
  width: 260;
}
</style>
