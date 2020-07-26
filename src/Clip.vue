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
            notes: "Cdouble-2 CdoubleM-2 Ctriple-1 CtripleM-1",
            pattern: "x_x_x_x_"
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
