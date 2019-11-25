<template>
    <div class="btn-theme" >
        <span @click="()=>{ show = !show}"><van-icon name="like" /> 点我更换模板 </span>
        <van-popup
            v-model="show"
            position="top"
            closeable
            close-icon-position="top-left"
            :style="{ height: '100%' }"
            >
            <van-skeleton
                title
                avatar
                :row="3"
                :loading="loading"
                >
                <van-grid :border="false" :column-num="2">
                    <van-grid-item>
                        <img src="../assets/img/activity.png" />
                    </van-grid-item>
                    <van-grid-item>
                        <img src="../assets/img/activity.png" />
                    </van-grid-item>
                    <van-grid-item>
                        <img src="../assets/img/activity.png" />
                    </van-grid-item>
                </van-grid>
            </van-skeleton>
        </van-popup>
    </div>
</template>
<script>
export default {
  name: "theme-activity",
  data() {
    return {
      show: false,
      loading: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
};
</script>
<style lang="scss" scoped>
.van-popup {
  padding: 30px 0;
}
.btn-theme {
  position: fixed;
  top: 0;
  left: 50%;
  width: 4rem;
  color: #fff;
  font-size: 0.37333rem;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #00000094;
  text-align: center;
  border-radius: 5px;
  margin-left: -2rem;
  z-index: 1000;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
.cake{animation:move 3s 0s infinite;-webkit-animation:move 3s 0s infinite;transform-origin:bottom;-webkit-transform-origin:bottom;}

@keyframes move
{
    0%, 65%{ 
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
    }
    70% {  
      -webkit-transform:rotate(3de g);
      transform:rotate(3deg);
    }
    75% {  
      -webkit-transform:rotate(-3deg);
      transform:rotate(-3deg);
    }
    80% {  
      -webkit-transform:rotate(3deg);
      transform:rotate(3deg);
    }
    85% {  
      -webkit-transform:rotate(-3deg);
      transform:rotate(-3deg);
    }
    90% {  
      -webkit-transform:rotate(3deg);
      transform:rotate(3deg);
    }
    95% {  
      -webkit-transform:rotate(-3deg);
      transform:rotate(-3deg);
    }
    100% {  
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
    }
}
</style>


