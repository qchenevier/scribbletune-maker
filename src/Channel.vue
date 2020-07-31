<template lang="html">
  <div class="box is-6">
    <div class="level" style="margin-top:0;margin-bottom:0">
      <!-- lazy input change for buefy component https://github.com/buefy/buefy/issues/401 -->
      <div class="title is-6">Channel</div>
      <b-input
        size="is-small"
        :value="input.idx"
        @change.native="input.idx = $event.target.value"
        style="margin-left:0.75rem"
      />
      <b-button
        rounded
        icon-left="close"
        type="is-text"
        size="is-small"
        @click="$emit('close', id)"
      />
    </div>
    <div class="level">
      <b-button
        rounded
        icon-left="auto-fix"
        size="is-small"
        @click="() => addEffect()"
      >
        Add effect
      </b-button>
      <b-switch
        size="is-small"
        v-model="input.offlineRendering"
        style="margin-left:0.75rem"
        >Prerender</b-switch
      >
    </div>
    <div class="subtitle is-6">
      Clips
    </div>
    <Clip :key="`clip-${id}`" v-model="input.clips" />
    <div class="subtitle is-6">Instrument</div>
    <Instrument
      :key="`instrument-${id}`"
      :names="instrumentNames"
      v-model="input.instrument"
    />
    <div v-if="Object.values(input.effects).length">
      <div v-if="Object.values(input.effects).length" class="subtitle is-6">
        Effects
      </div>
      <Instrument
        v-for="(effect, idEffect) in input.effects"
        :key="`effect-${idEffect}`"
        :names="effectNames"
        v-model="input.effects[idEffect]"
        :closeButton="true"
        @close="removeEffect"
        height="100px"
      />
    </div>
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

<style></style>
