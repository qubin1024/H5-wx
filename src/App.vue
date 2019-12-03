<template>
  <div id="app">
      <img  v-if="userInfo === null" src="@/assets/img/logo.png"/>
      <div class="spinner"  v-if="userInfo === null">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
      </div>
    
      <router-view  v-else />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      code: "",
      userInfo: null
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      setTimeout(() => {
        this.userInfo = {};
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 150px;
  height: 150px;
  margin: 37.5px 112.5px 0 112.5px;
}
.spinner {
  margin: 50px auto;
  width: 50px;
  height: 60px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  background-color: #fe3c71;
  height: 100%;
  width: 6px;
  margin: 0 2px;
  display: inline-block;
  -webkit-animation: stretchDelay 1.2s infinite ease-in-out;
  animation: stretchDelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchDelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes stretchDelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>


