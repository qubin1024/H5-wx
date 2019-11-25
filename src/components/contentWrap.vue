<template>
	<div class="cwrap-1">
    <div class="cwrap-2"></div>
    <div class="cwrap-3"></div>
    <div class="title-text" v-if="!!title">
      <input v-if="isEdit" :value="title">
      <span v-else>{{title}}</span></div>
    <slot>
    </slot>
    </div>
</template>

<script>
export default {
  name: "content-wrap",
  data() {
    return {};
  },
  inject: ["isEdit"],
  props: {
    title: {
      type: String
    }
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.cwrap-1 {
  background: #fff;
  border-radius: 0.2rem;
  margin: 1.8rem 0.5rem 0.5rem 0.5rem;
  position: relative;
  padding: 0.7rem 0.5rem 0.5rem 0.5rem;
  min-height: 1rem;
  font-size: 0.4rem;
}
.cwrap-2 {
  background: #ffffffd9;
  border-radius: 0.2rem;
  position: absolute;
  top: -5px;
  left: 10px;
  right: 10px;
  height: 15px;
}

.cwrap-3 {
  background: #ffffffa8;
  border-radius: 0.2rem;
  position: absolute;
  top: -10px;
  left: 20px;
  right: 20px;
  height: 15px;
}
.title-text {
  position: absolute;
  color: #fff;
  top: -15px;
  font-size: 0.5rem;
  width: 70%;
  left: 15%;
  font-weight: 600;
  text-align: center;
  line-height: 1rem;
  background: url(../assets/img/title.png);
  background-size: cover;
}
input {
  width: 50%;
  background: transparent;
  text-align: center;
  height: 0.7rem;
  border: 2px dashed #fff;
  border-radius: 5px;
}
</style>