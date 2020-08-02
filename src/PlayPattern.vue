<template lang="html">
  <ParamsEditor
    key="play-pattern"
    :value="value"
    @input="v => $emit('input', v)"
    height="260px"
  />
</template>

<script>
import ParamsEditor from "./ParamsEditor.vue";

export default {
  components: { ParamsEditor },
  props: {
    value: { default: [] }
  }
};
</script>

<style scoped></style>
