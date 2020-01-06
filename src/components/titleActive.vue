<template>
    <van-field
        class="c-textarea"
        :value="value"
        @input="input"
        rows="2"
        autosize
        type="textarea"
        :placeholder="placeholder"
        show-word-limit
    />
</template>
<script>
export default {
  name: "title-active",
  inject: ["isEdit"],
  data() {
    return {};
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'XX机构夏季优惠促销，冰点大放送，帮你爽到底'
    }
  },
  methods: {
    input(val) {
      this.$emit('input', val)
    }
  }
};
</script>
<style lang="scss" scoped>
.c-textarea {
  border: 2px dashed #fff;
  background: transparent;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 0 20px 20px 20px;
  width: 331px;
  /deep/ textarea {
    text-align: center;
    color: #fff;
    font-size: 24px;
  }
  /deep/ textarea::-webkit-input-placeholder {
    color: #fff;
  }
}
</style>


