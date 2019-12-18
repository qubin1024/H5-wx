<template>
    <van-field
        class="c-textarea"
        :value="value"
        @input="input"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入"
        show-word-limit
    />
</template>
<script>
export default {
  name: "v-textarea",
  data() {
    return {
    };
  },
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  methods:{
    input(value){
      this.$emit('input', value)
    }
  }
};
</script>
<style lang="scss" scoped>
.c-textarea {
  border: 1px dashed #0d1a31;
  padding: 10px 15px;
  border-radius: 5px;
}
</style>


