<template lang="html">
  <ParamsEditor
    key="play-pattern"
    :value="value"
    @input="v => $emit('input', v)"
    height="200px"
  />
</template>

<script>
import ParamsEditor from "./ParamsEditor.vue";

export default {
  components: { ParamsEditor },
  props: {
    value: { default: [] }
  },
  mounted() {
    this.$emit("input", this.value);
  }
};
</script>

<style scoped></style>
