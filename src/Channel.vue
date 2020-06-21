<template lang="html">
  <div class="column">
    <button @click="$emit('close', id)">Close</button>
    <Clip :key="`clip-${id}`" v-model="value.clips" />
    <Instrument :key="`instrument-${id}`" v-model="value.instrument" />
  </div>
</template>

<script>
import Instrument from "./Instrument.vue";
import Clip from "./Clip.vue";

export default {
  components: { Instrument, Clip },
  props: {
    value: {
      default() {
        return {
          clips: undefined,
          instrument: undefined
        };
      }
    }
  },
  computed: {
    id() {
      return this.$vnode.key.split("-")[1];
    }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.$emit("input", this.value);
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
