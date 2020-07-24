<template lang="html">
  <ParamsEditor
    :key="`clips-${id}`"
    :value="value"
    @input="v => $emit('input', v)"
    height="100px"
  />
</template>

<script>
import ParamsEditor from "./ParamsEditor.vue";

export default {
  components: { ParamsEditor },
  props: {
    value: {
      default() {
        return [
          {
            notes: "CfatM-1 Cfat-1 CfatM-1",
            pattern: "x___x__x"
          }
        ];
      }
    }
  },
  computed: {
    id() {
      return this.$vnode.key.split("-")[1];
    }
  },
  mounted() {
    this.$emit("input", this.value);
  }
};
</script>

<style scoped></style>
