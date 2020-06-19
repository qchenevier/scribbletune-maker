<template lang="html">
  <div class="column">
    <button @click="$emit('close', index)">
      Close
    </button>
    <Clip :key="`clip-${index}`" @clips="storeClips" />
    <Instrument
      :key="`instrument-${index}`"
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
  computed: {
    index() {
      return this.$vnode.key.split("-")[1];
    }
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
        this.$emit("channel", this.channel, this.index);
      }
    },
    "channel.toneInstrument": {
      handler() {
        this.$emit("channel", this.channel, this.index);
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
