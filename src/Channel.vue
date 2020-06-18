<template lang="html">
  <div class="column">
    Channel {{ id }}
    <Clip :id="id" @clips="storeClips" />
    <Instrument
      :id="id"
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
  props: {
    id: { default: 0 }
  },
  data() {
    return {
      channel: {
        id: this.id,
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

<style lang="css" scoped>
.column {
  float: left;
  width: 355;
}
</style>
