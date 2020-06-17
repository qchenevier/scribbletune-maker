<template>
  <button :class="buttonClass" @click="toggle">
    <slot>{{ buttonMsg }}</slot>
  </button>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false
    };
  },
  computed: {
    buttonMsg: function() {
      return this.isPlaying ? "Play" : "Pause";
    },
    buttonClass: function() {
      return this.isPlaying ? "play" : "pause";
    }
  },
  methods: {
    toggle: function() {
      this.isPlaying = !this.isPlaying;
      this.$emit("playPause", this.isPlaying);
    }
  }
};
</script>

<style>
.play {
  color: green;
}

.pause {
  color: grey;
}
</style>
