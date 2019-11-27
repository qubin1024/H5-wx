<template>
    <div>
        <van-icon name="music" :class="{'play': play}" @click="changeOn" />
        <audio src="https://nx01-sycdn.kuwo.cn/e0e7268b8fdf56bd76b3e757ae97f093/5ddea6f3/resource/n3/61/79/4114899473.mp3" preload controls hidden ref="music"></audio>
    </div>
</template>
<script>
export default {
  name: "music",
  data() {
    return {
      play: false
    };
  },
  mounted() {
    //自动播放音乐效果，解决微信自动播放问题
    document.addEventListener("touchstart", this.audioAutoPlay, false);
    document.addEventListener("WeixinJSBridgeReady", this.audioAutoPlay, false);
    let oAudio = this.$refs["music"];
    oAudio.onended = function() {
      //播放完毕，重新循环播放
      oAudio.load();
      oAudio.play();
    };
  },
  methods: {
    changeOn() {
      let oAudio = this.$refs["music"];
      if (!this.play) {
        oAudio.play(); //让音频文件开始播放
      } else {
        oAudio.pause(); //让音频文件暂停播放
      }
      this.play = !this.play;
    },
    audioAutoPlay() {
      let audio = this.$refs["music"];
      this.play = true;
      audio.play();
      document.removeEventListener("touchstart", this.audioAutoPlay);
    }
  }
};
</script>
<style lang="scss" scoped>
i {
  position: fixed;
  right: 0.50333rem;
  top: 70px;
  font-size: 1.1rem;
  color: #000;
  z-index: 1000;
}
i.play {
  animation: spin 2s linear infinite;
}
@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
