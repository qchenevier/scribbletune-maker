<template>
  <button
    :class="this.rendering ? 'rendering' : this.value ? 'pause' : 'play'"
    @click="toggle"
    :disabled="this.rendering"
  >
    {{ this.rendering ? "Rendering" : this.value ? "Pause" : "Play" }}
  </button>
</template>

<script>
export default {
  props: { value: { default: false }, rendering: { default: false } },
  methods: {
    toggle: function() {
      this.$emit("input", !this.value);
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

.rendering {
  color: red;
}
</style>
