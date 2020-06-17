<template>
  <button :class="buttonClass" @click="toggle">
    {{ buttonMsg }}
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
      return this.isPlaying ? "Pause" : "Play";
    },
    buttonClass: function() {
      return this.isPlaying ? "pause" : "play";
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
