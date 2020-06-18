<template lang="html">
  <div>
    <Clip @clips="storeClips" />
    <Instrument
      @instrument="storeInstrument"
      @toneInstrument="storeToneInstrument"
    />
  </div>
</template>

<script>
import Instrument from "./Instrument.vue";
import Clip from "./Clip.vue";

export default {
  components: { Instrument, Clip },
  data() {
    return {
      channel: {
        clips: undefined,
        instrument: undefined,
        toneInstrument: undefined
      }
    };
  },
  methods: {
    storeInstrument(instrument) {
      this.channel.instrument = instrument;
    },
    storeToneInstrument(toneInstrument) {
      this.channel.toneInstrument = toneInstrument;
    },
    storeClips(clips) {
      this.channel.clips = clips;
    }
  },
  watch: {
    "channel.clips": {
      deep: true,
      handler() {
        this.$emit("channel", this.channel);
      }
    },
    "channel.toneInstrument": {
      handler() {
        this.$emit("channel", this.channel);
      }
    }
  }
};
</script>

<style lang="css" scoped></style>
